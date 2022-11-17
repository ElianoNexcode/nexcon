import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { PessoaExternaModalService } from './service/pessoa-modal.service';
import { Item } from '../../components/form/combobox/service/combobox.service';
import { ListViewGrid, Grid, InputLabel } from '../../components';
import { delay } from 'rxjs/operators';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { ConfigStorage } from 'src/app/@core/storage/config/config';
import { PessoaExternaUsuario, 
         PessoaExternaUsuarioData, 
         PessoaExternaUsuarioFilter, 
         PessoaExternaUsuarioSort, 
         read_PessoaExternaUsuario } from 'src/app/@core/data/usuario-pessoa-externa';
import { AlertServiceComponent } from '../../components/form/alert-card/service/alert-card.service';

@Component({
    selector: 'nex-pessoa-externa-modal',
    templateUrl: './pessoa-modal.component.html',
    styleUrls: ['./pessoa-modal.component.scss']
})
export class PessoaExternaModalComponent implements OnInit, OnDestroy {

    @ViewChild('btModalSalvar') btModal: ElementRef<HTMLButtonElement>;
    
    @Input() pessoaModal: PessoaExternaModalService;
    @Input() filter: PessoaExternaUsuarioFilter;

    @Input() title: string;

    @Output() eventSelect: EventEmitter<any> = new EventEmitter(null);
    
    listView_pessoa: ListViewGrid = new ListViewGrid();

    order_by: PessoaExternaUsuarioSort = {nome: SortOperationKind.ASC};
    first: number = 360;

    pessoaExterna: PessoaExternaUsuario;
    pessoaImagem: Array<number>;

    alertService: AlertServiceComponent = new AlertServiceComponent();

    constructor(private pessoaExternaService: PessoaExternaUsuarioData,
                private config: ConfigStorage) {

        this.listView_pessoa.name = "lstPessoaModal";
        this.listView_pessoa.gridOnly = true;
        this.listView_pessoa.noPaging = true;   
        this.listView_pessoa.noBorder = true;
        this.listView_pessoa.maxHeight = 109;

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
            this.pessoaModal.grid.forEach((grd: Grid) => {
                this.pessoaModal.pesquisaPessoa_Option.add(grd.header, null, index, (index == 0));
                index++;
            });        
        }

        this.pessoaModal.filterTextSubject
            .pipe(delay(0))
            .subscribe((filter: any) => {
                if(filter?.type && filter.type != "Grupo") {
                    switch (filter.type) {
                        case "Nome":
                            this.filter = { nome: { startsWith: filter.text} }
                            break;
                        case "Documento":
                            this.filter = { documentoNumero: {eq: 0} }
                            break;
                        case "Telefone":
                            this.filter = { telefoneFixo: {contains: filter.text} }
                            break;
                        case "E-mail":
                            this.filter = { email: {contains: filter.text} }
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
            const filter: any = {type: filterSelect.text, text: filterSelect.value }
            this.pessoaModal.filterTextSubject.next(filter);    
        } else {
            this.pessoaModal.pesquisaPessoa_Option.text = "";
        }
    }

    onlistviewPessoa_Change(rowSelect: any) {
        if(rowSelect.registro) {
            this.btModal?.nativeElement.removeAttribute('disabled');
            this.pessoaExterna = rowSelect.registro;
            this.pessoaImagem = this.pessoaExterna.imagem?.imagem || null;

            this.btModal?.nativeElement.focus();
        } 
    }

    update_Grid() {
        this.listView_pessoa.processingShow();
        this.pessoaExternaService.readPessoaExternaUsuarios(this.order_by, this.filter, this.first)
          .subscribe(({ usuarioPessoaExterna }: read_PessoaExternaUsuario) => {
            this.listView_pessoa.gridUpdate(usuarioPessoaExterna.nodes);
        });
    }

    onSalvar_Click(){
        const index: number = this.pessoaModal
        .pessoaLista?.findIndex(pessoa => pessoa == this.pessoaExterna.id);
        if(index >= 0) {
            this.alertService.show("ERRO",
                                   `Pessoa já faz parte do Quadro de ${this.pessoaModal.tipoPessoa}. Verifique!`,
                                   null);  
        } else {
            this.eventSelect.emit(this.pessoaExterna);
            this.modalClean();
            this.pessoaModal.hide();    
        }
    }

    modalClean() {
        this.pessoaImagem = null;
        this.pessoaModal.pesquisaPessoa_Option.select(0);
        this.pessoaModal.pesquisaPessoa_Option.text = "";
        this.pessoaExterna = null;
        this.listView_pessoa.clear();
    }

    onClose_Click(cancel: boolean = false) {
        this.modalClean();
        this.pessoaModal.hide();
    }

    ngOnDestroy() {
        this.pessoaModal?.filterTextSubject.unsubscribe();
    }

}