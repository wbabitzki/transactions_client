import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'transactions_client';
  opened = true;
  
  isLoading: Observable<boolean>;
  
  constructor(private globalService: GlobalService) { 
  }

  ngOnInit() {
    this.isLoading = this.globalService.isLoading$;
  }
}
