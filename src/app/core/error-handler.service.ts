import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlerService {

  constructor(private toastyService: ToastyService) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string'){
      msg = errorResponse;
    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente';
      console.log(errorResponse);
    }
    this.toastyService.error('Ocorreu um erro ' + msg);
  }

}
