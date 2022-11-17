import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NbSpinnerModule, NbSpinnerComponent } from '@nebular/theme'
import { NbAccordionModule, NbAccordionComponent } from '@nebular/theme';

import { NgxMaskModule, IConfig } from 'ngx-mask';

import {
    BoxComponent,
    BoxPanel,
    CardTabsComponent,
    DividerComponent,
    HeaderComponent,
    ImageComponent,
    MenuComponent,
    ShortcutComponent,
    TreeviewComponent,
    VersionComponent,
    ViewComponent,
    TabsCardComponent,
    TabComponent,
} from './layouts';

import {
    ActionButtomComponent,
    AlertCardComponent,
    CardQuestionComponent,
    DynamicAttrsDirective,
    InfoCardComponent,
    InputLabelComponent,
    InputMultiLabelComponent,
    FormGroupComponent,
    ListViewComponent,
    PagingComponent,
    RadioComponent,
    SelectGroupComponent,
    UpperCaseInputDirective,    
    TextareaLabelComponent,
    TextareaLabelService,
    ComboboxComponent,
    AvatarComponent,
    MiniButtonComponent,  
} from './components';

import { 
    VeiculoInternoModalComponent,
    VeiculoExternoModalComponent,
    PessoaInternaModalComponent,
    PessoaExternaModalComponent,
    ObservacaoModalComponent,
    ErrosModalComponent,
    CaptureModalComponent,
    AgendamentoModalComponent,
    AbordagemModalComponent,
    TempoExpiradoModalComponent,
    IdentificacaoConsecutivaModalComponent,
    IdentificacaoComplementoPessoaModalComponent,
    IdentificacaoComplementoVeiculoModalComponent,
    IdentificacaoControleAcessoModalComponent,
    CamerasModalComponent,
    SenhaModalComponent,
    EdModalComponent,
    LeitorModalComponent,
    SelecaoBloqueioModalComponent,
    SelecaoBloqueioControladoraModalComponent,
    SelecaoElevadorModalComponent,
    SelecaoFaixaHorariaModalComponent,
    EstacaoCameraModalComponent,
    EstacaoImpressoraModalComponent,
    EmpresaModalComponent,
    NivelAcessoModalComponent,    
    ModalComponent,
    SelecaoElevadorControladoraModalComponent,
    SelecaoTerminalControladoraModalComponent,
    AreaInterligacaoModalComponent,
    AreaControleVisitaModalComponent,
    AreaAcessoModalComponent,
    RecepcaoEstacionamentoModalComponent,
    RecepcaoNivelAcessoModalComponent,
    UsuarioNivelAcessoModalComponent,
    RegistroMaterialModalComponent
} from './modals';

import {
  FooterModule
} from './layouts/footer/footer.module';
import { LibraryModule } from '../@lib/library.module';

const NB_MODULES = [
  FormsModule,
  FooterModule,
  ReactiveFormsModule,
  MatCheckboxModule,
  NgxMaskModule.forRoot(),
];
const COMPONENTS = [
  ActionButtomComponent,
  AlertCardComponent,
  AvatarComponent,
  BoxComponent,
  CardQuestionComponent,
  CardTabsComponent,
  DividerComponent,
  HeaderComponent,
  ImageComponent,
  InfoCardComponent,
  InputLabelComponent,
  InputMultiLabelComponent,
  FormGroupComponent,
  ListViewComponent,
  PagingComponent,
  VeiculoInternoModalComponent,
  VeiculoExternoModalComponent,
  PessoaInternaModalComponent,
  PessoaExternaModalComponent,
  EmpresaModalComponent,
  NivelAcessoModalComponent,
  ObservacaoModalComponent,
  ErrosModalComponent,
  CaptureModalComponent,
  AgendamentoModalComponent,
  AbordagemModalComponent,
  TempoExpiradoModalComponent,
  IdentificacaoConsecutivaModalComponent,
  IdentificacaoComplementoPessoaModalComponent,
  IdentificacaoComplementoVeiculoModalComponent,
  IdentificacaoControleAcessoModalComponent,
  CamerasModalComponent,
  SenhaModalComponent,
  EdModalComponent,
  LeitorModalComponent,
  SelecaoBloqueioModalComponent,
  SelecaoBloqueioControladoraModalComponent,
  SelecaoElevadorControladoraModalComponent,
  SelecaoTerminalControladoraModalComponent,
  SelecaoElevadorModalComponent,
  SelecaoFaixaHorariaModalComponent,
  AreaInterligacaoModalComponent,
  AreaControleVisitaModalComponent,
  AreaAcessoModalComponent,
  RecepcaoEstacionamentoModalComponent,
  RecepcaoNivelAcessoModalComponent,
  UsuarioNivelAcessoModalComponent,
  EstacaoCameraModalComponent,
  EstacaoImpressoraModalComponent,
  ModalComponent,
  MenuComponent,
  MiniButtonComponent,
  SelectGroupComponent,
  ComboboxComponent,
  RadioComponent,
  ShortcutComponent,
  TreeviewComponent,
  TabsCardComponent,
  TabComponent,
  VersionComponent, 
  ViewComponent,
  TextareaLabelComponent,
  RegistroMaterialModalComponent
];
const SERVICES = [
  BoxPanel,
  TextareaLabelService,
]
const DIRECTIVES = [
  DynamicAttrsDirective,
  UpperCaseInputDirective,
];

@NgModule({
  imports: [ CommonModule,
             RouterModule,
             TranslateModule,
             NbSpinnerModule,
             NbAccordionModule,
             LibraryModule,
             ...NB_MODULES],
  exports: [CommonModule, FooterModule, RouterModule, TranslateModule, ...DIRECTIVES, ...COMPONENTS],
  declarations: [ ...DIRECTIVES, ...COMPONENTS],
  providers: [NbSpinnerComponent, NbAccordionComponent, ... SERVICES]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [],
    };
  }
}
