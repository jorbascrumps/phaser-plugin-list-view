# Phaser Window Manager
_Note: Phaser Window Manager is currently in a prelrelease state and is therefore subject to frequent (sometimes undocumented) breaking changes._

## Installation
```
npm i phaser-window-manager
```
Then add to your game config:
```js
import WindowManagerPlugin from 'phaser-window-manager';

new Phaser.Game({
  plugins: [
    scene: [
      {
        key: 'WindowManager',
        plugin: WindowManagerPlugin,
        start: true
      }
    ]
  ]
});
```

## Usage
The plugin registers a new custom Game Object that is available from within your scenes:
```js
this.add.window(100, 100, 500, 500);
```

## TODO
- [ ] Additional documentation
- [ ] Tests
