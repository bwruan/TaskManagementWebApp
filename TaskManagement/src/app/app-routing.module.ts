import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjectComponent } from './project/project.component';
import { UpdateAccountComponent } from './update-account/update-account.component';

const routes: Routes = [
  {path: "accountsetting", component: UpdateAccountComponent},
  {path: "projectpage", component: ProjectComponent}
  // {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
