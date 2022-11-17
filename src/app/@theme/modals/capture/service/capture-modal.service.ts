import { ElementRef, Injectable } from '@angular/core';
import { ModalService } from '../../service/modal.service';

@Injectable({
    providedIn: 'root'
})
export class CaptureModalService {

    name: string;
    observacao_Text: string;

    filterField: string;
    filterText: string;

    showModal: boolean = false;
    showSquare: boolean = false;

    mediaDevice: MediaDevices;
    mediaSteam: MediaStream;
    constraints: any = { audio: false, video: { width: 480, height: 340 } };
  
    video: ElementRef;

    captured: boolean = false;
    required: boolean = false;

    modalService: ModalService = new ModalService();

    show() {
        this.captured = false;
        this.modalService.show();
        this.showModal = this.modalService.showModal;
        this.start_Media();
        setTimeout(() => {
            this.showSquare = true;
       }, 800);
    }

    hide() {
        this.showSquare = false;
        this.modalService.hide();
        this.showModal = this.modalService.showModal;
        this.stop_Media();
    }

    start_Media() {
        this.mediaDevice.getUserMedia(this.constraints)
          .then((stream: MediaStream) => {
            this.mediaSteam = stream;
            this.video.nativeElement.srcObject = this.mediaSteam;
            this.video.nativeElement.play();
          });
    }

    stop_Media() {
        this.mediaSteam?.getTracks().forEach(track => {
            track.stop();
        })
    }
    
}
