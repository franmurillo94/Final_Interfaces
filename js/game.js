"use strict"

class Game {
    constructor(mode,player1,player2,imgp1,imgp2) { 
        // elementos del juego
        this.pieces_p1 = [];                              
        this.pieces_p2 = [];             
        this.tablero = new Tablero(mode);
        this.timer = new Timer();
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
       // timer
        
        this.create_pieces(mode);
        this.timer.start(21,()=>{ this.gameOver = true; this.playersTurn = !this.playersTurn;});
        
    }
    draw(){
        this.draw_grid();
        this.draw_pieces();
        if(this.gameOver){
            ctx.fillStyle = 'rgba(0,0,0,0.75)';
            ctx.fillRect(0,0,width,height);
            this.drawText();
        }
        if(this.tablero.checkEmpate()){
            ctx.fillStyle = 'rgba(0,0,0,0.75)';
            ctx.fillRect(0,0,width,height);
            this.drawText("Empate");
        }
    }
    check(x,y){
        
        this.tablero.checkWin(x,y) ? this.gameOver = true : this.gameOver = false ;
        if(this.gameOver){
            game.timer.stop()
        }
        //console.log(this.gameOver);
    }
    insert_piece(piece){
        let current_p_c = this.tablero.insert_piece(piece,this.playersTurn);
        let x = current_p_c[0];
        let y = current_p_c[1];
        let status = current_p_c[2];
        if (status){
            this.check(x,y);
            if(this.gameOver == false){
                this.set_playersTurn();
                this.timer.stop()
                this.timer.start(21,()=>{ this.gameOver = true;this.playersTurn = !this.playersTurn;});
                //() ? this.gameOver=true : this.gameOver = false;
            }
        }
    }


    set_playersTurn(){ this.playersTurn = !this.playersTurn}

    highlight(x, y){
        this.tablero.highlightCell(x,y,this.playersTurn);
    }
   
    create_pieces(number){
        let num = (Number(number)+2)*(Number(number)+3);
        for(let i = 0; i<num;i++){
            if(i % 2 == 0){
                this.pieces_p1.push(new Piece(this.random_player1_x(),this.random_player_y(),this.wid,this.img_ficha1));
            }
            else{
                this.pieces_p2.push(new Piece(this.random_player2_x(),this.random_player_y(),this.wid,this.img_ficha2));;
            }
        } 
    }
   










    //////////////////////// FUNCIONES DE DIBUJO

    draw_grid(){
        // dibuja el tablero
      this.tablero.draw();
    }
    draw_pieces(){
        // dibuja fichas
        this.pieces_p1.forEach(e=>e.draw(ctx));
        this.pieces_p2.forEach(e=>e.draw(ctx));
    }
    drawText(){
    let size = 100;      
    let offset = size * 0.55;
    ctx.fillStyle = 'white';
    ctx.font = 100 + "px dejavu sans mono";
    ctx.lineJoin = "round";
    ctx.lineWidth = 100;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
     ctx.fillText((this.playersTurn ? this.p1_name:this.p2_name) + " wins!", width / 2, height / 2 + offset);
    }

    drawText(word){
        let size = 100;    
        let offset = size * 0.55;
        ctx.fillStyle = 'white';
        ctx.font = 100 + "px dejavu sans mono";
        ctx.lineJoin = "round";
        ctx.lineWidth = 100;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
         ctx.fillText(word, width / 2, height / 2 + offset);

    }







    ///////////////// RANDOM DONDE GENERAR LAS FICHAS ////////////////////


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
