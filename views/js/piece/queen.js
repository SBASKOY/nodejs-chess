class Queen {
    constructor(ctx, pos, img, type) {
        this.context = ctx;
        this.pos = pos;
        this.img = img;
        this.type = type;
        this.clicked = false;
        this.draw();

    }
    draw = (ps) => {
        this.pos.current = this;
        var cord = !ps ? this.pos : ps;
        this.context.drawImage(this.img, cord.x, cord.y, gridsize, gridsize);
        if (ps) {
            this.pos = ps;
            this.pos.current = this;
        }
    }
    delete = () => {
        this.context.beginPath();
        context.fillStyle = this.pos.color;
        this.context.fillRect(this.pos.x, this.pos.y, gridsize, gridsize);
    }
    onClick = (event, board) => {
        var avaibleRect = [];
        var xAxis = event.name.slice(0, 1);
        var yAxis = event.name.slice(1);

        var index = letters.indexOf(xAxis);
        var movable = [letters[index - 1], letters[index], letters[index + 1]];
        
        var pos = event.name.slice(0, 2);
        for (var i = parseInt(yAxis) - 1; i <= parseInt(yAxis) + 1; i++) {
            for (var j = 0; j < 3; j++) {
                pos = movable[j] + i;
                var rect = board[pos];
                this.drawIsClicked(rect)
                if (this.checkRect(rect)) {
                    avaibleRect.push(rect);
                }
            }
        }
        this.clicked = !this.clicked;
        return avaibleRect;
    }
    checkRect = (rect) => {
        if (!rect) return false;
        if (rect.current) {
            if (rect.current.type == this.type) {
                return false;
            }
        }
        return true;
    }
    drawIsClicked = (rect) => {
        if (!rect) {
            return;
        }
        this.context.beginPath();
        if (this.clicked) {
            context.fillStyle = rect.color;
            this.context.moveTo(rect.x, rect.y);
            context.fillRect(rect.x, rect.y, gridsize, gridsize);
            if (rect.writeText) {
                rect.writeText(rect.text);
            }
            if (rect.current) {
                rect.current.draw();
            }
        } else {

            if (!rect.current) {
                this.context.moveTo(rect.center.x, rect.center.y);
                this.context.arc(rect.center.x, rect.center.y, 7, 0, 2 * Math.PI, false);
                this.context.fillStyle = moveIt;

                this.context.fill();
            } else {
                if (rect.current.type === this.type) {

                    return;
                } else {
                    this.context.moveTo(rect.center.x, rect.center.y);
                    this.context.arc(rect.center.x, rect.center.y, 7, 0, 2 * Math.PI, false);
                    this.context.fillStyle = takeIt;
                    this.context.fill();
                }
            }

        }

    }

}
