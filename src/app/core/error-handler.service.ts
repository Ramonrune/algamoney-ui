import { NotAuthenticatedError } from './../seguranca/money-http';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthHttpError } from 'angular2-jwt';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private router: Router,
    private toastyService: ToastyService) { }

  handle(errorResponse: any) {
    let msg: string;
    let generic = true;
    console.log(errorResponse);

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
      generic = false;
    }

    if (errorResponse instanceof NotAuthenticatedError) {
      msg = 'Sua sessão expirou!';
      generic = false;
      this.router.navigate(['/login']);

    }

    if (errorResponse instanceof Response && errorResponse.status >= 400 && errorResponse.status <= 499) {
      msg = 'Erro ao processar serviço remoto. Tente novamente';

      if (errorResponse.status === 403) {
        msg = 'Você não tem permissão para executar essa ação';
      }

      let erros;
      try {
        erros = errorResponse.json();
        msg = erros[0].mensagemUsuario
      } catch (e) {}

      console.log('Ocorreu um erro ' +  errorResponse);

      generic = false;
    }


    if (generic === true) {
      msg = 'Erro ao processar serviço remoto. Tente novamente';
      console.log('Ocorreu um erro ' +  errorResponse);
    }
    this.toastyService.error(msg);
  }

}
