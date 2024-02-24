let userSeq = [];
let gameSeq = [];
let highestScore = 0;
let body = document.querySelector("body");
let p = document.querySelector("p");
let h3 = document.querySelector("h3");
let h2 = document.querySelector("h2");
let btns = ["royalblue", "red", "green", "yellow"];
const modeToggle = document.getElementById("modeToggle");

let started = false;
let level = 0;
body.addEventListener("keypress", function () {
  if (started == false) {
    body.classList.remove("flashRed");
    started = true;
    levelUp();
  }
});

//Function that flashes the buttons
function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
}

// Increase the level of game
function levelUp() {
  userSeq = [];
  level++;
  p.innerText = `level ${level}`;
  let randomIdx = Math.floor(Math.random() * 4);
  let randomClr = btns[randomIdx];
  let randomBtn = document.querySelector(`.${randomClr}`);
  gameSeq.push(randomClr);
  console.log("gameSeq: ", gameSeq);
  btnFlash(randomBtn);
}

//it is function for user button press
function btnPress() {
  if (started == true) {
    let pressBtn = this;
    // console.log(pressBtn)
    let pressColor = this.classList[1];
    userSeq.push(pressColor);
    console.log("userSeq : ", userSeq);
    btnFlash(pressBtn);
    checkAns(userSeq.length - 1);
  }
}

let allBtn = document.querySelectorAll(".btn");

for (btn of allBtn) {
  btn.addEventListener("click", btnPress);
}

//it checks the the game sequence and user sequence
function checkAns(index) {
  if (userSeq[index] == gameSeq[index]) {
    if (userSeq.length == gameSeq.length) {
      body.classList.add("flashGreen");
      if(modeToggle.checked) {
        body.classList.remove("dark-mode");
       }
        setTimeout(() => {
        body.classList.remove("flashGreen");
        if(modeToggle.checked) {
          body.classList.add("dark-mode");
        }
      }, 800);
      setTimeout(levelUp, 1000);
    }
  } else {
    let score = level;
    p.innerText = ` Game over !! Your Score : ${score}
       Press any key to start game`;
    body.classList.add("flashRed");
    started = false;
    level = 0;
    gameSeq = [];
    if (score > highestScore) {
      highestScore = score;
      console.log(highestScore);
    }
    h3.innerHTML = ` Your All time Highest Score : ${highestScore}`;
    
    if(modeToggle.checked) {
      body.classList.remove("dark-mode");
     }
    setTimeout(()=>{
      if(modeToggle.checked) {
        body.classList.add("dark-mode");
      }
    },800)
  
   
  }
}

//Dark mode
function setDarkMode(isDarkMode) {
  if (isDarkMode) {
    document.body.classList.add("dark-mode");
    h2.innerText = "Dark Mode";
  } else {
    document.body.classList.remove("dark-mode");
    h2.innerHTML = "Light Mode";
  }
}

// Function to toggle dark mode and store in local storage
function toggleDarkMode() {
  if (modeToggle.checked) {
    localStorage.setItem("darkMode", "true"); // Save dark mode state
  } else {
    localStorage.setItem("darkMode", "false"); // Save light mode state
  }
  setDarkMode(modeToggle.checked);
}

// Event listener for dark mode toggle
modeToggle.addEventListener("change", toggleDarkMode);

// Check local storage for dark mode preference on page load
document.addEventListener("DOMContentLoaded", () => {
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  modeToggle.checked = isDarkMode; // Set toggle state
  setDarkMode(isDarkMode); // Set dark mode based on preference
});

document.addEventListener("keydown", function(event) {
  // Check if the pressed key is the spacebar
  if (event.key === " ") {
    // Prevent the default action (e.g., scrolling)
    event.preventDefault();
    // Optionally, you can also stop any further propagation of the event
    // This prevents other event listeners from being triggered
    event.stopPropagation();
    // Add any other actions you want to perform
    // For example, you can add a console log statement
    console.log("Spacebar pressed. Action stopped.");
  }
});