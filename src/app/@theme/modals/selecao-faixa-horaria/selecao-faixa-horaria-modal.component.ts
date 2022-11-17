import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { SelecaoFaixaHorariaModalService } from './service/selecao-faixa-horaria-modal.service';
import { Filter, Find, ListViewGrid } from '../../components';
import { FaixaHorariaConcessao,
         FaixaHorariaFilter,
         FaixaHorariaSort } from 'src/app/@core/data/concessao-faixa-horaria';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { FaixaHorariaConcessaoService, FaixaHorariaModal } from 'src/app/pages/concessao/faixa-horaria/service/faixa-horaria.service';

@Component({
  selector: 'nex-selecao-faixa-horaria-modal',
  templateUrl: './selecao-faixa-horaria-modal.component.html',
  styleUrls: ['./selecao-faixa-horaria-modal.component.scss'],
})
export class SelecaoFaixaHorariaModalComponent implements AfterViewInit {

  @Input() title: string;
  @Input() selecaoFaixaHorariaModal: SelecaoFaixaHorariaModalService;
  @Output() eventSelectGroup: EventEmitter<any> = new EventEmitter(null);


  id: number = 0;
  listView_FaixaHoraria: ListViewGrid = new ListViewGrid();
  order_by: FaixaHorariaSort = { nome: SortOperationKind.ASC };
  filter: FaixaHorariaFilter;
  faixahorariaModal: FaixaHorariaConcessao[];

  constructor(private faixaHorariaConcessaoService: FaixaHorariaConcessaoService) {

    this.listView_FaixaHoraria.name = "lstAreaNivel";
    this.listView_FaixaHoraria.maxHeight = 225;
    this.listView_FaixaHoraria.gridOnly = true;
    this.listView_FaixaHoraria.noPaging = true;
    this.listView_FaixaHoraria.noBorder = true;

    this.listView_FaixaHoraria.grid = [
      { "header": "Nome", "field": "nome", "width": 55, "align": "left" },
      { "header": "Faixa Horária", "field": "faixaHoraria", "width": 21, "align": "left" },
      { "header": "Dias", "field": "diasSemana", "type": "textValue", "width": 20, "align": "left" },
      { "header": "ENT.", "width": 2, "type": "check", "index": 0, "align": "center" },
      { "header": "SAI.", "width": 2, "type": "check", "index": 1, "align": "center" }];
    
    this.update_Grid();
    
  }

  ngAfterViewInit(): void {
    const find = null;
    const filter = { select: "Nome", field: "nome", value: "" };
    this.selecaoFaixaHorariaModal.showSubject
      .subscribe(() => {
        this.faixaHorariaConcessaoService.read_FaixaHorariaModal();
      })    
  }

  update_Grid(find?: Find, filter?: Filter) {
    this.listView_FaixaHoraria.processingShow();
    this.faixaHorariaConcessaoService.faixaHorarioSubscription
      .subscribe((data: FaixaHorariaModal[]) => {
        const dataGrid = data.map(faixa => {
          return {
            id: faixa.id,
            nome: faixa.nome,
            faixaHoraria: faixa.faixaHoraria,
            diasSemana: faixa.diasSemana,
            checked: [this.selecaoFaixaHorariaModal?.paramList?.findIndex(
                        param => (param.id == faixa.id && param.tipo == 1)) >= 0,
                      this.selecaoFaixaHorariaModal?.paramList?.findIndex(
                        param => (param.id == faixa.id && param.tipo == 2)) >= 0]
          }
        });        
        this.listView_FaixaHoraria.gridUpdate(dataGrid, find, filter);
      });
  }

  onAplicar_Click() {
    this.eventSelectGroup.emit(this.listView_FaixaHoraria.dataGridBehavior
      .value?.filter(faixaHoraria => faixaHoraria.checked[0] == true || faixaHoraria.checked[1] == true)
      .map(faixaHoraria => {
        return {
          id: faixaHoraria.id,
          nome: faixaHoraria.nome,
          tipo: (faixaHoraria.checked[0]? faixaHoraria.checked[1]? 3: 1: 2)
        }
      }));
    this.onClose_Click();
  }

  onClose_Click() {
    this.listView_FaixaHoraria.clear();
    this.selecaoFaixaHorariaModal.hide();
  }

}
