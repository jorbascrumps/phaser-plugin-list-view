function onItemOver (item) {
    item.setAlpha(1);
}

function onItemOut (item) {
    item.setAlpha(0.5);
}

function onItemDown (item, i) {
    item.setAlpha(0.75);
    console.log(`Item #${i + 1} clicked!`);
}

function onItemUp (item) {
    item.setAlpha(1);
}

function create () {
    const listItems = new Array(250)
        .fill()
        .map((_, i) => {
            const text = this.add.text(0, 0, `Item #${i + 1}`, {
                fontSize: 20,
                fontFamily: 'Arial'
            })
                .setPadding({
                    bottom: 6,
                    left: 8,
                    right: 8,
                    top: 8
                });

            return this.add.container(0, 0)
                .add([
                    this.add.rectangle(0, 0, 400, text.displayHeight, 0x6666ff)
                        .setOrigin(0, 0),
                    text,
                ])
                .setAlpha(0.5)
        });

    const listview = this.add.listview(200, 100, 400, 400)
        .setScrollbarEnabled({
            colour: 0x6666ff,
            width: 16,
        })
        .on('pointerover',onItemOver)
        .on('pointerout', onItemOut)
        .on('pointerdown', onItemDown)
        .on('pointerup', onItemUp)
        .add(listItems);
}

new Phaser.Game({
    height: 600,
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
    scene: {
        create,
    },
    width: 800,
});
