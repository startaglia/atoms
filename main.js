
// QUESTA E' LA LARGHEZZA DI UNA CELLA DELLA GRIGLIA
const cellSize = 60; 

// P E' IL NOSTRO VETTORE
let P;
// X0 E' LA VARIABILE PER LE ASSE X PER LA POSIZIONE CASUALE DEL VETTORE (TOLGO PERCHE' ERANO SOLO A SCOPO DIMOSTRATIVO)
// let x0;
// Y0 E' LA VARIABILE PER LE ASSE Y PER LA POSIZIONE CASUALE DEL VETTORE (TOLGO PERCHE' ERANO SOLO A SCOPO DIMOSTRATIVO)
// let y0;
// R E' UNA VARIABILE CHE FA MUOVERE IL VETTORE IN MANIERA CIRCOLARE, SAREBBE IL RAGGIO DELLA CIRCONFERENZA CHE TRACCERA IL NOSTRO VETTORE (TOLGO PERCHE' ERANO SOLO A SCOPO DIMOSTRATIVO)
// let r = 50;
// T E' IL TEMPO
let t=0;

// IL MIO ARRAY DI TUTTE LE CELLE 
let cells;

let n_cols;
let n_rows; 
// LA FUNZIONE SETUP VIENE ESEGUITA SOLO ALL'INIZIO, QUINDI SI USA PER CREARE L'AMBIENTE 
function setup() {
    // LA FUNZIONE CANVAS DI P5 CREA IL TELAIO, CREA IL QUADRATO ENTRO IL QUALE CREEREMO GLI OGGETTI 
    createCanvas(1350,600)
    // CON LA FUNZIONE CREATEVECTOR LO INIZIALIZZO A VETTORE 100 E 100 SONO X E Y 
    // P = createVector(100,100)
    // LA FUNZIONE NOISE RITORNA UN NUMERO TRA RANDOM TRA 0 E 1 IN MANIERA CAUSUALE, A DIFFERENZA DI RANDOM(), CHE E' SEMPRE UNA FUNZIONE DI P5, E' USATO PER GENERARE ANIMAZIONI ARMONICHE PERCHE' DI BASE TRA UN VALORE E L'ALTRO CHE RITORNA NON C'E' MAI UN'ENORME VARIAZIONE (TOLGO PERCHE' ERANO SOLO A SCOPO DIMOSTRATIVO)
    // x0= noise(1)*width;
    // y0= noise(1)*height;
    // P = createVector(x0,y0)
    n_cols = floor(width/cellSize);
    n_rows = floor(height/cellSize);

    cells = [];
    // QUESTO CICLO FOR MI SERVE PER INDIVIDUARE IL NUMERO DI CELLA CHE CORRISPONDE AD UN NUMERO DI RIGA E COLONNA 
    for(let i = 0; i<n_rows*n_cols; i++){
        // IL RISULTATO DEL MODULO DI I / IL NUMERO DI COLONNE MI DA IL NUMERO DI COLONNA 
        const col = (i % n_cols);
        // APPROSSIMATO PER DIFETTO IL RISULTATO DELLA DIVISIONE DI I / IL NUMERO DI COLONNE MI DA LA RIGA 
        const row = floor(i/n_cols);
        // DOPODICHE PUSHO DENTRO L'ARRAY DELLE CELLE LA CELLA CHE HO COSTRUITO:
        //  - COL*CELLSIZE SAREBBE LO 0 DELLA CELLA, QUINDI IL PUNTO IN ALTO A SINISTRA
        //  - NOISE(I) * CELLSIZE; SICCOME VOGLIO CHE STIA IN UN PUNTO CASUALE DA 0 A 1 ( CON NOISE ) LO MOLTIPLICO A CELLSIZE CHE SAREBBE LA GRANDEZZA DELLA CELLA
        cells.push(createVector(col*cellSize + noise(i) * cellSize, row * cellSize + noise(i) * cellSize))
    }
    

}

