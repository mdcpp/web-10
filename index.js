let spriteCount = 0;
class sprite {
    constructor(x) {
        let root = document.createElement("div")
        root.classList.add("fix");
        root.id = "sprite_" + spriteCount;
        this.id = root.id;
        spriteCount++;
        root.innerHTML = `<img></img>`;
        document.documentElement.append(root);
        Object.assign(this, x);
    }

    update() {
        let ele = document.querySelector("#" + this.id);
        ele.style = `top:${this._y}px;left:${this._x}px`;
        ele.children[0].width = this.width;
        ele.children[0].height = this.height;
        ele.children[0].src = this._img;
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

    collision(spriteA) {
        function inline(a, b, c, d) {
            function mid(a, b, c) {
                if (a > c) { let tmp = a; a = c; c = tmp; }
                return (a <= b) && (b <= c);
            }
            return (mid(a, c, b) || mid(a, d, b)) && (mid(c, a, d) || mid(c, b, d))
        }
        return inline(this.x, this.x + this.width, spriteA.x, spriteA.x + spriteA.width) && inline(this.y, this.y + this.height, spriteA.y, spriteA.y + spriteA.height)
    }

    get img() {
        return this._img;
    }
    set img(x) {
        this._img = x;
        this.update();
    }
    get visible() {
        return this._visible;
    }
    set visible(x) {
        this._visible = x;
        this.update();
    }
    set width(x) {
        this._width = x;
        this.update();
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    set height(x) {
        this._height = x;
        this.update();
    }
    get y() {
        return this._y;
    }
    set y(y) {
        this._y = y;
        this.update();
    }
    get x() {
        return this._x;
    }
    set x(x) {
        this._x = x;
        this.update();
    }
}

let test = new sprite({ x: 50, y: 50, width: 50, height: 50, img: "/source/dino.jpg" });

let counter = 0;

setInterval(() => {
    const step = 12;
    if (counter % step < step / 2) test.x += 5; else test.x -= 5;
    counter = (counter + 1) % step;
}, 50);
