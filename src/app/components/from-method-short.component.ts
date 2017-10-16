import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Observer } from 'rxjs/Observer';

@Component({
  selector: 'from-method-short',
  template: `<h1>Basic observable short</h1>`
})
export class FromMethodShortComponent implements OnInit {

  numbers = [1, 2, 3, 4];
  source = Observable.from(this.numbers);

  ngOnInit() {
    this.source.subscribe(
      // If the first parameter passed to the subscribe
      // method its a function, it will be the 'next' function.

      value  => console.log(`value ${value}`),

      // The second will be the error function

      error => console.log(`error ${error}`),

      // and the third will be complete function

      () => console.log(`complete`)
    );
  }
}

