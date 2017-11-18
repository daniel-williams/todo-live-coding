import * as React from 'react';

import { EmptyProps, EmptyState } from '../../models';

import './styles.scss';


export class App extends React.Component<EmptyProps, EmptyState> {

  constructor(props: EmptyProps){
    super(props);
    this.makeItSnow = this.makeItSnow.bind(this);
  }

  canvas;

  componentDidMount() {
    this.makeItSnow();
  }

  render() {
    return (
      <section>
        <h1>App</h1>
        <div className='canvas' style={{ height: 300 }}>
          <canvas
            id='snow'
            style={{ "height": 300 }}
            ref={(input) => { this.canvas = input; }}></canvas>
        </div>
      </section>
    );
  }

  makeItSnow() {
    var c = this.canvas;
    var $ = c.getContext("2d");
    var w = c.width = c.parentElement.offsetWidth;
    var h = c.height = c.parentElement.offsetHeight;
    var animReq;

    Snowy();

    function Snowy() {
      var snow, arr = [];
      var num = 200, wobble = 0.5, speed = 0.5;
      var scale = 1.3, drift, mv = 20, minSpeed = 1;
      for (var i = 0; i < num; ++i) {
        snow = new Flake();
        snow.y = Math.random() * (h + 50);
        snow.x = Math.random() * w;
        snow.drift = Math.random() * (Math.PI * 2);
        snow.size = (100 / (10 + (Math.random() * 100))) * scale;
        snow.speed = (Math.pow(snow.size * .8, 2) * .15) * speed;
        snow.speed = snow.speed < minSpeed ? minSpeed : snow.speed;
        arr.push(snow);
      }

      run();

      function run() {
        animReq = requestAnimationFrame(run);
        $.clearRect(0, 0, w, h);
        $.fillStyle = 'rgba(0, 0, 0, 0)';
        $.fillRect(0, 0, w, h);
        $.fill();
        for (var i = 0; i < arr.length; ++i) {
          var f = arr[i];
          f.drift += .05;
          f.drift = f.drift >= Math.PI * 2 ? 0 : f.drift;
          f.y += f.speed;
          f.x += Math.sin(f.drift * wobble) * (f.size * .3);
          if (f.y > h + 50) f.y = -10 - Math.random() * mv;
          if (f.x > w + mv) f.x = - mv;
          if (f.x < - mv) f.x = w + mv;
          f.draw();
        }
      }

      function Flake() {
        this.draw = function () {
          this.g = $.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
          this.g.addColorStop(0, 'hsla(255,255%,255%,1)');
          this.g.addColorStop(1, 'hsla(255,255%,255%,0)');
          $.moveTo(this.x, this.y);
          $.fillStyle = this.g;
          $.beginPath();
          $.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
          $.fill()
        }
      }
    }

    window.addEventListener('resize', function () {
      //c.width = w = c.parentElement.offsetWidth;
      //c.height = h = c.parentElement.offsetHeight;
      cancelAnimationFrame(animReq);
      w = c.width = c.parentElement.offsetWidth;
      h = c.height = c.parentElement.offsetHeight;
      Snowy();
    }, false);
  }
}
