import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Output('openModalEvent') openModalEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  openModal(): void{
    console.log("inside navbar open modal");
    this.openModalEvent.emit(true);
  }
}
