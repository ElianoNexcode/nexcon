import { Component, Input, Output, EventEmitter, ElementRef, OnDestroy, AfterViewInit, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { ActionButtomService, KeyPress } from '../action-buttom/service/action-button.service';
import { ListViewGrid, rowSelect } from './service/list-view.service';
import { ComboOptions, Item } from '../../form/combobox/service/combobox.service';
import { delay } from 'rxjs/operators';
import { PagingService } from '../paging/service/paging.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'nex-listview',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  host: {'(window:resize)': 'onResize($event)'}
})
export class ListViewComponent implements OnDestroy, OnInit, OnChanges, AfterViewInit {

  @Input() params: ListViewGrid;
  @Input() showFilter: boolean = true;
  @Input() classHeader: string;
  @Input() class: string;
  @Input() showGrid: boolean = true;
  @Input() gridScroll: boolean = false;
  @Input() gridOptions: boolean = false;
  @Input() gridVerticalScroll: boolean = false;
  @Input() noHeader: boolean = false;
  @Input() maxWidth: number  = 100;
  @Input() maxHeight: number;
  @Input() editable: boolean = true; 
  @Input() avatar: string = "person";

  @Output() eventCheck = new EventEmitter<any>();
  @Output() eventFilter = new EventEmitter<any>();
  @Output() eventSelectGroup = new EventEmitter<any[]>();

  @ViewChild("keyControl") keyControl: ElementRef<HTMLInputElement>;

  dataGrid: any[] = null;

  selectID: number;
  textFilter: string;

  pagesVisibility: string = 'hidden';
  pagingService: PagingService = new PagingService();

  filterOption: ComboOptions = new ComboOptions();
  dataSubject: Subscription;
  gridSelectSubject: Subscription;

  _array = Array;

  constructor(public actionbuttomService: ActionButtomService) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.editable?.currentValue == undefined) {
      this.editable = true;
    }
  }
                
  ngAfterViewInit() {

    this.params.pagingService = this.pagingService;
    this.dataSubject = this.params.dataSubject()      
      .subscribe(data => {
          this.pagesVisibility = this.params.pageCount() > 1? 'visible': 'hidden';          
          this.dataGrid = data;
      });

    this.gridSelectSubject = this.params.selectSubject()
      .pipe(delay(1))
      .subscribe((index: number) => {
        if(this.dataGrid?.length > 0) {
          this.selectRow(index, this.dataGrid[index].id)
        }
      })

    var headerID: number = 0;

    this.filterOption.name = "cbFilter_Options";
    this.params.grid
      .forEach(grd => {
        if(grd.type != "image") {
          this.filterOption.add(grd.header, grd.field, headerID, (headerID == 0));
          headerID += 1;  
        }
      });

    this.params.filterSubject
      .subscribe((value: Boolean) => {
        this.filterOption.select(0);
        this.filterOption.text = "";
        this.onFilter_Find({id: 0, text: this.filterOption.itemSelected?.text, value: "", icon: undefined});
      })
  }

  condicao(field: any, enumType?: any, entityField?: any, itens?: any, grid?: any[]): string {

    if(enumType != undefined) {
      let fieldValue: number;

      if(typeof(field) == "boolean") {
        fieldValue = (field == true)? 1: 0; 
      } else {
        fieldValue = field;
      }
      
      if(entityField) {
        fieldValue = entityField;
      } 
      return enumType[fieldValue];
    }
    return field;
  }

  selectRow(indice: number, selectId: string) {

    this.params.clearSelect();
    const gridRow = this.params.name + '_' + selectId

    if(!this.gridOptions) {
      document.getElementById(gridRow)?.classList.add("actived")
    }    

    this.selectID = Number.parseInt(selectId, 10);

    let rowSelect: rowSelect = {"id": this.selectID, "registro": this.dataGrid[indice]}
    this.eventCheck.emit(rowSelect);

    this.actionbuttomService.enableButtons(1);
    this.keyControl?.nativeElement.focus();

  }

  onCardQuestion_Click(selectOption: string) {
    let cardElement: HTMLElement = (document.getElementsByClassName("card-footer")[0] as HTMLElement);
    this.actionbuttomService.innerQuestion = false;

    if(selectOption == "yes") {
      let rowSelect: any = {"id": this.selectID, "registro": null, "exclude": selectOption}
      this.actionbuttomService.enableButtons(0);
      this.eventCheck.emit(rowSelect);  
    }

    this.actionbuttomService.unlockScreen();
    cardElement.getElementsByTagName("nex-paging")[0]?.classList.remove("hidePaging");
  }

  onCheckBox_Change() {
    this.eventSelectGroup.emit(this.dataGrid);
  }
    
  onPaging_Change(page: number) {
    this.params.pageChange(page)
    this.actionbuttomService.enableButtons(0);
  }

  onResize() {
    this.params.dataPopulate();
  }

  onKeyControl_Keyup() {
    const key = (event as KeyboardEvent).code;
    this.actionbuttomService.onExecute_Action(KeyPress[key]);
  }

  onFilter_Find(option: Item) {
    this.eventFilter.emit(option);
  }

  onFilter_Change(option: Item) {
    this.filterOption.text = "";
  }

  ngOnDestroy() {
    this.dataSubject?.unsubscribe();
    this.gridSelectSubject?.unsubscribe();
  }

}
