import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { AreaReparticaoData, AreaReparticaoFilter, AreaReparticaoSort, read_AreaReparticao } from 'src/app/@core/data/reparticao-area';
import { EstacionamentoVagaData, EstacionamentoVagaFilter, EstacionamentoVagaSort, read_EstacionamentoVaga } from 'src/app/@core/data/reparticao-vaga-estacionamento';
import { TipoAreaSigla } from 'src/app/@core/enum';
import { Filter, Find, ListViewGrid } from '../../components';
import { RecepcaoEstacionamentoModalService } from './service/recepcao-estacionamento-modal.service';



@Component({
  selector: 'nex-recepcao-estacionamento-modal',
  templateUrl: './recepcao-estacionamento-modal.component.html',
  styleUrls: ['./recepcao-estacionamento-modal.component.scss']
})
export class RecepcaoEstacionamentoModalComponent implements OnInit {

  @Input() title: string;
  @Input() estacionamentoModal: RecepcaoEstacionamentoModalService;
  @Output() eventSelectGroup: EventEmitter<any> = new EventEmitter(null);

  estacionamentoSelectGroup: any[];
  listView_Estacionamento: ListViewGrid = new ListViewGrid();

  constructor(private areaReparticaoService: AreaReparticaoData,) {

    this.listView_Estacionamento.name = "lstRecepcaoEstacionamento";
    this.listView_Estacionamento.maxHeight = 203;
    this.listView_Estacionamento.gridOnly = true;
    this.listView_Estacionamento.noPaging = true;
    this.listView_Estacionamento.noBorder = true;
    this.listView_Estacionamento.grid = [
      { "header": "", "width": 1, "type": "check", "index": 0, "align": "center" },
      { "header": "Estacionamento", "field": "nome", "width": 50, "align": "left" }
    ];
  }

  ngOnInit(): void {
    this.estacionamentoModal.showSubject
      .subscribe(() => {
        this.update_Grid();
      });    
  }

  onAplicar_Click() {
    this.eventSelectGroup.emit(this.estacionamentoSelectGroup);
    this.onClose_Click();
  }

  onRecepcaoEstacionamentoSelectGroup(itensSelect: any[]) {
    this.estacionamentoSelectGroup = itensSelect;
  }

  update_Grid(find?: Find, filter?: Filter) {
    this.listView_Estacionamento.processingShow();
    const sortEstacionamento: AreaReparticaoSort = { nome: SortOperationKind.ASC };
    const filterEstacionamento: AreaReparticaoFilter = { setor: { siteId: { eq: this.estacionamentoModal.siteId } }, tipo: { eq: TipoAreaSigla.ESTACIONAMENTO } };
    this.areaReparticaoService.readAreaReparticao(sortEstacionamento, filterEstacionamento)
      .subscribe(({ reparticaoArea }: read_AreaReparticao) => {
        const reparticaoAreaNodes = reparticaoArea?.nodes.map(reparticaoArea => {
          return {... {'id': reparticaoArea.id, 
                       'nome': reparticaoArea.nome, 
                       'checked': [(this.estacionamentoModal.estacionamentoList
                                    .findIndex(reparticao => reparticao == reparticaoArea.id) >= 0)]
                      }};
        })
        this.listView_Estacionamento.gridUpdate(reparticaoAreaNodes, find, filter);
      })
  }

  onClose_Click() {
    this.estacionamentoSelectGroup = undefined;
    this.listView_Estacionamento.clear();
    this.estacionamentoModal.hide();
  }

}
