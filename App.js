let userSeq = [];
let gameSeq = [];
let highestScore = 0;
let body = document.querySelector('body');
let p = document.querySelector('p');
let h3 = document.querySelector('h3');
let h2 = document.querySelector('h2');
let btns = ["royalblue","red","green","yellow"];
const modeToggle = document.getElementById('modeToggle');

let started = false;
let level = 0;
body.addEventListener('keypress',function(){
    if(started==false){
        body.classList.remove('flashRed');
        started = true;
        levelUp();
    } 
   
});

//Function that flashes the buttons
function btnFlash(btn){
    btn.classList.add("flash");
        setTimeout(function(){
          btn.classList.remove("flash");
        },200);
}

// Increase the level of game 
function levelUp(){
    userSeq = [];
    level++;
    p.innerText = `level ${level}`;
    let randomIdx = Math.floor(Math.random()*4);
    let randomClr = btns[randomIdx]
    let randomBtn = document.querySelector(`.${randomClr}`);
    gameSeq.push(randomClr);
    console.log("gameSeq: ",gameSeq)
    btnFlash(randomBtn);
}

function btnPress(){
    if(started==true){
    let pressBtn =this;
    // console.log(pressBtn)
    let pressColor = this.classList[1]
    userSeq.push(pressColor)
    console.log("userSeq : ", userSeq)
    btnFlash(pressBtn);
    checkAns(userSeq.length-1);
    }
}

let allBtn = document.querySelectorAll(".btn");

for(btn of allBtn){
     btn.addEventListener("click", btnPress)
}

function checkAns(index){
   if(userSeq[index]==gameSeq[index]){
      if(userSeq.length == gameSeq.length){
        document.body.classList.remove('dark-mode');
        body.classList.add("flashGreen",);
        
        setTimeout(() =>{
            body.classList.remove("flashGreen");
            document.body.classList.add('dark-mode');
        },800)
        setTimeout(levelUp,1000);
      }
   }
   else{
     let score = level;
     p.innerText = ` Game over !! Your Score : ${score}
       Press any key to start game`
     body.classList.add("flashRed");
     started = false;
     level = 0;
     gameSeq = [];
     if(score > highestScore){
        highestScore = score;
        console.log(highestScore)
     }
     h3.innerHTML = ` Your All time Highest Score : ${highestScore}`;
     document.body.classList.remove('dark-mode');
     
   }
}

//Dark mode


function setDarkMode(isDarkMode) {
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        h2.innerText= "Dark Mode";
    } else {
        document.body.classList.remove('dark-mode');
        h2.innerHTML="Light Mode";
    }
}

// Function to toggle dark mode and store in locar storage
function toggleDarkMode() {
    if (modeToggle.checked) {
        localStorage.setItem('darkMode', 'true'); // Save dark mode state
    } else {
        localStorage.setItem('darkMode', 'false'); // Save light mode state
    }
    setDarkMode(modeToggle.checked);
}

// Event listener for dark mode toggle
modeToggle.addEventListener('change', toggleDarkMode);

// Check local storage for dark mode preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    modeToggle.checked = isDarkMode; // Set toggle state
    setDarkMode(isDarkMode); // Set dark mode based on preference
});