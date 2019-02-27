import GridView from './GridView';
import ListView from './ListView';

export default class ListViewPlugin extends Phaser.Plugins.BasePlugin {

    constructor (scene, pluginManager) {
        super(scene, pluginManager);

        pluginManager.registerGameObject('gridview', this.createGridView);
        pluginManager.registerGameObject('listview', this.createListView);
    }

    createGridView (x, y, width, height, options) {
        const gridview = new GridView({
            ...options,
            id: Date.now(),
            context: this.scene,
            height,
            width,
            x,
            y,
        });

        this.updateList.add(gridview);

        return gridview;
    }

    createListView (x, y, width, height) {
        const listview = new ListView({
            id: Date.now(),
            context: this.scene,
            height,
            width,
            x,
            y
        });

        this.updateList.add(listview);

        return listview;
    }

}
