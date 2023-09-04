"use strict"
//----------------------------------- VARIABLES -------------------------------------------------------------------------->

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
// parametros del juego
let game;
let width = 1000;   // del tablero
let height = 500;   // del tablero
let margin = 20;
let grid_circle = 0.85; // tamanio del circulo en proporcion a la celda
let color_background = "mintcream";
let color_frame = "blue";
// se usan en mousemove y mousedown
let x;
let y;
let is_dragging = false; 
let current_piece = null;

//----------------------------------- BOTONES DEL JUEGO -------------------------------------------------------------------------->

// play
//document.getElementById("btn_play").addEventListener("click",setearJuego);
document.getElementById("btn_play").addEventListener("click",setGame);
// reset
document.getElementById("reset").addEventListener("click",setGame);
// menu
document.getElementById("menu_gm").addEventListener("click",()=>{     document.getElementById("game_menu").classList.remove("hidden");     });



//----------------------------------- FUNCIONES DEL MOUSE -------------------------------------------------------------------------->

//                                                                                      <----------------------------------- MOUSE MOVE --
function mouse_move1(event){
    if(game !=null){
        if(game.gameOver) {       console.log(game.gameOver);  }
        ctx.clearRect(0,0,width,height);
        game.draw()
        // MEJORA = si chequeas que no hay current_piece no se prende el highlight
        //game.tablero.highlightCell(event.offsetX, event.offsetY);
        // el highlight lo puede hacer draw() pasandole offset x e y
        game.highlight(event.offsetX, event.offsetY);
        if(!is_dragging) { return; }
        // si esta draggeando...
        else {    
            event.preventDefault();
            // ubica las coordenadas del mouse
            let rect = canvas.getBoundingClientRect();
            let _x = event.clientX - rect.left;
            let _y = event.clientY - rect.top;
            
            let dx = _x - x;
            let dy = _y - y; 
            // resta las distancias y le cambia la posicion a la ficha seleccionada
            current_piece.x += dx;
            current_piece.y += dy;
            
            x = _x;
            y = _y;
        };
    }
}
//                                                                                      <----------------------------------- MOUSE DOWN --
function mouse_down1(event){
    event.preventDefault();
    
    let rect = canvas.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
    
    let index = 0;
    
    if(game.playersTurn){
        for (let piece of game.pieces_p1){
            if(piece.clickCircle(x,y)){
                is_dragging = true;
                current_piece = piece;
                return;
            }
            index++;
        }
        index = 0;
    } 
    else{
        for (let piece of game.pieces_p2){
            if(piece.clickCircle(x,y)){
                is_dragging = true;
                current_piece = piece;
                return;
            }
            index++;
        }
    }
}
//                                                                                      <----------------------------------- MOUSE UP --

function mouse_up() {
    
    is_dragging = false;
    if(current_piece!=null){
        game.insert_piece(current_piece);                // chequear quien es responsable de esa funcion
        current_piece=null;
    } 
}
     
function setGame(){
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0,0,width,height);
    let mode = getRadioValue('gm_mode');
    let player1 = document.getElementById("player1name").value;
    let player2 = document.getElementById("player2name").value;
    let imgp1 = getRadioValue("player1_img");
    let imgp2 = getRadioValue("player2_img");
    if(game != null){
        game.timer.stop();
    }
    
    game = new Game(mode,player1,player2,imgp1,imgp2);

    document.getElementById("player1").innerHTML = player1;
    document.getElementById("player2").innerHTML = player2;
    document.getElementById("game_menu").classList.add("hidden");
    
    game.draw();
}
function getRadioValue(name){
    for (var i = 0; i < document.getElementsByName(name).length; i++){
        if (document.getElementsByName(name)[i].checked){
            return document.getElementsByName(name)[i].value;
        }
    }
}

//----------------------------------- ACCIONES EN CANVAS -------------------------------------------------------------------------->
canvas.onmousedown = mouse_down1;
canvas.onmousemove = mouse_move1;
canvas.onmouseup = mouse_up;

////////////////////////////////////////////////////////////////   ESTO ES DEL MENU HAMBURGUESA NO DEL JUEGO //////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

let navigation = document.querySelector(".navigation");
let menu = document.querySelector("#menu");
menu.onclick = function (){
    
    this.classList.toggle('active');
    menu.classList.toggle("openmenu");
    navigation.classList.toggle('active');
    
}
