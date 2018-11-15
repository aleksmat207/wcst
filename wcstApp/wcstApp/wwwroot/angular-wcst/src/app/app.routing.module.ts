import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { NgModule } from '../../node_modules/@angular/core';

const routes: Routes=[
{ path: '', redirectTo: '/cards', pathMatch: 'full'},
{ path: 'cards', component: CardsComponent}
];
 
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}