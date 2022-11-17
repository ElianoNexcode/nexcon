import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AmbienteData, AmbienteSistema, read_AmbienteSistema } from './@core/data/sistema-ambiente';
import { ConfigStorage, PlataformaConfig, SistemaConfig } from './@core/storage/config/config';
import { Router } from '@angular/router';

import { Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.viewer.js';

@Component({
  selector: 'app-root',
  template: `<router-outlet><router-outlet>`
})
export class AppComponent {

  constructor(private translate: TranslateService,
              private ambienteService: AmbienteData,
              private configService: ConfigStorage,
              private router: Router) {

    Stimulsoft.Base.StiLicense.key = "6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHl/TjKQKW+LiKjdcLjZHz+Y3P0DMdYqwIp0UbDvkN0Y4HfmEM" + 
                                     "cHlZady5vsZ01Cvh8hhP1pmrUIWmmcNd6uE5O7N3ZzEF+bT1bgxqWh8Z5s9ZImtqwAJO5RvDqaGB0CK+L7+7aV7TM3" + 
                                     "2VMJK+KfcOkyOBmKgZIT9BWbflX3i9CXPGz9/19XZ81WRZ6yLbH7aXBrMEWuD3HHHlwFn5A8eSuI1/XisJDCCC6Wm2" + 
                                     "x7bRYBuspC2zP9ci4iQoOMs9ZQ/NTaXQ7S6A3EmH8SYv/YVWhjxrf7gNOquSb8AyWnCp9PbzlZMDQK/iODF9/21nT1" + 
                                     "XZc0IgRE6q+HhkqaFSCtpM8GCgakVLJ71RUKcDP5oEXu2F3T1ucBVLGvt57bgHz8o4KLHT1sFX976yD+PmC9/apvlO" + 
                                     "9tnraHmAvQ19Ab6ox24dcGRJ5HhIGswnc1BSChNfvuNH0NLh1hSeVSGKsjXhwvxLrSrXcm1TwPdEniLWybxJ8/Uv2H" + 
                                     "51C5HUzulUkx4zW0Yio4VI24xziwkzsWYRoz+vbL3pr9KUoXHn/TzVagUPbXdNjDacMomhEie2cawSuJ+1/tIzKI7j" + 
                                     "2W7cXiYqn7Uhgyjvptrfaa7a+CooUh0q3sHcV7FofuWUjnD3H0CSM=";

    Stimulsoft.Base.Localization.StiLocalization.addLocalizationFile("./assets/reports/localization/pt-BR.xml", false, "pt-BR");
    Stimulsoft.Base.Localization.StiLocalization.cultureName = "pt-BR";

    this.translate.addLangs(['pt-br']);
    this.translate.setDefaultLang('pt-br');

    const imgPath = "./assets/images/logoApp.png";
    this.imgFileLoad(imgPath)        

    setTimeout(() => {
      this.router.navigateByUrl('./', {skipLocationChange: true})
        .then(()=> this.router.navigate(["./"]));

      this.ambienteService.readAmbienteSistema()
      .subscribe({
        next: ({sistemaConfiguracao}: read_AmbienteSistema) => {
          const node: AmbienteSistema = sistemaConfiguracao.nodes[0];
          const sistema: SistemaConfig = {
            id: node.id,
            softwareLicenca: node.softwareLicenca,
            softwareLicencaNumero: node.softwareLicencaNumero,
            softwareLicencaRegistro: node.softwareLicencaRegistro,
            softwareLicencaVersao: node.softwareLicencaVersao,
            softwareLicencaEdicao: node.softwareLicencaEdicao,
            softwareLicencaVolume: node.softwareLicencaVolume,
            softwareLicencaRelease: node.softwareLicencaRelease,
            solucaoEspecifica: node.solucaoEspecifica,
            solucaoIntegrada: node.solucaoIntegrada,
            loginSenhaCaracter: node.loginSenhaCaracter,
            loginSenhaDigitos: node.loginSenhaDigitos,
            loginSenhaRenovacao: node.loginSenhaRenovacao,
            loginSenhaExpiracao: node.loginSenhaExpiracao,
            loginDigitos: node.loginDigitos
          };
          
          const plataforma: PlataformaConfig = {
            logo: this.configService.converteImagemBase64(node.interfaceImagem || null)
          }

          this.configService.setConfig(sistema, "sistema");
          this.configService.setConfig(plataforma, "plataforma");
        },
        error: (error: any) => {
          console.log("%cFalha na obtenção dos dados de configuração", "color: orangered");
          console.log("%c   Log do erro:", "color: yellow");
          console.log("%c   " + error, "color: cyan");
        }
      })
    }, 700);
  }

  imgFileLoad(path: string) {
    this.convertDataUrl(path)
        .then((img: any) => {
            sessionStorage.setItem("logoApp", img);
        })
  }

  convertDataUrl(url: string) {
    return new Promise ((resolve) => {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            var reader = new FileReader();
            reader.onloadend = function() {
                resolve(reader.result);
            }
            reader.readAsDataURL(xhr.response);            
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    });
  }

}
