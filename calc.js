var tempSharedCards = [] //the shared cards
var oneCycleCards = [] //a sorted hand [the card, its score] eg.: ["ah",14]*7 
var tempOneCycleCards = [] // helps to sort the array of hands
var playerHandsWithPoints = [] //lives for 1 round, its an arraz of handscore and winningcards
var tempFlushCards = [] // array to contain the cards of a flush
var straightFlushTest = "s" // its to get what is the color if there is a straight flush
var tempStraightHand = [] //oneCycleCards without the duplicates
var tempUsageOnly = [] // same as tempStraightHand but if there is an ace it counts as 1
var finalPoints = [0, 0, 0, 0, 0, 0] // the overall points / player, later to calculate the chances
var sumPoints = 0 // the sum of all the points
function calc() {//acces via the button or shortcut
    if (playerCount != 0) {
        if (!confirm("Are you sure you want to start the calculation?")) {
            return
        }
        Calculation()
    }
}
function Calculation() {//simulates all board possibilty and decides the winner in the end
    finalPoints.length = playerCount
    tempSharedCards = sharedCards
    oneCycleCards = sharedCards
    if (sharedCards.length == 3) {
        for (let i = 0; i < deck.length; i++) {
            tempSharedCards[3] = deck[i]
            for (let j = 0; j < deck.length - 1; j++) {
                if (i == j) {
                    j++
                }
                tempSharedCards[4] = deck[j]
                whoWins()
                decideTheWinner(playerHandsWithPoints)
            }
        }
    }
    if (sharedCards.length == 4) {
        for (let i = 0; i < deck.length - 1; i++) {
            tempSharedCards[4] = deck[i]
            whoWins()
            decideTheWinner(playerHandsWithPoints)
        }
    }
    if (sharedCards.length == 5) {
        whoWins()
        decideTheWinner(playerHandsWithPoints)
    }

    for (let i = 0; i < finalPoints.length; i++) {
        sumPoints += finalPoints[i]
    }
    for (let i = 0; i < finalPoints.length; i++) {
        var percetage = `${Math.round((innerText=finalPoints[i]/sumPoints)*10000)/100}%`
        document.getElementById(`player${i+1}-chance`).innerHTML = percetage
    }
}


function decideTheWinner(array) {//distrubets the scores according to who wins the current round
    //array = [score , winningHand]
    var max = 0
    var maxIndex = 0
    var maxArray = []
    for (let i = 0; i < array.length; i++) {
        if (array[i][0] > max) {
            max = array[i][0]
        }
    }

    for (let i = 0; i < array.length; i++) {
        if (array[i][0] == max) {
            maxArray.push([i, array[i][1]])
            maxIndex = i
        }
    }

    var stillplayingHand = maxArray
    var calcBool = false
    StrongPos = 0
    for (let i = 0; i < 5; i++) {
        for (let j = 14; j > 0; j--) {
            for (let g = 0; g < maxArray.length; g++) {
                if (maxArray[g][1][i][1] == j && stillplayingHand.includes(maxArray[p])) {
                    StrongPos = maxArray[g][1][i][1]
                    stillplayingHand.push(maxArray[g])
                    calcBool = true
                    for (let p = 0; p < maxArray.length; p++) {
                        if (maxArray[p][1][i][1] != StrongPos && stillplayingHand.includes(maxArray[p])) {
                            stillplayingHand.removeAt(p)
                        }
                    }
                    break
                }
            }
        }
        if (calcBool) {
            calcBool = false
            break;
        }
    }
    for (let i = 0; i < finalPoints.length; i++) {
        for (let j = 0; j < stillplayingHand.length; j++) {
            if (stillplayingHand[j][0] == i) {
                finalPoints[i]++
            }
        }
    }

}


//high card 1p
//pair 2p
//two pair 3p
//three of a kind 4p
//straight 5p
//flush 6p
//full house 7p
//four of a kind 8p
//straight flush 9p
//royal flush 10p

//card difference determination scoring
//2 2
//3 3
//4 4
//5 5
//6 6
//7 7 
//8 8
//9 9
//10 10
//j 11
//q 12
//k 13
//a 14

