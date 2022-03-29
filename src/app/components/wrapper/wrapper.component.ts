import { Component, OnInit } from '@angular/core';
import { ComService } from 'src/app/services/com.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  public drawerOpen = false;

  // eslint-disable-next-line no-unused-vars
  constructor(public comS: ComService) { }

  ngOnInit(): void {
    this.comS.isDrawerOpen.subscribe(isOpen => {
      this.drawerOpen = isOpen;
    });

  }

}
