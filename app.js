let game = []
let user = []

let btns = ["yellow", "red", "purple", "green"]

let started = false;
let level = 0;

// Retrieve the high score from localStorage, or set it to 0 if it doesn't exist
let highScore = localStorage.getItem("highScore") ? parseInt(localStorage.getItem("highScore")) : 0;

let h2 = document.querySelector("h2");
let highScoreDisplay = document.querySelector("#highscore");

// Display the current high score at the start
highScoreDisplay.innerText = `High Score: ${highScore}`;


document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game started");
        started = true;

        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash")
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash")
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 250);
}

function checkAns(idx) {
    // console.log("curr lvl: ", level);

    if(user[idx] === game[idx]) {
        // console.log("same value");
        if(user.length == game.length){
            setTimeout(levelUp,1000);
        }
    }else {
        h2.innerHTML = `Game over! your score <b>${level}</b> <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        },150);

        if (level > highScore) {
            highScore = level;
            localStorage.setItem("highScore", highScore);  // Save high score to localStorage
            highScoreDisplay.innerText = `High Score: ${highScore}`;
        }

        reset();
    }
}

function levelUp() {
    user = [];
    level++;
    h2.innerText = `Level ${level}`;

    let rand = Math.floor(Math.random() *3);
    let randCol = btns[rand];
    let randbtn = document.querySelector(`.${randCol}`);
    game.push(randCol);
    console.log(game);
    // console.log(randbtn);
    btnFlash(randbtn);
}

function btnPress() {
    // console.log(this);
    let btn = this;
    userflash(btn);

    userCol = btn.getAttribute("id");
    user.push(userCol);
    
    checkAns(user.length-1);
}


let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    game = [];
    user = [];
    level = 0;
}
