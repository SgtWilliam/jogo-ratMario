const mouse = document.querySelector(".mouse");
const pipe = document.querySelector(".pipe");
const cloud = document.querySelector('.clouds');
const restartButton = document.querySelector('#btn-restart-id');
const divButton = document.querySelector('.terra')


let gameOver = false;
let pipeHeight = 120;

restartButton.addEventListener('click', ()=>{
    location.reload()
});



const pipeRandom = [
    {img: "stone", height: 30},
    {img: "cogumelo", height: 50},
    {img: "pipe", height: 40},
];

setInterval(()=>{
    if(gameOver === false){
        randomPipe()
    }

},1500)


function verifyGame(){
    if(gameOver === false){
        jump()
    }
}

function randomPipe(){

    const randomNumber = Math.floor(Math.random() * 2)
    const randomLocalPipe =  pipeRandom[randomNumber].img
    const randomHeight = pipeRandom[randomNumber].height
    pipe.src = `./img/obs/${randomLocalPipe}.png`

    pipeHeight = randomHeight
}

function jump(){
    mouse.classList.add('jump');
    mouse.src = './img/mouseJump.gif'

    const pipePosition = pipe.offsetLeft;

    setTimeout(() => {
        mouse.classList.remove('jump');
    }, 500);

        setTimeout(() => {
            mouse.src = './img/mouseSprite.gif'
        }, 300);


}

const  loop = setInterval(()=>{

    const pipePosition = pipe.offsetLeft;
    const mousePosition = +window.getComputedStyle(mouse).bottom.replace('px', '');

    if(pipePosition <= pipeHeight && 120 > 0 && mousePosition < 80){
        pipe.style.animation = "none";
        pipe.style.left = `${pipePosition}px`;

        mouse.style.animation = "none";
        mouse.style.bottom = `${mousePosition}px`;

        mouse.src = './img/RatDeadth.png'
        mouse.style.width = '120px';
        mouse.style.marginLeft = '50px';

        cloud.style.animationPlayState = 'paused';

        gameOver = true;

        restartButton.style.opacity = '1';

        clearInterval(loop);

    }
},10)



document.addEventListener('keydown', verifyGame);