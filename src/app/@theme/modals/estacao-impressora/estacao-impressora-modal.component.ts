import { Component, Input } from '@angular/core';
import { ListViewGrid } from '../../components/grid/list-view/service/list-view.service';
import { EstacaoImpressoraModalService } from './service/estacao-impressora-modal.service';


@Component({
    selector: 'nex-estacao-impressora-modal',
    templateUrl: './estacao-impressora-modal.component.html',
    styleUrls: ['./estacao-impressora-modal.component.scss']
  })
  export class EstacaoImpressoraModalComponent {

    @Input() title: string;
    @Input() estacaoImpressoraModal: EstacaoImpressoraModalService;

    id: number = 0;
    listView_Estacao: ListViewGrid = new ListViewGrid();

    constructor(){

        this.listView_Estacao.name = "lstEstacaoImpressora";
        this.listView_Estacao.gridOnly = true;
        this.listView_Estacao.noPaging = true;
        this.listView_Estacao.noBorder = true;
    
        this.listView_Estacao.grid = [{"header": "Impressora", "field": "nome", "width": 100, "align": "left"},];

    }
    onOK_Click(){

    }

    onClose_Click(){
      this.estacaoImpressoraModal.hide();
    }

  }