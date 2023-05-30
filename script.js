const board = document.querySelector(".board");
const startBtn = document.querySelector("#startBtn")
let vyskaPole, sirkaPole;
let win;
const players = 2; // Maximálně 3 hráči
let victory = false;
let array = [];
let currentPlayer = 0;



//Cyklus FOR, který vytvoří pole pro piškvorky


function createBoard(){
for (i = 0; i < vyskaPole; i++) {
    //Vytvoříme DIV
    let newColumn = document.createElement("div")
    //Přidáme classu sloupce
    newColumn.classList.add("column" + i)
    //Přidáme vytvořený DIV pro sloupec do divu BOARD
    board.appendChild(newColumn)
    array[i] = [];
    for (j = 0; j < sirkaPole; j++) {
        //Ve sloupci dále vytvoříme DIV buňky a přidáme classu řádku
        let newDiv = document.createElement("div");
        newDiv.classList.add("cell");
        newDiv.classList.add("row" + j)
        //newDiv.innerHTML = i + " " + j; //Popsání jednotlivých buňek čísly

        //Vkládáme daší buňky do sloupce 
        newColumn.appendChild(newDiv);
        array[i][j] = -1;
    }
    console.log()
}
}



board.addEventListener("click", (event) => {
    if (!victory) {
        let clickedCellColumn = event.target.parentElement.className;
        let clickedCell = event.target.className;

        let column = clickedCellColumn.charAt(clickedCellColumn.length - 1);
        let row = clickedCell.charAt(clickedCell.length - 1);
        /*
        console.log(clickedCell);
        console.log(clickedCellColumn);
        console.log(column);
        console.log(row);
        */
        if (event.target.classList.contains("cell") && !(event.target.classList.contains("NotEmpty"))) {
            //console.log(currentPlayer);
            currentPlayer = currentPlayer % players;
            //console.log(currentPlayer);
            switch (currentPlayer) {
                case 0:
                    event.target.classList.add("cross");
                    array[column][row] = 0;
                    break;
                case 1:
                    event.target.classList.add("circle");
                    array[column][row] = 1;
                    break;
                case 2:
                    event.target.classList.add("triangle");
                    array[column][row] = 2;
                    break;
            }

            event.target.classList.add("NotEmpty");
            victoryCheck();
            currentPlayer++;

        }
    }
}
)

function victoryCheck() {
    let draw = 0;
    for (i = 0; i < vyskaPole; i++) {
        for (j = 0; j < sirkaPole; j++) {
            if (array[i][j] != -1) {
                draw++;
                let hodnota = array[i][j];
                //Prochází jednotlivé metody na kontrolu, dokud victory != true
                if (draw === (vyskaPole*sirkaPole)) alert("Remíza");
                if (!victory) victory = rowCheck(hodnota, i, j);
                if (!victory) victory = columnCheck(hodnota, i, j)
                if (!victory) victory = diagonalLeft(hodnota, i, j)
                if (!victory) victory = diagonalRight(hodnota, i, j)
                if (victory){
                    victoryAnnouncement();
                    return;
                }
            }
        }
    }
}
function rowCheck(char, column, row) {
    let charCount = 1;
    while (charCount !== win && column + 1 < vyskaPole) {
        if (array[column + 1][row] === char) {
            column++;
            charCount++;
        } else {
            break;
        }
    }
    return charCount === win ? true : false;
}

function columnCheck(char, column, row) {
    let charCount = 1;
    while (charCount != win && row + 1 < sirkaPole) {
        if (array[column][row + 1] === char) {
            row++;
            charCount++;
        } else {
            break;
        }
    }
    return charCount === win ? true : false;
}

function diagonalRight(char, column, row) {
    let charCount = 1;
    while (charCount != win && column + 1 < vyskaPole && row - 1 >= 0) {
        if (array[column + 1][row - 1] === char) {
            column++;
            row--;
            charCount++;
        } else {
            break;
        }
    }
    return charCount === win ? true : false;
}

function diagonalLeft(char, column, row) {
    let charCount = 1;
    while (charCount != win && column - 1 >= 0 && row - 1 >= 0) {
        if (array[column - 1][row - 1] === char) {
            row--;
            column--;
            charCount++;
        } else {
            break;
        }
    }
    return charCount === win ? true : false;
}
function victoryAnnouncement() {
    switch (currentPlayer) {
        case 0:
            currentPlayer = "X";
            break;
        case 1:
            currentPlayer = "O"
            break;
        case 2:
            currentPlayer = "△";
            break;


    }
    alert("Výhra pro " + currentPlayer + ".");
}

function startGame(){
    win = Number(document.querySelector("#winSlider").value);
    sirkaPole = Number(document.querySelector("#heightSlider").value);
    vyskaPole = Number(document.querySelector("#widthSlider").value);
    let maxWin = sirkaPole > vyskaPole ? vyskaPole : sirkaPole;
    if(maxWin < win) {
        if( confirm("Výhra má větší rozsah než je rozměr pole. Opravdu chcete pokračovat?") === false)
        {
            return;
        }}
        
    
    let startElements = document.querySelectorAll(".startScreen");
    startElements.forEach(div => div.style.display = "none");
    board.style.display = "flex";
    createBoard();
    
    
    }
