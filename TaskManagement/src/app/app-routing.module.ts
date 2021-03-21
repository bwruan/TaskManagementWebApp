import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjectPageComponent } from './project/project-page/project-page.component';
import { ProjectComponent } from './project/project.component';
import { UpdateAccountComponent } from './update-account/update-account.component';

const routes: Routes = [
  {path: "accountsetting", component: UpdateAccountComponent},
  {path: "projects", component: ProjectComponent},
  {path: "projects/:id", component: ProjectPageComponent}
  // {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
