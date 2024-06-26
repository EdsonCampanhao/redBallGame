
const tela = document.querySelector('#console');
const context = tela.getContext('2d');

context.fillStyle = '#c5e1f6';
context.fillRect(0, 0, 1024, 320);






const bolaImage = new Image()

const bolaPosition = {
    x: 0,
    y: 215,
    w: 50,
    h: 50,
    sprite:1,
    render() {
        context.drawImage(bolaImage,this.sprite,0,94,110, bolaPosition.x, bolaPosition.y, bolaPosition.w, bolaPosition.h);
    },
}

const renderFloor = {
    x: 0,
    y: 0,
    w: 320,
    h: 300
}
const floor = new Image()
floor.src = "../img/scenery.jpg"
floor.onload = function () {
    context.drawImage(floor, 0, 0, 400, 320);
    context.drawImage(floor, 300, 0, 400, 320);
    context.drawImage(floor, 600, 0, 400, 320);
    context.drawImage(floor, 900, 0, 400, 320);
    context.drawImage(floor, 1200, 0, 400, 320);
}

bolaImage.src = '../img/sprite-ball (1).png'

bolaImage.onload = function () {
    context.drawImage(bolaImage, bolaPosition.x, bolaPosition.y, bolaPosition.w, bolaPosition.h);
}
tela.focus()

// tela.addEventListener('click', (e) => {

//     const rect = tela.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     console.log(x, y)

//     bolaPosition.x+=10

// })


tela.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'd':
            bolaPosition.x += 8;
            if(bolaPosition.sprite < 400){bolaPosition.sprite +=94.5

            }else {
                bolaPosition.sprite =1
            }
            
            
            
            break;
        case 'a':
            bolaPosition.x -= 10;
            break;
    }




})


function loop() {
    requestAnimationFrame(loop);
    context.clearRect(0, 0, 1024, 320);
    context.drawImage(floor, 0, 0, 400, 320);
    context.drawImage(floor, 300, 0, 400, 320);
    context.drawImage(floor, 600, 0, 400, 320);
    context.drawImage(floor, 900, 0, 400, 320);
    context.drawImage(floor, 1200, 0, 400, 320);
    bolaPosition.render();
}

loop()


