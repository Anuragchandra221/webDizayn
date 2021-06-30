if(window.innerWidth<1200){
    alert("Try playing on a large screen!");
}
else{
    const canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

var c = canvas.getContext('2d');

var walkCount = 0;
var walk = ['images/1-min.png', 'images/3-min.png', 'images/4-min.png'];
function Line( start_x, start_y, end_x, end_y, colour, line_width){
    this.start_x = start_x;
    this.start_y = start_y;
    this.end_x = end_x;
    this.end_y = end_y;
    this.colour = colour;
    this.line_width = line_width;

    this.draw = function(){
        c.beginPath();
        c.moveTo(this.start_x, this.start_y);
        c.lineTo(this.end_x, this.end_y);
        c.strokeStyle = this.colour;
        c.lineWidth = this.line_width;
        c.stroke();
        
    }
    
}

var base_line = new Line(10,innerHeight-300, innerWidth-40, innerHeight-300, "#fff", 5);


function Img(src, x, y, width, height, dx){
    this.img = new Image();
    this.img.src = src;
    this.x = x;
    this.y =y;
    this.dx = dx;
    this.width = width;
    this.height = height;
    this.img.onload = this.draw;

    this.draw = function(){
        c.beginPath();
        
        c.drawImage(this.img, this.x, this.y, this.width, this.height);
        
    }
    this.move = function(){
        if(this.x+this.width>innerWidth || this.x < 0){
            this.dx = -this.dx;
            score += 25;
        }
        this.x += this.dx;
    }
    this.jump = function(){
        if(isJump){
            if (jumpCount>=-13){
                var neg = 1;
                if(jumpCount<0){
                    neg = -1;
                }
                this.y -= (jumpCount**2)*0.5*neg;
                this.x += this.dx*2.8;
                jumpCount -= 3;
            }
            else{
                isJump = false;
                jumpCount = 13;
            }
            
        }
        else{
            isJump = false;
            this.y = base_line.start_y-152;
        }
    }  
}

function collide(){
    if((hero.x + hero.width > obstacle_1.x && hero.y + hero.height > obstacle_1.y && hero.x + hero.width < obstacle_1.x + obstacle_1.width)||(hero.x + hero.width > obstacle_2.x && hero.y + hero.height > obstacle_2.y && hero.x + hero.width < obstacle_2.x + obstacle_2.width)){
        hero.img.src = 'images/5-min.png';
        if(score!=0){
             score -=5;
        }
        if(hero.dx<0){
            hero.dx = -hero.dx;
        }
        
        hero.x = 30 ;
        isJump = false;
        hero.y = base_line.start_y-152; 
        collide_state = 1;
        

    }
    
}

var obstacleY = [400,300,500,600];
var obstacleY2 = [900,1000,1100,1200];
var isJump = false;
var jumpCount = 13;
var collide_state = 0;
var hero = new Img('images/1-min.png', base_line.start_x, base_line.start_y-152, 100, 150, 7 );
var obstacle_1 = new Img('images/meet-min.png', obstacleY[Math.floor(Math.random()*obstacleY.length)], base_line.start_y-102, 100, 100, 0);
var obstacle_2 = new Img('images/psd-min.png', obstacleY2[Math.floor(Math.random()*obstacleY2.length)], base_line.start_y-102, 100, 100, 0);
var restart = new Img('images/restart 1-min.png',innerWidth/2+60,base_line.start_y+40,30,30,0);
var logo = new Img('images/cloud-min.png', hero.x , hero.y-200,310, 200,0);

var score = 0000;
window.addEventListener('mousedown', function(e){
    if(e.x > restart.x && e.x < restart.x+restart.width){
        if(e.y>restart.y){
            if(e.y-139 >= restart.y - restart.width && e.y -139 < restart.y){
                isJump = false;
                collide_state = 0; 
                obstacle_1.x = obstacleY[Math.floor(Math.random()*obstacleY.length)];
                obstacle_2.x = obstacleY2[Math.floor(Math.random()*obstacleY2.length)];
                animate();
            }
            
        }
    
    }
})

var showInfo = true;
window.addEventListener('keydown', function(e){
    if(e.keyCode==32 && hero.y == base_line.start_y-152){
        isJump = true;
        showInfo = false;
    }
})
function animate(){
    if(collide_state==0){
        hero.img.src = 'images/1-min.png';
        setTimeout(function(){
            requestAnimationFrame(animate);
        },80);
        
    }
    
    
    hero.img.src = walk[walkCount];

        
    walkCount+=1;

    
    if(walkCount>walk.length){
        walkCount = 0;
    }
        
    

    c.clearRect(0, 0, innerWidth, innerHeight);
    c.font = '30px Arial';
    c.fillStyle = "#fff";
    if(collide_state==1){
        restart.draw();
        c.fillText("Game over", innerWidth/2-150, base_line.start_y+62);
    }
    c.fillText(score+" Pts", innerWidth-350, base_line.start_y
     - 245);
    c.fillStyle = "rgba(255, 255, 255, 0.6)";
    c.font = "24px Arial";
    if(showInfo){
        c.fillText('Press "Space" to jump your Mascoot.', innerWidth/2 - 200, 20);
    }
    
    base_line.draw();
    
    hero.draw();
    hero.move();
    obstacle_1.draw();
    obstacle_2.draw();
    logo.draw();
    
    hero.jump();
    collide();
    
}

animate();
}




