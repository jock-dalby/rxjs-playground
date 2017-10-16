import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { Observable } from 'rxjs';

const MOVIES = [
    'Star Wars',
    'Pulp Fiction',
    'Shawshank'
];

@Component({
  selector: 'get-movies',
  template: `
  <button #button id="button">Get Movies</button>
  <ul id="output">
      <li *ngFor="let movie of movies">{{movie}}</li>
  </ul>
  `
})
export class GetMoviesComponent implements OnInit {
  @ViewChild('button') button;
  clicks$: Observable<any>;

  movies: any[];

  load(url: string): void {
      this.movies = MOVIES;
  }

  ngOnInit() {
    this.clicks$ = Observable.fromEvent(this.button.nativeElement, 'click');
    this.clicks$.subscribe(
      // If the first parameter passed to the subscribe
      // method its a function, it will be the 'next' function.

      (e) => {
        this.load('./movies.json');
      },

      // The second will be the error function

      error => console.log(`error ${error}`),

      // and the third will be complete function

      () => console.log(`complete`)
    );
  }
}