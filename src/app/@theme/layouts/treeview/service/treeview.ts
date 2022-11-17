import { Observable } from 'rxjs';

export interface Modulos {
  id: string
  subItemId?: string
  text: string
  icon?: string
}

export interface SubItem {
  id: string
  itemId?: string
  text: string
  icon?: string
  periodo?: string
  link?: string
  modulos?: Modulos[]
}

export interface Item {
  id: string
  treeViewId?: string
  text: string
  alias?: string
  icon?: string
  link?: string
  action?: string
  subitem?: SubItem[]
  operation?: Operation[]
  solucaoIntegrada?: number
  isFunction?: boolean
  adminAccess?: boolean
  checked?: boolean
  indetermined?: boolean
  disabled?: boolean
}

export interface TreeView {
  id?: string
  subMenuId?: string
  text?: string
  alias?: string
  link?: string
  child?: string
  item?: Item[]
  operation?: Operation[]
  solucaoIntegrada?: number
  onlyOperationNivel?: boolean
  dynamic?: boolean
  checked?: boolean
  indetermined?: boolean
  visible?: boolean
  disabled?: boolean
}

export interface Operation {
  id?: any
  itemId?: string
  text?: string
  checked?: boolean
  disabled?: boolean
}

export abstract class TreeviewData {
    abstract getTreeview(): Observable<TreeView[]>;
    abstract setTreeview(treview: TreeView[], selectOnlyChild: boolean): void;
}
