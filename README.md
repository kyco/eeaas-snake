# DEPRECATED Snake

> [!NOTE]
> **This package has moved to: https://github.com/kyco/eeaas**


This is an easter egg to be used with the "eeaas" package.


## Installation

```javascript
yarn add eeaas
yarn add eeaas-snake
```

Once installed you can import the easter egg and enable it.


## Usage

```javascript
import Eeaas from 'eeaas';
import Snake from 'eeaas-snake';

Eeaas.register(Snake); // Register snake
Eeaas.enable(); // Enable all easter eggs, or alternatively use `Eeaas.Eggs.Snake.enable()` to only enable snake
```

To test if it works type "snake" while the app is running. You should be presented with a 2D snake game. Use the "esc" key to cancel the game.


## Custom keylisteners

To use different keylisteners change the `startTrigger` and/or `stopTrigger` attributes on the Snake object.

```javascript
import Eeaas from 'eeaas';
import Snake from 'eeaas-snake';

Snake.startTrigger = 'secretstring';
Snake.stopTrigger = ['esc', 'stop'];

Eeaas.register(Snake);
Eeaas.enable();
```

Now, typing "secretstring" will launch the game. Cancel the game by pressing the "esc" key or typing "stop".


## Custom start and/or stop trigger methods

To write your own custom methods you'll have to overwrite the `enable` and `disable` attributes on the Snake object as well as the relevant "trigger" attributes.

Example: You want to trigger the game only when a button is clicked

Add a button to your markup:
```
<button id="snake-trigger-button">Snake trigger</button>
```

Update the `enable`, `disable` and `startTrigger` attributes:
```javascript
import Eeaas from 'eeaas';
import Snake from 'eeaas-snake';

Object.assign(Snake, {
  enable() {
    this.startTrigger();
  },

  disable() {
    document.getElementById('snake-trigger-button').removeEventListener('click', this.start);
    this.stop();
  },

  startTrigger() {
    // The button needs to be in the DOM by the time this code runs
    document.getElementById('snake-trigger-button').addEventListener('click', this.start);
  }
});

Eeaas.register(Snake);
Eeaas.enable();
```