// LA FUNZIONE DRAW VIENE ESEGUTIA IN LOOP 
function draw() {
    // LA FUNZIONE STROKE DA IL COLORE 
    stroke(255, 0, 0);
    // CREA IL BACKGROUND NERO 
    background(0);

    // IL TEMPO VIENE INCREMENTATO OGNI VOLTA CHE LA DRAW VIENE CHIAMATA, COSI LO RENDIAMO ALL'INFINITO
    t= t + 0.05;

    

    cells.forEach((p, i) => {
        const col = (i % n_cols);
        const row = floor(i/n_cols);
        const px0 = (col * cellSize + noise(i) * cellSize) 
        const py0 = (row * cellSize + noise(i) * cellSize);
        p.x = px0 + 0.9 * map(sin(t * noise(i)), -1, 1, -noise(i) * cellSize, cellSize - noise(i) * cellSize);
        p.y = py0 + 0.9 * map(cos(2* t * noise(i)), -1, 1, -noise(i) * cellSize, cellSize - noise(i) * cellSize);
    })
    // drawGrid();
    for(let i =1; i< n_cols-1; i++){
        for (let j=1; j<n_rows-1; j++){
            const n1 = cells[(j-1) * n_cols + (i - 1)];
            const n2 = cells[(j-1) * n_cols + (i)];
            const n3 = cells[(j-1) * n_cols + (i + 1)];
            const n4 = cells[(j) * n_cols + (i - 1)];
            const n6 = cells[(j) * n_cols + (i + 1)];
            const n7 = cells[(j+1) * n_cols + (i - 1)];
            const n8 = cells[(j+1) * n_cols + (i)];
            const n9 = cells[(j+1) * n_cols + (i + 1)];

            const p = cells[j * n_cols + i];
            const neight = [n1,n2,n3,n4,n6,n7,n8,n9];
            neight.forEach(other =>{
                let d = p.dist(other);
                if(d<cellSize * 1.25) {
                    d = map(d, 0.8 * cellSize, 1.25 * cellSize, 255, 0)
                    stroke(d,0,0)
                    strokeWeight(4)
                    line(p.x, p.y, other.x, other.y)
                }
            })
        }
    }
    
    noStroke()
    cells.forEach(p => {
        circle(p.x, p.y, 10)
    });




    // QUESTE SONO EQUAZIONE PARAMETRICHE DELLA CIRCONFERENZA:
    //  IL MOVIMENTO DEL VETTORE SULL'ASSE X E' DATO DALL'ASSE X DEL CANVAS + IL RAGGIO * IL COSENO DEL TEMPO;
    // LO MOLTIPLICO PER NOISE DI T PER DARGLI UN MOVIMENTO ARMONICO MA CASUALE (TOLGO PERCHE' ERANO SOLO A SCOPO DIMOSTRATIVO)
    // P.x = x0 + r * cos(t)* noise(t);
    // P.y = y0 + r * sin(t) * noise(t);
    // LA FUNZIONE CIRCLE CI PERMETTE DI CREARE UN CERCHIO (TOLGO PERCHE' ERANO SOLO A SCOPO DIMOSTRATIVO)
    /*circle(x, y, d)
    X E' L'ASSE X 
    Y E' L'ASSE Y 
    D E' IL DIAMETRO*/
    // circle(P.x, P.y, 20)
}

function drawGrid (){
    
    // FLOOR ARROTONDA IL NUMERO PER DIFETTO ALL'INTERO PIU VICINO, WIDTH E' UNA VARIABILE P5 CHE INDICA LA LARGHEZZA DEL CANVAS, QUINDI DIVIDENDOLO PER LA LARGHEZZA DI UNA CELLA HO UNA DIVISIONE PRECISA DEL MIO CANVAS
    for(let i = 0; i< floor(width/cellSize); i++) {
        // LA FUNZIONE LINE IN P5 HA 4 PARAMETRI(5 PER QUELLA CON L'ASSE Z)
        /*line(x1, y1, x2, y2)
        X1 E' IL PUNTO DI PARTENZA DELL'ASSE X
        Y1 E' IL PUNTO DI PARTENZA DELL'ASSE Y
        X2 E' IL PUNTO DI FINE DELL'ASSE X
        Y2 E' IL PUNTO DI FINE DELL'ASSE X*/
        line(i*cellSize, 0, i*cellSize, height)
    }
    for(let i = 0; i< floor(height/cellSize); i++) {
        line(0, i*cellSize, width, i*cellSize)
    }
}