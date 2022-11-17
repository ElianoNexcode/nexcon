import { AfterViewInit, Component, ElementRef, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { RadioOptions } from '../../components/form/radio/service/radio.service';
import { ComboOptions, Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { CaptureModalService } from './service/capture-modal.service';
import { TabsService } from '../../layouts/tabs/service/tabs.service';
import { trigger,
         state,
         style,
         animate,
         transition } from '@angular/animations';

interface Capture {
  deviceID: string
  opcoes: number
  quadro: number
}

@Component({
  selector: 'nex-capture',
  animations: [trigger('video', [
                  state('right', style({left: '-152px'})),
                  state('left', style({left: '9px'})),
                  transition('right => left', [animate('300ms ease-in')]),
                  transition('left => right', [animate('300ms ease-out')])]
                ),
                trigger('perfil', [
                  state('right', style({left: '-317px'})),
                  state('left', style({left: '9px'})),
                  transition('right => left', [animate('300ms ease-in')]),
                  transition('left => right', [animate('300ms ease-out')])]
                ),
                trigger('config', [
                  state('top', style({top: '-205px'})),
                  state('bottom', style({top: '9px'})),
                  transition('top => bottom', [animate('300ms ease-in')]),
                  transition('bottom => top', [animate('300ms ease-out')])])
              ],
  templateUrl: './capture-modal.component.html',
  styleUrls: ['./capture-modal.component.scss']
})
export class CaptureModalComponent implements AfterViewInit {

  @Input() captureModal: CaptureModalService;
  @Input() type: string;
  @Input() clearButton: boolean = false;
  @Input() settingButton: boolean = false;
  @Output() onCapture: EventEmitter<string> = new EventEmitter(null);

  opcoesCaptura: RadioOptions = new RadioOptions();
  quadroCaptura: RadioOptions = new RadioOptions();
  terminal_Option: ComboOptions = new ComboOptions();

  tabConfiguracao: TabsService = new TabsService();

  pessoaLocal_Options: ComboOptions = new ComboOptions();
  pessoaRemoto1_Options: ComboOptions = new ComboOptions();
  pessoaRemoto2_Options: ComboOptions = new ComboOptions();
  pessoaRemoto3_Options: ComboOptions = new ComboOptions();

  veiculoLocal_Options: ComboOptions = new ComboOptions();
  veiculoRemoto1_Options: ComboOptions = new ComboOptions();
  veiculoRemoto2_Options: ComboOptions = new ComboOptions();
  veiculoRemoto3_Options: ComboOptions = new ComboOptions();

  squareSize: number = 150;

  shiftX: number;
  shiftY: number;

  userAction: number = 0;

  captureSettings: boolean = false;

  @ViewChild("video") video: ElementRef;
  @ViewChild("canvas") canvas: ElementRef;
  @ViewChild("canvasReal") canvasReal: ElementRef;
  @ViewChild("square") square: ElementRef;

  public captures: Array<any>;


  focusedElement = { DOM: null,
                   width: 0,
                  height: 0,
                 screenX: 0,
                 screenY: 0,
              translateX: 0,
              translateY: 0 };

  videoBound: any;
  squareBound: any;

  constructor () {

    this.tabConfiguracao.add("tabLocal", "Local", true);
    this.tabConfiguracao.add("tabRemoto1", "Remoto 1", false);
    this.tabConfiguracao.add("tabRemoto2", "Remoto 2", false);
    this.tabConfiguracao.add("tabRemoto3", "Remoto 3", false);

    this.opcoesCaptura.name = "rdOpcoesCaptura";
    this.opcoesCaptura.add(1, "Pessoa", "pessoa", true);
    this.opcoesCaptura.add(0, "Veículo", "veiculo");
    this.opcoesCaptura.disable();

    this.quadroCaptura.name = "rdQuadroCaptura";
    this.quadroCaptura.add(160, "160 X 160", "0.9375", true);
    this.quadroCaptura.add(200, "200 X 200", "0.75");
    this.quadroCaptura.add(240, "240 X 240", "0.625");
    this.quadroCaptura.add(280, "280 X 280", "0.5357");
    this.quadroCaptura.add(0, "Sem Quadro", "0.4166");

    this.terminal_Option.name = "cbTerminal";
    this.terminal_Option.add("Local", "local", 0, true);
    
  }

  public ngAfterViewInit() {

    const capture: Capture = JSON.parse(window.localStorage.getItem("capture"));

    if(capture != null) {
      this.opcoesCaptura.select(capture.opcoes);
      this.quadroCaptura.select(capture.quadro);
      this.terminal_Option.selectbyValue(capture.deviceID);
    } else {
      this.opcoesCaptura.select(1);
      this.quadroCaptura.select(0);
    }

    this.canvas.nativeElement.width = 160;
    this.canvas.nativeElement.height = 160;

    this.captureModal.video = this.video;
    this.captureModal.mediaDevice = navigator.mediaDevices;

    this.captureModal.mediaDevice.enumerateDevices()
      .then((deviceInfos: MediaDeviceInfo[]) => {
        this.terminal_Option.clear();
        let index: number = 0;
        deviceInfos.forEach((device: MediaDeviceInfo) => {
          if(device.kind == 'videoinput') {
            this.terminal_Option.add(device.label, device.deviceId, index);
            index++;
          }
        })
      })
      .catch(this.errorCallback);

    this.quadroCaptura_Change()

  }

  errorCallback(error: DecodeErrorCallback) {
    // Tratar Retorno CallBack...
  }

  quadroCaptura_Change() {

    this.squareSize = this.quadroCaptura.itemSelected.id;

    this.videoBound = this.video.nativeElement.getBoundingClientRect();

    if(this.quadroCaptura.itemSelected.id > 0) {
      this.square.nativeElement.style.backgroundColor = "#283352";
      this.square.nativeElement.style.borderColor = "#ff0000";

      this.square.nativeElement.style.minWidth = this.squareSize + "px";
      this.square.nativeElement.style.minHeight = this.squareSize + "px";    

      this.squareBound = this.square.nativeElement.getBoundingClientRect();

      this.square.nativeElement.style.left = (this.videoBound.left + ((this.videoBound.width / 2) - (this.squareBound.width / 2))) + "px";   
      this.square.nativeElement.style.top = (this.videoBound.top + ((this.videoBound.height / 2) - (this.squareBound.height / 2))) + "px"

      this.canvas.nativeElement.width = this.squareSize;
      this.canvas.nativeElement.height = this.squareSize;

      this.canvasReal.nativeElement.width = this.squareSize;
      this.canvasReal.nativeElement.height = this.squareSize;  
  
    } else {

      this.square.nativeElement.style.backgroundColor = "transparent";
      this.square.nativeElement.style.borderColor = "transparent";

      this.square.nativeElement.style.left = this.videoBound.left + "px";
      this.square.nativeElement.style.top = this.videoBound.top + "px";

      this.square.nativeElement.style.minWidth = this.videoBound.width + "px";
      this.square.nativeElement.style.minHeight = this.videoBound.height + "px";  

      this.canvas.nativeElement.width = this.videoBound.width;
      this.canvas.nativeElement.height = this.videoBound.height;

      this.canvasReal.nativeElement.width = this.videoBound.width;
      this.canvasReal.nativeElement.height = this.videoBound.height;  

    }

  }

  onSave_Click() {
    this.onCapture.emit(this.captures[0]);
    this.onClose_Click();
  }

  onVideo_Click(event: any) { }

  onMouseDown(event: any) {    
    if(this.quadroCaptura.itemSelected.id > 0) {
      const square: any = this.square.nativeElement;
      const boundSquare: any = square.getBoundingClientRect();
  
      this.shiftX = event.clientX - boundSquare.left;
      this.shiftY = event.clientY - boundSquare.top;
      this.userAction = 1;    
    }
  }

  onMouseMove(event: any) {
    if(this.quadroCaptura.itemSelected.id > 0) {
      if(this.userAction == 1) {
        if((event.pageX - this.shiftX) >= this.videoBound.left && 
           (event.pageY - this.shiftY) >= this.videoBound.top &&
           ((event.pageX - this.shiftX) + this.squareBound.width) <= this.videoBound.right && 
           ((event.pageY - this.shiftY) + this.squareBound.height) <= this.videoBound.bottom) {
          this.square.nativeElement.style.left = (event.pageX - this.shiftX) + "px";
          this.square.nativeElement.style.top = (event.pageY - this.shiftY) + "px";  
        }
      }  
    }
  }

  onMouseUp(event: any) {
    this.userAction = 0;

    const video: any = this.video.nativeElement;

    const videoAreaLeft = video.getBoundingClientRect().left;
    const videoAreaTop = video.getBoundingClientRect().top;
    const videoAreaRight = video.getBoundingClientRect().height;

    let lx: number = (event.pageX - this.shiftX) - videoAreaLeft;
    let ly: number = (event.pageY - this.shiftY) - videoAreaTop;

    if(lx < 0) lx = 0;
    if(ly < 0) ly = 0;

    const context = this.canvas.nativeElement.getContext("2d");
    context.clearRect(0, 0, 160, 160);

    if(this.squareSize > 0) {
      context.drawImage(video, lx, ly, this.squareSize, this.squareSize, 0, 0, 160, 160);
    } else {
      context.drawImage(video, 0, 0, this.videoBound.width, this.videoBound.height, 0, 0, 160, 160);
    }
    
    const contextReal = this.canvasReal.nativeElement.getContext("2d");

    if(this.squareSize > 0) {
      contextReal.clearRect(0, 0, this.squareSize, this.squareSize);
      contextReal.drawImage(this.video.nativeElement, lx, ly, this.squareSize, this.squareSize, 0, 0, this.squareSize, this.squareSize);  
    } else {
      contextReal.clearRect(0, 0, this.videoBound.width, this.videoBound.height);
      contextReal.drawImage(this.video.nativeElement, 0, 0, this.videoBound.width, this.videoBound.height, 0, 0, this.videoBound.width, this.videoBound.height);  
    }

    this.captures = [];
    this.captures.push(this.canvasReal.nativeElement.toDataURL("image/png"));

    this.captureModal.captured = true;

  }

  onTerminal_Change(terminal: Item) {
    if(this.captureModal.mediaSteam) {
      this.captureModal.stop_Media();
      this.captureModal.constraints.video.deviceId = { exact: terminal.value }  
    }
    this.captureModal.start_Media()    
  }

  onConfigurar_Click() {
    this.captureModal.showSquare = !this.captureModal.showSquare;
    this.captureSettings = !this.captureSettings;    
  }

  onClose_Click() {

    const capture: Capture = {opcoes: this.opcoesCaptura.itemSelected.id,
                              quadro: this.quadroCaptura.itemSelected.id,
                            deviceID: this.terminal_Option.itemSelected.value};

    window.localStorage.setItem("capture", JSON.stringify(capture));
    
    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext("2d");
    context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    this.captureModal.showSquare = false;
    this.captureSettings = false;
    this.captureModal.hide();
  }

  onConfig_Close_Click(){
    this.captureModal.showSquare = true;
    this.captureSettings = false;
  }

}