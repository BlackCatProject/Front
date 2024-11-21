import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { UsuarioFormComponent } from './components/usuarios/usuario-form/usuario-form.component';
import { UsuarioListComponent } from './components/usuarios/usuario-list/usuario-list.component';
import { ProdutosListComponent } from './components/produtos/produtos-list/produtos-list.component';
import { VendaComponent } from './components/vendas/venda/venda.component';
import { loginGuard } from './auth/login.guard';
import { InvalidAcessComponent } from './components/invalid-acess/invalid-acess.component';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'invalid-access', component: InvalidAcessComponent },

    { path: 'admin', component: PrincipalComponent, canActivate: [loginGuard], children: [
            { path: 'dashboard', component: DashboardComponent },
            
            { path: 'usuarios', component: UsuarioListComponent },
            { path: 'usuarios/new', component: UsuarioFormComponent },
            { path: 'usuarios/edit/:id', component: UsuarioFormComponent },
            { path: 'produtos', component: ProdutosListComponent },
            { path: 'produtos/new', component: ProdutosListComponent },
            { path: 'produtos/edit/:id', component: ProdutosListComponent },
            { path: 'venda', component: VendaComponent },
        ]
    },
    { 
        path: 'funcionario', component: PrincipalComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'Produtos/new', component: ProdutosListComponent },
            { path: 'Produtos/edit/:id', component: ProdutosListComponent },
            { path: 'venda', component: VendaComponent }
        ]
    },
];