function whoWins() {//middle function just to be sorted
    playerHandsWithPoints = []
    for (let i = 0; i < playerCount; i++) {
        oneCycleCards = []
        tempOneCycleCards = []
        tempStraightHand = []
        pointAndHand = []
        SortHand(i)

        var pointAndHand = handSearch()
        playerHandsWithPoints.push(pointAndHand)
    }
}

function SortHand(whoWinshand) { // sorts the 7 cards descending (5 shared + 2 hand)
    tempOneCycleCards[0] = tempSharedCards[0]
    tempOneCycleCards[1] = tempSharedCards[1]
    tempOneCycleCards[2] = tempSharedCards[2]
    tempOneCycleCards[3] = tempSharedCards[3]
    tempOneCycleCards[4] = tempSharedCards[4]
    tempOneCycleCards[5] = hands[whoWinshand][0]
    tempOneCycleCards[6] = hands[whoWinshand][1]
    for (let i = 0; i < tempOneCycleCards.length; i++) {
        var temp = tempOneCycleCards[i].substring(0, tempOneCycleCards[i].length - 1)
        switch (temp) {
            case "2":
                tempOneCycleCards[i] = [tempOneCycleCards[i], 2]
                break;
            case "3":
                tempOneCycleCards[i] = [tempOneCycleCards[i], 3]
                break;
            case "4":
                tempOneCycleCards[i] = [tempOneCycleCards[i], 4]
                break;
            case "5":
                tempOneCycleCards[i] = [tempOneCycleCards[i], 5]
                break;
            case "6":
                tempOneCycleCards[i] = [tempOneCycleCards[i], 6]
                break;
            case "7":
                tempOneCycleCards[i] = [tempOneCycleCards[i], 7]
                break;
            case "8":
                tempOneCycleCards[i] = [tempOneCycleCards[i], 8]
                break;
            case "9":
                tempOneCycleCards[i] = [tempOneCycleCards[i], 9]
                break;
            case "10":
                tempOneCycleCards[i] = [tempOneCycleCards[i], 10]
                break;
            case "j":
                tempOneCycleCards[i] = [tempOneCycleCards[i], 11]
                break;
            case "q":
                tempOneCycleCards[i] = [tempOneCycleCards[i], 12]
                break;
            case "k":
                tempOneCycleCards[i] = [tempOneCycleCards[i], 13]
                break;
            case "1":
                tempOneCycleCards[i] = [tempOneCycleCards[i], 14]
                break;

            default:
                break;
        }
    }

    for (let j = 14; j > 0; j--) {
        for (let i = 0; i < 7; i++) {
            if (!oneCycleCards.includes(tempOneCycleCards[i]) && tempOneCycleCards[i][1] == j) {
                oneCycleCards.push(tempOneCycleCards[i])
            }
        }
    }
}

