// //lets create a game object which will store our games initial data
// // stexcum enq xaxi himnakan gorciqner@ vortex klini skzbnakan tvyalner@
// const game={
//     isClicked:false,
//     crossGame: "X",
//     roundGame: "O",
//     cross:[],
//     round:[],
//     winning_array:[[1,2,3],[1,5,9],[1,4,7],
//                    [4,5,6],[7,5,3],[3,6,9],
//                    [7,8,9],[2,5,8]]
// };
//
// // so the 2nd and 3nd property are the objects to be shown to board
// // 4th and 5th are the array that will contain the data-element's value
// //     from corresponding
// // data-box elements value
// // and list one is winning array combination any can win if they have a combination like
// // the 1st one helps to click alternate modes either cross or round
// // we will explore about it more below
//
// //2-rd ev 3-rd@ xaxataxtakin cucadrvox nshannern en
// //4-rd ev 5-rd@ petq e parunaken informacia nshvac obyektneri masin
// // arajin@ kogni nshel 2-rd kam 3-rd tarberakneric voreve mek@
//
// const  takeTheInput=data=>{
//   if (!game.isClicked){
//       data.innerHTML=game.crossGame;
//       getData(data,game,cross,game.crossGame);
//       game.isClicked=!game.isClicked;
//   }
//   else
//       if(game.isClicked){
//       data.innerHTML=game.roundGame;
//       getData(data,game,round,game.roundGame);
//       game.isClicked=!game.isClicked;
//   }
// };
//
//
// // this function do the onclick attribute of the square element
// // when we click he square it chechk the condition of clicking and
// // show the corresponding     cross of round
// // then we called a function that takes the data comin from the box
// // the round array and the move to show to show in HTML
// // lets declare that function
//
// //ays funkciayi ognutyamb menq erb nshenq mer qarakusu vandakneri
// //vra apa ayn kstugi payman@ ev knshi HTML-um
//
//
// const  getData=(data, whichGame, player)=>{
//     const box=data.getAttribute('data-box');
//   //this line simply get value of the data-box  attributes value
//   //of the clicked square
//     //ays tox@ vercnum e arjeq@  data-box atributi erb mknikov
//     //nshum enq
//
//
//     if (!game.isClicked){
//         game.cross.push(box);
//     }else if (game.isClicked){
//         game.round.push(box);
//     }
//
// //so here it just pushes the values that is clicked to the
// //respective move's array
// //ays kerp menq box-i mej enq qcum mer nshac qarakusu arjeq@
//
// // this below line remove onclick attribute once clicked the
// // //square to prevent multiplive....
// //ays tox@ asum e hanel onclick atribut@ mek angam sexmelis
// //qarakusii bazmzpatkum@ kanxelu hamar
//
// data.removeAttribute('onclick');
//
// //now another function which function takes the game datas to
// // calculate the results and declaring...........
// //ayjm evs mi funkciayi ognutyamb menq khashletkenq ardyunqner@
//
// checkMoves(whichGame,player);
// };
//
// const checkMoves=(arr,player)=>{
//     const compare=arr.map(v=>parseInt(v,10)).sort();
//     for ( let i = 0; i <game.winning_array ; i++) {
//         if (
//             compare.includes(game.winning_array[i][0]) &&
//             compare.includes(game.winning_array[i][1]) &&
//             compare.includes(game.winning_array[i][2])
//         ){
//             document.getElementById("outGrid").innerHTML=`
//             ${player} wins the game. <br/> Refresh to play again. <br/>
//             <button onclick="window.location.reload()>Refresh"></button>`
//         }
//     }
// };


let origBoard;
const huPlayer='O';
const aiPlayer='X';
const winCombos=[[0,1,2],[0,4,8],[0,3,6],
                   [3,4,5],[6,4,2],[2,5,8],
                   [6,7,8],[1,4,7]];

const cells=document.querySelectorAll('.cell');

function startGame() {
    document.querySelector('.endgame').style.display="none";
    origBoard=Array.from(Array(9).keys());
    for (let i = 0; i <cells.length ; i++) {
        cells[i].innerText='';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click',turnClick,false);
    }
}
startGame();


function turnClick(square) {
    //console.log(square.target.id)
    turn(square.target.id,huPlayer);
}
function checkWin(board,player) {
    let plays=board.reduce((a,e,i)=>
        (e===player) ? a.concat(i) : a, []);
    let gameWon = null;

    for (let [index, win] of winCombos.entries()){
        if (win.every(elem=>plays.indexOf(elem)>-1)){
            gameWon={index:index,player:player};
            break;
        }
    }
    return gameWon;
}

function turn(squareId,player) {
origBoard[squareId]=player;
document.getElementById(squareId).innerText=player;
let gameWon=checkWin(origBoard,player);
    if (gameWon) gameOver(gameWon)
}



function gameOver(gameWon) {
for (let index of winCombos[gameWon.index]){
    document.getElementById(index).style.backgroundColor=
        gameWon.player===huPlayer ? "blue" : "red";
}
    for (let i = 0; i <cells.length ; i++) {
        cells[i].removeEventListener('click',turnClick, false);

    }
}