var deck = ["1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s", "js", "qs", "ks",
    "1h", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "10h", "jh", "qh", "kh",
    "1c", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "10c", "jc", "qc", "kc",
    "1d", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "10d", "jd", "qd", "kd"]
var currentCards = []
var takenCards = []
var modalOpened = false
var placeholderCount
var sharedCards = []
var sharedCount = 0
function openModal(num) {
    placeholderCount = num
    if (placeholderCount == 1) {
        document.getElementById("placeholder2").style.visibility = "hidden"
        document.getElementById("placeholder3").style.visibility = "hidden"
    } else if (placeholderCount == 2) {
        document.getElementById("placeholder2").style.visibility = "visible"
        document.getElementById("placeholder3").style.visibility = "hidden"
    }
    else if (placeholderCount == 3) {
        document.getElementById("placeholder2").style.visibility = "visible"
        document.getElementById("placeholder3").style.visibility = "visible"
    }
    document.getElementById("modal").style.visibility = "visible"
    modalOpened = true
}
function closeModal() {
    document.getElementById("modal").style.visibility = "hidden"

    removePlaceholder("placeholder1")
    if (placeholderCount >= 2) {
        removePlaceholder("placeholder2")
    }
    if (placeholderCount == 3) {
        removePlaceholder("placeholder3")
    }
    document.getElementById("placeholder2").style.visibility = "hidden"
    document.getElementById("placeholder3").style.visibility = "hidden"
    currentCards = []
    modalOpened = false
}
function changeType(color) {
    document.getElementById("spades").style.zIndex = 2
    document.getElementById("hearts").style.zIndex = 2
    document.getElementById("clubs").style.zIndex = 2
    document.getElementById("diamonds").style.zIndex = 2
    switch (color) {
        case "s":
            document.getElementById("spades").style.zIndex = 3
            break;
        case "h":
            document.getElementById("hearts").style.zIndex = 3
            break;
        case "c":
            document.getElementById("clubs").style.zIndex = 3
            break;
        case "d":
            document.getElementById("diamonds").style.zIndex = 3
            break;
        default:
            break;
    }
    currentType = color
}
function selectCard(clickedCard) {
    if (currentCards.includes(clickedCard) || takenCards.includes(clickedCard)) {
        return
    }
    if (document.getElementById("placeholder1").cid == "aundefined") {
        document.getElementById("placeholder1").cid = clickedCard
        document.getElementById("placeholder1").children[0].style.opacity = 1
    } else if (placeholderCount >= 2 && document.getElementById("placeholder2").cid == "aundefined") {
        document.getElementById("placeholder2").cid = clickedCard
        document.getElementById("placeholder2").children[0].style.opacity = 1
    } else if (placeholderCount == 3 && document.getElementById("placeholder3").cid == "aundefined") {
        document.getElementById("placeholder3").cid = clickedCard
        document.getElementById("placeholder3").children[0].style.opacity = 1
    }
    else {
        return
    }
    document.getElementById(clickedCard).classList.add("selectedCards")
    currentCards.push(clickedCard)
    if (currentCards.length == placeholderCount) {
        document.getElementById("ok").children[0].disabled = false
        document.getElementById("ok").children[0].classList.add("buttonHover")
    } else {
        document.getElementById("ok").children[0].disabled = true
        document.getElementById("ok").children[0].classList.remove("buttonHover")
    }
}
function removePlaceholder(placeholder) {
    if (document.getElementById(placeholder).cid == "aundefined") {
        return
    }
    document.getElementById("ok").children[0].classList.remove("buttonHover")
    document.getElementById("ok").children[0].disabled = true
    document.getElementById(document.getElementById(placeholder).cid).classList.remove("selectedCards")
    document.getElementById(placeholder).cid = "aundefined"
    document.getElementById(placeholder).children[0].style.opacity = 0.2
    currentCards.splice(currentCards.indexOf(placeholder), 1)
}
function addPlayer() {
    if (placeholderCount == 2) {
        hands.push([currentCards[0], currentCards[1]])
        newPlayer(currentCards[0], currentCards[1])
    }
    if (placeholderCount == 3) {
        sharedCount = 3
        sharedCards.push(currentCards[0], currentCards[1],currentCards[2])
        document.getElementById("shared-cards1").cid = currentCards[0]
        document.getElementById("shared-cards2").cid = currentCards[1]
        document.getElementById("shared-cards3").cid = currentCards[2]        
        document.getElementById("shared-cards1").children[0].style.opacity = 1
        document.getElementById("shared-cards2").children[0].style.opacity = 1
        document.getElementById("shared-cards3").children[0].style.opacity = 1
    }
    if (placeholderCount==1) {
        sharedCount++
        if (document.getElementById("shared-cards4").cid=="aundefined") {
            document.getElementById("shared-cards4").cid = currentCards[0]
            document.getElementById("shared-cards4").children[0].style.opacity = 1
        }else{
            document.getElementById("shared-cards5").cid = currentCards[0]
            document.getElementById("shared-cards5").children[0].style.opacity = 1
        }
    }
    deck.splice(deck.indexOf(currentCards[0]), 1)
    takenCards.push(currentCards[0])
    document.getElementById(currentCards[0]).classList.add("takenCards")
    if (placeholderCount >= 2) {
        deck.splice(deck.indexOf(currentCards[1]), 1)
        takenCards.push(currentCards[1])
        document.getElementById(currentCards[1]).classList.add("takenCards")
    }
    if (placeholderCount == 3) {
        deck.splice(deck.indexOf(currentCards[2]), 1)
        takenCards.push(currentCards[2])
        document.getElementById(currentCards[2]).classList.add("takenCards")
    }
    removePlaceholder("placeholder1")
    if (placeholderCount >= 2) {
        removePlaceholder("placeholder2")
    }
    if (placeholderCount == 3) {
        removePlaceholder("placeholder3")
    }
    closeModal()
    currentCards = []
}

function randomizeHand() {
    var randph1
    var randph2
    var randph3
    if (document.getElementById("placeholder1").cid == "aundefined") {
        randomIndex = Math.floor(Math.random() * deck.length)
        randph1 = deck[randomIndex]
        selectCard(randph1)
    }
    if (placeholderCount>=2&&document.getElementById("placeholder2").cid == "aundefined") {
        do {
            randomIndex = Math.floor(Math.random() * deck.length)
            randph2 = deck[randomIndex]
        } while (randph2 == randph1)
        
        selectCard(randph2)
    }
    if (placeholderCount==3&&document.getElementById("placeholder3").cid == "aundefined") {
        do {
            randomIndex = Math.floor(Math.random() * deck.length)
            randph3 = deck[randomIndex]
        } while ((randph3 == randph1)||(randph3 == randph2))
        selectCard(randph3)
    }
}

function sharedCardsModal() {
    if (sharedCount<3) {
        openModal(3)
    }
    else if(sharedCount==3||sharedCount==4) {
        openModal(1)
    }
    else{
        return
    }
}