document.addEventListener('contextmenu', event => event.preventDefault());
var takenCards = []
var usedNames = []
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
    playerCount++
    var name 
    var nameError = ""
    do { 
        if (!randomGeneratedList) {
            name = prompt(`${nameError}\nPlease enter your name (max 10): `)
        }else{
            name = `rndPlayer${playerCount}`
        }
        
        nameError = ""
        if (usedNames.includes(name)) {
            nameError += "This name is already in use.\n"
        }
        if (name == "" || name == null) {
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
    } while (name == "" ||
        name == null ||
        usedNames.includes(name) ||
        name.length > 10 ||
        name[0] == " " ||
        name[name.length - 1] == " " ||
        adjacentSpaces.test(name) ||
        forbiddenName.test(name)
    );

    usedNames.push(name)
    document.getElementById(`player${playerCount}-name`).innerText = name
    document.getElementById(`player${playerCount}`).parentNode.classList.add("visibleHand")
    document.getElementById(`player${playerCount}`).children[0].cid = first
    document.getElementById(`player${playerCount}`).children[1].cid = second
}