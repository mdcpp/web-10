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
