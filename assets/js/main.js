/* CONSEGNA
*************
L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro. 

Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.

In seguito l'utente clicca su una cella:
    - se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba
    - la cella si colora di rosso e la partita termina,
    - altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

La partita termina quando:
 - il giocatore clicca su una bomba
    - o raggiunge il numero massimo possibile di numeri consentiti.

Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

BONUS: 1
quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste


*/




//dichiaro una variabile che richiami button 

const btn = document.getElementById ("play");

//dichiaro una variabile in cui assegnerò la lista dei numeri delle bombe generate 
let bombList;

//dichiaro una variabile in cui assegnerò la lunghezza della lista celle della griglia
let gridLimit

//dichiaro una variabile a cui assegnerò la lista dei tentativi
let attempts;

//eseguo una funzione al suo click che generi tre griglie differenti in base al livello della difficoltà


btn.addEventListener ("click", function GenerateGrid(selector){

    /* console.log("click") */

    //dichiaro una variabile in cui andrà il valore contenuto all'interno del mio selettore della difficoltà

    const difficult = document.querySelector(".selection").value ;
     


    //imposto una condizione in cui stabilisco che tipo di griglia deve essere generata in base ai diversi livelli di difficoltà 
    if (difficult == "Easy"){
        
        //invoco la funzione che genera la mia griglia
        generateGrid(".cells", "div", "cell", 100, "easy_grid");

        /* console.log(generateBombList(1, 100)) */
        bombList = generateBombList(1, 100);

        //invoco la funzione che seleziona le mie celle e assegna loro determinate caratteristiche con delle classi
        selectElements (".cell", "active", "active_red")

        //invoco la funzione che genera una lista di bombe

       
        console.log(bombList)
        /* console.log(numBombs); */
        attempts = gridLimit- numBombs ;
        /* console.log(attempts) */
        
        
    }

    else if (difficult == "Medium" ){
        generateGrid(".cells", "div", "cell", 81, "medium_grid");

        /* console.log(generateBombList(1, 81)) */
        bombList = generateBombList(1, 81)

        selectElements (".cell", "active", "active_red")

        
        console.log(bombList)
        attempts = gridLimit- numBombs ;
        console.log(attempts);
        

    }

    else if (difficult == "Hard") {
        generateGrid(".cells", "div", "cell", 49, "hard_grid");

        /* console.log(generateBombList(1, 49)) */
        bombList = generateBombList(1, 49)

        selectElements (".cell", "active", "active_red")

        
        console.log(bombList)
        attempts = gridLimit- numBombs ;
        console.log(attempts)

    
    }


}) 


//creo una funzione per la generazione della griglia
function generateGrid (selector, tag_name, class_name, limit, level) {

    const cellsElement = document.querySelector(selector)
    
    //pulisco la griglia inserendo un elemento vuoto nella dom
    cellsElement.innerHTML = " " ;
    
    for(let i = 1; i <= limit; i++) {
        //creo l'elemento cella da inserire nella griglia
        let cell = document.createElement(tag_name);
        //appendo delle classi per dargli determinate caratteristiche di stile
        cell.classList.add(class_name);
        //determino con una classe la larghezza alla griglia in base alla difficoltà 
        cell.classList.add(level);
        //appendo alla cella il numero progressivo nel ciclo
        cellsElement.append(cell);

    }

}


//creo una funzione per selezionare le celle contenute nella griglia e modificarle
function selectElements (selector, active_class, bomb_class){
    //creo una variabile in cui c'è una lista con tutte le mie celle
    //seleziono tutte le celle con querySelectorAll
    const cells = document.querySelectorAll(selector);
    gridLimit = cells.length;
    /* console.log(gridLimit); */
    


    //creo un ciclo for per tutti gli elementi della dom, il limite è la lunghezza della lista di celle. mi permetterà di selezionare le singole celle della lista

    for (let i = 0; i < cells.length; i++) {
        const cellItem = cells[i];
        /* console.log(cellItem); */

        //creo uno span che assegni dei numeri all'interno delle celle che partano da 1 alla lunghezza della lista
        const  spanElement = document.createElement("span");
        spanElement.append(i + 1);
        cellItem.append(spanElement);
        
        //creo una funzione che mi permette di aggiungere al singolo oggetto un evento al click con event listener
        cellItem.addEventListener("click", function(){

            /* console.log(attempts); */

            /* console.log(this, i); */

            //imposto una condizione affinchè se l'utente clicca su una cella ed il numero è presente nella lista dei numeri generati abbiamo calpestato una bomba. La cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
            
            
            
            if (bombList.includes(parseInt(spanElement.innerHTML))){
                
                this.classList.add(bomb_class);

                const clock = setTimeout(function(){

                    alert(`BOOOM! Hai calpestato una bomba. La tua partita è terminata`)
                    location.reload() 
                    

                },300 );
                

            } 
            
            //evidenzio la cella con il colore azzurro alla selezione
            while (attempts !== 0 ) {

                this.classList.add(active_class);
                
            } else {

                alert(`HAI VINTO`)

            }

                
        })
    }
    /* console.log(gridLimit);
    window.gridLimit = gridLimit; */
    /* return gridLimit; */

}

//creo una funzione che mi generi una lista di 16 numeri random. I numeri nella lista delle bombe non possono essere duplicati.


function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* getRandomInteger(1,16) */
/* console.log(getRandomInteger(1,16)) */

function generateBombList (min, max){

    //dichiaro una variabile con array vuoto
    let bombList = [];
    
    //imposto un ciclo che crei i miei 16 numeri random

    while(bombList.length !== 16){

        //dichiaro una variabile che inizio con numeri random che vadano da 1 a grandezza della mia griglia

        let randomNumb = getRandomInteger(min, max);

        //controllo se il numero è già presente nella lista. Nel caso non fosse presente lo pusho nella lista.

        if (!bombList.includes(randomNumb)) {
            bombList.push(randomNumb);
        }  
       
    }
    
    numBombs = bombList.length;
    /* console.log(numBombs) */
    return bombList ;
}

/* console.log(generateBombList(1, 100)); */