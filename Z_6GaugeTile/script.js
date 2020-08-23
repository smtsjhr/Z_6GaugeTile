
var A = 1;
var B = .1;

var a = 2*Math.PI/6
var scale = .05;

const enable_interaction = true;
var get_mouse_pos = false;
var get_touch_pos = false;

const t_rate = .02;
var t = 0;

const fps = 50;
var fpsInterval, startTime, now, then, elapsed;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


var dwitter_mode = true;

if (dwitter_mode) {
    function S(x){return Math.sin(x)}
    function C(x){return Math.cos(x)}
    function T(x){return Math.tan(x)}
    function R(r,g,b,a){return `rgba(${r},${g},${b},${a})`}
    var c = canvas;
    var x = ctx;
}


function DwitterCode(t,a,p,x_pos,y_pos) {
    x.beginPath();
    for(i=0;i<91;i++){k=scale*(2e3+99*C(i/p+t))*.98**i;x.lineTo(x_pos+W/2+k*S(i*a),y_pos+H/2+k*C(i*a))};
    x.closePath();
    x.fill('evenodd');
}



startAnimating(fps);



function draw() {

    
    
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;

    let Nw = W/(2e3*scale)/2+1;
    let Nh = H/(2e3*scale)/2;

    
    x.fillStyle = R(0,0,0,1);
    x.fillRect(0, 0, 2*W, 2*H);


    x.fillStyle = R(255,255,255,1);
    for (let i = -Nw ; i < Nw; i++) {
        for (let j = -Nh ; j < Nh; j++) {
            DwitterCode(
                t,
                a,
                A + B*.5*(S(t-((i+30)*(j+30))/B)),
                155*(i + .5*(j%2)),
                135*j
            );
        }
    }
     
    t += t_rate;

}



function startAnimating(fps) {
    
    fpsInterval = 1000/fps;
    then = window.performance.now();
    startTime = then;
    
    animate();
 }
 
 function animate(newtime) {
    
    
     requestAnimationFrame(animate);
 
     now = newtime;
     elapsed = now - then;
 
     if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
     
        draw();  
     }


     if(enable_interaction) {
        canvas.addEventListener('mousedown', e => {
            get_mouse_pos = true;
            getMousePosition(canvas, e)
        });
          
        canvas.addEventListener('mouseup', e => {
            get_mouse_pos = false;
        });
      
        canvas.addEventListener('mousemove', function(e) {
            if(get_mouse_pos) {
                getMousePosition(canvas, e)
          }
        })
        
        canvas.addEventListener('touchstart', function(e) {
            getTouchPosition(canvas,e);
            event.preventDefault();
        }, false);
          
        canvas.addEventListener('touchend', function(e) {
     
        }, false);
          
        canvas.addEventListener('touchmove', function(e) {
            getTouchPosition(canvas,e);
            event.preventDefault();
        }, false);
    }

 }
 
 
function getMousePosition(canvas, event) {
    interaction(canvas,event)
}

function getTouchPosition(canvas, event) {
    var event = event.touches[0];
    interaction(canvas,event)
}

function interaction(canvas, event) {

    mouse_x = event.clientX/canvas.width;
    mouse_y = event.clientY/canvas.height;

    A = 1 + mouse_y;
    B = .001 + mouse_x**2;

}