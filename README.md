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

## Components
The plugin registers the following custom Game Objects that are available from within your scenes:

### ListView
#### Example
```js
this.add.listview(100, 100, 500, 500);
```

## TODO
- [ ] Additional documentation
- [ ] Tests
