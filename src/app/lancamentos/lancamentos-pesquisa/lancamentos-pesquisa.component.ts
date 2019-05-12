import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  @ViewChild('tabela') grid;

  lancamentos = [];

  constructor(
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.lancamentos = resultado.lancamentos;
        this.totalRegistros = resultado.total;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir ?',
      accept: () => {
        this.excluir(lancamento);
      }

    });
  }

  excluir(lancamento: any) {


    this.lancamentoService.excluir(lancamento.codigo).then(() => {
      if (this.grid.first === 0) {
        this.pesquisar();
      } else {
        this.grid.first = 0;
      }
      this.toasty.success('Lançamento excluido com sucesso!');

    }).catch(erro => this.errorHandler.handle(erro));

  }

}
