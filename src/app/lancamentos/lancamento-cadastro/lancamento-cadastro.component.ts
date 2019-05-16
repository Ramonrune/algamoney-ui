import { LancamentoService } from './../lancamento.service';
import { FormControl } from '@angular/forms';
import { Lancamento } from './../../core/model';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { CategoriasService } from './../../categorias/categorias.service';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {


  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();


  constructor(
    private lancamentoService: LancamentoService,
    private categoriaService: CategoriasService,
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute) {


  }


  ngOnInit() {
    console.log(this.route.snapshot.params['codigo']);

    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
      .then(() => {
        this.toasty.success('Lançamento adicionado com sucesso!');
        form.reset();
        this.lancamento = new Lancamento();

      }).catch(erro => this.errorHandler.handle(erro));
    console.log(this.lancamento);
  }

  carregarCategorias() {
    this.categoriaService.listarTodas().then(categorias => {
      this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo}) );
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    this.pessoaService.listarTodas().then(pessoas => {
      this.pessoas = pessoas.map(p => ({ label: p.nome, value: p.codigo}) );
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
}