function handSearch() {//decides what is the most powerful combination of cards
    var winningCardStrength //the strongest card of the 5
    var winningCardStrength2nd = 0 //the second strongest if needed
    var pointEarningHand = 0 // the point of the hand combination
    var threeOfAKind = "" //it is needed when dealing with fullhouse, it is the card which we have 3 of
    var top5cards // the 5 cards that together are the strongest
    var tempUsageBool = false //its just needed if we have found a strong straight dont start lokking for the weekest straight
    var flushCards = [] // if we have a flush it has the best

    for (let j = 0; j < 7; j++) {
        if (customIndexOf(oneCycleCards, oneCycleCards[j][1]) == j) {
            tempStraightHand.push(oneCycleCards[j])
        }
    }
    tempUsageOnly = tempStraightHand
    if (tempUsageOnly[0] == 14) {
        tempUsageOnly = oneCycleCards.slice(1, tempStraightHand.length)
        tempUsageOnly.push(tempStraightHand[0][0], 1)
    }

    for (let i = 0; i < 7; i++) {
        //high card
        if (pointEarningHand < 1) {
            pointEarningHand = 1
            winningCardStrength = oneCycleCards[i][1]

        }

        //pair
        if (i < 6 && oneCycleCards[i][1] == oneCycleCards[i + 1][1]) {
            if (pointEarningHand < 2) {
                winningCardStrength = oneCycleCards[i][1]
                pointEarningHand = 2

            }
        }

        //three of a kind
        if (i < 5 && oneCycleCards[i][1] == oneCycleCards[i + 1][1] && oneCycleCards[i][1] == oneCycleCards[i + 2][1]) {
            if (pointEarningHand < 4) {
                threeOfAKind = oneCycleCards[i][1]
                winningCardStrength = oneCycleCards[i][1]
                pointEarningHand = 4
            }
        }

        //four of a kind
        if (i < 4 &&
            oneCycleCards[i][1] == oneCycleCards[i + 1][1] &&
            oneCycleCards[i][1] == oneCycleCards[i + 2][1] &&
            oneCycleCards[i][1] == oneCycleCards[i + 3][1]) {
            if (pointEarningHand < 8) {
                winningCardStrength = oneCycleCards[i][1]
                pointEarningHand = 8
            }
        }

        //straight
        if (i < tempStraightHand.length - 4 &&
            tempStraightHand[i][1] - 1 == tempStraightHand[i + 1][1] &&
            tempStraightHand[i][1] - 2 == tempStraightHand[i + 2][1] &&
            tempStraightHand[i][1] - 3 == tempStraightHand[i + 3][1] &&
            tempStraightHand[i][1] - 4 == tempStraightHand[i + 4][1]) {
            if (pointEarningHand < 5) {
                straightFlushTest = tempStraightHand[i + 4][0][tempStraightHand[i + 4][0].length - 1]
                winningCardStrength = tempStraightHand[i][1]
                pointEarningHand = 5
                tempUsageBool = true
            }
        }
        if (!tempUsageBool) {
            if (i < tempUsageOnly.length - 4 &&
                tempUsageOnly[i][1] - 1 == tempUsageOnly[i + 1][1] &&
                tempUsageOnly[i][1] - 2 == tempUsageOnly[i + 2][1] &&
                tempUsageOnly[i][1] - 3 == tempUsageOnly[i + 3][1] &&
                tempUsageOnly[i][1] - 4 == tempUsageOnly[i + 4][1]) {
                if (pointEarningHand < 5) {
                    straightFlushTest = tempUsageOnly[i + 4][0][tempUsageOnly[i + 4][0].length - 1]
                    winningCardStrength = tempUsageOnly[i][1]
                    pointEarningHand = 5
                }
            }

        }

        //flush and two pair
        var currentColorFlush = oneCycleCards[i][0][oneCycleCards[i][0].length - 1]
        for (let j = 0; j < 7; j++) {

            //flush
            if (currentColorFlush == oneCycleCards[j][0][oneCycleCards[j][0].length - 1] && !flushCards.includes(oneCycleCards[j][1])) {
                flushCards.push(oneCycleCards[j][1])
            }
            if (flushCards.length == 5) {
                if (pointEarningHand <= 6) {
                    var tempFlushCards = flushCards
                    pointEarningHand = 6
                }
            }

            //two pair
            if (i < 6 && j < 6 &&
                oneCycleCards[i][1] == oneCycleCards[i + 1][1] &&
                oneCycleCards[j][1] == oneCycleCards[j + 1][1] &&
                oneCycleCards[i][1] != oneCycleCards[j][1]) {
                if (pointEarningHand < 3) {
                    winningCardStrength = oneCycleCards[i][1]
                    winningCardStrength2nd = oneCycleCards[j][1]
                    pointEarningHand = 3
                }
            }
        }
        flushCards = []
    }

    var returnedArray = CheckStraightFlush(oneCycleCards, straightFlushTest)
    if (returnedArray[0] > 8) {
        pointEarningHand = returnedArray[0]
        winningCardStrength = returnedArray[1]
    }

    //Full House
    for (let i = 0; i < oneCycleCards.length - 1; i++) {
        if (threeOfAKind != "" && oneCycleCards[i][1] == oneCycleCards[i + 1][1] && threeOfAKind != oneCycleCards[i][1]) {
            if (pointEarningHand < 7) {
                winningCardStrength = threeOfAKind
                winningCardStrength2nd = oneCycleCards[i][1]
                pointEarningHand = 7
            }
        }
    }

    switch (pointEarningHand) {
        case 2://pair
            for (let i = 0; i < 7; i++) {
                if (oneCycleCards[i][1] == winningCardStrength) {
                    oneCycleCards.splice(i, 2)
                    break;
                }
            }
            top5cards = [
                winningCardStrength,
                winningCardStrength,
                oneCycleCards[0][1],
                oneCycleCards[1][1],
                oneCycleCards[2][1]
            ]
            break;
        case 3://two pair
            for (let i = 0; i < 7; i++) {
                if (oneCycleCards[i][1] == winningCardStrength) {
                    oneCycleCards.splice(i, 2)
                    break;
                }
            }
            for (let i = 0; i < 5; i++) {
                if (oneCycleCards[i][1] == winningCardStrength2nd) {
                    oneCycleCards.splice(i, 2)
                    break;
                }
            }
            top5cards = [
                winningCardStrength,
                winningCardStrength,
                winningCardStrength2nd,
                winningCardStrength2nd,
                oneCycleCards[0][1]
            ]
            break;
        case 4://three of a kind
            for (let i = 0; i < 7; i++) {
                if (oneCycleCards[i][1] == winningCardStrength) {
                    oneCycleCards.splice(i, 3)
                    break;
                }
            }
            top5cards = [
                winningCardStrength,
                winningCardStrength,
                winningCardStrength,
                oneCycleCards[0][1],
                oneCycleCards[1][1]

            ]
            break;
        case 5: //straight
            top5cards = [
                winningCardStrength,
                winningCardStrength - 1,
                winningCardStrength - 2,
                winningCardStrength - 3,
                winningCardStrength - 4
            ]
            break;
        case 6://flush
            top5cards = [
                tempFlushCards[0],
                tempFlushCards[1],
                tempFlushCards[2],
                tempFlushCards[3],
                tempFlushCards[4]
            ]
            break;
        case 7://full house
            top5cards = [
                winningCardStrength,
                winningCardStrength,
                winningCardStrength,
                winningCardStrength2nd,
                winningCardStrength2nd
            ]
            break;
        case 8://four of a kind
            for (let i = 0; i < 7; i++) {
                if (oneCycleCards[i][1] == winningCardStrength) {
                    oneCycleCards.splice(i, 4)
                    break;
                }
            }
            top5cards = [
                winningCardStrength,
                winningCardStrength,
                winningCardStrength,
                winningCardStrength,
                oneCycleCards[0][1]
            ]
            break;
        case 9: //straight flush
            top5cards = [
                winningCardStrength,
                winningCardStrength - 1,
                winningCardStrength - 2,
                winningCardStrength - 3,
                winningCardStrength - 4
            ]
            break;
        case 10: //royal flush
            top5cards = [
                14,
                13,
                12,
                11,
                10
            ]
            break;
        case 1:
            top5cards = [
                oneCycleCards[0][1],
                oneCycleCards[1][1],
                oneCycleCards[2][1],
                oneCycleCards[3][1],
                oneCycleCards[4][1]
            ]
            break;
        default:
            break;
    }

    return [pointEarningHand, top5cards]
}

