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

    delete() {
        let ele = document.querySelector("#" + this.id);
        ele.remove();
    }

    static isSprite(x) {
        return (x instanceof sprite);
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

let timer = 0;

let timerClockId = setInterval(() => timer++, 1000);

let dino = new sprite({ x: 0, y: 70, width: 30, height: 30, img: "/source/dino.png" });

let isFailed = false;

function activateFail() {
    clearInterval(timerClockId)
    isFailed = true;
    alert("You failed! (score: " + timer + ")");
    window.location.reload();
}

let events = [{
    exec: function () {
        let bird = new sprite({ x: 300, y: 10, width: 30, height: 30, img: "/source/bird.png" });
        for (let i = 0; i < 45; i++)
            setTimeout(() => {
                bird.x -= 7.5;
            }, i * 50);
        let clockId = setInterval(() => {
            if (isFailed) clearInterval(clockId);
            else if (bird.collision(dino)) activateFail();
        })
        setTimeout(() => {
            bird.delete();
            clearInterval(clockId);
        }, 46 * 50);
    }, duration: () => (Math.random() * 1000 + 1000)
}, {
    exec: function () {
        console.log("!")
        let block = new sprite({ x: 300, y: 75, width: 25, height: 25, img: "/source/short.png" });
        for (let i = 0; i < 45; i++)
            setTimeout(() => {
                block.x -= 7.5;
            }, i * 50);
        let clockId = setInterval(() => {
            if (isFailed) clearInterval(clockId);
            else if (block.collision(dino)) activateFail();
        })
        setTimeout(() => {
            block.delete();
            clearInterval(clockId);
        }, 46 * 50);
    }, duration: () => (Math.random() * 1000 + 1000)
}];

function eventsTrigger() {
    let c = events[Math.floor(Math.random() * events.length)]
    c.exec();
    setTimeout(eventsTrigger, c.duration());
}
eventsTrigger();

let dinoCtrlLocked = false;
const ctrlKeycodes = ["ArrowUp"]
function moveDino(e) {
    if (!ctrlKeycodes.includes(e.code)) return;
    let initinalY = dino.y;
    if (!dinoCtrlLocked) {
        dinoCtrlLocked = true;
        setTimeout(() => { dinoCtrlLocked = false; }, 800)
        switch (e.code) {
            case "ArrowUp":
                for (let i = 0; i < 15; i++)
                    setTimeout(() => {
                        dino.y -= 45 / 15;
                    }, i * 20);
                for (let i = 15; i < 20; i++)
                    setTimeout(() => {
                        dino.y -= 5 / 5;
                    }, i * 20);
                for (let i = 20; i < 25; i++)
                    setTimeout(() => {
                        dino.y -= 5 / 5;
                    }, i * 20);
                for (let i = 25; i < 40; i++)
                    setTimeout(() => {
                        dino.y += 45 / 15;
                    }, i * 20);
                setTimeout(() => {
                    dino.y = initinalY;
                }, 40 * 20);
            // case "ArrowDown":
        }
    }
}

document.addEventListener('keydown', moveDino);
