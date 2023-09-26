import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroClienteComponent } from './pages/cliente/cadastro-cliente/cadastro-cliente.component';
import { ListagemClienteComponent } from './pages/cliente/listagem-cliente/listagem-cliente.component';
import { ListagemContaComponent } from './pages/contas/listagem-conta/listagem-conta.component';
import { CadastroContaComponent } from './pages/contas/cadastro-conta/cadastro-conta.component';
import { OperacaoContaComponent } from './pages/contas/operacao-conta/operacao-conta.component';

const routes: Routes = [
  {
    path: 'cliente',
    children: [
      {
        path: 'novo',
        component: CadastroClienteComponent
      },
      {
        path: 'editar/:id',
        component: CadastroClienteComponent
      },
      {
        path: '',
        component: ListagemClienteComponent,
      },
    ]
  },
  {
    path: 'conta',
    children: [
      {
        path: 'nova',
        component: CadastroContaComponent
      },
      {
        path: 'editar/:id',
        component: CadastroContaComponent
      },
      {
        path: 'operacao/:id/:type',
        component: OperacaoContaComponent
      },
      {
        path: '',
        component: ListagemContaComponent,
      },
    ]
  },
  {
    path: '',
    component: ListagemClienteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }





