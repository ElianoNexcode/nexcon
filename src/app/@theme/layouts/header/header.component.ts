import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { GenericGraphQL } from 'src/app/@core/api/generic-graphql';
import { ConfigStorage, PlataformaConfig } from 'src/app/@core/storage/config/config';

interface Param {
  aplicativo: string;
  descricao: string;
  imagem: string;
}

const theme: Array<string> = ['dark', 'default']

@Component({
  selector: 'nex-header',
  template: `<div class="row topPanel" *ngIf="params">    
                <div class="col aplicativo"><p class="">{{params.aplicativo}}</p></div>
                <div class="col descricao"><img [src]="image" alt="" *ngIf="image"></div> 
                <nex-login *ngIf="!login"></nex-login>
                <div id="btLogOut" class="col btt-icon" *ngIf="!login">
                    <img src="./assets/icons/onoff.svg"
                         (click)="onLogOff_Click()"
                         style="width: 1rem;height: auto;" />                
                </div>
             </div>`,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() params: Param;
  @Input() login: boolean = false;

  showTheme: number = 0;
  image: string;
  settings: Subscription;

  constructor(
    private themeService: NbThemeService,
    private config: ConfigStorage,
    private genericGraphQl: GenericGraphQL) { }

  ngOnInit(): void {
    this.settings = this.config.plataformaSubject()
      .subscribe((data: PlataformaConfig) => {
        if (data != null && data?.logo) {
          this.image = data.logo
        }
      });
  }

  onLogOff_Click() {
    window.sessionStorage.removeItem("recepcao");
    window.sessionStorage.removeItem("token");
    this.genericGraphQl.token_update("");
    window.location.reload();
  }

  onChangeTheme() {
    this.showTheme = (this.showTheme < theme.length - 1) ? this.showTheme + 1 : 0;
    this.themeService.changeTheme(theme[this.showTheme]);
  }

  ngOnDestroy(): void {
    this.settings.unsubscribe();
  }

}
