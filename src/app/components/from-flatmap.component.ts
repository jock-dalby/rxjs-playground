import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';
import { ObservableInput } from 'rxjs/Observable';

const MOVIES = [
    'Star Wars',
    'Pulp Fiction',
    'Shawshank'
];

@Component({
  selector: 'from-flatmap',
  template: `
  <button #button id="button">Get Movies</button>
  <ul id="output">
      <li *ngFor="let movie of movies">{{movie}}</li>
    </ul>
  `
})
export class FromFlatmapComponent implements OnInit {
    @ViewChild('button') button;
    clicks$: Observable<any>;
    movies: any;

    load(url: string): ObservableInput<{}> {
        return Observable.create(observer => {
          const data = MOVIES;
          observer.next(data);
          observer.complete();
        });
    }

    ngOnInit() {
      this.clicks$ = Observable.fromEvent(this.button.nativeElement, 'click');
      this.clicks$.flatMap(e => this.load('movies.json'))
        .subscribe(
          (data) => {this.movies = data; },
          e => console.log(`error ${e}`),
          () => console.log('complete')
        );
    }
}
