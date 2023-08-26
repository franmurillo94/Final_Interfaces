"use strict"

class Game {
    constructor(mode,player1,player2,imgp1,imgp2) {   
        // elementos del juego
        this.pieces_p1 = [];                              
        this.pieces_p2 = [];  
        this.tablero;               
    // this.timer;     
        this.connect_number = mode;        
        // elementos player
        this.img_ficha1 = imgp1;        
        this.img_ficha2 = imgp2;        
        this.p1_name = player1;         
        this.p2_name = player2;        
        // funcionamiento del juego;
        this.playersTurn = true;               
        this.gameOver = false;        
        // dimensiones de elementos     
        this.grid_cols = (Number(mode)+3);
        this.grid_rows = (Number(mode)+2);                         
        this.cell_dim = (height - margin * 2)/ this.grid_rows ;                    // ancho de celda
        this.wid = this.cell_dim * grid_circle / 2;                                 // radio de la ficha
        this.marginX = (width - this.cell_dim * this.grid_cols) / 2;              // margen en X
        //this.segundos;                      

        this.create_pieces();
        this.tablero = new Tablero(this.connect_number);
    }

    draw(){
        this.draw_grid();
        this.draw_pieces();
        if(this.gameOver){
            ctx.fillStyle = 'rgba(0,0,0,0.75)';
            ctx.fillRect(0,0,width,height);
            this.drawText();
        }
        //console.log(this.wid);
    }
    check(x,y){
        
        this.tablero.checkWin(x,y) ? this.gameOver = true : this.gameOver = false ;
        //console.log(this.gameOver);
    }
    insert_piece(piece){
        let current_p_c = this.tablero.insert_piece(piece,this.playersTurn);
        let x = current_p_c[0];
        let y = current_p_c[1];
        let status = current_p_c[2];
        if (status){
            this.check(x,y);
            this.set_playersTurn();
       }
    }


    set_playersTurn(){ this.playersTurn = !this.playersTurn}

    highlight(x, y){
        this.tablero.highlightCell(x,y,this.playersTurn);
    }
    draw_grid(){
        // dibuja el tablero
      this.tablero.draw();
    }
    create_pieces(){
        // crea fichas
        // las pone en los arreglos
        for(let i = 0; i<29;i++){
            if(i % 2 == 0){
                this.pieces_p1.push(new Piece(this.random_player1_x(),this.random_player_y(),this.wid,this.img_ficha1));
            }
            else{
                this.pieces_p2.push(new Piece(this.random_player2_x(),this.random_player_y(),this.wid,this.img_ficha2));;
            }
        } 
    }
    draw_pieces(){
        // dibuja fichas
        this.pieces_p1.forEach(e=>e.draw(ctx));
        this.pieces_p2.forEach(e=>e.draw(ctx));
    }
    // DIBUJA TEXTO DE WIN!
    drawText(){
    let size = 100;         // grid[0][0].h;
    let offset = size * 0.55;
    ctx.fillStyle = 'white';
    ctx.font = 100 + "px dejavu sans mono";
    ctx.lineJoin = "round";
    ctx.lineWidth = 100;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
     ctx.fillText((!this.playersTurn ? this.p1_name:this.p2_name) + " wins!", width / 2, height / 2 + offset);
    
}
    timer() {
        let texto = document.getElementById("timer");
        texto.innerHTML = this.segundos;
        if(this.segundos==0){
            this.gameOver = true;
            //isTimeWinner = true;
            //timeWinner = playersTurn;
        }
        else if(segundos<=3){
            texto.style.color = "red";
            segundos--;
            setTimeout("timer()",1000)
        }
        else{
            segundos--;
            setTimeout("timer()",1000);
        }
    }

    // genera un numero random en el eje de las x en el costado izquierdo del tablero
    random_player1_x(){
        let random = 0;
        let margin = Math.floor(this.marginX);
        let widd = Math.floor(this.wid);
        while(random < widd || random > margin-widd){
            random = Math.floor(Math.random()* this.marginX - 1);
        }
    return random;
    }
    // genera un numero random en el eje de las x en el costado derecho del tablero
    random_player2_x(){
        let random = 0;
        let margin = Math.floor(this.marginX + (this.cell_dim*this.grid_cols));
        while(random < margin + this.wid || random > width-this.wid){
           random =Math.floor(Math.random()* width);
        }
        return random;
    }
    // genera un numero random en el eje de las y en el alto del canvas
    random_player_y(){
        let random = 0;
        let widd = Math.floor(this.wid);
        while(random < widd || random > height-widd){
            random = Math.floor(Math.random()* height - 1);
        }
        return random;
    }

}






























































//------------------------------------------------------------------------------------------- TIMER

let segundos = 20;
let isTimeWinner = false;

function timer(){
    let texto = document.getElementById("timer");
    texto.innerHTML = segundos;
    if(segundos==0){
        gameOver = true;
        isTimeWinner = true;
        timeWinner = playersTurn;
    }
    else if(segundos<=3){
        texto.style.color = "red";
        segundos--;
        setTimeout("timer()",1000)
    }
    else{
        texto.style.color = "green";
        segundos--;
        setTimeout("timer()",1000);
    }
};

class Timer{
    constructor(seg){
        this.segundos = seg;
        this.texto = document.getElementById("timer").innerHTML = segundos;
    }
    setTimer(seg){ this.segundos = seg }
    run(){ 
        if(this.segundos==0){
            return true;
        }
        else if(this.segundos<=3){
            this.texto.style.color = "red";
            this.segundos--;
            setTimeout("run()",1000);
        }
        else{
            this.texto.style.color = "green";
            this.segundos--;
            setTimeout("run()",1000);
        }
    }
    stop(){

    }
    
};

















































































































