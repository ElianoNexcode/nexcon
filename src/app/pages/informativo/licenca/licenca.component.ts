import { Component } from '@angular/core';
import { InformativoSistemaLicenca, InformativoSistemaLicencaData, read_InformativoSistemaLicenca } from 'src/app/@core/data/informativo-sistema-licenca';


@Component({
    selector: 'nex-licencas',
    templateUrl: 'licenca.component.html',
    styleUrls: ['licenca.component.scss']
})
export class LicencaInformativoComponent {

    plataforma: string;
    licenca: string;
    licenciado: string;
    programacao: string;
    controle: string;
    software: string;
    hardware: string;
    integracao: string;
    versao: string;
    registro: string;
    virtualizacao: string;
    atualizacao: string;
    observacao: string;


    constructor(private sistemaLicencaService: InformativoSistemaLicencaData) {

      this.sistemaLicencaService.readInformativoSistemaLicenca()
        .subscribe(({ sistemaLicenca }: read_InformativoSistemaLicenca) => {
            this.plataforma = sistemaLicenca.plataforma;
            this.licenca = sistemaLicenca.licenca;
            this.licenciado = sistemaLicenca.licenciado;
            this.programacao = sistemaLicenca.programacao;
            this.controle = sistemaLicenca.controle;
            this.software = 'NEXCON '+ '('+ sistemaLicenca.nexcon +') - ' +
                            'NEXNOTE '+ '('+ sistemaLicenca.nexnote +') - '+
                            'NEXCESS '+ '('+ sistemaLicenca.nexcess +') - '+
                            'NEXIUN '+ '('+ sistemaLicenca.nexiun +') - '+
                            'NEXVIEW '+ '('+ sistemaLicenca.nexview +') - '+
                            'NEXTOT '+ '('+ sistemaLicenca.nextot +')';
            this.hardware = 'NEXCODE ACCESS '+'('+ sistemaLicenca.nexcodeAccess +') - '+
                            'NEXCODE SURVEILLANCE '+'('+ sistemaLicenca.nexcodeSurveillance +')';
            this.integracao = 'NEXCODE INTEGRATION '+'('+ sistemaLicenca.nexcodeIntegration +') - ' +
                              'NEXCODE ELEVATOR '+'('+ sistemaLicenca.nexcodeElevator +')';
            this.versao = sistemaLicenca.versao;
            this.registro = sistemaLicenca.registro;
            this.virtualizacao = sistemaLicenca.virtualizacao;
            this.atualizacao = sistemaLicenca.atualizacao;
            this.observacao = sistemaLicenca.observacao;
        })

    }
}