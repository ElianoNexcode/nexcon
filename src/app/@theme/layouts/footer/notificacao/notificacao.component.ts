import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TempoExpiradoModalService } from 'src/app/@theme/modals/tempo-expirado/service/tempo-expirado.service';
import { IdentificacaoControleFilter } from 'src/app/@core/data/controle-identificacao';
import { DateOperator } from 'src/app/@theme/components/miscellaneous/date-operator/date-operator';

export interface Notificacao {
  id: String
  data: String
  imagem: String
  local: String
  ocorrencia: String
  cor: String
}

@Component({
  selector: 'nex-notificacao',
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.scss'],
  host: {'(window:resize)': 'onResize($event)'}
})

export class NotificacaoComponent implements OnInit {

  notificacoesGrupos: {"col": string, "notificacoes": Notificacao[]}[] = [];
  notificacoes: Notificacao[] = [];

  width:number = window.innerWidth;
  widthHD = 1366;

  constructor(private http: HttpClient) {
    this.getNotificacoes()
    .subscribe(result => {
        this.notificacoes = result;
        this.panelRefresh();
    })
  }

  getNotificacoes(): Observable<Notificacao[]> {
    return this.http.get<Notificacao[]>('assets/data/notificacao.json');
  }

  ngOnInit(): void { }

  onResize(event){
    this.width = event.target.innerWidth;
    this.panelRefresh()
  }

  panelRefresh() {
    let indiceGrupo: number = (this.width <= this.widthHD)? 4: 6;
    this.notificacoesGrupos = [];
    let notificacaoTemp = [];
    this.notificacoes.forEach((notificacao, index) => {
      notificacaoTemp.push(notificacao);
        if((index + 1)/indiceGrupo == Math.trunc((index + 1)/indiceGrupo)) {
            this.notificacoesGrupos.push({"col": (12/indiceGrupo).toString(), "notificacoes": notificacaoTemp});
            notificacaoTemp = [];
        };
    })

    if(this.notificacoes.length > 0) {
      this.notificacoesGrupos.push({"col": (12/indiceGrupo).toString(), "notificacoes": notificacaoTemp});
    }
  }
}
