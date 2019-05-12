import { ToastyService } from 'ng2-toasty';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { PessoaFiltro, PessoaService } from './../pessoa.service';
import { Component, ViewChild } from '@angular/core';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  @ViewChild('tabela') grid;
  pessoas = [];

  constructor(
    private pessoaService: PessoaService,
    private confirmation: ConfirmationService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService) {

  }


  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro).then(response => {
      this.pessoas = response.pessoas;
      this.totalRegistros = response.total
    });

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

  excluir(pessoa: any) {


    this.pessoaService.excluir(pessoa.codigo).then(() => {
      if (this.grid.first === 0) {
        this.pesquisar();
      } else {
        this.grid.first = 0;
      }
      this.toasty.success('Pessoa excluída com sucesso!');

    }).catch(erro => this.errorHandler.handle(erro));

  }


  mudarStatus(pessoa: any) {
    console.log(pessoa);
    this.pessoaService.mudarStatus(pessoa.codigo, !pessoa.ativo).then(() => {
      if (this.grid.first === 0) {
        this.pesquisar();
      } else {
        this.grid.first = 0;
      }
      this.toasty.success('Pessoa ' + (!pessoa.ativo === true ? 'ativada' : 'desativada') + ' com sucesso!');

    }).catch(erro => this.errorHandler.handle(erro));
  }


}
