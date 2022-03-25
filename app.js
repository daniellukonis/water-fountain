console.log('connected');

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const defaultLineWidth = 10;
const defaultStrokeStyle = 'rgb(0,0,0)';
const defaultFillStyle = 'rgb(255,255,255)';

//helper funcitons
function randomInt(min,max){
    return Math.floor(Math.random()*max)+min;
};

function degToRad(deg){
    return deg * (Math.PI / 180);
};

//canvas functions
const margin = 30;
function resizeCanvas(){
    let w = window.innerWidth - margin;
    let h = window.innerHeight - margin;
    // w>h ? w=h : h=w;
    canvas.width = w
    canvas.height = h
    return [w,h];
};
resizeCanvas();

function clearCanvas(){
    context.fillStyle = 'rgb(255,255,255)'
    let w = canvas.width;
    let h = canvas.height;
    context.fillRect(0,0,w,h);
};

//drawing functions
function drawLine(color,reverse){
    const ymid = canvas.height*0.5;
    const yend = canvas.height;
    const margin = 50;
    let orientation = 1;
    reverse ?  orientation = -1 : orientation = 1;
    let yoffset = randomInt(150,400) * orientation;
    // const yoffset = 100 * orientation;

    context.save();

    context.lineCap = 'round';
    context.lineWidth = randomInt(3,6);
    context.strokeStyle = color || defaultStrokeStyle;
    
    context.beginPath();
    context.moveTo(50,0);
    context.lineTo(ymid,0);
    context.quadraticCurveTo(yend-margin*2,0,yend-margin,yoffset);
    context.stroke();
    
    context.restore();
};

function sproutLine(reverse){
    const xmid = canvas.width*0.5;
    const ymax = canvas.height;
    let orientation = 1;
    reverse ? orientation = -1 : orientation = 1;
    const xoffset = randomInt(1,10);
    const yoffset = randomInt(1,100);
    const roffset = randomInt(1,20) * orientation;

    // let r = randomInt(1,255);
    const r = 55;
    // let g = randomInt(1,255);
    const g = 0;
    let b = randomInt(100,255);
    let a = Math.random();
    let color = `rgba(${r},${g},${b},${a})`
    // let color = 'rgba(155,155,155,1)'
    context.save()

    context.translate(xmid + xoffset,ymax + yoffset);
    context.rotate(degToRad(270 + roffset));
    drawLine(color,reverse);

    context.restore();
};

function growSprouts(){
    for(let i=0; i<100; i++){
        sproutLine();
        sproutLine(true);
    };
};

// growSprouts();
const interval = '100'
let intervalID = setInterval(()=>{
    clearCanvas();
    growSprouts();
},interval);
        
window.addEventListener('resize', ()=>{
    resizeCanvas();
})