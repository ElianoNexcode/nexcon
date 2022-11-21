import { Injectable } from '@angular/core';
import { GenericGraphQL, SortOperationKind } from 'src/app/@core/api/generic-graphql';

import { NivelOperacaoSchema } from './nivel-operacao.schema';
import { NivelOperacaoData, 
         NivelOperacao, 
         NivelOperacaoSort,
         NivelOperacaoFilter,
         create_NivelOperacao, 
         read_NivelOperacao, 
         update_NivelOperacao, 
         delete_NivelOperacao, 
         Operador,
         NivelOperacaoQuery} from 'src/app/@core/data/operador-nivel-operacao';
import { Item } from 'src/app/@theme/layouts/treeview/service/treeview';

import jwt_decode from 'jwt-decode';
import { Token } from 'src/app/@core/storage/config/config';

@Injectable()
export class NivelOperacaoService extends NivelOperacaoData {

    rights?: string;
    tokenDecode: Token;

    constructor(private graphQL: GenericGraphQL) {
        super();

        this.rights = "0".repeat(105);
        const token: string | null = window.sessionStorage.getItem("token");
        this.tokenDecode = jwt_decode(token);

        this.rights = this.tokenDecode.operadorNivelPrivilegio;

        // if(graphQL) {
            
        //     const nivelOperacaoFilter: NivelOperacaoFilter = { id: parseInt(this.tokenDecode.operadorNivel)}    
        //     this.readNivelOperacao(null, nivelOperacaoFilter)
        //         .subscribe(({ operadorNivelOperacao }: read_NivelOperacao) => {
        //             if(operadorNivelOperacao.totalCount > 0) {
        //                 this.rights = operadorNivelOperacao.nodes[0].privilegios;
        //             }
        //         });    
        // }
    }

    createNivelOperacao(nivelOperacao: NivelOperacao) {
        const variables = { nivelOperacao: { ... nivelOperacao }, ... this.graphQL.session};
        return this.graphQL.mutation<create_NivelOperacao>(NivelOperacaoSchema.create_NivelOperacao, variables)
    }

    readNivelOperacao(order_by?: NivelOperacaoSort, where?: NivelOperacaoFilter) {
        const variables = { ... this.graphQL.session, ... {order: order_by}, ... {where: where} }
        return this.graphQL.query<read_NivelOperacao>(NivelOperacaoSchema.read_NivelOperacao, variables);
    }

    updateNivelOperacao(nivelOperacao: NivelOperacao) {
        const NivelOperacaoInput = { nivelOperacao: { ... nivelOperacao} , ...this.graphQL.session}
        return this.graphQL.mutation<update_NivelOperacao>(NivelOperacaoSchema.update_NivelOperacao, NivelOperacaoInput);
    }

    deleteNivelOperacao(id: number) {
        return this.graphQL.mutation<delete_NivelOperacao>(NivelOperacaoSchema.delete_NivelOperacao, { id: id , ...this.graphQL.session} )
    }

    getOperadorNome(): Operador {
        return {id: parseInt(this.tokenDecode.operadorId || "0"), nome: this.tokenDecode.operadorNome || ''};
    }

    getPrivilegios(): string {
        return this.rights;
    }

    getNivelOperacaoTreeView(filter: NivelOperacaoFilter): Item[] {
        let item: Item[] = [];
        const order_by: NivelOperacaoSort = { nome: SortOperationKind.ASC }
        const variables = { ... this.graphQL.session, ... {order: order_by}, ...{where: filter} }
        this.graphQL.query<read_NivelOperacao>(NivelOperacaoSchema.read_NivelOperacao, variables)
            .subscribe(({ operadorNivelOperacao }: read_NivelOperacao ) => {
                operadorNivelOperacao.nodes.forEach((nivel: NivelOperacaoQuery) => {
                    item.push({
                        id: nivel.id.toString(),
                        text: nivel.nome,
                        icon: "administrador.png"
                    })
                })
            })
        return item;
    }


    setPrivilegio(operPriv: string, privPos: number, privOper: string): string {
        const privOperReturn: string = privOper?.substr(0, privPos - 1) + operPriv + 
                                       privOper?.substr(privPos + (operPriv.length - 1));
        return privOperReturn;
    }

    checkAcessRights(funcao: string, operacao: number): boolean {        
        if(this.tokenDecode.operadorNome == "ADMINISTRADOR MASTER") return true;
        const funcaoPos: number = (parseInt(funcao, 16)) - 1;
        const funcaoLen: number = (funcaoPos <= 84 || funcaoPos >= 102)? 1: 2;
        const funcaoRights: string = this.rights.substr(funcaoPos, funcaoLen)
        const operacaoRights: number = parseInt(funcaoRights, 16);

        return ((operacaoRights & (2 ** operacao)) > operacao);
    }

    checkNivelOperacao(funcao: string, operacao: number, nivel: string): boolean {
        funcao = this.nivelPos(funcao, false);
    
        const funcaoPos: number = (parseInt(funcao, 16)) - 1;
        const funcaoLen: number = (funcaoPos <= 84 || funcaoPos >= 102)? 1: 2;
        const funcaoRights: string = nivel.substr(funcaoPos, funcaoLen)
        const operacaoRights: number = parseInt(funcaoRights, 16);

        return ((operacaoRights & (2 ** operacao)) > operacao);        
    }

    nivelPos(itemId: string, dec: boolean = true): any {
        if(dec) {
          return (itemId.charCodeAt(5) >= 33 &&
                  itemId.charCodeAt(5) <= 45)?
                  itemId.charCodeAt(5) - 32:
                  itemId.charCodeAt(6) - 19;
        } else {
          return (itemId.charCodeAt(5) >= 33 &&
                  itemId.charCodeAt(5) <= 45)?
                  (itemId.charCodeAt(5) - 32).toString(16):
                  (itemId.charCodeAt(6) - 19).toString(16);
        }
    }
    
}
