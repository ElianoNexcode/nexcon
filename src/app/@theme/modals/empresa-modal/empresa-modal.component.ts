import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { EmpresaReparticao, EmpresaReparticaoData, EmpresaReparticaoFilter, EmpresaReparticaoSort, read_EmpresaReparticao } from 'src/app/@core/data/reparticao-empresa';
import { ConfigStorage } from 'src/app/@core/storage/config/config';
import { Item } from '../../components/form/combobox/service/combobox.service';
import { Grid, ListViewGrid } from '../../components/grid/list-view/service/list-view.service';
import { FilterEmpresaModal, EmpresaModalService } from './service/empresa-modal.service';


@Component({
    selector: 'nex-empresa-modal',
    templateUrl: './empresa-modal.component.html',
    styleUrls: ['./empresa-modal.component.scss']
})

export class EmpresaModalComponent implements OnInit, OnDestroy {

@Input() empresaModal: EmpresaModalService;
@Input() filter: EmpresaReparticaoFilter;
@Input() title: string;

@Output() eventSelect: EventEmitter<any> = new EventEmitter(null);

listView_empresa: ListViewGrid = new ListViewGrid();

order_by: EmpresaReparticaoSort = {nome: SortOperationKind.ASC};
first: number = 360;

veiculoEmpresa: EmpresaReparticao;

constructor(private veiculoExternoService: EmpresaReparticaoData,
            private config: ConfigStorage ) {


this.listView_empresa.name = "lstEmpresaModal";
this.listView_empresa.gridOnly = true;
this.listView_empresa.noPaging = true;
this.listView_empresa.noBorder = true;
this.listView_empresa.maxHeight = 150;



}

ngOnInit() {
    if(this.empresaModal.grid) {
        this.listView_empresa.grid = this.empresaModal.grid;
        let index: number = 0;
        this.empresaModal.grid.forEach((grd: Grid) => {
            this.empresaModal.pesquisaEmpresa_Option.add(grd.header, null, index, (index == 0));
            index++;
        })                
    }

    this.empresaModal.filterTextSubject
        .pipe(
            delay(0)
        )
        .subscribe((filter: FilterEmpresaModal) => {
            if(filter) {
                switch (filter.type) {
                    case "Nome":
                        this.filter = { nome: { startsWith: filter.text} };
                        break;
                    case "Telefone":
                        this.filter = { telefone1: { contains: filter.text} };
                        break;
                    case "Email":
                        this.filter = { email: {contains: filter.text} };
                        break;
                }
                this.empresaModal.pesquisaEmpresa_Option.focus();
                if(filter.text.length > 0) this.update_Grid();
            }
        });

}

    onFind_Click(filterSelect: Item) {
        if(filterSelect.value && filterSelect.value != "") {
            const filter: FilterEmpresaModal = {type: filterSelect.text, text: filterSelect.value }
            this.empresaModal.filterTextSubject.next(filter);    
        } else {
            this.empresaModal.pesquisaEmpresa_Option.text = "";
            this.listView_empresa.clear();
        }
    }

    onlistviewEmpresa_Change(rowSelect: any) {
        if(rowSelect.registro) {
            this.veiculoEmpresa = rowSelect.registro;    
        }
    }

    update_Grid() {
        this.listView_empresa.processingShow();
        this.veiculoExternoService.readEmpresaReparticaos(this.order_by, this.filter)
         .subscribe(({ reparticaoEmpresa }: read_EmpresaReparticao) => {
            this.listView_empresa.gridUpdate(reparticaoEmpresa.nodes);
            });
            
    }

    onOK_Click() {
        this.eventSelect.emit(this.veiculoEmpresa);
        this.modalClean();
        this.empresaModal.hide();
    }

    onClose_Click() {
        this.modalClean();
        this.empresaModal.hide();
    }

    ngOnDestroy() {
        this.empresaModal?.filterTextSubject.unsubscribe();  
    }

    modalClean() { 
        this.empresaModal.pesquisaEmpresa_Option.select(0);
        this.empresaModal.pesquisaEmpresa_Option.text = "";
        this.veiculoEmpresa = null;
        this.listView_empresa.clear();
    }

}