var deck = ["1s","2s","3s","4s","5s","6s","7s","8s","9s","10s","js","qs","ks",
"1h","2h","3h","4h","5h","6h","7h","8h","9h","10h","jh","qh","kh",
"1c","2c","3c","4c","5c","6c","7c","8c","9c","10c","jc","qc","kc",
"1d","2d","3d","4d","5d","6d","7d","8d","9d","10d","jd","qd","kd"]
var currentCards = []
var takenCards = []
var modalOpened = false

function openModal(){
    document.getElementById("modal").style.visibility="visible"
    modalOpened = true
}
function closeModal() {
    document.getElementById("modal").style.visibility="hidden"
    removePlaceholder("placeholder1")
    removePlaceholder("placeholder2")
    currentCards = []
    modalOpened= false
}
function changeType(color) {
    document.getElementById("spades").style.zIndex=2
    document.getElementById("hearts").style.zIndex=2
    document.getElementById("clubs").style.zIndex=2
    document.getElementById("diamonds").style.zIndex=2
    switch (color) {
        case "s":
            document.getElementById("spades").style.zIndex=3
            break;
        case "h":
            document.getElementById("hearts").style.zIndex=3
            break;
        case "c":
            document.getElementById("clubs").style.zIndex=3
            break;
        case "d":
            document.getElementById("diamonds").style.zIndex=3
            break;
    
        default:
            break;
    }
    currentType=color
}
function selectCard(clickedCard){
    if (currentCards.includes(clickedCard)||takenCards.includes(clickedCard)) {
        return
    }
    if (document.getElementById("placeholder1").cid=="aundefined") {
        document.getElementById("placeholder1").cid = clickedCard
        document.getElementById("placeholder1").children[0].style.opacity = 1
    }else if(document.getElementById("placeholder2").cid=="aundefined"){
        document.getElementById("placeholder2").cid = clickedCard
        document.getElementById("placeholder2").children[0].style.opacity = 1
    }
    else{
        return
    }
    document.getElementById(clickedCard).classList.add("selectedCards")
    currentCards.push(clickedCard)
    if (currentCards.length==2) {
        document.getElementById("ok").children[0].disabled = false
        document.getElementById("ok").children[0].classList.add("buttonHover")
    } else{
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
    deck.splice(deck.indexOf(currentCards[0]),1)
    deck.splice(deck.indexOf(currentCards[1]),1)
    takenCards.push(currentCards[0])
    takenCards.push(currentCards[1])
    document.getElementById(currentCards[0]).classList.add("takenCards")
    document.getElementById(currentCards[1]).classList.add("takenCards")
    newPlayer(currentCards[0],currentCards[1])
    removePlaceholder("placeholder1")
    removePlaceholder("placeholder2")
    closeModal()
    currentCards = []
}

function randomizeHand(){
    var randph1
    var randph2
    if (document.getElementById("placeholder1").cid == "aundefined") {
        randomIndex =Math.floor(Math.random() * deck.length)
        randph1=deck[randomIndex]
        selectCard(randph1)
    }
    if (document.getElementById("placeholder2").cid == "aundefined") {
        do{      
            randomIndex =Math.floor(Math.random() * deck.length)
            randph2=deck[randomIndex]
        }while (randph2==randph1)
        selectCard(deck[randomIndex])
    }

}

document.addEventListener("keydown",function(event) {

    if (modalOpened) {
        var num = "a"
        if (["s", "h", "c", "d"].includes(event.key)) {
            changeType(event.key)
        }
        else if (["a", "2", "3", "4", "5", "6", "7", "8", "9", "1", "j", "q", "k"].includes(event.key)) {
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
            addPlayer()
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
        if (event.key===" "&& playerCount!=7) {
            openModal()
        }
        if (event.key==="r") {
            x=playerCount
            randomGeneratedList=true
            for(let i=0; i<(6-x);i++){
                randomizeHand()
                addPlayer()
            }
            randomGeneratedList=false
        }
        if (event.key === "Backspace") {
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
    }
})

