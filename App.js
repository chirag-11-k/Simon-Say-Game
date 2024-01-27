let userSeq = [];
let gameSeq = [];
let body = document.querySelector('body');
let p = document.querySelector('p');
let btns = ["royalblue","red","green","yellow"];

let started = false;
let level = 0;
body.addEventListener('keypress',function(){
    if(started==false){
        started = true;
        levelUp();
    } 
   
});
function btnFlash(btn){
    btn.classList.add("flash");
        setTimeout(function(){
          btn.classList.remove("flash");
        },200);

}
function levelUp(){
    level++;
    p.innerText = `level ${level}`;
    let randomIdx = Math.floor(Math.random()*4);
    let randomClr = btns[randomIdx]
    let randomBtn = document.querySelector(`.${randomClr}`);
    console.log(randomBtn);
    btnFlash(randomBtn);
}
