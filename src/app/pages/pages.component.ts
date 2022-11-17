import { AfterViewInit, Component } from '@angular/core';
import { DateOperator } from '../@theme/components/miscellaneous/date-operator/date-operator';
import { TempoExpiradoModalService } from '../@theme/modals/tempo-expirado/service/tempo-expirado.service';

@Component({
    selector: 'nex-pages',    
    styleUrls: ['./pages.component.scss'],
    host: {'(window:resize)': 'onResize($event)'},
    template: `
        <nb-layout>
            <nb-layout-column>
                <ngx-loading-bar style="top: -2px" color="#7896d2" height="3px"></ngx-loading-bar>
                <nex-header class="noselect" [params]="aplicativo"></nex-header>
                <nex-divider></nex-divider>
                <div id="classModal" class="lockModal"></div>
                <div class="row mainPanel">
                    <nex-menu class="noselect" [orientacao]="'vertical'"></nex-menu>
                    <nex-treeview class="noselect"></nex-treeview>
                    <div id="mainPanelRouter" class="mainPanelRouter">
                        <router-outlet></router-outlet>
                    </div>
                    <nex-view class="noselect dashBoard"></nex-view>
                    <nex-shortcut class="noselect"></nex-shortcut>
                </div>    
                <nex-footer class="noselect"></nex-footer>
                <nex-version class="noselect"></nex-version>    
            </nb-layout-column>
        </nb-layout>
    `
})

export class PagesComponent implements AfterViewInit {

    aplicativo: {aplicativo: string, descricao: string, imagem: string}

    tempoExpiradoModalService: TempoExpiradoModalService = new TempoExpiradoModalService();

    constructor(private dateOperator: DateOperator) {
        this.aplicativo = {
            aplicativo: 'NEXCON',
            descricao: 'Plataforma Nexcode Controls',
            imagem: 'logo.png'
        }

        this.tempoExpiradoModalService.name = "tempExpiradoModal";
        // this.timer();
    }

    ngAfterViewInit(): void {
        this.onResize();
    }

    timer() {
        setTimeout(() => {
            const date: Date = new Date();
            const timeAtual: string = date.toTimeString().substr(0, 5);
      
            const dataAtual: string = this.dateOperator.formatDate(date.toLocaleDateString("pt-br")).dateFormated + " " + timeAtual;  
            this.tempoExpiradoModalService.setFilter(dataAtual);

            this.timer();
          }, 210000);  
    }


    actionModalSelect(event: any) {
        // Tratar Retorno Método...
    }

    onResize() {
        const modelo: HTMLElement = document.getElementById('mainPanelRouter');
        const classModal: HTMLElement = document.getElementById('classModal');

        classModal.style.height = modelo.clientHeight + 'px';
        classModal.style.width = modelo.clientWidth + 'px';
    }

}