import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Observer } from 'rxjs/Observer';

@Component({
  selector: 'app-from-method',
  template: `<h1>Basic observable</h1>`
})
export class FromMethodComponent implements OnInit {

  numbers = [1, 2, 3, 4];
  source = Observable.from(this.numbers);

  ngOnInit() {
    this.source.subscribe(new MyObserver());
  }
}

class MyObserver implements Observer<number> {
  // Observer interface demands there to be a next, error and complete method
  next(value) {
    console.log(`value ${value}`);
  }
  error(error) {
    console.log(`error ${error}`);
  }

  complete() {
    console.log(`complete`);
  }
}
