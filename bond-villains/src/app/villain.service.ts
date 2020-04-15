import { Injectable } from '@angular/core';
import { Villain } from './villain.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VillainService {
  villainsCache: Villain[] = [];
  private url = 'http://localhost:4300/api/get/';

  constructor(private httpClient: HttpClient) {}

  randomVillains(count: number, delay: number): Observable<Villain[]> {
    return this.httpClient.get<Villain[]>(this.url + delay).pipe(
      tap(villains => (this.villainsCache = villains)),
      map(villains => {
        this.shuffle(villains);
        return villains.slice(0, count);
      })
    );
  }

  cachedVillains(count: number): Observable<Villain[]> {
    return of(this.villainsCache.slice(0, count));
  }

  private shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
