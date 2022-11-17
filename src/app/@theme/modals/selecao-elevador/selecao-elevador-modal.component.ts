import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { SelecaoElevadorModalService } from './service/selecao-elevador-modal.service';
import { ComboOptions, Item } from 'src/app/@theme/components/form/combobox/service/combobox.service';
import { Filter, Find, ListViewGrid, SelectGroupComponent } from '../../components';
import { ElevadorDispositivo, 
         ElevadorDispositivoData, 
         ElevadorDispositivoFilter, 
         ElevadorDispositivoSort, 
         read_ElevadorDispositivo } from 'src/app/@core/data/dispositivo-elevador';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { OptionsGroup } from '../../components/form/select-group/service/select-group.service';


@Component({
    selector: 'nex-selecao-elevador-modal',
    templateUrl: './selecao-elevador-modal.component.html',
    styleUrls: ['./selecao-elevador-modal.component.scss']
  })
  export class SelecaoElevadorModalComponent implements AfterViewInit {

  @Input() title: string;
  @Input() selecaoElevadorModal: SelecaoElevadorModalService;
  @Output() eventSelectGroup: EventEmitter<any> = new EventEmitter(null);

  id: number = 0;
  elevador_Option: ComboOptions = new ComboOptions();
  andares_Option: OptionsGroup = new OptionsGroup();

  order_by: ElevadorDispositivoSort = { nome: SortOperationKind.ASC };
  areaId: number;

  constructor(private elevadorDispositivoService: ElevadorDispositivoData) {

    this.elevador_Option.name = "cbElevadorModal";
    this.elevador_Option.add("", "", 0);

    this.andares_Option.name = "andaresOptions";
    this.andares_Option.maxHeight = 239;
    
  }

  ngAfterViewInit(): void {
    this.selecaoElevadorModal?.showSubject
      .subscribe(() => {
        this.areaId = this.selecaoElevadorModal?.areaId; 
        const sortElevadorDispositivo: ElevadorDispositivoSort = { nome: SortOperationKind.ASC};
        const elevadorFilter: ElevadorDispositivoFilter = { areaId: { eq: this.areaId}}
        this.elevadorDispositivoService.readElevadorDispositivos(sortElevadorDispositivo,elevadorFilter)
          .subscribe(({ dispositivoElevador}: read_ElevadorDispositivo ) =>{
            const nodes : ElevadorDispositivo[] = dispositivoElevador?.nodes;
            this.elevador_Option.clear();
            nodes?.forEach((node:ElevadorDispositivo)=>{
              this.elevador_Option.add(node.nome, node.nome, node.id)
            });
            this.update_Grid();
          });    
      });
  }

  onElevador_Change(){
    this.update_Grid()
  }

  update_Grid(find?: Find, filter?: Filter) {
    const elevadorFilter: ElevadorDispositivoFilter = { id: {eq: this.elevador_Option.itemSelected.id}};
    this.elevadorDispositivoService.readElevadorDispositivos(this.order_by,elevadorFilter)
      .subscribe(({ dispositivoElevador }: read_ElevadorDispositivo) => {
        const node = dispositivoElevador.nodes[0];
        this.andares_Option.clear();
        if(node) {            
          for (let index = 1; index <= 48; index++) {
            const andar:string = node["andar" + ("00" + index).slice(-2) + "Nome"];
            if(andar.length > 0) {
              this.andares_Option.add(index, andar, andar)
            }  
          };

          const elevadorSelectGroup: any[] = this.selecaoElevadorModal.paramList;
          if(elevadorSelectGroup.length > 0) {
            const index: number = elevadorSelectGroup.findIndex(elevador => elevador.elevadorId == this.elevador_Option.itemSelected.id);
            if(index >= 0) {
              this.andares_Option.populateBy_BIN(elevadorSelectGroup[index].elevadorAndar);
            }            
          }
        }
      });
  }

  onAplicar_Click() {
    const andaresBIN: string = this.andares_Option.valueBINOf_All()
    const elevadorAndar = andaresBIN + '0'.repeat(48 - andaresBIN.length);
    this.eventSelectGroup.emit({elevadorId: this.elevador_Option.itemSelected?.id,
                                elevadorNome: this.elevador_Option.itemSelected?.text,
                                elevadorAndar: elevadorAndar});    
    this.onClose_Click(); 
  }

  onClose_Click() {
    this.elevador_Option.clear();
    this.andares_Option.clear();
    this.selecaoElevadorModal.hide();
  }

}
  