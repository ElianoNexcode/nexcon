import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InformativoSistemaLicencaData, read_InformativoSistemaLicenca } from 'src/app/@core/data/informativo-sistema-licenca';
import { ConfigStorage, SistemaConfig, Versao } from 'src/app/@core/storage/config/config';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';

@Component({
    selector: 'nex-sistema-informativo',
    templateUrl: './sistema-informativo.component.html',
    styleUrls: ['./sistema-informativo.component.scss']
})
export class SistemaInformativoComponent implements OnInit {

    dataHora: string;
    config: BehaviorSubject<SistemaConfig>;
  
    software: string;
    licenca: string;
    licenciado: string;
  
    constructor(private actionbuttomService: ActionButtomService,
                private sistemaLicencaService: InformativoSistemaLicencaData,
                private configService: ConfigStorage) {

      this.actionbuttomService.top_action_buttons = [];               
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
        document.getElementById("inf_1599").classList.add("active");        
    }
    
    ngOnDestroy() {
      this.config.unsubscribe();
    }

}