import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListViewGrid, Find, Filter, rowSelect } from 'src/app/@theme/components';
import { ActionButtomService } from 'src/app/@theme/components/grid/action-buttom/service/action-button.service';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { ComboOptions } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { RadioOptions } from 'src/app/@theme/components/form/radio/service/radio.service';
import { AlertServiceComponent } from 'src/app/@theme/components/form/alert-card/service/alert-card.service';
import {
    read_AmbienteSistema,
    Ambiente,
    update_AmbienteInterface,
    update_AmbienteIntegracao,
    update_AmbienteLogin,
    update_AmbienteComplemento,
    AmbienteData,
    AmbienteSistema,
    update_AmbienteImagem,
    update_AmbienteIdentificador
} from 'src/app/@core/data/sistema-ambiente';
import { OptionsGroup } from 'src/app/@theme/components/form/select-group/service/select-group.service';
import { ConfigStorage, PlataformaConfig } from 'src/app/@core/storage/config/config';
import { BoxPanel } from 'src/app/@theme/layouts';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

enum Modulos {
    "interface" = 0,
    "login" = 1,
    "imagem" = 2,
    "identificador" = 3,
    "camposComplemento" = 4,
    "integracaoCustomizacao" = 5,
}
@Component({
    selector: 'nex-ambinte',
    templateUrl: './ambiente.component.html',
    styleUrls: ['./ambiente.component.scss']
})
export class AmbienteComponent implements OnInit, OnDestroy {

    id: number = 0;
    alias: string = "";
    interfacePadrao_Option: ComboOptions = new ComboOptions();
    interfaceConfiguracao_Options: RadioOptions = new RadioOptions();
    interfaceImagem: string;
    loginDigitos_Option: ComboOptions = new ComboOptions();
    loginSenhaDigitos_Option: ComboOptions = new ComboOptions();
    loginSenhaCaracter_Options: OptionsGroup = new OptionsGroup();
    loginSenhaRenovacao_Text: InputLabel = new InputLabel();
    loginSenhaExpiracao_Text: InputLabel = new InputLabel();
    imagemDefinicao_Option: OptionsGroup = new OptionsGroup();
    biometriaFacial_Option: ComboOptions = new ComboOptions();
    biometricaDigital_Option: ComboOptions = new ComboOptions();
    qrCodeFormato_Option: ComboOptions = new ComboOptions();
    qrcodeDistincao_Option: ComboOptions = new ComboOptions;
    acessoSenhaControle_Option: ComboOptions = new ComboOptions();
    acessoSenhaFormato_Option: ComboOptions = new ComboOptions();
    acessoPanicoControle_Options: OptionsGroup = new OptionsGroup();
    diretorio_Text: InputLabel = new InputLabel();
    pessoaComplemento1_Text: InputLabel = new InputLabel();
    pessoaComplemento2_Text: InputLabel = new InputLabel();
    pessoaComplemento3_Text: InputLabel = new InputLabel();
    pessoaComplemento4_Text: InputLabel = new InputLabel();
    solucaoIntegrada_Option: ComboOptions = new ComboOptions();
    solucaoEspecifica_Text: InputLabel = new InputLabel();
    showSpinner: boolean = false;
    listView_Ambiente: ListViewGrid = new ListViewGrid()
    savedCondition: boolean = false;
    plataforma: PlataformaConfig;
    boxButton: BoxPanel = new BoxPanel();
    alertService: AlertServiceComponent = new AlertServiceComponent();

