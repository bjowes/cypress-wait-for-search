import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Villain } from '../villain.model';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-villain-list',
  templateUrl: './villain-list.component.html',
  styleUrls: ['./villain-list.component.scss']
})
export class VillainListComponent implements OnInit {
  villains$: Observable<Villain[]>;
  loadStart: Date;
  loadComplete: Date;

  @Input()
  set villains(newVillains$: Observable<Villain[]>) {
    this.loadComplete = undefined;
    this.loadStart = new Date();
    this.villains$ = newVillains$.pipe(
      tap(() => {
        this.loadComplete = new Date();
      })
    );
  }

  displayedColumns: string[] = ['villain', 'movie', 'actor', 'year'];

  constructor() {}

  ngOnInit(): void {}
}
