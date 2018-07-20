export default class UIPane extends Phaser.GameObjects.Container {

    constructor ({
        context,
        height = 100,
        width = 100,
        x = 0,
        y = 0,
        padding = 10,
        background = 0x009688
    } = {}) {
        super(context, x, y);

        this.setExclusive(true);
        this.setSize(width, height);

        this.setInteractive({
            hitArea: new Phaser.Geom.Rectangle(width / 2, height / 2, width, height),
            hitAreaCallback: Phaser.Geom.Rectangle.Contains,
            draggable: true,
            useHandCursor: true
        });

        this.backgroundColour = background;
        this.camera = this.scene.cameras.add(this.x + padding, this.y + padding, this.width - padding * 2, this.height - padding * 2);

        this.scrollPos = 0;
        this.scene.input.on('dragstart', (pointer, target) =>
            target === this && (this.scrollPos = this.camera.scrollY)
        );
        this.scene.input.on('drag', (pointer, target, x, y) =>
            target === this && this.camera.setScroll(0, this.scrollPos - (y - this.y))
        );

        this.createBackground();
    }

    preUpdate (...args) {
        const cameras = this.scene.cameras.cameras;

        this.getAll()
            .forEach(child =>
                cameras.forEach(camera =>
                    camera.id !== this.camera.id && camera.ignore(child)
                )
            );

        this.scene.sys.displayList.getAll()
            .forEach(child => this.camera.ignore(child));

        return this.update(...args);
    }

    add (items = []) {
        (Array.isArray(items) ? items : [ items ])
            .map(item => {
                const {
                    height
                } = this.getBounds();
                const x = 0;
                const y = height > 0 ? height + 10 : 0;

                item
                    .setPosition(x, y)
                    .setOrigin(0, 0);

                super.add(item);
            });

        const {
            height,
            width
        } = this.getBounds();
        this.camera.setBounds(this.x, this.y, width, height);

        return this;
    }

    createBackground () {
        return this.scene.add.graphics(0, 0)
            .fillStyle(this.backgroundColour, 1)
            .fillRoundedRect(this.x, this.y, this.width, this.height, 5)
            .setDepth(-1);
    }

}
