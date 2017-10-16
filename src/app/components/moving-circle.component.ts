import { Component, OnInit, AfterViewInit } from '@angular/core';

import { Observable } from 'rxjs';

@Component({
  selector: 'moving-circle',
  template: `<div id="circle"></div>`,
  styles: [
    `
    #circle {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: red;
      position: absolute;
    }
    `
  ]
})
export class MovingCircleComponent implements OnInit, AfterViewInit {

  circle: HTMLElement;

  source = Observable.fromEvent(document, 'mousemove')
                      .map((e: MouseEvent) => {
                        return {
                          x: e.clientX,
                          y: e.clientY
                        };
                      })
                      .filter(value => value.x < 500)
                      .delay(300);

  ngOnInit() {
    this.source.subscribe(
      // If the first parameter passed to the subscribe
      // method its a function, it will be the 'next' function.

      (value) => {
        this.circle.style.left = `${value.x}px`;
        this.circle.style.top = `${value.y}px`;
      },

      // The second will be the error function

      error => console.log(`error ${error}`),

      // and the third will be complete function

      () => console.log(`complete`)
    );
  }

  ngAfterViewInit(): void {
    this.circle = document.getElementById('circle');
  }
}