    constructor(public actionbuttomService: ActionButtomService,
        private ambienteService: AmbienteData,
        private configService: ConfigStorage,
        private router: Router) {

        this.boxButton.add("btOpen", "open", false);
        this.boxButton.add("btClear", "clear", false);

        this.actionbuttomService.relationGrid = "lstAmbiente";

        this.actionbuttomService.recurso = "";
        this.actionbuttomService.top_action_buttons = [
            { "id": 0, "text": "forms.buttons.update", "enabled": false, "condition": "select", "openForm": true, "editable": "yes", },
            { "id": 1, "text": "forms.buttons.read", "enabled": false, "condition": "select", "openForm": true, "editable": "no" }
        ]

        this.listView_Ambiente.name = "lstAmbiente";
        this.listView_Ambiente.title = "Configuração do Ambiente";
        this.listView_Ambiente.grid = [
            { header: "Parte", field: "parte", "width": 27, align: "left", },
            { header: "Descrição", field: "descricao", "width": 73, align: "left" }
        ]

        this.interfacePadrao_Option.name = "cbInterfacePadrao";
        this.interfacePadrao_Option.add("ESCURA", "escura", 0);
        this.interfacePadrao_Option.add("CLARA", "clara", 1, false, true);

        this.interfaceConfiguracao_Options.add(0, 'Única', "unica", true);
        this.interfaceConfiguracao_Options.add(1, 'Por Operador', "porOperador");

        this.interfaceImagem = null;

        const minimoDigito_Inicial = 6;
        const minimoDigito_Final = 20;

        this.loginDigitos_Option.name = "cbLoginDigitos";
        for (let i: number = minimoDigito_Inicial; i <= minimoDigito_Final; i++) {
            this.loginDigitos_Option.add(("00" + i).slice(-2), null, i);
        }

        this.loginSenhaDigitos_Option.name = "cbLoginSenhaDigitos";
        for (let i: number = minimoDigito_Inicial; i <= minimoDigito_Final; i++) {
            this.loginSenhaDigitos_Option.add(("00" + i).slice(-2), null, i);
        }

        this.loginSenhaCaracter_Options.add(0, "Numérico", null, true);
        this.loginSenhaCaracter_Options.add(1, "Especial", null);

        this.loginSenhaRenovacao_Text.name = "txtLoginSenhaRenovacao";
        this.loginSenhaRenovacao_Text.rules = "onlynumbers";
        this.loginSenhaRenovacao_Text.textAlign = "center";
        this.loginSenhaRenovacao_Text.maxLength = 3;
        this.loginSenhaRenovacao_Text.minLength = 1;

        this.loginSenhaExpiracao_Text.name = "txtLoginSenhaExpiracao";
        this.loginSenhaExpiracao_Text.rules = "onlynumbers";
        this.loginSenhaExpiracao_Text.textAlign = "center";
        this.loginSenhaExpiracao_Text.maxLength = 3;
        this.loginSenhaExpiracao_Text.minLength = 1;

        this.imagemDefinicao_Option.columns = 2;
        this.imagemDefinicao_Option.add(0, "Pessoa Externa", "pessoaExterna", false, false, false,1,1);
        this.imagemDefinicao_Option.add(1, "Veículo Externo", "veiculoExterna", false, false, false,1,2);

        this.biometriaFacial_Option.name = "cbfacialOption";
        this.biometriaFacial_Option.add("", "", 0, true);
        this.biometriaFacial_Option.add("PESSOA INTERNA", "pessoaInterna", 1, false);
        this.biometriaFacial_Option.add("PESSOA EXTERNA", "pessoaexterna", 2, false);
        this.biometriaFacial_Option.add("PESSOA INTERNA E EXTERNA", "pessoaInternaEExterna", 3, false);

        this.biometricaDigital_Option.name = "cbfacialOption";
        this.biometricaDigital_Option.add("", "", 0, true);
        this.biometricaDigital_Option.add("CONTROL ID", "controlId", 1, false);
        this.biometricaDigital_Option.add("NITGEN", "nitgen", 2, false);

        this.qrCodeFormato_Option.name = "cbqrcode";
        this.qrCodeFormato_Option.add("", "", 0, true);
        this.qrCodeFormato_Option.add("NEXCODE C", "nexcodec", 1, false);
        this.qrCodeFormato_Option.add("NEXCODE D", "nexcoded", 2, false);
        this.qrCodeFormato_Option.add("WIEGAND 34", "wiegand34", 3, false);
        this.qrCodeFormato_Option.add("WIEGAND 32", "wiegand32", 4, false);
        this.qrCodeFormato_Option.add("WIEGAND 26", "wiegand26", 5, false);
        this.qrcodeDistincao_Option.name = "cbqrcodenumero";

        for (let i: number = 101; i <= 255; i++) {
            const idQrCode: string = i.toString();
            this.qrcodeDistincao_Option.add(idQrCode, idQrCode, i, false);
        }

        this.acessoSenhaControle_Option.name = "cbsenha";
        this.acessoSenhaControle_Option.add("IDENTIFICAÇÃO", "identifcacao", 1, true);
        this.acessoSenhaControle_Option.add("VERIFICAÇÃO", "verificacao", 2, false);

        this.acessoSenhaFormato_Option.name = "cbsenhanumero"
        this.acessoSenhaFormato_Option.add("4", "4", 4, false);
        this.acessoSenhaFormato_Option.add("5", "5", 5, false);
        this.acessoSenhaFormato_Option.add("6", "6", 6, true);

        this.acessoPanicoControle_Options.add(1, "Ativar", "ativar");

        this.diretorio_Text.name = "txtImagem";
        this.diretorio_Text.rules = "uppercase";
        this.diretorio_Text.maxLength = 100;
        this.diretorio_Text.minLength = 1;

        this.pessoaComplemento1_Text.name = "pessoaComplemento1";
        this.pessoaComplemento1_Text.maxLength = 15;
        this.pessoaComplemento1_Text.minLength = 0;

        this.pessoaComplemento2_Text.name = "pessoaComplemento2";
        this.pessoaComplemento2_Text.maxLength = 15;
        this.pessoaComplemento2_Text.minLength = 0;

        this.pessoaComplemento3_Text.name = "pessoaComplemento3";
        this.pessoaComplemento3_Text.maxLength = 15;
        this.pessoaComplemento3_Text.minLength = 0;

        this.pessoaComplemento4_Text.name = "pessoaComplemento4";
        this.pessoaComplemento4_Text.maxLength = 15;
        this.pessoaComplemento4_Text.minLength = 0;

        this.solucaoIntegrada_Option.name = "cbSolucaoIntegrada";
        this.solucaoIntegrada_Option.add("", null, 0);
        this.solucaoIntegrada_Option.add("CONTINUUM", null, 1);
        this.solucaoIntegrada_Option.add("SECURITY EXPERT", null, 2, false);
        this.solucaoIntegrada_Option.add("TASY", null, 3, false);
        this.solucaoIntegrada_Option.add("MV", null, 4, false);
        this.solucaoIntegrada_Option.add("BDCC", null, 5, false);

        this.solucaoEspecifica_Text.name = "txtSolucaoEspecifica";
        this.solucaoEspecifica_Text.rules = "uppercase";
        this.solucaoEspecifica_Text.maxLength = 15;
        this.solucaoEspecifica_Text.minLength = 1;

        this.update_Grid();

    }

