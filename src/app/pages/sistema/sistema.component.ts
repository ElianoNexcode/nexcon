import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InformativoSistemaLicencaData, read_InformativoSistemaLicenca } from 'src/app/@core/data/informativo-sistema-licenca';
import { ConfigStorage, SistemaConfig, Versao } from 'src/app/@core/storage/config/config';
import { ListViewGrid } from 'src/app/@theme/components';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';

@Component({
    selector: 'nex-sistema',
    templateUrl: './sistema.component.html',
    styleUrls: ['./sistema.component.scss']
})
export class SistemaComponent implements OnInit {

    dataHora: string;
    config: BehaviorSubject<SistemaConfig>;
    listView: ListViewGrid = new ListViewGrid();
  
    software: string;
    licenca: string;
    licenciado: string;
 
    constructor(private actionbuttomService: ActionButtomService,
                private sistemaLicencaService: InformativoSistemaLicencaData,
                private configService: ConfigStorage) {

      this.actionbuttomService.top_action_buttons = [];  
      this.listView.title = "SISTEMA";

      this.config = this.configService.sistemaSubject();
  
      // this.config
      //   .subscribe((sistema: SistemaConfig) => {
      //     this.software = "NEXCON " + Versao[sistema.softwareLicencaVersao] + " - EDIÇAO 20" + 
      //                                         sistema.softwareLicencaEdicao + " - VOLUME " + 
      //                                         sistema.softwareLicencaVolume + " - RELEASE " + 
      //                                         sistema.softwareLicencaRelease;
      //   })

        this.sistemaLicencaService.readInformativoSistemaLicenca()
        .subscribe(({ sistemaLicenca }: read_InformativoSistemaLicenca) => {
            this.licenca = sistemaLicenca.licenca;
            this.licenciado = sistemaLicenca.licenciado;
            this.software = sistemaLicenca.plataforma + ' ('+ sistemaLicenca.versao +')';
          })
    }
  
    ngOnInit(): void {
        
    }
    
    ngOnDestroy() {
      this.config.unsubscribe();
    }

}