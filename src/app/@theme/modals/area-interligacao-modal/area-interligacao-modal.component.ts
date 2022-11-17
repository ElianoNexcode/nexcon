import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { AreaReparticao, AreaReparticaoData, AreaReparticaoFilter, AreaReparticaoSort, read_AreaReparticao } from 'src/app/@core/data/reparticao-area';
import { read_SetorReparticao, SetorReparticao, SetorReparticaoData, SetorReparticaoFilter, SetorReparticaoSort } from 'src/app/@core/data/reparticao-setor';
import { Filter, Find, ListViewGrid } from '../../components';
import { AlertServiceComponent } from '../../components/form/alert-card/service/alert-card.service';
import { ComboOptions } from '../../components/form/combobox/service/combobox.service';
import { AreaInterligacaoModalService } from './service/area-interligacao-modal.service';
@Component({
  selector: 'nex-area-interligacao-modal',
  templateUrl: './area-interligacao-modal.component.html',
  styleUrls: ['./area-interligacao-modal.component.scss']
})
export class AreaInterligacaoModalComponent implements OnInit {

  @ViewChild('btModalSalvar') btModal: ElementRef<HTMLButtonElement>;

  @Input() title: string;
  @Input() areaInterligacaoModal: AreaInterligacaoModalService;
  @Output() eventSelect: EventEmitter<any> = new EventEmitter(null);

  listView_Area: ListViewGrid = new ListViewGrid();
  setor_Option: ComboOptions = new ComboOptions();

  areaInterligacao: AreaReparticao;

  alertService: AlertServiceComponent = new AlertServiceComponent();
  settings: BehaviorSubject<any>;

  constructor( private setorReparticao: SetorReparticaoData,
               private areaReparticao: AreaReparticaoData ) {

    this.listView_Area.name = "lstAreaNivel";
    this.listView_Area.maxHeight = 165;
    this.listView_Area.gridOnly = true;
    this.listView_Area.noPaging = true;
    this.listView_Area.noBorder = true;

    this.listView_Area.grid = [{ "header": "Áreas", "field": "nome", "width": 100, "align": "left" }];

    this.setor_Option.name = "cbSetorModal";

  }

  ngOnInit(): void {
    this.areaInterligacaoModal?.showSubject
      .subscribe(() => {
        const setorSort: SetorReparticaoSort = { nome: SortOperationKind.ASC };
        const setorFilter: SetorReparticaoFilter = {siteId: {eq: this.areaInterligacaoModal?.siteId}};
        this.setorReparticao.readSetorReparticao(setorSort, setorFilter)
          .subscribe(({ reparticaoSetor }: read_SetorReparticao) => {
            const nodes: SetorReparticao[] = reparticaoSetor?.nodes;
            nodes?.forEach((node: SetorReparticao) => {
              this.setor_Option.add(node.nome, node.nome, node.id)
            });
            this.setor_Option.select(0);
            this.onSetor_Change();
          });
      });
  }

  onSetor_Change() {
    this.btModal?.nativeElement.setAttribute('disabled', 'true');
    this.areaInterligacao = undefined;
    this.update_Grid();
  }

  update_Grid(find?: Find, filter?: Filter) {
    this.listView_Area.processingShow();
    const sortArea: AreaReparticaoSort = { nome: SortOperationKind.ASC };
    const filterArea: AreaReparticaoFilter = { setorId: { eq: this.setor_Option.itemSelected?.id } }
    this.areaReparticao.readAreaReparticao(sortArea, filterArea)
      .subscribe(({ reparticaoArea }: read_AreaReparticao) => {
        this.listView_Area.gridUpdate(reparticaoArea?.nodes, find, filter);
      })
  }

  onlistviewArea_Change(rowSelect: any) {
    if(rowSelect.registro) {
        this.btModal?.nativeElement.removeAttribute('disabled');
        this.areaInterligacao = rowSelect.registro;

        this.btModal?.nativeElement.focus();
    }
  }

  onAplicar_Click() {
    const index: number = this.areaInterligacaoModal
      .areaInterligadaLista?.find(area => area == this.areaInterligacao?.id)
    if(index >= 0) {
      this.alertService.show('ERRO',
                             'A Área selecionada já faz parte do quadro de Ligação. Verifique!',
                             null);
    } else if(this.areaInterligacao?.id == this.areaInterligacaoModal.areaId) {
      this.alertService.show('ERRO',
                             'A Área em edição não deve fazer parte do quadro de Ligação. Verifique!',
                             null);
    } else {
      this.eventSelect.emit(this.areaInterligacao);
      this.onClose_Click();
    }
  }

  onClose_Click() {
    this.areaInterligacaoModal.hide();
    this.listView_Area.clearSelect();
    this.btModal?.nativeElement.setAttribute('disabled', 'true');
    this.areaInterligacao = undefined;
  }

}
