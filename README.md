# Snake

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

To test if it works type "snake" while the app is running. You should be presented with a 2D snake game. Use "esc" to cancel the game.

## Customisation

You can change the start and stop triggers to your liking, e.g. if you want different keylisteners simply change the `startTrigger` and `stopTrigger` properties.

Example:

```javascript
import Eeaas from 'eeaas';
import Snake from 'eeaas-snake';

Snake.startTrigger = 'secretstring';
Snake.stopTrigger = ['esc', 'spacebar'];

Eeaas.register(Snake);
Eeaas.enable();
```

Now, typing "secretstring" will launch the game. The game can be cancelled now by pressing the "esc" key or the "spacebar" key.
