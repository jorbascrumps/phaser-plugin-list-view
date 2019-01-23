const GetFastValue = Phaser.Utils.Objects.GetFastValue;

export default class ListView extends Phaser.GameObjects.Group {

    constructor ({
        id,
        context,
        height = 100,
        width = 100,
        x = 0,
        y = 0
    } = {}) {
        super(context, null, {});

        this.id = id;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.events = {};
        this.createCallback = this.settle;
        this.removeCallback = this.settle;

        this.zone = new Phaser.GameObjects.Zone(context, x, y, width, height)
            .setInteractive({
                hitArea: new Phaser.Geom.Rectangle(width / 2, height / 2, width, height),
                hitAreaCallback: Phaser.Geom.Rectangle.Contains,
                draggable: true
            });

        const cameraName = `ListViewCamera${this.id}`;
        this.camera = this.scene.cameras.add(x, y, width, height)
            .setOrigin(0, 0)
            .setName(cameraName);

        /*
        NOTE: Drag is temporarily disabled

        this.scrollPos = 0;
        this.zone.on('dragstart', (pointer, x, y) => this.scrollPos = this.camera.scrollY);
        this.zone.on('drag', (pointer, x, y) => {
            const min = this.y;
            const max = this.y + this.camera._bounds.height - this.camera.height;

            const clampedValue = Phaser.Math.Clamp(y, min, max);
            const scrollPerc = Phaser.Math.Clamp((clampedValue - min) / (max - min), 0, 1);
            const cameraScroll = this.camera.height - clampedValue;

            if (isNaN(scrollPerc)) {
                return;
            }

            this.camera.setScroll(0, this.scrollPos + cameraScroll);

            if (undefined !== this.scrollBar) {
                const barScroll = this.y + (this.height - this.scrollBar.displayHeight) * (1 - scrollPerc);

                this.scrollBar.setY(barScroll);
            }
        });
        */
    }

    setScrollbarEnabled (config) {
        if (!config) {
            return this;
        }

        const colour = GetFastValue(config, 'colour', 0xffffff);
        const alpha = colour ? GetFastValue(config, 'alpha', 1) : 0;
        const width = GetFastValue(config, 'width', 10);
        const textureName = `ListViewScrollBarTex${this.id}`;

        this.scene.make.graphics({ x: 0, y: 0, add: false })
            .fillStyle(colour, alpha)
            .fillRect(0, 0, 100, 100)
            .generateTexture(textureName, 10, 10);
        this.scrollBar = this.scene.add.image(0, 0, textureName)
            .setOrigin(0, 0)
            .setDisplaySize(width, this.height)
            .setPosition(this.x + this.width, this.y)
            .setInteractive({
                useHandCursor: true
            })
            .setDepth(1);

        this.scene.input.setDraggable(this.scrollBar);

        this.scrollBar.on('drag', (pointer, x, y) => {
            const min = this.y;
            const max = this.y + this.height - this.scrollBar.displayHeight;

            const clampedValue = Phaser.Math.Clamp(y, min, max);
            const scrollPerc = Phaser.Math.Clamp((clampedValue - min) / (max - min), 0, 1);
            const barScroll = clampedValue;

            if (isNaN(scrollPerc)) {
                return;
            }

            const cameraScroll = this.y + (this.camera._bounds.height - this.camera.height) * scrollPerc;

            this.scrollBar.setY(barScroll);
            this.camera.setScroll(0, cameraScroll);
        });

        return this;
    }

    preUpdate () {
        const cameras = this.scene.cameras.cameras;

        for (const child of this.getChildren()) {
            for (const camera of cameras) {
                if (camera.id === this.camera.id) {
                    continue;
                }

                camera.ignore(child);
            }
        }

        for (const child of this.scene.sys.displayList.getAll()) {
            if (this.contains(child)) {
                continue;
            }

            this.camera.ignore(child);
        }
    }

    update() {
        const {
            camera: {
                _bounds: {
                    height
                }
            }
        } = this;
        const percHeight = Phaser.Math.Clamp(this.camera.height / height, 0.1, 1);
        const scrollbarHeight = Phaser.Math.Clamp(percHeight * this.height, 10, this.height);

        this.scrollBar && this.scrollBar.setDisplaySize(this.scrollBar.displayWidth, scrollbarHeight);
    }

    add (items = []) {
        for (const item of Array.isArray(items) ? items : [ items ]) {
            const listBounds = this.getBounds();
            const itemBounds = item.getBounds();

            item
                .setPosition(this.x, this.y + listBounds.height)
                .setInteractive({
                    hitArea: new Phaser.Geom.Rectangle(0, 0, itemBounds.width, itemBounds.height),
                    hitAreaCallback: Phaser.Geom.Rectangle.Contains,
                    useHandCursor: true,
                    draggable: true,
                });

            for (const event in this.events) {
                item.on(event, () => this.events[event](
                    item,
                    this.getChildren().indexOf(item),
                    this.getChildren()
                ));
            }

            super.add(item);
        }

        const {
            height,
            width
        } = this.getBounds();
        this.camera.setBounds(this.x, this.y, width, height);

        return this;
    }

    removeAt (index) {
        const childToRemove = this.children.entries[index];

        if ('undefined' === typeof childToRemove) {
            return this;
        }

        return this.remove(childToRemove);
    }

    settle () {
        let childY = this.y;
        for (const child of this.getChildren()) {
            child.setPosition(this.x, childY);

            childY += child.getBounds().height;
        }

        const {
            height,
            width,
            x,
            y,
        } = this.getBounds();

        this.camera.setBounds(x, y, width, height);

        const percHeight = Phaser.Math.Clamp(this.camera.height / this.camera._bounds.height, 0.1, 1);
        const scrollbarHeight = Phaser.Math.Clamp(percHeight * this.height, 10, this.height);

        this.scrollBar && this.scrollBar.setDisplaySize(this.scrollBar.displayWidth, scrollbarHeight);

        return this;
    }

    on (event, fn) {
        this.events[event] = fn;

        return this;
    }

    getBounds () {
        let bounds = new Phaser.Geom.Rectangle(this.x, this.y, 0, 0);

        for (const child of this.getChildren()) {
            Phaser.Geom.Rectangle.MergeRect(bounds, child.getBounds());
        }

        return bounds;
    }

}
