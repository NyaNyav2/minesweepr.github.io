var board=[];
var rows=8;
var cols=8;

var mineCount=5;
var mineLocition=[];

var setlv=document.getElementById('setlv').innerText;
console.log(setlv)

var tilesClick=0;
var flagEnabled=false;

var gameOver=false;




window.onload=function(){
    startgame();
}
function setMines(){
   let mineLeft=mineCount;
   while(mineLeft>0){
    let r =Math.floor(Math.random()*rows);
    let c =Math.floor(Math.random()*cols);
    let id =r.toString()+'-'+c.toString();
   
   if(!mineLocition.includes(id)){
    mineLocition.push(id);
    mineLeft-=1;
   }
}
}
function startgame(){
    document.getElementById('minecounter').innerHTML=mineCount;
    document.getElementById('flagBtn').addEventListener('click',setflag);
    setMines();
    
    for(let r=0;r<rows;r++){
        let row=[];
        for(let c=0;c<cols;c++){
            let tile= document.createElement('div');
                tile.id=r.toString()+'-'+c.toString();
                tile.addEventListener('click',clickTile);
                document.getElementById('board').append(tile);
                row.push(tile);

        }
        board.push(row);
    }
    console.log(board);
}

function setflag(){
    if(flagEnabled){
        flagEnabled=false;
        document.getElementById('flagBtn').style.background='lightgray'
    }
    else {
        flagEnabled=true;
        document.getElementById('flagBtn').style.background='darkgray'
}
}
function clickTile(){
    if(gameOver||this.classList.contains('tileClick')){
        return;
    }
    let tile=this;
    if(flagEnabled){
        if(tile.innerHTML==''){
            tile.innerHTML='🚩';
        }
        else if(tile.innerHTML=='🚩'){
            tile.innerHTML='';
        }
        return;
    }
    if(mineLocition.includes(tile.id)){
        gameOver=true;
        alert('gameover');
        revelMIne();
        return;
    }

    let coords=tile.id.split('-');
    let r=parseInt(coords[0]);
    let c=parseInt(coords[1]);
    checkMine(r,c);
}

function revelMIne(){
    for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
            let tile=board[r][c];
            if(mineLocition.includes(tile.id)){
                tile.innerHTML='💣';
                tile.style.background='red';
            }
        }
    }
}

function checkMine(r,c){
if(r<0||r>=rows||c<0||c>=cols){
    return;
}
if(board[r][c].classList.contains('tileClick')){
    return;
}
board[r][c].classList.add('tileClick');
tilesClick+=1;

let mineFound=0;
//top3
mineFound+=checkTile(r-1, c-1);
mineFound+=checkTile(r-1, c);
mineFound+=checkTile(r-1, c+1);
//trai phai
mineFound+=checkTile(r, c+1);
mineFound+=checkTile(r, c+1);
//bottom 3
mineFound+=checkTile(r+1, c-1);
mineFound+=checkTile(r+1, c);
mineFound+=checkTile(r+1, c+1);

if(mineFound > 0){
    board[r][c].innerHTML=mineFound;
    board[r][c].classList.add('x'+mineFound.toString());
}
else{
    checkMine(r-1, c-1);
checkMine(r-1, c);
checkMine(r-1, c+1);
//trai phai
checkMine(r, c+1);
checkMine(r, c+1);
//bottom 3
checkMine(r+1, c-1);
checkMine(r+1, c);
checkMine(r+1, c+1);
}
if(tilesClick==rows*cols-mineCount){
    document.getElementById('minecounter').innerHTML='clear';
    gameOver=true;
    
}
}
function checkTile(r, c){
    if(r<0||r>=rows||c<0||c>=cols){
        return 0;
    }
    if(mineLocition.includes(r.toString()+'-'+c.toString())){
        return 1;
    }
    return 0;
}

