import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  // { path: '', component: TodoListComponent},
  { path: '', redirectTo: '/list', pathMatch: 'full'},
  { path: 'list', component: TodoListComponent},
  { path: 'list/:id', component: TodoItemComponent},
  { path: 'list-items', component: TodoItemComponent},
  { path: '**', component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ AppComponent, TodoItemComponent, TodoListComponent,PageNotFoundComponent,]