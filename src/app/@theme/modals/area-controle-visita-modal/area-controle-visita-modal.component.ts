import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { SortOperationKind } from 'src/app/@core/api/generic-graphql';
import { PessoaGrupo, PessoaGrupoData, PessoaGrupoFilter, PessoaGrupoSort, read_PessoaGrupo } from 'src/app/@core/data/grupo-pessoa';
import { InputLabel } from '../../components';
import { AlertServiceComponent } from '../../components/form/alert-card/service/alert-card.service';
import { ComboOptions } from '../../components/form/combobox/service/combobox.service';
import { AreaControleVisitaModalService } from './service/area-controle-visita-modal.service';



@Component({
    selector: 'nex-area-controle-visita-modal',
    templateUrl: './area-controle-visita-modal.component.html',
    styleUrls: ['./area-controle-visita-modal.component.scss']
  })
  export class AreaControleVisitaModalComponent {

    @Input() title: string;
    @Input() areaControleVisitaModal: AreaControleVisitaModalService;
    @Output() eventSelect: EventEmitter<any> = new EventEmitter(null);

    id: number = 0;
    grupoPessoa_Option: ComboOptions = new ComboOptions();
    quantidade_Text: InputLabel = new InputLabel();

    alertService: AlertServiceComponent = new AlertServiceComponent();
 
    constructor(private pessoaGrupoService: PessoaGrupoData,) {

      this.grupoPessoa_Option.name = "cbGrupoPessoa";

      this.quantidade_Text.name = "txtQuantidade";
      this.quantidade_Text.text = "";
      this.quantidade_Text.rules = "onlynumbers"
      this.quantidade_Text.maxLength = 4;
      this.quantidade_Text.minLength = 1;

      this.grupoPessoa();
   
    }

    grupoPessoa() {
      const sortGrupoPessoa: PessoaGrupoSort = { pessoaGrupo: SortOperationKind.ASC };
      const filterGrupoPessoa: PessoaGrupoFilter = {or: [{ pessoaPrestador: { eq: true } },
                                                         { pessoaVisitante: { eq: true } }]};
  
      this.pessoaGrupoService.readPessoaGrupos(sortGrupoPessoa, filterGrupoPessoa)
        .subscribe(({ grupoPessoa }: read_PessoaGrupo) => {
          const nodes: PessoaGrupo[] = grupoPessoa.nodes;
          nodes.forEach((node: PessoaGrupo) => {
            this.grupoPessoa_Option.add(node.pessoaGrupo, null, node.id);
          });
          this.grupoPessoa_Option.focus();
        });
    }

    grupoPessoaChange() {
      event.preventDefault();
      this.quantidade_Text.focus();
    }

    onAplicar_Click() {
      const index: number = this.areaControleVisitaModal.
        pessoaGrupoLista?.find(pessoaGrupo => pessoaGrupo == this.grupoPessoa_Option.itemSelected.id)
      if(index >= 0) {
        this.alertService.show('ERRO',
                               'O Grupo de Pessoa escolhido já faz parte do quadro de Visita desta Área. Verifique!',
                               null);
      } else {
        this.quantidade_Text.validated = this.quantidade_Text.text > "0";

        if( !this.quantidade_Text.validated) {
          this.alertService
            .show("ERRO", "A quantidade informada deve estar entre os valores 1 a 9999. Verifique!", null);
        } else {
          this.eventSelect.emit({ pessoaGrupoId: this.grupoPessoa_Option.itemSelected.id,
                                  pessoaGrupo: {pessoaGrupo: this.grupoPessoa_Option.itemSelected.text},
                                  quantidade: parseInt(this.quantidade_Text.text)});
          this.onClose_Click();
        }            
      }
    }
  
    onClose_Click() {
        this.areaControleVisitaModal.hide();
        this.quantidade_Text.clear();
        this.grupoPessoa_Option.clear();
        this.grupoPessoa();
      }
}
  