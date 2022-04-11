import { Component } from '@angular/core';
import { RoutingService } from './routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(private routingService: RoutingService) {
  }

  currentDetails$ = this.routingService.detailsData$;
}
