// Icon credit: https://opengameart.org/content/fantasy-icon-pack-by-ravenmore-0

function onItemOver (item) {
    item.getByName('background').setAlpha(1);
}

function onItemOut (item) {
    item.getByName('background').setAlpha(0.5);
}

function onItemDown (item, i) {
    item.setAlpha(0.75);
    console.log(`Item #${i + 1} clicked!`);
}

function onItemUp (item) {
    item.setAlpha(1);
}

function createInventoryItem () {
    const image = this.add.sprite(0, 0, 'items', 0)
        .setDisplaySize(75, 75)
        .setOrigin(0, 0);
    const frame = Phaser.Math.Between(0, image.texture.frameTotal);

    return this.add.container(0, 0)
        .add([
            this.add.rectangle(0, 0, image.displayWidth, image.displayHeight, 0x666666)
                .setName('background')
                .setOrigin(0, 0)
                .setAlpha(0.5),
            image
                .setFrame(frame),
        ]);
}

function preload () {
    this.load.spritesheet({
        key: 'items',
        url: 'spritesheet.png',
        frameConfig: {
            frameWidth: 512,
            frameHeight: 512,
            endFrame: 38,
        }
    });
}

function create () {
    const gridItems = new Array(40)
        .fill()
        .map(createInventoryItem.bind(this));

    const cellWidth = 75;
    const cellHeight = cellWidth
    const numCols = 6;
    const numRows = 3.5;
    const gutter = 1;
    const width = (cellWidth * numCols) + (gutter * numCols);
    const height = (cellHeight * numRows) + (gutter * numRows);

    const gridview = this.add.gridview(175, 150, width, height, {
        gutter,
    })
        .setScrollbarEnabled({
            colour: 0x666666,
            width: 4,
        })
        .on('pointerover',onItemOver)
        .on('pointerout', onItemOut)
        .on('pointerdown', onItemDown)
        .on('pointerup', onItemUp)
        .add(gridItems);
}

new Phaser.Game({
    parent: 'example',
    plugins: {
        scene: [
            {
                key: 'ListView',
                plugin: ListViewPlugin,
                start: true,
            },
        ],
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        height: 600,
        max: {
            height: 600,
            width: 800,
        },
        mode: Phaser.Scale.FIT,
        parent: 'game',
        width: 800,
    },
    scene: {
        create,
        preload,
    },
});
