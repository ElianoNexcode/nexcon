import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { NivelAcessoConcessao, NivelAcessoConcessaoData, NivelAcessoFilter, NivelAcessoSort, read_NivelAcessoConcessao } from 'src/app/@core/data/concessao-nivel-acesso';
import { RecepcaoNivelAcesso } from 'src/app/@core/data/reparticao-recepcao';
import { Filter, Find, ListViewGrid, rowSelect } from '../../components';
import { AlertServiceComponent } from '../../components/form/alert-card/service/alert-card.service';
import { RecepcaoNivelAcessoModalService } from './service/recepcao-nivel-acesso-modal.service';



@Component({
    selector: 'nex-recepcao-nivel-acesso-modal',
    templateUrl: './recepcao-nivel-acesso-modal.component.html',
    styleUrls: ['./recepcao-nivel-acesso-modal.component.scss']
  })
  export class RecepcaoNivelAcessoModalComponent implements OnInit {

    @ViewChild('btModalOk') btModal: ElementRef<HTMLButtonElement>;

    @Input() title: string;
    @Input() nivelAcessoModal: RecepcaoNivelAcessoModalService;
    @Output() eventSelect: EventEmitter<any> = new EventEmitter(null);

    alertService: AlertServiceComponent = new AlertServiceComponent();

    listView_NivelAcesso: ListViewGrid = new ListViewGrid();
    nivelAcessoSelect: NivelAcessoConcessao;
 
    constructor( private nivelAcessoService: NivelAcessoConcessaoData) {
   
      this.listView_NivelAcesso.name = "lstRecepcaoNivelAcesso";
      this.listView_NivelAcesso.gridOnly = true;
      this.listView_NivelAcesso.noPaging = true;
      this.listView_NivelAcesso.noBorder = true;
      this.listView_NivelAcesso.maxHeight = 203;
      this.listView_NivelAcesso.grid = [{"header":"Nível de Acesso", "field":"nome", "width": 50, "align": "left"}];

      this.update_Grid();

    }

    ngOnInit(): void {
      this.nivelAcessoModal.showSubject
        .subscribe(() => {
          this.update_Grid();
        });
        
    }

    update_Grid(find?: Find, filter?: Filter){
      this.listView_NivelAcesso.processingShow();
      const sortNivelAcesso: NivelAcessoSort = { nome: SortOperationKind.ASC};
      const filterNivelAcesso: NivelAcessoFilter = { tipo: {eq: 0}};
        this.nivelAcessoService.readNivelAcessoConcessao(sortNivelAcesso, filterNivelAcesso)
          .subscribe(({ concessaoNivelAcesso}: read_NivelAcessoConcessao) => {
            this.listView_NivelAcesso.gridUpdate(concessaoNivelAcesso?.nodes,find,filter);
          });
    }

    onListViewNivelSelect(rowSelect?: any) {
      if(rowSelect.registro) {
        this.btModal?.nativeElement.removeAttribute('disabled');
        this.nivelAcessoSelect = rowSelect.registro;

        this.btModal?.nativeElement.focus();
      }
    }
  
    onAplicar_Click() {
      const index: number = this.nivelAcessoModal
        .nivelAcessoList?.findIndex(nivel => nivel == this.nivelAcessoSelect.id);
      if(index >= 0) {
        this.alertService.show('ERRO',
                               'O Nível de Acesso selecionado já faz parte do quadro Nível de Acesso desta Recepção. Verifique!',
                               null);
      } else {
        this.eventSelect.emit(this.nivelAcessoSelect);
        this.onClose_Click();
      }
    }
  
    onClose_Click() {
      this.btModal?.nativeElement.setAttribute('disabled', 'true');
      this.nivelAcessoSelect = undefined;
      this.listView_NivelAcesso.clear();
      this.nivelAcessoModal.hide();
    }

}
