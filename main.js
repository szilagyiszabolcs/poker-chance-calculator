document.addEventListener('contextmenu', event => event.preventDefault());
var takenCards = [] //cards that cant be drawn
var usedNames = [] //names that are taken
var hands = [] //array of arrays, each element is a hand(cards) of the players
var playerCount = 0 //number of player (max 6)
var currentType = "s" //in modal what type of cards the user sees (spades is the deafult) the coding: s-spades; h-hearts; c-clubs; d-diamonds
var adjacentSpaces = new RegExp('  ') //regex for space in player name
var forbiddenName = new RegExp('rndPlayer') //regex for prohibiting of rndPlayer name
var randomGeneratedList = false //true during randomization
function newPlayer(first, second) { //makes the player visible on the field
    if (playerCount == 5) { //+ button disable
        document.getElementById("add-player").style.display = "none"
        document.getElementById("add-player").style.position = "relative"
    }
    
    var name 
    var nameError = ""
    do { //name prompt and error handling of the name
        if (!randomGeneratedList) {
            name = prompt(`${nameError}\nPlease enter your name (max 10): `)
        }else{
            name = `rndPlayer${playerCount+1}`
        }
        
        nameError = ""
        if (name != null) {
            if (usedNames.includes(name)) {
                nameError += "This name is already in use.\n"
            }
            if (name == "") {
                nameError += "Name cannot be empty.\n"
            }
            if (name.length > 10) {
                nameError += "Name cannot be longer than 10 characters.\n"
            }
            if (name[0] == " " || name[name.length - 1] == " ") {
                nameError += "Name cannot start or end with space character.\n"
            }
            if (adjacentSpaces.test(name)) {
                nameError += "Name cannot contain multiple adjacent space characters.\n"
            }
            if (forbiddenName.test(name)) {
                nameError += "Name cannot equal a forbidden name.\n"
            }
        }
    } while ((
        name == "" ||
        name == null ||
        usedNames.includes(name) ||
        name.length > 10 ||
        name[0] == " " ||
        name.slice(-1) == " " ||
        adjacentSpaces.test(name) ||
        forbiddenName.test(name)) &&
        !randomGeneratedList
    );
    playerCount++
    usedNames.push(name)
    document.getElementById(`player${playerCount}-name`).innerText = name
    document.getElementById(`player${playerCount}`).parentNode.classList.add("visibleHand")
    document.getElementById(`player${playerCount}`).children[0].cid = first
    document.getElementById(`player${playerCount}`).children[1].cid = second
}

document.addEventListener("keydown",function(event) {//key shortcuts
    if (modalOpened && !inCalculation) {
        var num = "a"
        if (["s", "h", "c", "d"].includes(event.key)) { //choose type
            changeType(event.key)
        }
        else if (["a", "2", "3", "4", "5", "6", "7", "8", "9", "1", "j", "q", "k"].includes(event.key)) { //chose number
            if (event.key==="a") {
                num="1"
            }
            else if(event.key==="1"){
                num = "10"
            }
            else{
                num=event.key
            }
            var currentCard=num+currentType
            selectCard(currentCard)
        }
        if (event.key === "Escape") {//close modal
            closeModal()
        }
        if (event.key==="Enter" && !document.getElementById("ok").children[0].disabled) { //press the button
            addPlayer(2)
        }
        if (event.key==="Backspace") { //undo
            if (document.getElementById("placeholder2").cid=="aundefined") {
                removePlaceholder("placeholder1")
            }else{
                removePlaceholder("placeholder2")
            }
        }
        if (event.key==="r") {//randomize hand
            randomizeHand()
        }
    }
    else{
        if (event.key===" "&& playerCount!=6) {//open modal
            openModal(2)
        }
        if (event.key==="r"&&playerCount!=6) { //randomize everything
            if (!confirm("Are you sure you want to randomize everything?")) {
                return
            }
            x=playerCount
            randomGeneratedList=true
            placeholderCount=2
            
            for(let i=0; i<(6-x);i++){
                randomizeHand()
                addPlayer()
            }
            if (sharedCount==0) {
                placeholderCount=3
                randomizeHand()
                addPlayer()
            }
            if (sharedCount==3) {
                placeholderCount=1
                randomizeHand()
                addPlayer()
            }
            if (sharedCount==4) {
                placeholderCount=1
                randomizeHand()
                addPlayer()
            }
            randomGeneratedList=false
        }
        if (event.key === "Backspace" && playerCount != 0) {//delete last player
            let lastPlayerCards = document.querySelector(`#player${playerCount}`)

            deck.push(lastPlayerCards.children[0].cid)
            deck.push(lastPlayerCards.children[1].cid)

            document.getElementById(lastPlayerCards.children[0].cid).classList.remove("takenCards")
            document.getElementById(lastPlayerCards.children[1].cid).classList.remove("takenCards")
            
            takenCards.splice(takenCards.indexOf(lastPlayerCards.children[0].cid, 1))
            takenCards.splice(takenCards.indexOf(lastPlayerCards.children[1].cid, 1))

            lastPlayerCards.children[0].cid = "aundefined"
            lastPlayerCards.children[1].cid = "aundefined"
            
            lastPlayerCards.parentNode.classList.remove("visibleHand")
            usedNames.splice(usedNames.length - 1, 1)

            if (playerCount == 6) {
                document.getElementById("add-player").style.display = "flex"
                document.getElementById("add-player").style.position = "initial"
            }
            playerCount--
        }
        if (event.key === "Enter") {//start the calculation
            calc()
        }
    }
})