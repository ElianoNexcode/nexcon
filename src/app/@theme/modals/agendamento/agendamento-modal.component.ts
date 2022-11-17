import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { FilterModal, VisitaAgendaModalService } from './service/agendamento-modal.service';
import { ListViewGrid, Grid } from '../../components';
import { delay } from 'rxjs/operators';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { ConfigStorage } from 'src/app/@core/storage/config/config';
import { ControleVisitaAgenda, 
         ControleVisitaAgendaData, 
         ControleVisitaAgendaFilter, 
         ControleVisitaAgendaSort, 
         read_ControleVisitaAgenda } from 'src/app/@core/data/controle-visita-agenda';
import { Item } from '../../components/form/combobox/service/combobox.service';
import { Options, OptionsGroup } from '../../components/form/select-group/service/select-group.service';
import { DateOperator } from '../../components/miscellaneous/date-operator/date-operator';

@Component({
    selector: 'nex-agendamento-modal',
    templateUrl: './agendamento-modal.component.html',
    styleUrls: ['./agendamento-modal.component.scss']
})
export class AgendamentoModalComponent implements OnInit, OnDestroy {
    
    @Input() visitaAgendaModal: VisitaAgendaModalService;
    @Input() title: string;
    @Input() showFilter: boolean = true;
    @Input() siteId: number;

    @Output() eventSelect: EventEmitter<any> = new EventEmitter(null);
    
    listView_visitaAgenda: ListViewGrid = new ListViewGrid();

    order_by: ControleVisitaAgendaSort = {agendamentoValidadeInicial: SortOperationKind.ASC, 
                                                          pessoaNome: SortOperationKind.ASC};
    filter: ControleVisitaAgendaFilter;
    Diafilter: ControleVisitaAgendaFilter;

    first: number = 240;

    visitaAgenda: ControleVisitaAgenda;
    pessoaImagem: string;

    filtraDia_Option: OptionsGroup = new OptionsGroup()

    dataInicioDia: string;
    dataFinalDia: string;

    dateOperator: DateOperator = new DateOperator();

    constructor(private controleVisitaAgendaService: ControleVisitaAgendaData,
                private config: ConfigStorage) {

        this.listView_visitaAgenda.name = "lstVisitaAgendaModal";
        this.listView_visitaAgenda.gridOnly = true;
        this.listView_visitaAgenda.noPaging = true;
        this.listView_visitaAgenda.noBorder = true;
        this.listView_visitaAgenda.maxHeight = 109;

        const date: Date = new Date();

        this.dataInicioDia = this.dateOperator.formatDate(date.toLocaleDateString("pt-br")).dateFormated + " 00:00:00 -00:00";
        this.dataFinalDia  = this.dateOperator.formatDate(date.toLocaleDateString("pt-br")).dateFormated + " 23:59:59 -00:00";

        this.filtraDia_Option.add(1, "Somente agendamento do dia.", "agendaDia", true);
        this.Diafilter = { agendamentoValidadeInicial: {gt: this.dataInicioDia,
                                                        lt: this.dataFinalDia} }
    }

