import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FilterVeiculoModal, VeiculoInternoModalService } from './service/veiculo-interno-modal.service';
import { Item } from '../../components/form/combobox/service/combobox.service';
import { ListViewGrid, Grid } from '../../components';
import { delay } from 'rxjs/operators';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { ConfigStorage } from 'src/app/@core/storage/config/config';
import { read_VeiculoInternoUsuario, 
         VeiculoInternoUsuario, 
         VeiculoInternoUsuarioData, 
         VeiculoInternoUsuarioFilter, 
         VeiculoInternoUsuarioSort } from 'src/app/@core/data/usuario-veiculo-interno';
import { VeiculoTipo } from 'src/app/@core/enum';
import { AlertServiceComponent } from '../../components/form/alert-card/service/alert-card.service';

@Component({
    selector: 'nex-veiculo-interno-modal',
    templateUrl: './veiculo-interno-modal.component.html',
    styleUrls: ['./veiculo-interno-modal.component.scss']
})
export class VeiculoInternoModalComponent implements OnInit, OnDestroy {

    @ViewChild('btModalSalvar') btModal: ElementRef<HTMLButtonElement>;
    
    @Input() veiculoModal: VeiculoInternoModalService;
    @Input() filter: VeiculoInternoUsuarioFilter;

    @Input() title: string;

    @Output() eventSelect: EventEmitter<any> = new EventEmitter(null);
    
    alertService: AlertServiceComponent = new AlertServiceComponent();

    listView_veiculo: ListViewGrid = new ListViewGrid();

    order_by: VeiculoInternoUsuarioSort = {placa: SortOperationKind.ASC};
    first: number = 360;

    filterArea: VeiculoInternoUsuarioFilter;

    veiculoInterno: VeiculoInternoUsuario;
    veiculoImagem: string;

    constructor(private veiculoInternoService: VeiculoInternoUsuarioData,
                private config: ConfigStorage) {

        this.listView_veiculo.name = "lstVeiculoModal";
        this.listView_veiculo.maxHeight = 109;
        this.listView_veiculo.gridOnly = true;
        this.listView_veiculo.noPaging = true;   
        this.listView_veiculo.noBorder = true;
        this.listView_veiculo?.dataSubject()
            .subscribe((data) => {
                if(data && data.length > 0) {                    
                    this.listView_veiculo.select(0);
                }                
            });        
    }

    ngOnInit() {
        if(this.veiculoModal.grid) {
            this.listView_veiculo.grid = this.veiculoModal.grid;

            let index: number = 0;
            this.veiculoModal.showModalSubject
            .subscribe(() =>{
                this.veiculoModal.pesquisaVeiculo_Option.clear();
                this.veiculoModal.grid.forEach((grd: Grid) => {
                    this.veiculoModal.pesquisaVeiculo_Option.add(grd.header, null, index, (index == 0));
                    index++;
                })  
            })
              
        }

        this.veiculoModal.filterTextSubject
            .pipe(delay(0))
            .subscribe((filter: FilterVeiculoModal) => {
                this.filterArea = (this.veiculoModal?.areaId)? {area: {id: {eq: this.veiculoModal?.areaId}}}: undefined;
                if(filter) {
                    switch (filter.type) {
                        case "Veículo ID":
                            this.filter = { placa: { contains: filter.text} };
                            break;
                        case "Tipo":
                            this.filter = { tipo: { eq: VeiculoTipo[filter.text] } }
                            break;
                        case "Modelo":
                            this.filter = { modelo: { veiculoModelo: { contains: filter.text } } };
                            break;
                        case "Cor":
                            this.filter = { cor: { contains: filter.text } };
                            break;
                    }

                    this.veiculoModal.pesquisaVeiculo_Option.focus();
                    if(filter.text.length > 0) this.update_Grid();
                }
            });
    }

    onFind_Click(filterSelect: Item) {
        this.listView_veiculo.clear();
        if(filterSelect.value && filterSelect.value != "") {
            const filter: FilterVeiculoModal = {type: filterSelect.text, text: filterSelect.value }  
            this.veiculoModal.filterTextSubject.next(filter); 
        } else {
            this.veiculoModal.pesquisaVeiculo_Option.text = "";
            this.listView_veiculo.clear();
        }
    }

    onlistviewVeiculo_Change(rowSelect: any) {
        if(rowSelect.registro) {
            this.btModal?.nativeElement.removeAttribute('disabled');
            this.veiculoInterno = rowSelect.registro;
            this.veiculoImagem = this.config.converteImagemBase64(this.veiculoInterno.imagem?.trataImagem || null);

            this.btModal?.nativeElement.focus();
        }
    }

    update_Grid() {
        this.listView_veiculo.processingShow();
        const filterGrid: VeiculoInternoUsuarioFilter = { ... this.filter, ... this.filterArea}
        this.veiculoInternoService.readVeiculoInternoUsuario(this.order_by,filterGrid, this.first)
          .subscribe(({ usuarioVeiculoInterno }: read_VeiculoInternoUsuario ) => {
            this.listView_veiculo.gridUpdate(usuarioVeiculoInterno.nodes);
        });
    }

    onOK_Click() {
        const index: number = this.veiculoModal
            .veiculoLista?.findIndex(nivel => nivel == this.veiculoInterno.id);
        if(index >= 0) {
            this.alertService.show('ERRO',
                                'O Veículo selecionado já faz parte do quadro de Veículos desta Pessoa. Verifique!',
                                null);
        } else {
            this.eventSelect.emit(this.veiculoInterno);
            this.onClose_Click();
        }

    }

    onClose_Click() {
        this.modalClean();
        this.veiculoModal.hide();
    }

    ngOnDestroy() {
        this.veiculoModal?.filterTextSubject.unsubscribe();
    }
    
    modalClean() {
        this.veiculoImagem = null;
        this.veiculoModal.pesquisaVeiculo_Option.select(0);
        this.veiculoModal.pesquisaVeiculo_Option.text = "";
        this.veiculoInterno = null;
        this.listView_veiculo.clear();
    }

}