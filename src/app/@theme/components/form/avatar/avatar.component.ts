import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ConfigStorage } from 'src/app/@core/storage/config/config';
import { AvatarService } from './service/avatar.service';

@Component({
    selector: 'nex-avatar',
    template:  `<div class="avatar {{size}} {{background}}" [id]="name" [ngClass]="{'noMargin': noMargin == true, 'noBorder': noBorder == true, 'round': round == true}" [ngStyle]="{'margin-top.px': marginTop}">
                    <img *ngIf="imageBase64 != null" [src]="imageBase64" class="image" [ngClass]="{'round': round == true, 'imgBorder': imgBorder == true}" [ngStyle]="{'padding.px': (noPadding)? 0: 3}">
                    <div *ngIf="size == 'large' && capture == true" class="btCapture" (click)="onCapture_Click()"><i class="fa fa-pencil-alt"></i></div>
                </div>`,
    styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements AfterViewInit, OnChanges {

    @Input() size: string;
    @Input() image: any = null;
    @Input() name: string = 'imgAvatar';
    @Input() noMargin: boolean = false;
    @Input() marginTop: number = 9;
    @Input() noPadding: boolean = true;
    @Input() imgBorder: boolean = false;
    @Input() noBorder: boolean = false;
    @Input() round: boolean = false;
    @Input() capture: boolean = false;
    @Input() background: string = "person";

    @Output() imageCapture: EventEmitter<boolean> = new EventEmitter();

    imageBase64: string = null;
    
    constructor( private config: ConfigStorage ) { 

    }

    ngAfterViewInit(): void {
        if(Array.isArray(this.image)) {
            this.imageBase64 = this.config.converteImagemBase64(this.image);
        };
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(Array.isArray(changes.image?.currentValue)) {
            this.image = changes.image?.currentValue;
            this.imageBase64 = this.config.converteImagemBase64(this.image);
        } else {
            this.imageBase64 = null;
        };
    }

    onCapture_Click() {
        this.imageCapture.emit(true);
    }

}
