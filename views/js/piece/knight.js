class Knight {
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

        var x1 = letters[index + 1];

        var x2 = letters[index - 1];

        var x3 = letters[index + 2];

        var x4 = letters[index - 2];

        var y1 = parseInt(yAxis) + 2;

        var y2 = parseInt(yAxis) - 2;

        var y4 = parseInt(yAxis) + 1;

        var y5 = parseInt(yAxis) - 1;

        var pos1 = x1 + y1;
        var pos2 = x1 + y2;

        var pos3 = x2 + y1;
        var pos4 = x2 + y2;

        var pos5 = x3 + y4;
        var pos6 = x3 + y5;

        var pos7 = x4 + y4;
        var pos8 = x4 + y5;
        
        var rect1 = board[pos1];
        this.drawIsClicked(rect1)

        if (this.checkRect(rect1)) {
            avaibleRect.push(rect1);
        }


        var rect2 = board[pos2];
        this.drawIsClicked(rect2)
        if (this.checkRect(rect2)) {
            avaibleRect.push(rect2);
        }
        var rect3 = board[pos3];
        this.drawIsClicked(rect3)
        if (this.checkRect(rect3)) {
            avaibleRect.push(rect3);
        }

        var rect4 = board[pos4];
        this.drawIsClicked(rect4)
        if (this.checkRect(rect4)) {
            avaibleRect.push(rect4);
        }
        var rect5 = board[pos5];
        this.drawIsClicked(rect5)
        if (this.checkRect(rect5)) {
            avaibleRect.push(rect5);
        }

        var rect6 = board[pos6];
        this.drawIsClicked(rect6)
        if (this.checkRect(rect6)) {
            avaibleRect.push(rect6);
        }
        var rect7 = board[pos7];
        this.drawIsClicked(rect7)
        if (this.checkRect(rect7)) {
            avaibleRect.push(rect7);
        }
        var rect8 = board[pos8];
        this.drawIsClicked(rect8)
        if (this.checkRect(rect8)) {
            avaibleRect.push(rect8);
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