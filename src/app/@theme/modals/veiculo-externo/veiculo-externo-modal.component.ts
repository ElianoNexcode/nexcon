import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FilterVeiculoModal, VeiculoExternoModalService } from './service/veiculo-externo-modal.service';
import { Item } from '../../components/form/combobox/service/combobox.service';
import { ListViewGrid, Grid } from '../../components';
import { delay } from 'rxjs/operators';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { ConfigStorage } from 'src/app/@core/storage/config/config';
import { read_VeiculoExternoUsuario, 
         VeiculoExternoUsuario, 
         VeiculoExternoUsuarioData, 
         VeiculoExternoUsuarioFilter, 
         VeiculoExternoUsuarioSort } from 'src/app/@core/data/usuario-veiculo-externo';
import { VeiculoTipo } from 'src/app/@core/enum';
import { AlertServiceComponent } from '../../components/form/alert-card/service/alert-card.service';

@Component({
    selector: 'nex-veiculo-externo-modal',
    templateUrl: './veiculo-externo-modal.component.html',
    styleUrls: ['./veiculo-externo-modal.component.scss']
})
export class VeiculoExternoModalComponent implements OnInit, OnDestroy {
    
    @ViewChild('btModalSalvar') btModal: ElementRef<HTMLButtonElement>;

    @Input() veiculoModal: VeiculoExternoModalService;
    @Input() filter: VeiculoExternoUsuarioFilter;

    @Input() title: string;

    @Output() eventSelect: EventEmitter<any> = new EventEmitter(null);
    
    listView_veiculo: ListViewGrid = new ListViewGrid();

    order_by: VeiculoExternoUsuarioSort = {placa: SortOperationKind.ASC};
    first: number = 360;

    filterArea: VeiculoExternoUsuarioFilter;

    veiculoExterno: VeiculoExternoUsuario;
    veiculoImagem: string;

    alertService: AlertServiceComponent = new AlertServiceComponent();

    constructor(private veiculoInternoService: VeiculoExternoUsuarioData,
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
                        if(!(this.veiculoModal?.areaId > 0) || grd.header == 'Placa'|| grd.header == 'Modelo'|| grd.header == 'Cor'){
                        this.veiculoModal.pesquisaVeiculo_Option.add(grd.header, null, index, (index == 0));
                    }
                        index++;
                    })  
                });              
        }

        this.veiculoModal.filterTextSubject
            .pipe(delay(0))
            .subscribe((filter: FilterVeiculoModal) => {
                if(filter) {
                    switch (filter.type) {
                        case "Veículo ID":
                            this.filter = { placa: { contains: filter.text} };
                            break;
                        case "Tipo":
                            if (VeiculoTipo[filter.text] != null) {
                                this.filter = { tipo: { eq: VeiculoTipo[filter.text] } };
                              } else {
                                this.filter = undefined;
                              }
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
            this.veiculoExterno = rowSelect.registro;
            this.veiculoImagem = this.config.converteImagemBase64(this.veiculoExterno.imagem?.imagem || null);

            this.btModal?.nativeElement.focus();
        }
    }

    update_Grid() {
        this.listView_veiculo.processingShow();
        const filterGrid: VeiculoExternoUsuarioFilter = { ... this.filter, ... this.filterArea}
        this.veiculoInternoService.readVeiculoExternoUsuario(this.order_by,filterGrid)
          .subscribe(({ usuarioVeiculoExterno }: read_VeiculoExternoUsuario ) => {
            this.listView_veiculo.gridUpdate(usuarioVeiculoExterno.nodes);
        });
    }

    onOK_Click() {
        const index: number = this.veiculoModal
            .veiculoLista?.findIndex(pessoa => pessoa == this.veiculoExterno.id);
        if(index >= 0) {
            this.alertService.show("ERRO",
                                   `Veículo já faz parte do Quadro de ${this.veiculoModal.tipoVeiculo}. Verifique!`,
                                   null);  
        } else {
            this.eventSelect.emit(this.veiculoExterno);
            this.modalClean();
            this.veiculoModal.hide();    
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
        this.veiculoExterno = null;
        this.listView_veiculo.clear();
    }

}