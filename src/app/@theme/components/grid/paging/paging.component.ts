import { Component, OnDestroy, AfterViewInit, ElementRef, Output, EventEmitter, Input } from '@angular/core'
import { PagingService } from './service/paging.service';

@Component({
    selector: 'nex-paging',
    template: `
        <div class="pagesBox">
            <ul id="pageItens" class="nav">
                <li id="start"  class="pageItem btn-link startEnd"    (click)="onStart_Click()">«</li>
                <li id="before" class="pageItem btn-link beforeAfter" (click)="onBefore_Click()">‹</li>
                <li id="first"  class="pageItem btn-link"             (click)="onSelect($event)">1</li>
                <li id="second" style="display: none" class="pageItem btn-link" (click)="onSelect($event)">2</li>
                <li id="third"  style="display: none" class="pageItem btn-link" (click)="onSelect($event)">3</li>
                <li id="next"   class="pageItem btn-link beforeAfter" (click)="onNext_Click()">›</li>
                <li id="end"    class="pageItem btn-link startEnd"    (click)="onEnd_Click()">»</li>
            </ul>
        </div>
    `,
    styleUrls: ['./paging.component.scss']
})
export class PagingComponent implements AfterViewInit, OnDestroy {

    @Input() paging: PagingService;
    @Output() eventChange = new EventEmitter<number>();
    
    constructor(private elementRef: ElementRef) {

    }

    ngAfterViewInit() {
        this.paging.fisrtPage = document.getElementById("first");
        this.paging.secondPage = document.getElementById("second");
        this.paging.thirdPage = document.getElementById("third");
        this.paging.pageItens =  document.getElementById("pageItens");

        this.onActive(this.paging.fisrtPage);
    }

    onSelect(event: MouseEvent) {
        this.onActive((event.target as HTMLElement))
    }

    onStart_Click() {
        this.paging.onStart_Click()
        this.onActive(this.paging.fisrtPage);
    }

    onBefore_Click() {
        let newActive: HTMLElement = this.paging.activePage;
        switch(this.paging.activePage.id) {
            case "third": {
                newActive = this.paging.secondPage;
                break;
            }
            case "second": {
                newActive = this.paging.fisrtPage;
                break;
            }
            case "first": {
                this.paging.fisrtPage.innerHTML  = (String)(Number.parseInt(this.paging.fisrtPage.innerHTML) - 1);
                this.paging.secondPage.innerHTML = (String)(Number.parseInt(this.paging.secondPage.innerHTML) - 1);
                this.paging.thirdPage.innerHTML  = (String)(Number.parseInt(this.paging.thirdPage.innerHTML) - 1);        
                break;
            }
        }

        this.onActive(newActive);
    }

    onNext_Click() {
        let newActive: HTMLElement = this.paging.activePage;
        switch(this.paging.activePage.id) {
            case "first": {
                newActive = this.paging.secondPage;
                break;
            }
            case "second": {
                newActive = this.paging.thirdPage;
                break;
            }
            case "third": {
                this.paging.fisrtPage.innerHTML  = (String)(Number.parseInt(this.paging.fisrtPage.innerHTML)  + 1);
                this.paging.secondPage.innerHTML = (String)(Number.parseInt(this.paging.secondPage.innerHTML) + 1);
                this.paging.thirdPage.innerHTML  = (String)(Number.parseInt(this.paging.thirdPage.innerHTML)  + 1);    
                break;
            }
        }

        this.onActive(newActive);

    }

    onEnd_Click() {
        switch(this.paging.numPages) {
            case 1: {
                this.onActive(this.paging.fisrtPage);
                break;
            }
            case 2: {
                this.onActive(this.paging.secondPage);
                break;
            }
            case 3: {
                this.onActive(this.paging.thirdPage);
                break
            }
            default: {
                this.paging.fisrtPage.innerHTML  = (String)(this.paging.numPages - 2);
                this.paging.secondPage.innerHTML = (String)(this.paging.numPages - 1);
                this.paging.thirdPage.innerHTML  = (String)(this.paging.numPages);    

                this.onActive(this.paging.thirdPage);
            }
        };

    }

    private onActive(newActive: HTMLElement) {
        this.paging.onActive(newActive);
        this.eventChange.emit(Number.parseInt(this.paging.activePage.innerHTML));
    }

    ngOnDestroy() {
        this.elementRef.nativeElement.remove();
    }
}

