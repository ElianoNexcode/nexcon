import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { ModalManager } from "./modal.service";
@Component({
    selector: 'ncl-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    @Output() public onOpen = new EventEmitter(false);
    @Output() public onClose = new EventEmitter(false);

    @ViewChild("modalRoot") public modalRoot: ElementRef;

    public isOpened = false;
    private inputSettings;
    public settings;
    private backdropElement: HTMLElement;

    constructor(private modalManager : ModalManager) {

    }


    ngOnInit(): void {
        this.inputSettings = {
            
        };
        this.createBackDrop();
    }

    init(config) {
        this.onOpen.observers = [];
        this.onClose.observers = [];
        this.settings = Object.assign({}, this.modalManager.defaults, this.inputSettings, config);
        this.createBackDrop();
    }

    open() {
        document.body.appendChild(this.backdropElement);
        document.body.classList.add('modal-open');
        this.isOpened = true;
        window.setTimeout(() => {
            this.modalRoot.nativeElement.classList.add('show');
            this.modalRoot.nativeElement.focus();
            this.onOpen.emit();
        }, 100)
    }

    private createBackDrop() {
        this.backdropElement = document.createElement("div");
        this.backdropElement.classList.add('fade');
        this.backdropElement.classList.add('show');
    }

}