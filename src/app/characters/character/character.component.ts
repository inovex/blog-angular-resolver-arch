import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { Character } from '../../api/star-wars.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoutingService } from '../../routing.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
})
export class CharacterComponent {

  constructor(
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private routingService: RoutingService,
  ) {
  }

  character$ = this.route.data.pipe(
    map(data => data['character'] as Character),
    tap(character => this.snackbar.open(`Character ${character.name} loaded`, undefined, { duration: 1_000 })),
  );

  async reload() {
    await this.routingService.reload();
  }
}
