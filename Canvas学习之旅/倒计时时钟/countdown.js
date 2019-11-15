let WINDOW_WIDTH;
let WINDOW_HEIGHT;
let RADIUS;
let MARGIN_TOP;
let MARGIN_LEFT;

let balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
//const endTime = new Date(2019, 1, 15, 18, 47, 52);  //月份少1  截止日期
let endTime = new Date();
endTime.setTime(endTime.getTime() + 3600*1000);  //总是倒计时1小时
let curShowTimeSeconds = 0;
window.onload = function () {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.body.clientHeight;  //what?

    MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
    RADIUS = Math.round(WINDOW_WIDTH*4/5/108) -1;   //注意计算小球半径的过程

    MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;  //定义全局变量便于修改以及自适应
    context.globalCompositeOperation = 'xor';

    curShowTimeSeconds = getCurrentShowTimeSeconds();
    setInterval(function () {
        render(context);
        update();
    },50);
}

function getCurrentShowTimeSeconds(){  //s获取秒数
    let curTime = new Date();
    let ret = endTime.getTime() - curTime.getTime();  //getTime方法返回一个毫秒数（1970年1月1号？至一个Date时间）
    ret = Math.round(ret/1000);  //差值：单位秒

    return ret>=0 ? ret:0;
}

function update(){
    let nextShowTimeSeconds = getCurrentShowTimeSeconds();
    let nextHours = parseInt(nextShowTimeSeconds / 3600);
    let nextMinutes = parseInt(nextShowTimeSeconds - nextHours * 3600)/60;
    let nextSeconds = nextShowTimeSeconds % 60;

    let curHours = parseInt(curShowTimeSeconds / 3600);
    let curMinutes = parseInt(curShowTimeSeconds - curHours * 3600)/60;
    let curSeconds = curShowTimeSeconds % 60;

    if(nextSeconds != curSeconds){   //时间发生了变化
        if(parseInt(curHours/10) != parseInt(nextHours/10)){
            addBalls(MARGIN_LEFT, MARGIN_TOP, parseInt(curHours/10));  //加小球
        }
        if(parseInt(curHours%10) != parseInt(nextHours%10)){
            addBalls(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(curHours%10));  //加小球
        }
        if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
            addBalls(MARGIN_LEFT + 39*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes/10));  //加小球
        }
        if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
            addBalls(MARGIN_LEFT + 54*(RADIUS+1), MARGIN_TOP, parseInt(curMinutes%10));  //加小球
        }
        if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
            addBalls(MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds/10));  //加小球
        }
        if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
            addBalls(MARGIN_LEFT + 93*(RADIUS+1), MARGIN_TOP, parseInt(curSeconds%10));  //加小球
        }
        curShowTimeSeconds = nextShowTimeSeconds;
    }
    updateBalls();
}
function updateBalls(){
    for(let i=0; i<balls.length; i++){
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if(balls[i].y >= WINDOW_HEIGHT - RADIUS){
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = - balls[i].vy * 0.75;
        }
    }
    let cnt = 0;  //记录有多少个小球还保留在画布中
    //删除不必要的小球
    for(let i=0; i<balls.length; i++){
        if(balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH){
            balls[cnt++] = balls[i];
        }
    }
    //删除
    while(balls.length > cnt){
        balls.pop();            //pop是弹后面的？
    }

}
function addBalls(x, y, num){
    for(let i=0; i<digit[num].length; i++){
        for(let j=0; j<digit[num][i].length; j++){
            if(digit[num][i][j] == 1){
                let aBall = {
                    x:x+j*2*(RADIUS+1) + (RADIUS+1),
                    y:y+i*2*(RADIUS+1) + (RADIUS+1),
                    g:1.5 + Math.random(),  //random产生0~1
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,  //+4或-4
                    vy:-Math.ceil(Math.random()*5),
                    color:colors[Math.floor(Math.random()*colors.length)]   //floor向下取整
                }
                balls.push(aBall);  //注意这里是一直加小球,得想办法删除不再需要绘制的小球
            }
        }
    }
}
function render(cxt){
    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);  //刷新操作?
    let hours = parseInt(curShowTimeSeconds / 3600);
    let minutes = parseInt(curShowTimeSeconds - hours * 3600)/60;
    let seconds = curShowTimeSeconds % 60;

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours/10), cxt);     //开始位置  绘制哪个数字
    renderDigit(MARGIN_LEFT+15*(RADIUS+1), MARGIN_TOP, parseInt(hours%10), cxt);
    renderDigit(MARGIN_LEFT+30*(RADIUS+1), MARGIN_TOP, 10, cxt);        //注意冒号的宽度与数字不同
    renderDigit(MARGIN_LEFT+39*(RADIUS+1), MARGIN_TOP, parseInt(minutes/10), cxt);     //开始位置  绘制哪个数字
    renderDigit(MARGIN_LEFT+54*(RADIUS+1), MARGIN_TOP, parseInt(minutes%10), cxt);
    renderDigit(MARGIN_LEFT+69*(RADIUS+1), MARGIN_TOP, 10, cxt);        //注意冒号的宽度与数字不同
    renderDigit(MARGIN_LEFT+78*(RADIUS+1), MARGIN_TOP, parseInt(seconds/10), cxt);     //开始位置  绘制哪个数字
    renderDigit(MARGIN_LEFT+93*(RADIUS+1), MARGIN_TOP, parseInt(seconds%10), cxt);

    for(let i=0; i<balls.length; i++){  //绘制小球
        cxt.fillStyle = balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI, true);
        cxt.closePath();
        cxt.fill();
    }
}

function renderDigit(x, y, num, cxt){
    cxt.fillStyle = 'rgb(0,102,153)';
    for(let i=0; i<digit[num].length; i++){
        for(let j=0; j<digit[num][i].length; j++){
            if(digit[num][i][j] == 1){
                //画个圆球
                cxt.beginPath();
                cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1), y+i*2*(RADIUS+1)+(RADIUS+1), RADIUS, 0, 2*Math.PI);     //参数计算
                cxt.closePath();
                cxt.fill();
            }
        }
    }
}

