class Cell { 

    constructor (left, top, w, h, row, col) {

        this.left = left;               // coordenada en y del borde izquierdo de la celda    
        this.top = top;                 // coordenada en x del borde superior de la celda  
        this.right = left + w;          
        this.w = w;                     // ancho
        this.h = h;                     // alto
        this.row = row;                 // numero de fila
        this.col = col;                 // numero de columna
        this.cx = left + w/2;           // centro en x en la celda
        this.cy = top + h/2;            // centro en y de la celda 
        this.r = w * grid_circle/2;     // 
        this.owner = null;              // si esta ocupada la celda (null si esta vacia| true y false por player)
        this.winner = false;            
        this.highlight = null;
        this.piece;                     // ficha colocada en la celda
    }

    // funcion dibujar celda
    draw(ctx){                             
        let color;
        
        if(this.owner == null){
            // si la celda esta vacia crea la arco de la ficha del y genera la circunferencia con opacidad
            color = 'rgba(0,0,0,0.4)';
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(this.cx,this.cy,this.r,0,Math.PI * 2);
            ctx.fill();
        }else{
            // si la celda esta ocupada accede al atributo ficha, le setea la coordinada del centro de la celda y la dibuja
            this.piece.setCoords(this.cx,this.cy);
            this.piece.draw(ctx);
        }
        
        // este highlight modifica el color de los triangulos de arriba y el de los circulos donde irian las fichas
        if(this.highlight != null){
            //color = playersTurn ? this.color_player1 : this.color_player2;
            color = "red";
            ctx.lineWidth = this.r / 7;
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.arc(this.cx,this.cy,this.r,0,Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        }
        
    }
    // chequea que las coordenadas que recibe esten dentro de la columna indicada
    contains(x, y){
        return x > this.left && x < this.right && y > 0 && y < margin;
    }
    // recibe pieza por parametro
    setPiece(piece){
        this.piece = piece;
    }
    get_H(){
        return this.h;
    }
    get_W(){
        return this.w;
    }
}
