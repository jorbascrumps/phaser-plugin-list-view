# Phaser List View Plugin
_Note: This project is currently in a prerelease state and is therefore subject to frequent (sometimes undocumented) breaking changes._

## Installation
```
npm i phaser-plugin-list-view -S
```
Then add to your game config:
```js
import ListViewPlugin from 'phaser-plugin-list-view';

new Phaser.Game({
  plugins: [
    scene: [
      {
        key: 'ListView',
        plugin: ListViewPlugin,
        start: true
      }
    ]
  ]
});
```

## Basic Usage
The plugin registers a new custom `Game Object` that is available from within your scenes:
```js
this.add.listview(100, 100, 500, 500);
```

## API

### `ListView.add(child)`
##### Arguments
* **child** (GameObject|GameObject[]) &mdash; The child to add to the bottom of the list

**Returns** a `ListView` object.

## TODO
- [ ] Additional documentation
- [ ] Component demos
- [ ] Tests
