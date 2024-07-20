let gameseq = [];
let userseq = [];
let btns = ["red", "green", "blue", "yellow"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let maxscore = 0;

document.addEventListener("keypress",function(){
    if(started==false){
        started = true;
        console.log("Start");
        levelup();
    }
});

function gameflesh(btn){
    btn.classList.add("flesh");
    setTimeout(function(){
        btn.classList.remove("flesh");
    },200);
}

function userflash(btn){
    btn.classList.add("userflesh");
    setTimeout(function(){
        btn.classList.remove("userflesh");
    },200);
}

function levelup(){
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randindex = Math.floor(Math.random()*4);
    let randcolor = btns[randindex];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    console.log(gameseq);
    gameflesh(randbtn);
}

function checkans(idx){
    if(userseq[idx]===gameseq[idx]){
        if(userseq.length === gameseq.length){
            setTimeout(levelup,1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level-1}</b>... Press any key to Start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "rgba(0, 0, 0, 0.853)";
        },100);
        if(maxscore<level-1){
            maxscore = level - 1;
        }
        reset();
    }
}

function btnpress(){
    console.log(this);
    let btn = this;
    userflash(btn);
    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    checkans(userseq.length-1);
}

let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnpress);
}

function reset(){
    started = false;
    gameseq = [];
    userseq = [];
    let h3 = document.querySelector("h3");
    h3.innerText = `Max Score: ${maxscore}`;
    level = 0;
}