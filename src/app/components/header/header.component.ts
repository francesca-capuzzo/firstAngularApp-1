import { Component} from '@angular/core';
import { ComService } from 'src/app/services/com.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  // @Output() public onMenuClicked: EventEmitter<any>;

  // eslint-disable-next-line no-unused-vars
  constructor(private comS: ComService) {
    // this.onMenuClicked = new EventEmitter();
  }
  


  menuClick(): void{
    // this.onMenuClicked.emit();
    this.comS.isDrawerOpen.next(!this.comS.isDrawerOpen.value);
  }

}
