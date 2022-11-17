import { Component, OnInit } from '@angular/core';
import { InputLabel } from 'src/app/@theme/components/form/input-label/service/input-label.service';
import { Router } from '@angular/router';
import { AlertServiceComponent } from '../@theme/components/form/alert-card/service/alert-card.service';
import { ConfigStorage, Token, UserConfig } from 'src/app/@core/storage/config/config';
import { login, Login, LoginData } from '../@core/data/login';
import { ErrosModalService } from '../@theme/modals/erros/service/erros-modal.service';

import { OperadorConfiguracao, OperadorConfiguracaoData, OperadorConfiguracaoFilter, OperadorConfiguracaoSort, read_OperadorConfiguracao } from '../@core/data/configuracao-operador-operador';
import { NivelOperacaoEx, Operador } from '../@core/data/operador-nivel-operacao';

import jwt_decode from 'jwt-decode';

@Component({
    selector: 'nex-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    usr_text: InputLabel = new InputLabel();
    pwd_text: InputLabel = new InputLabel();

    aplicativo: {aplicativo: string, descricao: string, imagem: string}
    errorModalService: ErrosModalService = new ErrosModalService();

    alertService: AlertServiceComponent = new AlertServiceComponent();

    constructor( private loginService: LoginData,
                 private router: Router,
                 private configStorage: ConfigStorage,
                 private operador: OperadorConfiguracaoData ) {
        
        this.aplicativo = {aplicativo: 'NEXCON',
                           descricao: 'Plataforma Nexcode Controls', "imagem": 'logo.png'}

        this.usr_text.name = "txtUsr";
        this.usr_text.rules = "uppercase";
        this.usr_text.maxLength = 20;
        
        this.pwd_text.name = "txtPwd";
        this.pwd_text.type = "password";
        this.pwd_text.maxLength = 20;

        this.errorModalService.name = "erroModalLogin";
    }

    ngOnInit() { }

    onLogin_Click() {
        const login: Login = { aplicativo: "NEXCON",
                               login: this.usr_text.text,
                               senha: this.pwd_text.text };
                              
        this.loginService.login(login)
            .subscribe(async ({ data }: login) => {
                const token: string =  JSON.parse(data.login.objeto);
                if(token != null) {
                    const data: string = new Date().toLocaleDateString();
                    const hora: string = new Date().toTimeString().substr(0, 5);
                    const dataHora: string = data + " - " + hora; 
            
                    try {
                        
                        const tokenDecode: Token = jwt_decode(token);
                        const userLogin =  {id: parseInt(tokenDecode.operadorId), nome: tokenDecode.operadorNome};

                        const user: UserConfig = { login: this.usr_text.text,
                                                   usuario: userLogin.nome,
                                                   dataHora: dataHora };

                        this.configStorage.setConfig<UserConfig>(user, "user")

                        await this.getSiteNivelOperacao(userLogin)
                            .then((resultSiteNivelOperacao) => {
                                this.configStorage.setSites(resultSiteNivelOperacao);
                                this.loginService.setToken(token);
                                this.router.navigateByUrl("./");
                            });

                    } catch(e) {
                        console.log(e);
                        // Tratar Try-Catch...
                    }
                    
                } else {
                    this.alertService.show("ERRO", "Falha no Login.",
                                           [{Message: "Usuário e Senha não correspondem."}]);
                }
            }, (error => {
                this.errorModalService.show("Início de Sessão",
                                            "Ocorreu uma falha na conexão com o servidor. Contate o Suporte Técnico ou Tente Novamente!",
                                            null, error);
            }))
    }

    async getSiteNivelOperacao(user) {
            
        return new Promise((resolve, reject) => {
        const operadorNome: Operador = user;
        
        const operadorOrder: OperadorConfiguracaoSort = null;
        const operadorFilter: OperadorConfiguracaoFilter = { operadorPessoaId: {eq: operadorNome.id}};
        this.operador.readOperadorConfiguracaos(operadorOrder, operadorFilter)
            .subscribe(({operador}: read_OperadorConfiguracao) => {
    
                if(operador.nodes.length > 0) {
                    const whereNivelOperacao: {id: number}[] = [];
                    const operadorLogin: OperadorConfiguracao = operador.nodes[0];
                    const nivelOperacaoEx: NivelOperacaoEx[] = operadorLogin.nivelOperacao.nivelOperacaoEx
                    nivelOperacaoEx.forEach(nivelOperacao => {
                        whereNivelOperacao.push({"id": nivelOperacao.siteId});
                    });
        
                    resolve({OR: whereNivelOperacao});    
                } else {
                    resolve(undefined);
                }
                
            }, error => {
                console.log(error);
            });  
        })
    }


    onErrorModalService_Click($event) {
        this.usr_text.focus();
        this.errorModalService.hide();
    }
}