# Phaser ListView Plugin
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
const listItems = new Array(15)
    .fill()
    .map((_, i) =>
        this.add.text(0, 0, `Item #${i} (x1)`, {
            fontSize: 20,
            fontFamily: 'Arial'
        })
            .setPadding({ bottom: 12 })
    );

const listview = this.add.listview(0, 0, 200, 400)
    .on('pointerdown', (item, i, items) => console.log(`Item #${i} was clicked`))
    .add(listItems);
```

## API

### `ListView.add(child)`
#### Arguments
* **child** (GameObject|GameObject[]) &mdash; The child to add to the bottom of the list

**Returns** a `ListView` object.

### `ListView.removeAt(index)`
#### Arguments
* **index** (Number) &mdash; The index of the child to remove

**Returns** a `ListView` object.

### `ListView.setScrollbarEnable(config)`
#### Arguments
* **config** (Boolean|Object) &mdash; Can either be a `Boolean` specifying if a scrollbar should be rendered or an `Object` containing the following optional properties:
  * **alpha** (Number) &mdash; The alpha to render the scrollbar  
  * **colour** &mdash; The colour to render the scrollbar
  * **width** (Number) &mdash; The width to render the scrollbar

**Returns** a `ListView` object.

### `ListView.on(event, fn)`
#### Arguments
* **event** (String) &mdash; Any Phaser v3 GameObject event (ie, `pointerdown`) that will be attached to each list item. Refer to [the documentation](https://photonstorm.github.io/phaser3-docs/index.html) for details 
* **fn(item, index, items)** (Function) &mdash; The callback function for the event

**Returns** a `ListView` object.

### `ListView.settle()`
Updates children positions after a mutation occurs. Primarily used for internal operations but is available to you for special occasions.

**Returns** a `ListView` object.

## Limitations
This plugin utilizes Phaser's GameObject exclusion to create the scrolling effect. As of this writing, Phaser only [supports 31 unique cameras](https://github.com/photonstorm/phaser/blob/master/src/cameras/2d/CameraManager.js#L58-L62) before being unable to support GameObject exclusion. This means that your game can only contain a limited amount of `ListViews` (31 minus however many cameras you've added yourself).

## TODO
- [ ] Add items at specified position
- [ ] Additional documentation
- [ ] Component demos
- [ ] Touch controls/ draggable scroll
- [ ] Item separator
- [ ] Integration with ScaleManager
- [ ] Tests
- [ ] Grid layout support
