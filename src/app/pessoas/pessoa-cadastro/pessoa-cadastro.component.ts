import { FormControl } from '@angular/forms';
import { Pessoa } from './../../core/model';
import { ToastyService } from 'ng2-toasty';
import { PessoaService } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { errorHandler } from '@angular/platform-browser/src/browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {


  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  salvar(pessoaForm: FormControl) {
    this.pessoaService.salvar(this.pessoa)
      .then( () => {
        this.toasty.success('Pessoa adicionada com sucesso!');
        pessoaForm.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

}
