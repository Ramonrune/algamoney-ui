import { LazyLoadEvent } from 'primeng/components/common/api';
import { PessoaFiltro, PessoaService } from './../pessoa.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];

  constructor(private pessoaService: PessoaService) {

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



}
