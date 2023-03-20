const prompt = require("prompt-sync")()

const rows = 3
const cols = 3

const symbolCount = {
    A : 2,
    B : 4,
    C : 6,
    D : 8
}

const symbolValue = {
    A : 5,
    B : 4,
    C : 3,
    D : 2
}


const getDepositAmount = () =>{
    while ( true ) {
        const depositAmount = prompt("Enter the deposit amount : ")
        const numberDepositAmount = parseFloat (depositAmount)

        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0 ){
        console.log("Invalid deposit amount, try again! ")
        } else {
            return numberDepositAmount
        }
    }
}

const getNumberOfLines = ()=>{
    while (true) {
    const lines = prompt("Enter the number of lines you want to bet on (1-3) : ");
    const numberOfLines = parseInt(lines);

        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Invalid number of lines, try again! ");
        } else {
            return numberOfLines;
        }
    }

}

const getBet = (balance , lines) => {
    while ( true ) {
        const bet = prompt("Enter the bet per line : ")
        const numberBet = parseFloat(bet)

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines){
            console.log("Invalid bet, try again !")
        } else {
            return numberBet
        }
    }
}

const spin = ()=>{
    const symbols = []
    for ( const [symbol,count] of Object.entries(symbolCount)){
        for (var i=0 ; i<count ; i++){
            symbols.push(symbol)
        }
    }
    const reel = []
    for( var i=0 ; i<rows ; i++){
        reel.push([])
        const reelSymbols = [...symbols]
        for ( var j=0 ; j<cols ; j++){
            const randomIndex = Math.floor(Math.random()*reelSymbols.length)
            const selectedSymbol = reelSymbols[randomIndex]
            reel[i].push(selectedSymbol)
            reelSymbols.splice(randomIndex,1)
        }
    }
    return reel
}

const transpose = (reels) => {
    const trans = []
    for ( var i=0 ; i<rows ; i++ ){
        trans.push([])
        for ( var j=0 ; j<cols ; j++){
            trans[i].push(reels[j][i])
        }
    }
    return trans
}

const printReel = (reel) => {
    for ( const row of reel) {
        var rowString = ""
        for ( const [i, symbol] of row.entries()){
            rowString += symbol
            if ( i != row.length - 1){
                rowString += " | "
            }
        }
        console.log(rowString)
    }
}

const isWin = (rows, bet, lines) => {
    let winnings = 0

    for ( var i=0 ; i < lines ; i++ ){
        const symbols = rows[i]
        let allSame = true

        for ( const symbol of symbols ){
            if ( symbol != symbols[0] ){
                allSame = false
                break
            }
        }
        if ( allSame ){
            winnings += bet * symbolValue[symbols[0]]
        }
    }
    return winnings
}

const game = () => {
    let balance = getDepositAmount()
    while(true) {
        const numberOfLines = getNumberOfLines()
        const bet = getBet(balance , numberOfLines)
        balance -= bet * numberOfLines
        const reels = spin() 
        const finalReel = transpose(reels)
        printReel(finalReel)
        const win = isWin(finalReel, bet, numberOfLines)
        if (win > 0) {
            console.log("You won Rs " + win.toString())
            balance += win
        } else {
            console.log("You Lost")
        }
        console.log("Your balance is Rs " + balance.toString())
        if (balance <= 0 ){
            console.log("You ran out of money!")
            break
        }
        const playAgain = prompt("Do you want to play again (y/n) ? ")
        if (playAgain != "y" ) break
    }
}
game()