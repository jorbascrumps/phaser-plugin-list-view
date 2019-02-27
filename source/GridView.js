import ListView from './ListView';

export default class GridView extends ListView {

    constructor ({
        cellWidth = undefined,
        cellHeight = undefined,
        gutter = 0,
        ...options
    }) {
        super(options);

        this.height = options.height + gutter;
        this.width = options.width + gutter;

        this.cellHeight = parseInt(cellHeight, 10);
        this.cellWidth = parseInt(cellWidth, 10);
        this.gutter = parseInt(gutter, 10);
    }

    settle() {
        const children = this.getChildren();

        if (children.length === 0) {
            return this;
        }

        const {
            height,
            width,
        } = children[0].getBounds();
        const cellWidth = (this.cellWidth || width) + this.gutter;
        const cellHeight = (this.cellHeight || height) + this.gutter;

        Phaser.Actions.GridAlign(children, {
            width: Math.floor(this.width / cellWidth),
            cellWidth,
            cellHeight,
            x: this.x + (cellWidth / 2) + this.gutter,
            y: this.y + (cellHeight / 2) + this.gutter,
        });

        return this.resizeCamera();
    }

}