function customIndexOf(d2array, element) { //array index of by the second param
    for (let i = 0; i < d2array.length; i++) {
        if (d2array[i][0] == element || d2array[i][1] == element) {
            return i
        }
    }
    return -1
}

function CheckStraightFlush(Cards, Color) {// as searching for straight flush is more difficult then the others we have a function for it
    var ColorOfFlush = Color
    var Flush = []
    Cards.forEach(e => {
        if (e[0].includes(ColorOfFlush)) {
            Flush.push(e)
        }
    });
    //If there is no five of the same house, return
    if (Flush.length < 5) return [0, 0]
    //If Royal Flush
    if (Flush[0][1] == 14 && Flush[1][1] == 13 && Flush[2][1] == 12 && Flush[3][1] == 11 && Flush[4][1] == 10) return [10, 14]
    if (Flush[0][1] == 14) Flush[0][1] = 1
    Flush.sort((a, b) => a[1] - b[1]).reverse()
    var Sequence = 1
    var SequenceStart = 0
    for (let i = 0; i < Flush.length - 1; i++) {
        if (Flush[i][1] - Flush[i + 1][1] == 1) {
            if (Sequence == 1) SequenceStart = i
            Sequence++
        } else if (Sequence < 5) Sequence = 1
    }
    Flush = Flush.slice(SequenceStart, SequenceStart + 5)
    if (Flush.length < 5 || Sequence < 5) return [0, 0]
    if (Flush[0][1] == 14) return [10, 14]
    return [9, Flush[0][1]]
}