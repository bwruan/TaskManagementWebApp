import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LogIn } from '../model/log-in';
import { UserService } from '../service/user-service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Output('openModalEvent') openModalEvent = new EventEmitter();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  openModal(): void{
    this.openModalEvent.emit(true);
  }

  logOut(): void{
    this.userService.logOut()
    .subscribe(res => {
      localStorage.clear();
    }, err =>{

    });
  }

  isLoggedIn(): boolean{
    return localStorage.length > 0;
  }
}
