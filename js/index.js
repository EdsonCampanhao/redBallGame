
const tela = document.querySelector('#console');
const context = tela.getContext('2d');
let onGame = true
let isFarAway = true;
let score = 0;
// context.fillStyle = '#c5e1f6';
// context.fillRect(0, 0, 1024, 320);
function gravity(obj) {

    if (obj.onAir == true) {

        if (obj.y < 170) {
            obj.y += 2
        } else {
            obj.onAir = false
        }
    }
}
const hurtSound = new Audio('../sounds/hit.wav');
function jump(obj) {
    if (obj.jumping == true) {

        if (obj.y > 70) {
            obj.y -= 2
        } else {
            obj.jumping = false
            obj.onAir = true
        }
    }
}
const bolaImage = new Image()
bolaImage.src = '../img/sprite-ball (1).png'
const bolaPosition = {
    kLeft: false,
    kRight: false,
    x: 0,
    y: 170,
    w: 50,
    h: 50,
    sprite: 1,
    onAir: false,
    jumping: false,
    keyIsPressed() {
        if (this.kLeft == true) {
            if (bolaPosition.x < 975) {
                bolaPosition.x += 5;
                if (bolaPosition.sprite < 400) {
                    bolaPosition.sprite += 94.5

                } else {
                    bolaPosition.sprite = 1
                }
            }
        } else if (this.kRight == true) {
            bolaPosition.x -= 5;
            if ((bolaPosition.sprite - 94.5) > 0) {
                bolaPosition.sprite -= 94.5

            } else {
                bolaPosition.sprite = 568
            }
        }
    },
    render() {
        context.drawImage(bolaImage, this.sprite, 0, 94, 110, bolaPosition.x, bolaPosition.y, bolaPosition.w, bolaPosition.h);
    }
}
const renderFloor = {
    x: 0,
    y: 0,
    w: 320,
    h: 300
}
const floor = new Image()
floor.src = "./img/scenery.jpg"
const floorPosition = {
    x: 0,
    y: 819,
    w: 971,
    h: 205,
    vel: 300,
    render() {
        context.drawImage(floor, this.x, this.y, this.w, this.h, (this.vel - 300), (320 - 115), 300, 115);
        context.drawImage(floor, this.x, this.y, this.w, this.h, (this.vel), (320 - 115), 300, 115);
        context.drawImage(floor, this.x, this.y, this.w, this.h, (this.vel + 300), (320 - 115), 300, 115);
        context.drawImage(floor, this.x, this.y, this.w, this.h, this.vel, (320 - 115), 300, 115);
        context.drawImage(floor, this.x, this.y, this.w, this.h, (this.vel + 300), (320 - 115), 300, 115);
        context.drawImage(floor, this.x, this.y, this.w, this.h, (this.vel + 600), (320 - 115), 300, 115);
        context.drawImage(floor, this.x, this.y, this.w, this.h, (this.vel + 900), (320 - 115), 300, 115);
        this.vel -= 1
        if (bolaPosition.x > 0) {
            bolaPosition.x -= 1
        }
        if (this.vel < 0) {
            this.vel = 300
        }
    },
}
class rockPosition {
    constructor() {
        this.x = 20;
        this.y = 100;
        this.w = 140;
        this.h = 140;
        this.height = 50;
        this.width = 50;
        this.position = 170
        this.moveValue = 1024;
    }
    render() {
        context.drawImage(rock, this.x, this.y, this.w, this.h, (this.moveValue), this.position, this.height, this.width)
    }
    move() {
        this.moveValue -= 1
    }
    kill() {
        if ((bolaPosition.x + 30 > this.moveValue && bolaPosition.x < this.moveValue + 35)
            &&
            (this.position - 35 <= bolaPosition.y)) {
            hurtSound.play()
            console.log('espetei um arrombado');
            onGame = false
        }
    }
}
const pedregulho = new rockPosition()
const listaDePedras = []
function geraPedras(isFarAway) {
    if (isFarAway) {
        const rock = new rockPosition()
        listaDePedras.push(rock)
    }
}

tela.focus()
tela.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'd':
            bolaPosition.kLeft = true
            break;
        case 'a':
            bolaPosition.kRight = true
            break;
        case 'w':
            if (bolaPosition.onAir != true)
                bolaPosition.jumping = true;
            break;
    }
})
tela.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'd':
            bolaPosition.kLeft = false
            break;
        case 'a':
            bolaPosition.kRight = false
            break;
    }
})
function loop() {
    if (onGame) {
        requestAnimationFrame(loop);
        context.clearRect(0, 0, 1024, 320);
        floorPosition.render();
        bolaPosition.render();
        gravity(bolaPosition);
        jump(bolaPosition)
        bolaPosition.keyIsPressed()
        geraPedras();
        listaDePedras.forEach((pedra) => {
            pedra.render();
            pedra.move();
            pedra.kill();
        })

        // pedregulho.render();
        // pedregulho.move();
        // pedregulho.kill();
        if (isFarAway) {
            if (Math.round(Math.random() * 10) > 9) {
                geraPedras(isFarAway)
            }
        }


    }
}
setTimeout(()=>{loop()},10000)



