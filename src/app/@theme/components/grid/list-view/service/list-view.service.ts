import { Injectable } from '@angular/core';
import { PagingService } from '../../paging/service/paging.service';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../../../form/combobox/service/combobox.service';
import { QueryInterface, SchemaInterface } from 'src/app/@core/api/generic-graphql';

export interface rowSelect {
    id: number
    registro?: any
    exclude?: string
}

export interface Filter {
    select?: string
    field?: string
    value?: string
}

export interface Find {
    field: string
    value: any
    type?: string
}

export interface Grid {
    header: string
    entity?: string | string[]
    field?: string
    value?: string
    type?: string
    avatar?: string
    icon?: string
    index?: number
    width?: number
    align?: string
    visible?: boolean
    enum?: any
    enumColor?: any
    pipe?: string
}

export interface ListViewData {
    name?: string
    title?: string
    gridOnly?: boolean
    noPaging?: boolean
    noBorder?: boolean
    noGridLine?: boolean
    grid: Grid[]
}

@Injectable({
    providedIn: 'root'
})
export class ListViewGrid {

    public name!: string;
    public title?: string;
    public gridOnly: boolean = false;
    public noPaging: boolean = false;
    public noBorder: boolean = false;
    public noGridLine?: boolean;
    public entity?: string;
    public colorEntity?: string;
    public colorField?: string;
    public colorEnum: any;
    public status?: string;
    public grid: Grid[] = [];
    public maxHeight?: number;

    dataGridBehavior!: BehaviorSubject<any>;
    gridSelectSubject!: BehaviorSubject<number | undefined>;
    
    dataPages: any[] = [];           // Array de paginação do grid
    protected dataSource: any[] = [];    // Array dos dados recebidos
    
    filter?: Filter;

    pagingService!: PagingService;

    errorMessage?: string | null;
    showSpinner?: boolean;

    filterInit?: Filter;
    find: any;
    identificador: string = "id"

    filterSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

    selectObject?: number;

    dataSubject(): BehaviorSubject<any> {
        if(!this.dataGridBehavior) this.dataGridBehavior = new BehaviorSubject(null);        
        return this.dataGridBehavior;
    }

    selectSubject(): BehaviorSubject<number | undefined> {
        if(!this.gridSelectSubject) this.gridSelectSubject = new BehaviorSubject(this.selectObject);
        return this.gridSelectSubject;
    }

    clear() {
        this.dataPages = this.dataSource = [];
        this.dataGridBehavior?.next(this.dataPages);
        this.gridUpdate(this.dataSource);
        this.dataPopulate();
    }

    clearFilter() {
        this.filterSubject.next(true);
    }
    
    clearSelect(gridName?: string) {
        const gridClassName: string = (gridName)? gridName: this.name;
        Array.from(document.getElementsByClassName(gridClassName))
            .map(row => row?.classList.remove("actived"));
    }

    select(index: number) {
        this.gridSelectSubject?.next(index);
    }

    getHeader(header: string): Grid | undefined {
        const index = this.grid.findIndex(grd => grd.header == header);
        if(index >= 0) {
            return this.grid[index];
        }
        return null;
    }

    gridCheck(id: number, index: number) {
        const gridIndex = this.dataGridBehavior.value.findIndex((grid: any) => grid.id == id)
        if(gridIndex >= 0) {
            this.dataGridBehavior.value.checked[index] = true;
        }
    }

    getFilter(option: Item): object | null {
        const field: Grid = this.getHeader(option.text as string) as Grid;
        let filter: object | null;
        type objectKey = keyof typeof filter;
        if(field) {
            filter = {};
            if(!field.enum) {
                const filterKey: objectKey = (field.field + "_contains") as objectKey;
                filter = {[filterKey]: option.value};
            } else {
                const filterKey: objectKey = (field.field) as objectKey;
                if(option.value == "SIM" || option.value == "NÃO") {                    
                    filter = {[filterKey]: field.enum[option.value] == 1? true: false};
                } else {
                    filter = {[filterKey]: field.enum[option.value as string]};
                }                
            }
        } else {
          filter = null;
        }
        return filter
    }

    // clearFilter() {
    //     if(document.getElementById("customFilter")) {
    //          document.getElementById("customFilter").getElementsByClassName("select-selected")[0].innerHTML = "Nome";
    //         (document.getElementById("input-customFilter") as HTMLInputElement).value = "";    
    //     }
    // }

    setFilter(filter: Filter) {
        this.filter = filter;
    }

    flashAdd(id: number) {
        let rowFlash: HTMLElement;        
        setTimeout(() => {        
            rowFlash = document.getElementById(this.name + "_" + id.toString()) as HTMLElement;
            rowFlash.classList.add("flash");
        }, 500);
    }

