import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { UsuarioFormComponent } from './components/usuarios/usuario-form/usuario-form.component';
import { UsuarioListComponent } from './components/usuarios/usuario-list/usuario-list.component';
import { ProdutosListComponent } from './components/produtos/produtos-list/produtos-list.component';
import { VendaFormComponent } from './components/vendas/venda-form/venda-form.component';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: PrincipalComponent, children: [
            { path: 'Dashboard', component: DashboardComponent },
            { path: 'Usuarios', component: UsuarioListComponent },
            { path: 'Usuarios/new', component: UsuarioFormComponent },
            { path: 'Usuarios/edit/:id', component: UsuarioFormComponent },
            { path: 'Produtos', component: ProdutosListComponent },
            { path: 'Produtos/new', component: ProdutosListComponent },
            { path: 'Produtos/edit/:id', component: ProdutosListComponent },
            { path: 'Venda', component: VendaFormComponent }
        ]
    },
    { 
        path: 'funcionario', component: PrincipalComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'Produtos/new', component: ProdutosListComponent },
            { path: 'Produtos/edit/:id', component: ProdutosListComponent },
            { path: 'venda', component: VendaFormComponent }
        ]
    },
];
