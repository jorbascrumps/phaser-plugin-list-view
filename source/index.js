import ListView from './ListView';

export default class WindowManager extends Phaser.Plugins.BasePlugin {

    constructor (scene, pluginManager) {
        super(scene, pluginManager);

        pluginManager.registerGameObject('listview', this.createListView);
    }

    createListView (x, y, width, height) {
        const listview = new ListView({
            context: this.scene,
            height,
            width,
            x,
            y
        });

        this.displayList.add(listview);
        this.updateList.add(listview);

        return listview;
    }

}
