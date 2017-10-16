import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Observer } from 'rxjs/Observer';

@Component({
  selector: 'app-create-method',
  template: `<h1>Basic observable</h1>`
})
export class CreateMethodComponent implements OnInit {

  numbers = [1, 2, 3, 4];
  source = Observable.create(observer => {
    for (let n of this.numbers) {

      if (n === 3) {
        // Invoking observer.error is similar to raising an exception.
        // It will stop the current process and exit out.
        observer.error('Something went wrong');
      }
      observer.next(n);
    }

    observer.complete();
  });

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
