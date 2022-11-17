import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ModalComponent } from "./interface/modal/modal.component";
import { ModalConfig, ModalManager } from "./interface/modal/modal.service";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ ModalComponent ],
    providers: [ ModalManager ],
    exports: [ ModalComponent ]
})
export class LibraryModule {
    
}