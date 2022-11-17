import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { TempoExpiradoModalService } from './service/tempo-expirado.service';
import { ListViewGrid } from '../../components';
import { delay } from 'rxjs/operators';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { ConfigStorage } from 'src/app/@core/storage/config/config';
import { cancel_IdentificacaoControle, end_IdentificacaoControle, IdentificacaoControle, IdentificacaoControleData, IdentificacaoControleFilter, IdentificacaoControleSort, read_IdentificacaoControle } from 'src/app/@core/data/controle-identificacao';
import { AlertServiceComponent } from '../../components/form/alert-card/service/alert-card.service';

@Component({
    selector: 'nex-tempo-expirado-modal',
    templateUrl: './tempo-expirado.component.html',
    styleUrls: ['./tempo-expirado.component.scss']
})
export class TempoExpiradoModalComponent implements OnInit, OnDestroy {
    
    @Input() tempoExpiradoModal: TempoExpiradoModalService;
    @Input() filter: IdentificacaoControleFilter;

    @Input() title: string;

    @Output() eventSelect: EventEmitter<any> = new EventEmitter(null);
    
    listView_identificacao: ListViewGrid = new ListViewGrid();

    order_by: IdentificacaoControleSort = {id: SortOperationKind.DESC};
    first: number = 360;

    identificacao: IdentificacaoControle;
    pessoaImagem: string;

    alertService: AlertServiceComponent = new AlertServiceComponent();

    constructor(private identificacaoControleService: IdentificacaoControleData,
                                      private config: ConfigStorage ) {

        this.listView_identificacao.name = "lstIdentificacaoModal";
        this.listView_identificacao.grid = [{"header": "Nome", "field": "pessoaNome", "width": 35, "align": "left"},
                                            {"header": "Grupo", "field": "pessoaGrupo", "width": 15, "align": "left"},
                                            {"header": "Empresa", "field": "pessoaReparticao", "width": 25, "align": "left"},
                                            {"header": "Identificação", "field": "identificacaoDataHora", "width": 25, "align": "left", "pipe": "dd/MM/yyyy HH:mm"},
                                            {"header": "Visitado", "field": "visitadoNome", "width": 30, "align": "left"},
                                            {"header": "Motivo", "field": "motivo", "width": 25, "align": "left"}];

        this.listView_identificacao.gridOnly = true;
        this.listView_identificacao.noPaging = true;   
        this.listView_identificacao.noBorder = true;
    }

    ngOnInit() {

        this.tempoExpiradoModal.filterTextSubject
            .pipe(
                delay(0)
            )
            .subscribe((dataAtual: string) => {
                if(dataAtual) {
                    this.filter = {identificacaoValidadeInicial: {lt: dataAtual + " -00:00"}};
                    this.update_Grid();
                }
            });
    }

    onlistviewPessoa_Change(rowSelect: any) {
        if(rowSelect.registro) {
            this.identificacao = rowSelect.registro;
            this.pessoaImagem = this.config.converteImagemBase64(this.identificacao.pessoaExterna?.imagem?.imagem);
        } else {
            this.identificacao = null;
        }
    }

    update_Grid(showModal: Boolean = true) {
        this.listView_identificacao.processingShow();
        this.identificacaoControleService.readIdentificacaoControles(this.order_by, this.filter, this.first)
          .subscribe(({ controleIdentificacao }: read_IdentificacaoControle) => {
            if(controleIdentificacao.totalCount > 0 ) {
                this.listView_identificacao.gridUpdate(controleIdentificacao.nodes);
                if(showModal) this.tempoExpiradoModal.show();
            } else {
                if(!showModal) this.tempoExpiradoModal.hide();
            }
        });
    }

    onEncerrar_Click() {
        this.identificacaoControleService.endIdentificacaoControle(this.identificacao.id, 0, "NEXCODE", this.identificacao.identificacaoRecepcao, "")
            .subscribe(({ data }: end_IdentificacaoControle)  => {
                if(data.controleIdentificacao_Encerrar.sucesso != true) {
                    this.alertService.show(data.controleIdentificacao_Encerrar.mensagemTipo,
                                           data.controleIdentificacao_Encerrar.mensagem,
                                           null);
                } else {
                    this.update_Grid(false);
                }
            });        
  
    }

    onCancelar_Click() {
        this.identificacaoControleService.cancelIdentificacaoControle(this.identificacao.id, 0, "NEXCODE", this.identificacao.identificacaoRecepcao, "")
            .subscribe(({ data }: cancel_IdentificacaoControle)  => {
                if(data.controleIdentificacao_Cancelar.sucesso !== true) {
                    this.alertService.show(data.controleIdentificacao_Cancelar.mensagemTipo,
                                           data.controleIdentificacao_Cancelar.mensagem,
                                           null);
                } else {
                    this.update_Grid(false);
                }
            });  
    }

    onClose_Click() {
        this.eventSelect.emit(null);
        this.tempoExpiradoModal.hide();
    }

    ngOnDestroy() {
        this.tempoExpiradoModal?.filterTextSubject.unsubscribe();
    }

}