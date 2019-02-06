import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-loader-modal',
  templateUrl: './loader-modal.component.html',
  styleUrls: ['./loader-modal.component.scss']
})
export class LoaderModalComponent implements OnInit {

  constructor() { }
  canvas;
  url;
  duration;
  frames;
  kernels;
  ctx;
  frame;
  start;
  image;

  ngOnInit() {
    this.startAnimation();
  }

  startAnimation() {
    let canvas = <HTMLCanvasElement>document.getElementById('canvas');
    let url = 'https://thepurcompany.com/assets/images/popcorn/popcorn_single2.png'
    let duration = 10 * 1000;
    let frames = 30;
    let kernels = 10;
    let ctx = canvas.getContext('2d');
    let frame = 0;
    let start = new Date().getTime();
    let image = new Image;
    image.src = url;
    image.onload = function () {
      console.log('onload');
      function pop() {
        ctx.drawImage(image,
            Math.floor(Math.random() * canvas.width),
            Math.floor(Math.random() * canvas.height),
            100, 50);
      }

      function animate() {
        let count = Math.floor(Math.sin(frame/ (frames / Math.PI)) * kernels);
        let delay;
        for (let i = 0; i < count; i++){
          delay = (duration / frames) / count * i;
          setTimeout(pop, delay);
        }
        if (++frame < frames) {
          setTimeout(animate, duration / frames);
        }
      }
      animate();
    }
  }

}
