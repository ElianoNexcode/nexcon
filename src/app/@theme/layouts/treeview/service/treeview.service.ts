import { Injectable } from '@angular/core';
import { TreeviewData, TreeView, Operation, Item } from './treeview';
import { of as observableOf, Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { NivelOperacaoData, Operador } from 'src/app/@core/data/operador-nivel-operacao';

@Injectable({
  providedIn: 'root'
})
export class TreeviewService extends TreeviewData  {

    organizacaoBehavior: BehaviorSubject<any>;
    siteBehavior: BehaviorSubject<any>;
    itemBehavior: BehaviorSubject<any>;

    flipped = false;
    treeview: TreeView[] = [{text: '', id: '', child: 'organizacao'}];
    cbEstrutura: {id: number, text: string};
    operador: Operador;

    constructor(private router: Router, private nivelOperacao: NivelOperacaoData) {
        super();
        this.operador = this.nivelOperacao.getOperadorNome();
    }

    getTreeview(): Observable<TreeView[]> {
        return observableOf(this.treeview);
    }

    setTreeview(treeview: TreeView[], selectOnlyChild: boolean = false) {
        this.treeview = [];
        treeview.filter(tview => tview.onlyOperationNivel != true)
            .forEach((treeview: TreeView) => {
                this.treeview.push(treeview);
            }); 

        this.flipped = false;
    }

    siteSubject(): BehaviorSubject<any> {
        if(!this.siteBehavior || this.siteBehavior.closed) {
            this.siteBehavior = new BehaviorSubject(null);
        }
        return this.siteBehavior;
    }

    itemSubject(): BehaviorSubject<any> {
        if(!this.itemBehavior || this.itemBehavior.closed) {
            this.itemBehavior = new BehaviorSubject(null);
        }
        return this.itemBehavior;
    }

    organizacaoSubject(): BehaviorSubject<any> {
        if(!this.organizacaoBehavior || this.organizacaoBehavior.closed) {
            this.organizacaoBehavior = new BehaviorSubject(null);
        }
        return this.organizacaoBehavior;
    }

}
