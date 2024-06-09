import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MarcasComponent } from './marcas/marcas.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { CarritocomprasComponent } from './carritocompras/carritocompras.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [

    {
        path: 'home',component:HomeComponent
    },
    {
        path: 'marcas', component: MarcasComponent
    },
    {
        path: 'ofertas', component:OfertasComponent
    },
    {
        path: 'carrito', component:CarritocomprasComponent
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: '**', redirectTo: 'home'
    }

];

 