    ngOnInit() {
        if(this.visitaAgendaModal.grid) {
            this.listView_visitaAgenda.grid = this.visitaAgendaModal.grid;

            let index: number = 0;
            this.visitaAgendaModal.grid.forEach((grd: Grid) => {
                this.visitaAgendaModal.pesquisaVisitaAgenda_Option.add(grd.header, null, index, (index == 0), true);
                index++;
            })                
        }

        this.visitaAgendaModal.filterTextSubject
            .pipe(
                delay(0)
            )
            .subscribe((filter: FilterModal) => {
                if(filter?.filterType && filter.filterValue.length > 0) {

                    if(filter.filterType != this.visitaAgendaModal.pesquisaVisitaAgenda_Option.itemSelected.text) {
                        this.visitaAgendaModal.pesquisaVisitaAgenda_Option.selectbyText(filter.filterType);
                    }

                    const date: Date = new Date();

                    let dataInicioDia: string;
                    let dataFinalDia: string;
              
                    if(filter.filterType == "Validade Agendamento" || filter.filterType == "Cadastro Agendamento") {
                      dataInicioDia = this.dateOperator.formatDate(filter.filterValue).dateFormated + " 00:00:00 -00:00";
                      dataFinalDia = this.dateOperator.formatDate(filter.filterValue).dateFormated + " 23:59:59 -00:00";  
                    }
              
                    this.visitaAgendaModal.pesquisaVisitaAgenda_Option.selectbyValue(filter.filterType);
                    this.visitaAgendaModal.pesquisaVisitaAgenda_Option.text = filter.filterValue;
        
                    switch (filter.filterType) {
                        case "Nome":
                            this.filter = {pessoaNome: {contains: filter.filterValue}};
                            break;

                        case "CPF":
                            this.filter = {pessoaCPF: {eq: filter.filterValue}};
                            break;

                        case "Documento":
                            this.filter = {pessoaDocNumero: {eq: filter.filterValue}};
                            break;
    
                        case "Validade Agendamento":
                            this.filter = {agendamentoValidadeFinal: {gt: dataInicioDia,
                                                                      lt: dataFinalDia}};
                            break;

                        case "Cadastro Agendamento":
                            this.filter = {agendamentoDataHora: {gt: dataInicioDia,
                                                                 lt: dataFinalDia}};
                            break;

                        case "Grupo":
                            this.filter = {pessoaGrupo: {contains: filter.filterValue}};
                            break;
    
                        case "Veículo Modelo":
                            this.filter = {veiculoModelo: {contains: filter.filterValue}};
                            break;

                        case "Veículo Placa":
                            this.filter = {veiculoIdentificacao: {eq: filter.filterValue}};
                            break;

                        case "Veículo Cor":
                            this.filter = {veiculoCor: {eq: filter.filterValue}};
                            break;

                        case "Motivo do Acesso":
                            this.filter = {motivo: {contains: filter.filterValue}};
                            break;

                        case "Nome do Visitado":
                            this.filter = {visitadoNome: {contains: filter.filterValue}};
                            break;

                        case "Empresa Visitado":
                            this.filter = {visitadoUnidadeNome: {eq: filter.filterValue}};
                            break;

                        case "Localização Visitado":
                            this.filter = {visitadoLocalizacao: {eq: filter.filterValue}};
                            break;

                        case "Central Visitado":
                            this.filter = {visitadoComplemento: {eq: filter.filterValue}};
                            break;

                        case "Observacao":
                            this.filter = {observacao: {contains: filter.filterValue}};
                            break;
                    }
                    this.visitaAgendaModal.pesquisaVisitaAgenda_Option.focus();
                    this.filter = {...this.filter, ... this.Diafilter, ... {siteId: {eq: this.siteId}}};
                    if(filter.filterValue.length > 0) this.update_Grid();
                } else {
                    this.visitaAgendaModal.pesquisaVisitaAgenda_Option.select(0);
                    this.visitaAgendaModal.pesquisaVisitaAgenda_Option.itemSelected.value = "";
                    this.visitaAgendaModal.pesquisaVisitaAgenda_Option.focus();
                }
            });
    }

    onFind_Click(filterSelect: Item) {
        if(filterSelect.value || filterSelect.value == "") {
            this.visitaAgendaModal.setFilter(filterSelect.text, filterSelect.value);
        } else {
            this.visitaAgendaModal.pesquisaVisitaAgenda_Option.text = "";
            this.listView_visitaAgenda.clear();
        }
    }

    onlistviewPessoa_Change(rowSelect: any) {
        if(rowSelect.registro) {
            this.visitaAgenda = rowSelect.registro;
            this.pessoaImagem = this.config.converteImagemBase64(this.visitaAgenda.pessoaExterna?.imagem?.imagem);
        } else {
            this.visitaAgenda = null;
        }
    }

    update_Grid() {
        this.listView_visitaAgenda.processingShow();
        this.controleVisitaAgendaService.readControleVisitaAgenda(this.order_by, this.filter, this.first)
          .subscribe(({ controleVisitaAgenda }: read_ControleVisitaAgenda) => {
            this.listView_visitaAgenda.gridUpdate(controleVisitaAgenda.nodes);
        });
    }

    onClose_Click(cancel: boolean = false) {
        if(!cancel) this.eventSelect.emit(this.visitaAgenda);
        this.visitaAgendaModal.hide();
        this.visitaAgendaModal.pesquisaVisitaAgenda_Option.text = "";
        this.pessoaImagem = null;
        this.visitaAgenda = null;
        this.filtraDia_Option.check(1);
        this.filtraDiaOption_Change(this.filtraDia_Option.getItem("agendaDia"));
        this.listView_visitaAgenda.clear();
    }

    ngOnDestroy() {
        this.visitaAgendaModal?.filterTextSubject.unsubscribe();
    }

    filtraDiaOption_Change(optionSelected: Options) {
        if(optionSelected.checked == true) {
            this.Diafilter = {agendamentoValidadeInicial: {gt: this.dataInicioDia, 
                                                           lt: this.dataFinalDia}};
        } else {
            this.Diafilter = null;
        }

        this.onFind_Click(this.visitaAgendaModal.pesquisaVisitaAgenda_Option.itemSelected);
    }

}