import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { NivelAcessoConcessao, NivelAcessoConcessaoData, NivelAcessoFilter, NivelAcessoSort, read_NivelAcessoConcessao } from 'src/app/@core/data/concessao-nivel-acesso';
import { Filter, Find, ListViewGrid } from '../../components';
import { AlertServiceComponent } from '../../components/form/alert-card/service/alert-card.service';
import { AreaAcessoModalService } from './service/area-acesso-modal.service';

@Component({
  selector: 'nex-area-acesso-modal',
  templateUrl: './area-acesso-modal.component.html',
  styleUrls: ['./area-acesso-modal.component.scss']
})
export class AreaAcessoModalComponent {

  @ViewChild('btModalSalvar') btModal: ElementRef<HTMLButtonElement>;

  @Input() title: string;
  @Input() areaAcessoModal: AreaAcessoModalService;

  @Output() eventSelect: EventEmitter<any> = new EventEmitter(null);

  id: number = 0;
  listView_NivelAcesso: ListViewGrid = new ListViewGrid();

  nivelAcesso: NivelAcessoConcessao;
  order_by: NivelAcessoSort = { nome: SortOperationKind.ASC };
  filter: NivelAcessoFilter;

  alertService: AlertServiceComponent = new AlertServiceComponent();

  constructor(private nivelAcessoConcessaoService: NivelAcessoConcessaoData) {

    this.listView_NivelAcesso.name = "lstAreaAcesso";
    this.listView_NivelAcesso.maxHeight = 203;
    this.listView_NivelAcesso.gridOnly = true;
    this.listView_NivelAcesso.noPaging = true;
    this.listView_NivelAcesso.noBorder = true;
    this.listView_NivelAcesso.grid = [
      { "header": "Nível de Acesso Rotativo", "field": "nome", "width": 100, "align": "left" }
    ];

    this.update_Grid();
  }

  onAplicar_Click() {
    const index: number = this.areaAcessoModal
      .nivelAcessoLista?.findIndex(nivel => nivel == this.nivelAcesso.id);
    if(index >= 0) {
      this.alertService.show('ERRO',
                             'O Nível de Acesso selecionado já faz parte do quadro Nível de Acesso Rotativo desta Área. Verifique!',
                             null);
    } else {
      this.eventSelect.emit(this.nivelAcesso);
      this.onClose_Click();
    }
  }

  onlistView_NivelAcesso(rowSelect: any) {
    if(rowSelect.registro) {
        this.btModal?.nativeElement.removeAttribute('disabled');
        this.nivelAcesso = rowSelect.registro;

        this.btModal?.nativeElement.focus();
    }
  }

  update_Grid(find?: Find, filter?: Filter){
    this.listView_NivelAcesso.processingShow();
    this.nivelAcessoConcessaoService.readNivelAcessoConcessao(this.order_by, this.filter)
      .subscribe(({ concessaoNivelAcesso}: read_NivelAcessoConcessao) =>{
        this.listView_NivelAcesso.gridUpdate(concessaoNivelAcesso.nodes);
      })
  }

  onClose_Click() {
    this.areaAcessoModal.hide();
    this.listView_NivelAcesso.clearSelect();
    this.btModal?.nativeElement.setAttribute('disabled', 'true');
    this.nivelAcesso = undefined;
  }

}
