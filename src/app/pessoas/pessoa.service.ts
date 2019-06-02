import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Pessoa } from 'app/core/model';


export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: AuthHttp) { }


  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();


    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString())

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }


    return this.http.get(`${this.pessoasUrl}`, {search: params})
      .toPromise()
      .then(response => {
        const pessoasJson = response.json();
        console.log(pessoasJson);
        const pessoas = pessoasJson.content;

        const resultado = {
          pessoas,
          total: pessoasJson.totalElements
        }

        return resultado;
      });

  }


  listarTodas(): Promise<any> {
    const params = new URLSearchParams();


    return this.http.get(`${this.pessoasUrl}`)
      .toPromise()
      .then(response => {
        return response.json().content;
      });

  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`).toPromise().then( () => null);
  }

  mudarStatus(codigo: number, status: boolean): Promise<void> {
    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, status).toPromise().then( () => null);
  }

  salvar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa))
     .toPromise()
     .then(resposta => resposta.json());
  }


  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, JSON.stringify(pessoa))
      .toPromise()
      .then(response => {
        return response.json();
      });
  }

  buscaPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        return response.json();
      });
  }
}
