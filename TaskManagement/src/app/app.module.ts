import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DpDatePickerModule} from 'ng2-date-picker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './service/user-service';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjectComponent } from './project/project.component';
import { ProjectPageComponent } from './project/project-page/project-page.component';
import { TaskComponent } from './task/task.component';
import { ProjectService } from './service/project-service';
import { TaskService } from './service/task-service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SignUpComponent,
    LogInComponent,
    UpdateAccountComponent,
    NotFoundComponent,
    ProjectComponent,
    ProjectPageComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DpDatePickerModule
  ],
  providers: [UserService, ProjectService, TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
