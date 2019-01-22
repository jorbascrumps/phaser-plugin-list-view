import ListView from './ListView';

export default class ListViewPlugin extends Phaser.Plugins.BasePlugin {

    constructor (scene, pluginManager) {
        super(scene, pluginManager);

        pluginManager.registerGameObject('listview', this.createListView);
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
