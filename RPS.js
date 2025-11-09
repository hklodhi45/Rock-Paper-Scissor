// HTML elements input
let restartBtn = document.querySelector('.reset-score-button');
let autoPlayBtn = document.querySelector('.AutoPlay-button');


let score = JSON.parse(localStorage.getItem('score'));

if (!score) {
  score = {
    wins: 0,
    ties: 0,
    loses: 0
  };
  localStorage.setItem('score', JSON.stringify(score));
}

const tieScore = document.querySelector('.tie-score');
const winScore = document.querySelector('.win-score');
const loseScore = document.querySelector('.lose-score');

tieScore.innerHTML = score.ties;
winScore.innerHTML = score.wins;
loseScore.innerHTML = score.loses;
 

function showPicking(id,picking){
    const jsImagePick = document.getElementById(id);
    
    if(id === 'user-img-box'){
        if(picking === 'ROCK'){
            jsImagePick.style.backgroundImage = "url('./Images/rock_user.png')";
            jsImagePick.style.boxShadow = "0px 0px 20px 4px rgb(185, 185, 47)";

        } else if(picking === 'PAPER'){
            jsImagePick.style.backgroundImage = "url('./Images/paper_user.png')";
            jsImagePick.style.boxShadow = "0px 0px 20px 4px rgba(31, 168, 166, 0.941)";

        } else if(picking === 'SCISSOR'){
            jsImagePick.style.backgroundImage = "url('./Images/scissors_user.png')";
            jsImagePick.style.boxShadow = "0px 0px 20px 4px rgb(216, 120, 211)";
        }
    } else{
        if(picking === 'ROCK'){
            jsImagePick.style.backgroundImage = "url('./Images/rock.png')";
            jsImagePick.style.boxShadow = "0px 0px 20px 4px rgb(185, 185, 47)";

        } else if(picking === 'PAPER'){
            jsImagePick.style.backgroundImage = "url('./Images/paper.png')";
            jsImagePick.style.boxShadow = "0px 0px 20px 4px rgba(31, 168, 166, 0.941)";

        } else if(picking === 'SCISSOR'){
            jsImagePick.style.backgroundImage = "url('./Images/scissors.png')";
            jsImagePick.style.boxShadow = "0px 0px 20px 4px rgb(216, 120, 211)";
        }
    }
}

function result(tie,win,lose){

    let computerMove = computerMoveFunction();
        showPicking('computer-img-box',computerMove);

    let xBeatsY = document.querySelector('.x-beats-y');
    let finalResult = document.querySelector('.result');

    if(computerMove === tie){
        xBeatsY.innerHTML = `${tie} meets ${tie}`;
        finalResult.innerHTML = `It's a TIE`;
        score.ties += 1;

    } else if(computerMove === win){
        xBeatsY.innerHTML = `${tie} beats ${win}`;
        finalResult.innerHTML = `YOU WON this round`;
        score.wins += 1;

    } else{
        xBeatsY.innerHTML = `${lose} beats ${tie}`;
        finalResult.innerHTML = `YOU LOSE this round`;
        score.loses += 1;
    }

    localStorage.setItem('score',JSON.stringify(score));

    tieScore.innerHTML = score.ties;
    winScore.innerHTML = score.wins;
    loseScore.innerHTML = score.loses;
}

function computerMoveFunction(){
    let randomNum = Math.random();
    let computerMove;
    if(randomNum < 1/3){
        computerMove = 'ROCK';
    } else if(randomNum >= 1/3 && randomNum < 2/3){
        computerMove = 'PAPER';
    } else{
        computerMove = 'SCISSOR';
    }
    return computerMove;
}

function restart(){
    score.ties = 0;
    score.wins = 0;
    score.loses = 0;

    localStorage.setItem('score',JSON.stringify(score));

    tieScore.innerHTML = score.ties;
    winScore.innerHTML = score.wins;
    loseScore.innerHTML = score.loses;

    document.getElementById('user-img-box').style.backgroundImage = "none";
    document.getElementById('user-img-box').style.boxShadow = "none";
    document.getElementById('computer-img-box').style.backgroundImage = "none";
    document.getElementById('computer-img-box').style.boxShadow = "none";
    document.querySelector('.result').innerHTML ="";
    document.querySelector('.x-beats-y').innerHTML = "";

    if(isAutoPlaying === true){
        clearInterval(setIntervalId);
        isAutoPlaying = false;
        autoPlayBtn.innerHTML = 'Auto Play';
    }
}
 
let setIntervalId;
let isAutoPlaying = false;
function autoPlay(){ 
    if(!isAutoPlaying){
    setIntervalId = setInterval(function(){
        let userAutoPicking = computerMoveFunction();
            showPicking('user-img-box',userAutoPicking);
                if(userAutoPicking === 'ROCK'){
                    result('ROCK','SCISSOR','PAPER');
                } else if(userAutoPicking === 'SCISSOR'){
                    result('SCISSOR','PAPER','ROCK');
                } else{
                    result('PAPER','ROCK','SCISSOR');
                }
        },1000);
        isAutoPlaying = true;
        autoPlayBtn.innerHTML = 'Stop';
    } else{
        clearInterval(setIntervalId);
        isAutoPlaying = false;
        autoPlayBtn.innerHTML = 'Auto Play';
    }
}

// Event Listners

restartBtn.addEventListener('click', () => {
    restart();
})
autoPlayBtn.addEventListener('click', () => {
    autoPlay();
})

document.body.addEventListener('keydown', () => {
    if(event.key === 'r'){
        showPicking('user-img-box','ROCK');
        result('ROCK','SCISSOR','PAPER');
    }else if(event.key === 'p'){
        showPicking('user-img-box','PAPER');
        result('PAPER','ROCK','SCISSOR');
    }else if(event.key === 's'){
        showPicking('user-img-box','SCISSOR');
        result('SCISSOR','PAPER','ROCK');
    }else if(event.key === 'a'){
        autoPlay();
        if(autoPlayBtn.innerHTML === 'Stop')
        autoPlayBtn.innerHTML = 'Auto Play';
    else 
        autoPlayBtn.innerHTML = 'Stop';
    } else if(event.key === 'Backspace'){
        restart();
    }
})