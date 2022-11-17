import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { SelecaoBloqueioModalService } from './service/selecao-bloqueio-modal.service';
import { Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { Filter, Find, ListViewGrid } from '../../components';
import { BloqueioDispositivoData, BloqueioDispositivoFilter, BloqueioDispositivoSort, read_BloqueioDispositivo } from 'src/app/@core/data/dispositivo-bloqueio';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';


@Component({
    selector: 'nex-selecao-bloqueio-modal',
    templateUrl: './selecao-bloqueio-modal.component.html',
    styleUrls: ['./selecao-bloqueio-modal.component.scss']
  })
  export class SelecaoBloqueioModalComponent implements AfterViewInit{

    @Input() title: string;
    @Input() selecaoModal: SelecaoBloqueioModalService;
    
    @Output() eventSelectGroup: EventEmitter<any> = new EventEmitter(null);
  
    id: number = 0;
    listView_Bloqueio: ListViewGrid = new ListViewGrid();
    order_by: BloqueioDispositivoSort = { nome: SortOperationKind.ASC };
    areaId: number;
    
    bloqueioSelectGroup: any[];

    constructor(private bloqueioDispositivoService: BloqueioDispositivoData) {

      this.listView_Bloqueio.name = "lstAreaNivel";
      this.listView_Bloqueio.maxHeight = 239;
      this.listView_Bloqueio.gridOnly = true;
      this.listView_Bloqueio.noPaging = true;
      this.listView_Bloqueio.noBorder = true;
  
      this.listView_Bloqueio.grid = [{"header": "", "width": 1, "type": "check", "index": 0,"align": "center"},
                                     {"header": "Bloqueio", "field": "nome", "width": 100, "align": "left"}];
    }

    ngAfterViewInit(): void {       
      this.selecaoModal?.showSubject
        .subscribe(() => {
          this.areaId = this.selecaoModal.areaId;
          this.update_Grid(); 
        });
    }

    update_Grid(find?: Find, filter?: Filter) {
      this.listView_Bloqueio.processingShow();
      const bloqueioFilter: BloqueioDispositivoFilter = { areaId: {eq: this.areaId}};
      this.bloqueioDispositivoService.readBloqueioDispositivos(this.order_by,bloqueioFilter)
        .subscribe(({ dispositivoBloqueio }: read_BloqueioDispositivo) => {
          const dispositivoBloqueioNodes = dispositivoBloqueio?.nodes.map(bloqueio => {
            return {id: bloqueio.id,
                    nome: bloqueio.nome,
                    checked: [this.selecaoModal.paramList.findIndex(item => item == bloqueio.id) >= 0]}
          })
          this.listView_Bloqueio.gridUpdate(dispositivoBloqueioNodes, find, filter);
        });
    }

    onAplicar_Click() {
      this.eventSelectGroup.emit(this.bloqueioSelectGroup);
      this.onClose_Click(); 
    }

    onBloqueioSelectGroup(itensSelect: any[]) {
      this.bloqueioSelectGroup = itensSelect;
    }

    onClose_Click() {
      this.listView_Bloqueio.clear();
      this.selecaoModal.hide();
    }

}
  