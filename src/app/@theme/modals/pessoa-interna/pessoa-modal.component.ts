import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { FilterPessoaModal, PessoaInternaModalService } from './service/pessoa-modal.service';
import { Item } from '../../components/form/combobox/service/combobox.service';
import { ListViewGrid, Grid } from '../../components';
import { PessoaInternaUsuario,
         PessoaInternaUsuarioData,
         PessoaInternaUsuarioFilter,
         PessoaInternaUsuarioSort,
         read_PessoaInternaUsuario } from 'src/app/@core/data/usuario-pessoa-interna';
import { delay } from 'rxjs/operators';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { ConfigStorage } from 'src/app/@core/storage/config/config';
import { AlertServiceComponent } from '../../components/form/alert-card/service/alert-card.service';
import { SiteFilter } from 'src/app/@core/data/reparticao-site';

@Component({
    selector: 'nex-pessoa-interna-modal',
    templateUrl: './pessoa-modal.component.html',
    styleUrls: ['./pessoa-modal.component.scss']
})
export class PessoaInternaModalComponent implements OnInit, OnDestroy {

    @ViewChild('btModalSalvar') btModal: ElementRef<HTMLButtonElement>;
    
    @Input() pessoaModal: PessoaInternaModalService;
    @Input() filter: PessoaInternaUsuarioFilter;

    @Input() title: string;

    @Output() eventSelect: EventEmitter<any> = new EventEmitter(null);
    
    listView_pessoa: ListViewGrid = new ListViewGrid();

    order_by: PessoaInternaUsuarioSort = {nome: SortOperationKind.ASC};
    filterSite: PessoaInternaUsuarioFilter;
    filterArea: PessoaInternaUsuarioFilter;
    filterOperador: PessoaInternaUsuarioFilter;
    first: number = 360;

    pessoaInterna: PessoaInternaUsuario;
    pessoaImagem: Array<number>;

    alertService: AlertServiceComponent = new AlertServiceComponent();

    constructor(private pessoaInternaService: PessoaInternaUsuarioData,                
                private config: ConfigStorage) {

        this.listView_pessoa.name = "lstPessoaModal";
        this.listView_pessoa.maxHeight = 109;
        this.listView_pessoa.gridOnly = true;
        this.listView_pessoa.noPaging = true;   
        this.listView_pessoa.noBorder = true;   

        this.listView_pessoa?.dataSubject()
            .subscribe((data) => {
                if(data && data.length > 0) {                    
                    this.listView_pessoa.select(0);
                }                
            });
    }

    ngOnInit() {
        if(this.pessoaModal.grid) {
            this.listView_pessoa.grid = this.pessoaModal.grid;
            
            let index: number = 0;
            this.pessoaModal.showModalSubject
                .subscribe(() => {
                    this.pessoaModal.pesquisaPessoa_Option.clear();
                    this.pessoaModal.grid.forEach((grd: Grid) => {
                        if(!(this.pessoaModal?.areaId > 0) || grd.header == 'Pessoa' || grd.header == 'Nome') {
                            this.pessoaModal.pesquisaPessoa_Option.add(grd.header, null, index, (index == 0));
                        }
                        index++;
                    });        
                });
        }

        this.pessoaModal.filterTextSubject
            .pipe(delay(0))
            .subscribe((filter: FilterPessoaModal) => {
                this.filterSite = (this.pessoaModal?.siteId)? {area:{setor:{siteId:{eq: this.pessoaModal.siteId}}}}: undefined;
                console.log(this.pessoaModal?.siteId)
                this.filterArea = (this.pessoaModal?.areaId)? {area: {id: {eq: this.pessoaModal?.areaId}}}: undefined;
                this.filterOperador = (this.pessoaModal?.isOperador)? {operador: {operadorPessoaId: {gt: 0}}}: undefined;
                if(filter) {
                    switch (filter.type) {
                        case "Pessoa":
                        case "Nome":
                            this.filter = { nome: { startsWith: filter.text} };
                            break;
                        case "Área":
                            this.filter = { area: { nome: { contains: filter.text } } };
                            break;
                        case "Setor":
                            this.filter = { area: { setor: { nome: { contains: filter.text } } } };
                            break;
                    }
                    this.pessoaModal.pesquisaPessoa_Option.focus();
                    if(filter.text.length > 0) this.update_Grid();
                }
            });
    }

    onFind_Click(filterSelect: Item) {
        this.pessoaImagem = null;
        this.listView_pessoa.clear();
        if(filterSelect.value && filterSelect.value != "") {
            const filter: FilterPessoaModal = {type: filterSelect.text, text: filterSelect.value }
            this.pessoaModal.filterTextSubject.next(filter);    
        } else {            
            this.pessoaModal.pesquisaPessoa_Option.text = "";            
        }
    }

    onlistviewPessoa_Change(rowSelect: any) {
        if(rowSelect.registro) {
            this.btModal?.nativeElement.removeAttribute('disabled');
            this.pessoaInterna = rowSelect.registro;
            this.pessoaImagem = this.pessoaInterna.imagem?.imagem || null;

            this.btModal?.nativeElement.focus();
        }
    }

    update_Grid() {
        this.listView_pessoa.processingShow();
        const filterGrid: PessoaInternaUsuarioFilter = { ... this.filter, ... this.filterSite, ... this.filterArea, ... this.filterOperador};
        this.pessoaInternaService.readPessoaInternaUsuarios(this.order_by, filterGrid, this.first)
          .subscribe(({ usuarioPessoaInterna }: read_PessoaInternaUsuario) => {
            this.listView_pessoa.gridUpdate(usuarioPessoaInterna?.nodes);           
        });
    }

    onSalvar_Click() {
        const index: number = this.pessoaModal
            .pessoaLista?.findIndex(pessoa => pessoa == this.pessoaInterna.id);
        if(index >= 0) {
            this.alertService.show("ERRO",
                                   `Pessoa já faz parte do Quadro de ${this.pessoaModal.tipoPessoa}. Verifique!`,
                                   null);     
        } else {
            this.eventSelect.emit(this.pessoaInterna);
            this.modalClean();
            this.pessoaModal.hide();    
        }
    }

    modalClean() {
        this.pessoaImagem = null;
        this.pessoaModal.pesquisaPessoa_Option.select(0);
        this.pessoaModal.pesquisaPessoa_Option.text = "";
        this.pessoaInterna = null;
        this.listView_pessoa.clear();
    }

    onClose_Click() {
        this.modalClean();
        this.pessoaModal.hide();
    }

    ngOnDestroy() {
        this.pessoaModal?.filterTextSubject.unsubscribe();
    }

}