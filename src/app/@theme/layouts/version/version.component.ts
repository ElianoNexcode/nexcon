import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { InformativoSistemaLicencaData, read_InformativoSistemaLicenca } from 'src/app/@core/data/informativo-sistema-licenca';
import { ConfigStorage, SistemaConfig, Versao } from 'src/app/@core/storage/config/config';

@Component({
  selector: 'nex-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss']
})
export class VersionComponent implements OnInit, OnDestroy {

  dataHora: string;
  config: BehaviorSubject<SistemaConfig>;

  software: string;
  licenca: string;

  constructor(private configService: ConfigStorage,
              private sistemaLicencaService: InformativoSistemaLicencaData,) {
                
    // this.config = this.configService.sistemaSubject();
    // this.config
    //   .subscribe((sistema: SistemaConfig) => {
    //     if(sistema) {
    //       this.software = "NEXCON " + Versao[sistema.softwareLicencaVersao] + " 20" + 
    //           sistema.softwareLicencaEdicao + "." + 
    //           sistema.softwareLicencaVolume + "." + 
    //           sistema.softwareLicencaRelease;
    //     }
    //   })


      this.sistemaLicencaService.readInformativoSistemaLicenca()
        .subscribe(({ sistemaLicenca }: read_InformativoSistemaLicenca) => {
          this.licenca = sistemaLicenca.licenca;
          this.software = sistemaLicenca.plataforma +' ('+ sistemaLicenca.versao +')';
        })



  }

  ngOnInit(): void {
    this.setDataHora();
  }

  setDataHora() {
    let now: Date = new Date();
    const dayName = new Array ("Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado");
    const monName = new Array ("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");

    const data: string = dayName[now.getDay()] + ", " + 
                                  now.getDate() + " de " + 
                          monName[now.getMonth()] + " de " +
                                  now.getFullYear();

    const hora: string = ("00" + now.getHours()).slice(-2) + ":" + 
                         ("00" + now.getMinutes()).slice(-2);
    this.dataHora = data + " - " + hora;

    setTimeout(() => {
      this.setDataHora();
    }, 15000);
  }

  ngOnDestroy() {
    this.config?.unsubscribe();
  }
  
}