    flashDel(id: number) {
        let rowFlash: HTMLElement;
        rowFlash = document.getElementById(this.name + "_" + id.toString()) as HTMLElement;
        rowFlash.classList.add("flashDel");
    }

    dataLoad(data: any[], find?: any, identificador?: string) {
        if(find) {

            let pagePosition: number;
            let findRow: number;
            let rowPosition: number;
    
            const listviewName: HTMLElement = document.getElementById("lv_" + this.name) as HTMLElement;
            let height: number = (listviewName.clientHeight - 51);
            let gridLines:number = (height / 32) >> 0;
    
            findRow = (this.dataSource.findIndex(ds => ds[find.field] == find.value) / gridLines) + 1;
            pagePosition =  (findRow >> 0);
            rowPosition = Math.round((findRow - pagePosition) * gridLines) + 1;
       
            if(find && (find.type == "DEL")) {
                this.flashDel(find.value);
    
                if((rowPosition == 1) && (this.dataPages[pagePosition - 1].length == 1) && (pagePosition > 1)) {
                    pagePosition -= 1;
                }
                
                setTimeout(() => {
                    this.dataSource = data;
                    this.dataPopulate(pagePosition);
                }, 500);

            } else {

                this.dataSource = data;

                findRow = (this.dataSource.findIndex(ds => ds[find.field] == find.value) / gridLines) + 1;
                pagePosition =  (findRow >> 0);            
                rowPosition = Math.round((findRow - pagePosition) * gridLines) + 1;
                
                this.dataPopulate(pagePosition);
                this.flashAdd(this.dataPages[pagePosition - 1][rowPosition - 1][identificador as string]);    
            }    
    
        } else {
            setTimeout(() => {                    
                this.dataSource = data;
                this.dataPopulate();
            }, 300);
        }
    }

    pageChange(page: number) {
        this.clearSelect();
        if(this.dataGridBehavior) this.dataGridBehavior.next(this.dataPages[page - 1]);  
    }

    pageCount(): number {
        return this.dataPages.length;
    }

    getGridLines(): number {
        const listviewName = document.getElementById("lv_" + this.name) as HTMLElement
        let height: number = listviewName.clientHeight - 51;
        let gridLines: number = (height / 32) >> 0;
        return gridLines;
    }

    dataPopulate(pagePosition?: number) {
        const listviewName = document.getElementById("lv_" + this.name) as HTMLElement
        let height: number = listviewName.clientHeight - 51;
        let gridLines: number = 0;

        if(this.noPaging) {
            gridLines = this.dataSource?.length;
        } else {
            gridLines = (height / 32) >> 0;
        }      
        
        let dataPage: any[] = [];
        this.dataPages = [];

        this.dataSource?.forEach((dataRow, index) => {
            const checkProp: Array<boolean> = [];
            this.grid.filter(grd => grd.type == "check").forEach(item => {
                checkProp.push(false);
            });
            
            dataPage.push({checked: checkProp, ... dataRow});
            if(dataPage.length == gridLines) {
                this.dataPages.push(dataPage);
                dataPage = [];
            }
        });
        
        if(dataPage.length > 0) {
            this.dataPages.push(dataPage);
        };

        if(this.noPaging == false) {
            this.pagingService?.setPageNum(this.dataPages.length == 0? 1: this.dataPages.length );

            if(pagePosition) {
                this.pagingService.setPage(pagePosition);
                this.pageChange(pagePosition);
            } else {            
                this.dataGridBehavior?.next(this.dataPages[0]);   
            }                            
        } else {
            this.dataGridBehavior?.next(this.dataPages[0]);
        }
        this.showSpinner = false;
    }

    processingShow() {
        this.errorMessage = null;
        this.showSpinner = true;
    }

    errorShow(message: string) {
        this.showSpinner = false;
        this.errorMessage = message;
    }

    gridUpdate<T>(gridData: T[], find?: any, filter?: Filter, identificador: string = "id") {
        if(filter?.select) this.setFilter(filter);

        if(!filter?.select || find) {
            this.dataLoad(gridData, find, identificador);    
        } else {
            this.dataLoad(gridData.filter((data: T) => {
                type objectKey = keyof typeof data;
                const dataKey: objectKey = this.filter?.field as objectKey;

                if(typeof(data[dataKey]) == "boolean" && (this.filter?.value && this.filter.value.length > 0)) {
                    if("SIMNÃO".indexOf(this.filter.value) >= 0) {
                        return data[dataKey] == (this.filter.value == "SIM"? true: false);
                    }                            
                } else {
                    if(this.filter?.value == undefined || this.filter.value == "") {
                        return data;
                    } else {
                        return (data[dataKey] as string).indexOf(this.filter.value) >= 0;
                    }
                };
                return null;
            }), null, identificador);
        }
    }

}
