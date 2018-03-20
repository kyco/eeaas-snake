import './snake.css';
import $ from 'jquery';

const Snake = {
  name: 'Snake',

  startTrigger: 'snake',

  stopTrigger: 'esc',

  stop() {
    window.snake = window.snake || {};
    window.snake.active = false;
    clearInterval(window.snake.gameInterval);
    $(document).off('keydown.snake', window.snake.keyPush);
    if (window.snake.markup && window.snake.markup.parentNode) {
      window.snake.markup.parentNode.removeChild(window.snake.markup);
    }
  },

  start() {
    // Config
    window.snake = window.snake || {};
    window.snake.active = true;
    window.snake.width = 300;
    window.snake.height = 300;
    window.snake.speed = 80; // higher is slower
    window.snake.tailInitial = 5;
    window.snake.px = window.snake.py = 10; // starting position
    window.snake.gs = 15;
    window.snake.tc = 20;
    window.snake.ax = window.snake.ay = 15;
    window.snake.xv = window.snake.yv = 0;
    window.snake.random = 2;
    window.snake.trail = [];
    window.snake.tail = window.snake.tailInitial; // start length
    window.snake.score = 0;

    $('body').append(`
      <div id="snake-game-wrapper">
        <div id="snake-game-score">${window.snake.score}</div>
        <canvas id="snake-game-canvas" width="${window.snake.width}" height="${window.snake.height}"></canvas>
      </div>
    `);

    window.snake.markup = document.getElementById('snake-game-wrapper');
    window.snake.canvas = document.getElementById('snake-game-canvas');
    window.snake.context = window.snake.canvas.getContext('2d');
    window.snake.canvas.style.top = `${window.innerHeight / 2 - window.snake.canvas.offsetHeight / 2}px`;
    window.snake.canvas.style.left = `${window.innerWidth / 2 - window.snake.canvas.offsetWidth / 2}px`;

    // Game logic
    window.snake.game = function() {
      window.snake.score = window.snake.tail - window.snake.tailInitial;
      $('#snake-game-score').html(window.snake.score);
      window.snake.px += window.snake.xv;
      window.snake.py += window.snake.yv;

      if (window.snake.px < 0) {
        window.snake.px = window.snake.tc - 1;
      }
      if (window.snake.px > window.snake.tc - 1) {
        window.snake.px = 0;
      }
      if (window.snake.py < 0) {
        window.snake.py = window.snake.tc - 1;
      }
      if (window.snake.py > window.snake.tc - 1) {
        window.snake.py = 0;
      }

      window.snake.context.fillStyle = '#fff';
      window.snake.context.fillRect(0, 0, window.snake.canvas.width, window.snake.canvas.height);
      window.snake.context.fillStyle = '#0078bf';

      for (let i = 0; i < window.snake.trail.length; i++) {
        window.snake.context.fillRect(
          window.snake.trail[i].x * window.snake.gs,
          window.snake.trail[i].y * window.snake.gs,
          window.snake.gs - window.snake.random,
          window.snake.gs - window.snake.random
        );
        if (window.snake.trail[i].x === window.snake.px && window.snake.trail[i].y === window.snake.py) {
          window.snake.tail = window.snake.tailInitial;
        }
      }

      window.snake.trail.push({
        x: window.snake.px,
        y: window.snake.py
      });

      while (window.snake.trail.length > window.snake.tail) {
        window.snake.trail.shift();
      }

      if (window.snake.ax === window.snake.px && window.snake.ay === window.snake.py) {
        window.snake.tail++;
        window.snake.ax = Math.floor(Math.random() * window.snake.tc);
        window.snake.ay = Math.floor(Math.random() * window.snake.tc);
      }

      window.snake.context.fillStyle = '#339e00';
      window.snake.context.fillRect(
        window.snake.ax * window.snake.gs,
        window.snake.ay * window.snake.gs,
        window.snake.gs - window.snake.random,
        window.snake.gs - window.snake.random
      );
    };

    // Key listeners
    window.snake.keyPush = function(e) {
      switch (e.keyCode) {
        case 37:
          window.snake.xv = -1;
          window.snake.yv = 0;
          break;
        case 38:
          window.snake.xv = 0;
          window.snake.yv = -1;
          break;
        case 39:
          window.snake.xv = 1;
          window.snake.yv = 0;
          break;
        case 40:
          window.snake.xv = 0;
          window.snake.yv = 1;
          break;
        // no default
      }
    };

    // Start game
    $(document).on('keydown.snake', window.snake.keyPush);
    window.snake.gameInterval = setInterval(window.snake.game, window.snake.speed);
  }
};

export default Snake;
