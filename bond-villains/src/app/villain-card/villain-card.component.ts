import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Villain } from '../villain.model';
import { VillainService } from '../villain.service';

@Component({
  selector: 'app-villain-card',
  templateUrl: './villain-card.component.html',
  styleUrls: ['./villain-card.component.scss']
})
export class VillainCardComponent {
  villains$: Observable<Villain[]>;

  constructor(private villainService: VillainService) {
    this.villains$ = this.villainService.randomVillains(5, 0);
  }

  quickReload() {
    this.villains$ = this.villainService.randomVillains(5, 0);
  }

  cacheReload() {
    this.villains$ = this.villainService.cachedVillains(5);
  }

  slowReload(delayReload: number) {
    this.villains$ = this.villainService.randomVillains(5, delayReload);
  }

  backgroundRequest() {
    this.villainService.randomVillains(1, 0).subscribe();
  }
}
