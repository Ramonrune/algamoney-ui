import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Pessoa, Contato } from './../../core/model';
import { ToastyService } from 'ng2-toasty';
import { PessoaService } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {


  pessoa = new Pessoa();
  exibindoFormularioContato = false;
  contato: Contato;

  titulo: string;

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {

    const codigoPessoa = this.route.snapshot.params['codigo'];
    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
      this.titulo = 'Editar pessoa';
    } else {
      this.titulo = 'Nova Pessoa';
      this.title.setTitle(this.titulo);

    }


  }

  prepararNovoContato() {
    this.exibindoFormularioContato = true;
    this.contato = new Contato();
  }

  confirmarContato(frm: FormControl) {
    this.pessoa.contatos.push(this.clonarContato(this.contato));
    this.exibindoFormularioContato = false;
    frm.reset();
  }

  clonarContato(contato: Contato): Contato {
    return new Contato(contato.codigo, contato.nome, contato.email, contato.telefone);
  }
  carregarPessoa(codigo: number) {
    this.pessoaService.buscaPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }


  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  salvar(pessoaForm: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(pessoaForm);
    } else {
       this.adicionarPessoa(pessoaForm);
    }

  }


  adicionarPessoa(pessoaForm: FormControl) {
    this.pessoaService.salvar(this.pessoa)
    .then(pessoa => {
      this.toasty.success('Pessoa adicionada com sucesso!');
      this.router.navigate(['/pessoas', pessoa.codigo]);

    })
    .catch(erro => this.errorHandler.handle(erro));
  }


  atualizarPessoa(pessoaForm: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.toasty.success('Pessoa alterada com sucesso!');

        this.atualizarTituloEdicao();

      })
      .catch(erro => this.errorHandler.handle(erro))
  }


  novo(form: FormControl) {
    this.pessoa = new Pessoa();

    form.reset(this.pessoa);

    this.router.navigate(['/pessoas/nova']);
  }

}
