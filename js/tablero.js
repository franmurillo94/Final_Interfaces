// CLASE TABLERO

class Tablero{

    constructor (connect_number) {
        this.grid = [];
        this.grid_rows = Number(connect_number) + 2; 
        this.grid_cols = Number(connect_number) + 3 ;
        this.cell = (height - margin * 2) / this.grid_rows;
        this.marginY = margin;
        this.marginX = (width - this.cell * this.grid_cols) / 2;
        this.triangulo = [];
        this.color_frame= "blue";
        this.connect_number = Number(connect_number);

        this.createGrid();
    }

    createGrid(){
        // llenar el grid
        for( let i = 0; i < this.grid_rows; i++){
          this.grid[i] = [];
          for( let j = 0; j < this.grid_cols; j++){
                let left = this.marginX + j * this.cell;
                let top = this.marginY + i * this.cell;
                this.grid[i][j] = new Cell(left,top,this.cell,this.cell,i,j);
            }
        }
        //hacer los triangulos
        for(let t=0; t<this.grid_cols; t++){
            let left = this.marginX + t * this.cell;
            this.triangulo[t] = new Triangle(left, this.cell);
        }
    }
    draw(){
        let cell = this.grid[0][0];
        let fh = cell.get_H() * this.grid_rows;
        let fw = cell.get_W() * this.grid_cols;
        
        ctx.fillStyle = this.color_frame;
        ctx.fillRect(cell.left,cell.top,fw,fh);
        for(let row of this.grid) {
            for (let cell of row) {
                cell.draw(ctx);
            }
        }
        for(let triangulitos of this.triangulo){
            triangulitos.draw(ctx);
        }
       
    }
    checkEmpate(){
        for(let i = 0; i < this.grid_rows; i++){
            for(let j = 0; j < this.grid_cols; j++){
                if(this.grid[i][j].owner == null){
                    return false;
                }
            }
        }
        return true;
    }
    checkWin(row,col){
        // obtiene todas las celdas en todas las direcciones
        let diagLeft = [];
        let diagRight = [];
        let horiz = [];
        let vert = [];
        
        for(let i = 0; i < this.grid_rows; i++){
            for(let j = 0; j < this.grid_cols; j++){
                // celdas horizontales
                if(i == row){
                    horiz.push(this.grid[i][j]);
                }
                // celdas verticales
                if(j == col){
                    vert.push(this.grid[i][j]);
                }
                // celdas diagonal izquierda derechas
                if(i - j == row - col){
                    diagLeft.push(this.grid[i][j]);
                }
                // celdas diagonal derecha izquierda
                if(i + j == row + col){
                    diagRight.push(this.grid[i][j]);
                }
            }
        }
        
        // si alguno cumple retorna ganador
        return this.connect4(diagLeft) || this.connect4(diagRight) || this.connect4(vert) || this.connect4(horiz);
    
    }
    connect4(cells = []){
        let count = 0;
        let lastOwner = null;
        let winningCells = [];
    
        for(let i = 0; i < cells.length; i++){
            // si la casilla esta vacia
            if (cells[i].owner == null){
                count = 0;
                winningCells = [];
            }
            // mismo player, sumamos al count
            else if (cells[i].owner == lastOwner){
                count++;
                winningCells.push(cells[i]);
            }
            // nuevo player, nuevo count
            else{
                count=1;
                winningCells = [];
                winningCells.push(cells[i]);
            }
            // setear el ultimo owner
            lastOwner = cells[i].owner;
            if (count == this.connect_number) {
                console.log("chequeando    " + this.connect_number);
                for(let cell of winningCells) {
                    cell.winner = true;
                }
                return true;
            }
        }
        return false;
    } 
    highlightCell(x, y, playersTurn) {
        let col = null;
        for (let row of this.grid) {
            for (let cell of row) {
                // clear existing highlighting
                cell.highlight = null;
                // get the column
                if (cell.contains(x, y)) {
                    col = cell.col;
                }
            }
        }
        // e
        if (col == null) {
            return;
        }
        for (let i = this.grid_rows - 1; i >= 0; i--) {
            if (this.grid[i][col].owner == null) {
                this.grid[i][col].highlight = playersTurn;
                //console.log(playersTurn);
                return;
            }
        }
        return null;
    }
    
setTurn() {
    this.playersTurn = !this.playersTurn;
}

insert_piece(piece,playersTurn) {

    let highlighting = false;   

    for (let row of this.grid) {
        for (let cell of row) {
            if (cell.highlight != null) {
                highlighting = true;
                cell.highlight = null;
                cell.owner = playersTurn;
                cell.setPiece(piece);
                return [cell.row,cell.col,true];
            }
        }
    }
    return [0,0,false];
}
    
}

// CLASE TRIANGULO

class Triangle{
    constructor(left, w){
        this.left = left;
        this.w = w;
        this.cx = left + w/2;
        this.margin = margin;
        
    }
    // dibuja triangulo
    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.moveTo(this.cx , margin - 1);
        ctx.lineTo(this.cx + 20, 1);
        ctx.lineTo(this.cx - 20, 1);
        ctx.lineTo(this.cx , margin -1)
        ctx.stroke();
        ctx.fill();
    }
}