    ngOnInit() {
        this.router.events
            .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd))
            .subscribe(() => {
                this.update_Grid();
            });
    }

    onActionButtom_Click(actionButtomSelect: any) {
        this.savedCondition = false;

        switch (actionButtomSelect.text) {
            case "forms.buttons.update":
                this.updateDataLoad();
                switch (this.id) {
                    case Modulos.interface:
                        this.interfacePadrao_Option.focus();
                        break;

                    case Modulos.login:
                        this.loginDigitos_Option.focus();
                        break;

                    case Modulos.camposComplemento:
                        this.pessoaComplemento1_Text.focus(true);
                        break;

                    case Modulos.integracaoCustomizacao:
                        this.solucaoIntegrada_Option.focus();
                        break;

                    case Modulos.imagem:
                        this.diretorio_Text.focus();
                        break;

                    case Modulos.identificador:
                        this.biometriaFacial_Option.focus();
                        break;
                }
                break;
            case "forms.buttons.read":
                this.updateDataLoad();
                break;
        }
    }

    updateDataLoad() {
        this.showSpinner = true;

        this.ambienteService.readAmbienteSistema()
            .subscribe(({ sistemaConfiguracao }: read_AmbienteSistema) => {
                this.showSpinner = false;
                const sistemaAmbienteNodes: AmbienteSistema = sistemaConfiguracao.nodes[0];
                switch (this.id) {
                    case Modulos.interface:
                        if (sistemaAmbienteNodes.interfaceImagem == null) {
                            this.imgFileLoad("./assets/images/logo.png");
                        }
                        this.interfacePadrao_Option.select(sistemaAmbienteNodes.interfacePadrao);
                        this.interfaceConfiguracao_Options.select(sistemaAmbienteNodes.interfaceConfiguracao);
                        this.interfaceImagem = this.configService.converteImagemBase64(sistemaAmbienteNodes.interfaceImagem);
                        break;

                    case Modulos.login:
                        this.loginDigitos_Option.select(parseInt(sistemaAmbienteNodes.loginDigitos));
                        this.loginSenhaDigitos_Option.select(parseInt(sistemaAmbienteNodes.loginSenhaDigitos));
                        this.loginSenhaCaracter_Options.populateBy_DEC(sistemaAmbienteNodes.loginSenhaCaracter);
                        this.loginSenhaRenovacao_Text.text = sistemaAmbienteNodes.loginSenhaRenovacao.toString();
                        this.loginSenhaExpiracao_Text.text = sistemaAmbienteNodes.loginSenhaExpiracao.toString();
                        break;

                    case Modulos.camposComplemento:
                        this.pessoaComplemento1_Text.text = sistemaAmbienteNodes.pessoaComplemento1;
                        this.pessoaComplemento2_Text.text = sistemaAmbienteNodes.pessoaComplemento2;
                        this.pessoaComplemento3_Text.text = sistemaAmbienteNodes.pessoaComplemento3;
                        this.pessoaComplemento4_Text.text = sistemaAmbienteNodes.pessoaComplemento4
                        break;

                    case Modulos.integracaoCustomizacao:
                        this.solucaoIntegrada_Option.select(sistemaAmbienteNodes.solucaoIntegrada);
                        this.solucaoEspecifica_Text.text = sistemaAmbienteNodes.solucaoEspecifica;
                        break;

                    case Modulos.imagem:
                        this.diretorio_Text.text = sistemaAmbienteNodes.imagemDiretorio;
                        this.imagemDefinicao_Option.populateBy_DEC(sistemaAmbienteNodes.imagemDefinicao);
                        break;

                    case Modulos.identificador:
                        this.biometriaFacial_Option.select(sistemaAmbienteNodes.biometriaFacial);
                        this.biometricaDigital_Option.select(sistemaAmbienteNodes.biometriaDigital);
                        this.qrCodeFormato_Option.select(sistemaAmbienteNodes.qrcodeFormato);
                        this.onControle_Change();
                        this.qrcodeDistincao_Option.select(sistemaAmbienteNodes.qrcodeDistincao)
                        this.acessoSenhaControle_Option.select(sistemaAmbienteNodes.acessoSenhaControle);
                        this.acessoSenhaFormato_Option.select(sistemaAmbienteNodes.acessoSenhaFormato);
                        if (sistemaAmbienteNodes.acessoPanicoControle == true) {
                            this.acessoPanicoControle_Options.check(1)
                        } else {
                            this.acessoPanicoControle_Options.uncheck(1)
                        }
                        break;
                }
            })
    }

    onListView_Change(rowSelect?: rowSelect) {
        if (rowSelect.registro) {
            this.id = rowSelect.id;
            this.alias = rowSelect.registro.alias;
        }
    }

    onSaved_Condition() {
        this.savedCondition = true;
    }

    onControle_Change() {

        switch (this.qrCodeFormato_Option.itemSelected.id) {
            case 0: case 1: case 2:
                this.qrcodeDistincao_Option.clearSelect();
                this.qrcodeDistincao_Option.disabled = true;
                break;

            default:
                this.qrcodeDistincao_Option.disabled = false
                this.qrcodeDistincao_Option.clearSelect();
                break;
        }
    }

    onSave_Click() {
        let find: any;
        switch (this.id) {
            case Modulos.interface:
                const ambienteInterface: AmbienteSistema = {
                    id: this.id,
                    interfacePadrao: this.interfacePadrao_Option.itemSelected.id,
                    interfaceConfiguracao: this.interfaceConfiguracao_Options.itemSelected.id,
                    interfaceImagem: this.configService.converteImagemArray(this.interfaceImagem)
                };
                this.ambienteService.updateAmbienteInterface(ambienteInterface)
                    .subscribe(({ data }: update_AmbienteInterface) => {
                        const objeto: any = JSON.parse(data.sistemaAmbienteInterface_Alterar.objeto);
                        if (data.sistemaAmbienteInterface_Alterar.sucesso == true) {
                            find = { field: "id", value: this.id };

                            this.configService.setConfig(this.plataforma, "plataforma");

                            this.onClose_Click();
                            this.update_Grid(find);
                        } else {
                            this.alertService.show(data.sistemaAmbienteInterface_Alterar.mensagemTipo,
                                data.sistemaAmbienteInterface_Alterar.mensagem,
                                objeto);
                        }
                    });
                break;

            case Modulos.login:
                const login: AmbienteSistema = {
                    id: this.id,
                    loginDigitos: this.loginDigitos_Option.itemSelected.id.toString(),
                    loginSenhaDigitos: this.loginSenhaDigitos_Option.itemSelected.id.toString(),
                    loginSenhaCaracter: this.loginSenhaCaracter_Options.valueOf_All(),
                    loginSenhaRenovacao: parseInt(this.loginSenhaRenovacao_Text.text),
                    loginSenhaExpiracao: parseInt(this.loginSenhaExpiracao_Text.text)
                }
                this.ambienteService.updateAmbienteLogin(login)
                    .subscribe(({ data }: update_AmbienteLogin) => {
                        const objeto: any = JSON.parse(data.sistemaAmbienteLogin_Alterar.objeto);
                        if (data.sistemaAmbienteLogin_Alterar.sucesso == true) {
                            find = { field: "id", value: this.id };
                            this.onClose_Click();
                            this.update_Grid(find);
                        } else {
                            this.alertService.show(data.sistemaAmbienteLogin_Alterar.mensagemTipo,
                                data.sistemaAmbienteLogin_Alterar.mensagem,
                                objeto);
                        }
                    });
                break;

            case Modulos.camposComplemento:
                const complemento: AmbienteSistema = {
                    id: this.id,
                    pessoaComplemento1: this.pessoaComplemento1_Text.text,
                    pessoaComplemento2: this.pessoaComplemento2_Text.text,
                    pessoaComplemento3: this.pessoaComplemento3_Text.text,
                    pessoaComplemento4: this.pessoaComplemento4_Text.text
                }
                this.ambienteService.updateAmbienteComplemento(complemento)
                    .subscribe(({ data }: update_AmbienteComplemento) => {
                        const objeto: any = JSON.parse(data.sistemaAmbienteComplemento_Alterar.objeto);
                        if (data.sistemaAmbienteComplemento_Alterar.sucesso == true) {
                            find = { field: "id", value: this.id };

                            this.onClose_Click();
                            this.update_Grid(find);
                        } else {
                            this.alertService.show(data.sistemaAmbienteComplemento_Alterar.mensagemTipo,
                                data.sistemaAmbienteComplemento_Alterar.mensagem,
                                objeto);
                        }
                    });
                break;

            case Modulos.integracaoCustomizacao:
                const integracao: AmbienteSistema = {
                    id: this.id,
                    solucaoIntegrada: this.solucaoIntegrada_Option.itemSelected.id,
                    solucaoEspecifica: this.solucaoEspecifica_Text.text
                }
                this.ambienteService.updateAmbienteIntegracao(integracao)
                    .subscribe(({ data }: update_AmbienteIntegracao) => {
                        const objeto: any = JSON.parse(data.sistemaAmbienteIntegracao_Alterar.objeto);
                        if (data.sistemaAmbienteIntegracao_Alterar.sucesso == true) {
                            find = { field: "id", value: this.id };

                            this.configService.setConfig(this.plataforma, "plataforma");

                            this.onClose_Click();
                            this.update_Grid(find);
                        } else {
                            this.alertService.show(data.sistemaAmbienteIntegracao_Alterar.mensagemTipo,
                                data.sistemaAmbienteIntegracao_Alterar.mensagem,
                                objeto);
                        }
                    });
                break;

            case Modulos.imagem:
                const imagem: AmbienteSistema = {
                    id: this.id,
                    imagemDiretorio: this.diretorio_Text.text,
                    imagemDefinicao: this.imagemDefinicao_Option.valueOf_All()
                }
                this.ambienteService.updateAmbienteImagem(imagem)
                    .subscribe(({ data }: update_AmbienteImagem) => {
                        const objeto: any = JSON.parse(data.sistemaAmbienteImagem_Alterar.objeto);
                        if (data.sistemaAmbienteImagem_Alterar.sucesso == true) {
                            find = { field: "id", value: this.id };

                            this.onClose_Click();
                            this.update_Grid(find);
                        } else {
                            this.alertService.show(data.sistemaAmbienteImagem_Alterar.mensagemTipo,
                                data.sistemaAmbienteImagem_Alterar.mensagem,
                                objeto);
                        }
                    });
                break;

            case Modulos.identificador:
                const identificador: AmbienteSistema = {
                    id: this.id,
                    biometriaFacial: this.biometriaFacial_Option.itemSelected.id,
                    biometriaDigital: this.biometricaDigital_Option.itemSelected.id,
                    qrcodeFormato: this.qrCodeFormato_Option.itemSelected.id,
                    qrcodeDistincao: this.qrcodeDistincao_Option.itemSelected.id,
                    acessoSenhaControle: this.acessoSenhaControle_Option.itemSelected.id,
                    acessoSenhaFormato: this.acessoSenhaFormato_Option.itemSelected.id,
                    acessoPanicoControle: this.acessoPanicoControle_Options.valueOf("ativar")
                }

                this.onControle_Change();

                this.ambienteService.updateAmbienteIdentificador(identificador)
                    .subscribe(({ data }: update_AmbienteIdentificador) => {
                        const objeto: any = JSON.parse(data.sistemaAmbienteIdentificador_Alterar.objeto);
                        if (data.sistemaAmbienteIdentificador_Alterar.sucesso == true) {
                            find = { field: "id", value: this.id };

                            this.onClose_Click();
                            this.update_Grid(find);
                        } else {
                            this.alertService.show(data.sistemaAmbienteIdentificador_Alterar.mensagemTipo,
                                data.sistemaAmbienteIdentificador_Alterar.mensagem,
                                objeto);
                        }
                    });
                break;
        }
    }

    update_Grid(find?: Find, filter?: Filter) {
        this.listView_Ambiente.processingShow();
        this.ambienteService.getAmbiente()
            .subscribe((ambiente: Ambiente[]) => {
                this.actionbuttomService.enableButtons(0);
                this.listView_Ambiente.gridUpdate(ambiente, find, filter);
            });
    }

    onButton_Click(type: any) {
        const fileselector: HTMLInputElement = (document.getElementById('fileselector')) as HTMLInputElement;
        switch (type) {
            case "open":
                fileselector.click();
                break;

            case "clear":
                fileselector.value = "";
                this.imgFileLoad("./assets/images/logo.png");
                this.onSaved_Condition();
                break;

        }
    }

    getImage_Change(event) {
        const imgPath = URL.createObjectURL(event.target.files[0]);
        this.imgFileLoad(imgPath);
        this.onSaved_Condition();
    }

    imgFileLoad(path: string) {
        this.convertDataUrl(path)
            .then((img: string) => {
                this.plataforma = { logo: img };
                this.interfaceImagem = img;
            })
    }

    ngOnDestroy() { }

    convertDataUrl(url) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                var reader = new FileReader();
                reader.onloadend = function () {
                    resolve(reader.result);
                }
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.send();
        })
    }

    onClose_Click() {
        this.actionbuttomService.hideForm()

        switch (this.id) {
            case Modulos.interface:
                this.interfacePadrao_Option.clearSelect();
                this.interfaceConfiguracao_Options.select(0);
                this.interfaceImagem = undefined;
                break;

            case Modulos.login:
                this.loginDigitos_Option.clearSelect();
                this.loginSenhaDigitos_Option.clearSelect();
                this.loginSenhaCaracter_Options.reset()
                this.loginSenhaRenovacao_Text.clear();
                this.loginSenhaExpiracao_Text.clear();
                break;

            case Modulos.camposComplemento:
                this.pessoaComplemento1_Text.clear();
                this.pessoaComplemento2_Text.clear();
                this.pessoaComplemento3_Text.clear();
                this.pessoaComplemento4_Text.clear();
                break;

            case Modulos.integracaoCustomizacao:
                this.solucaoIntegrada_Option.clearSelect();
                this.solucaoEspecifica_Text.clear();
                break;

            case Modulos.imagem:
                this.diretorio_Text.clear();
                break;

            case Modulos.identificador:
                this.biometriaFacial_Option.clearSelect();
                this.biometricaDigital_Option.clearSelect();
                this.qrCodeFormato_Option.clearSelect();
                this.qrcodeDistincao_Option.clearSelect();
                this.acessoSenhaControle_Option.clearSelect();
                this.acessoSenhaFormato_Option.clearSelect();
                break;

        }

    }

}

