import { AuthService } from './../seguranca/auth.service';
import { CategoriasService } from './../categorias/categorias.service';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PessoaService } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { Title } from '@angular/platform-browser';
import { JwtHelper } from 'angular2-jwt';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { DashboardService } from 'app/dashboard/dashboard.service';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
    RouterModule
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  exports: [
    NavbarComponent,
    ToastyModule,
    ConfirmDialogModule
  ],
  providers: [
    DashboardService,
    LancamentoService,
    PessoaService,
    CategoriasService,
    ConfirmationService,
    AuthService,
    JwtHelper,
    Title,
    { provide: LOCALE_ID, useValue: 'pt' },
    ErrorHandlerService],
})
export class CoreModule { }
