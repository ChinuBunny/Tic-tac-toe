const boxes=document.querySelectorAll('.box');
const gameinfo=document.querySelector('.gameinfo');
const button=document.querySelector('.btn');


let currentplayer;
let gamegrid;

const winningposition=[
    [0,1,2],
    [3,4,5],[6,7,8],
    [1,4,7],[0,3,6],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to intitlalise the game
function initgame(){
    currentplayer="X";
    gamegrid=["","","","","","","","",""];

    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index]=`current player-${currentplayer}`;
        box.style.pointerEvents="auto";
        //remove green color
        box.classList=`box box${index+1}`;
    });
    button.classList.remove('active');
    gameinfo.innerText=`Current Player -${currentplayer}`;

}
initgame();

function swapturn(){
    if(currentplayer==="X")
    {
        currentplayer="O";
    }
    else{
        currentplayer="X";
    }
    //ui update
    gameinfo.innerText=`current player -${currentplayer}`;
}


function checkgameover(){

   
    let answer="";

    winningposition.forEach((position)=>{
        //all 3 boxes should be non emepty and exacly same in value
        if((gamegrid[position[0]]!="" || gamegrid[position[1]]!=="" || 
        gamegrid[position[2]!=""]) && ((gamegrid[position[0]]===gamegrid[position[1]]) && (gamegrid[position[1]]==gamegrid[position[2]])))
        {
            //check if winner is x
            if(gamegrid[position[0]]==="X")
            answer="X";
        else
        answer="O";

        //disable pointer events
    boxes.forEach((box)=>{
        box.style.pointerEvents="none";
    })

        //now we know X or O is a winner
        boxes[position[0]].classList.add('win');
        boxes[position[1]].classList.add('win');
        boxes[position[2]].classList.add('win');
        }

    })
    //it means we have a winner
    if(answer!="")
    {
        gameinfo.innerText=`Winner Player-${answer}`;
        button.classList.add('active');
        return ;
}

let fillcount=0;
gamegrid.forEach((box)=>
{
    if(box!=="")
    fillcount++;
});

if(fillcount===9)
{
    gameinfo.innerText="Game Tied";
    button.classList.add('active');
}

}

function handleclick(index){
    if(gamegrid[index]===""){
        boxes[index].innerText=currentplayer;
        gamegrid[index]=currentplayer;
        boxes[index].style.pointerEvents="none";
        //swap turn 
        swapturn();
        //check if anyone win
        checkgameover();



    }
}

boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>
    {
        handleclick(index);
    })
});

button.addEventListener('click',initgame);
