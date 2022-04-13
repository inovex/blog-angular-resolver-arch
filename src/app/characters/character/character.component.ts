import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '../../api/star-wars.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoutingService } from '../../routing.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
})
export class CharacterComponent implements OnInit {
  character!: Character;

  constructor(
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private routingService: RoutingService,
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.character = data['character'];
      this.snackbar.open(`Character ${this.character.name} loaded`, undefined, { duration: 1_000 });
    });
  }

  async reload() {
    await this.routingService.reloadDetails();
  }
}
