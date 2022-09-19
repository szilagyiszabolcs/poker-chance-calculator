document.addEventListener('contextmenu', event => event.preventDefault());
var takenCards = []
var usedNames = []
var hands = []
var playerCount = 0
var currentType = "s"
var adjacentSpaces = new RegExp('  ')
var forbiddenName = new RegExp('rndPlayer')
var randomGeneratedList = false
function newPlayer(first, second) {
    if (playerCount == 5) {
        document.getElementById("add-player").style.display = "none"
        document.getElementById("add-player").style.position = "relative"
    }
    
    var name 
    var nameError = ""
    do { 
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

document.addEventListener("keydown",function(event) {
    if (modalOpened) {
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
        if (event.key === "Escape") {
            closeModal()
        }
        if (event.key==="Enter" && !document.getElementById("ok").children[0].disabled) {
            addPlayer(2)
        }
        if (event.key==="Backspace") {
            if (document.getElementById("placeholder2").cid=="aundefined") {
                removePlaceholder("placeholder1")
            }else{
                removePlaceholder("placeholder2")
            }
        }
        if (event.key==="r") {
            randomizeHand()
        }
    }
    else{
        if (event.key===" "&& playerCount!=6) {
            openModal(2)
        }
        if (event.key==="r"&&playerCount!=6) {
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
            placeholderCount=3
            randomizeHand()
            addPlayer()
            placeholderCount=1
            randomizeHand()
            addPlayer()
            randomizeHand()
            addPlayer()
            randomGeneratedList=false
        }
        if (event.key === "Backspace" && playerCount != 0) {
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
        if (event.key === "Enter") {
            calc()
        }
    }
})