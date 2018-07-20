import UIPane from './UIPane';

export default class WindowManager extends Phaser.Plugins.BasePlugin {

    constructor (scene, pluginManager) {
        super(scene, pluginManager);

        pluginManager.registerGameObject('window', this.createWindow);
    }

    createWindow (x, y, width, height) {
        const window = new UIPane({
            context: this.scene,
            height,
            width,
            x,
            y
        });

        this.displayList.add(window);
        this.updateList.add(window);

        return window;
    }

}
