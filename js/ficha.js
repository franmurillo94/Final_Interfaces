let color_player1 = "red";
let color_player2 = "yellow";

class Piece {
    constructor(x,y,sc,img_ficha){   // agregar img_ficha2 y img_ficha1
        this.startX = x;                                        // posicion inicial en x de la ficha 
        this.startY = y;                                        // posicion inicial en y de la ficha
        this.x = x;                                             // posicion en x
        this.y = y;                                             // posicion en y
        this.scale = sc;                                          // tamaño escala de la ficha
        this.img = new Image();
        this.img.src = "../imagenes/" + img_ficha;                // imagen de la ficha
    }
    
    draw(ctx){    
        // se dibuja la imagen
        ctx.drawImage(this.img, (this.x - this.scale), (this.y - this.scale), (2 * this.scale), (2 * this.scale));
    }
    clickCircle(xmouse,ymouse){ 
        //funcion que establese si se esta clickeando adentro o fuera del perimetro de la ficha, retorna true or false y cambia la variable dragging a true or false
        let distance =  Math.sqrt(  (( xmouse - this.x ) * ( xmouse - this.x )) + (( ymouse - this.y ) * ( ymouse - this.y ))   );
        if (distance < this.scale) {
            return true;
        } else {
            return false;
        }
    }
    setCoords(x,y) {
        this.x = x;
        this.y = y;
    }
    
}




