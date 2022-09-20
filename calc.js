var inCalculation = false
var tempSharedCards = []
var oneCycleCards = []
var tempOneCycleCards = []
var playerPoint = []
var playerHandsWithPoints = []
var tempUsageOnly = []
function calc() {//calulation of the winning chances
    if (playerCount != 0) {
        if (!confirm("Are you sure you want to start the calculation?")) {
            return
        }
        inCalculation = true
    }
}
function Calculation() {
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
            }
        }
    }
    if (sharedCards.length == 4) {
        for (let i = 0; i < deck.length - 1; i++) {
            tempSharedCards[4] = deck[i]
            whoWins()
        }
    }
    if (sharedCards.length == 5) {
        whoWins()
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

function whoWins() {
    playerHandsWithPoints = []
    for (let i = 0; i < playerCount; i++) {
        oneCycleCards = []
        tempOneCycleCards = []
        playerPoint = []
        SortHand(i)
        var pointAndHand = handSearch()
        console.log(tempOneCycleCards[4][0], pointAndHand)
        console.log(playerPoint[i])

    }
}
function SortHand(whoWinshand) {
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

function handSearch() {
    var winningCardStrength
    var winningCardStrength2nd = 0
    var pointEarningHand = 0
    var isFlush = false
    var isStraight = false
    var royalFlushCheck = false
    var threeOfAKind = ""
    var top5cards
    var tempUsageBool = false
    var tempUsageBoolForStraightFlush = false
    var straightFlushWithAceAsOne = false
    var flushCards = []
    for (let i = 0; i < 7; i++) {
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
        if (i < 3 &&
            oneCycleCards[i][1] - 1 == oneCycleCards[i + 1][1] &&
            oneCycleCards[i][1] - 2 == oneCycleCards[i + 2][1] &&
            oneCycleCards[i][1] - 3 == oneCycleCards[i + 3][1] &&
            oneCycleCards[i][1] - 4 == oneCycleCards[i + 4][1]) {
            isStraight = true
            if (pointEarningHand < 5) {
                winningCardStrength = oneCycleCards[i][1]
                pointEarningHand = 5
                tempUsageBool = true
            }
        }
        if (!tempUsageBool) {
            tempUsageOnly = oneCycleCards
            if (tempUsageOnly[0][1] == 14) {
                tempUsageOnly = oneCycleCards.slice(1, 7)
                tempUsageOnly.push([oneCycleCards[0][0], 1])
            }
            if (i < 3 &&
                tempUsageOnly[i][1] - 1 == tempUsageOnly[i + 1][1] &&
                tempUsageOnly[i][1] - 2 == tempUsageOnly[i + 2][1] &&
                tempUsageOnly[i][1] - 3 == tempUsageOnly[i + 3][1] &&
                tempUsageOnly[i][1] - 4 == tempUsageOnly[i + 4][1]) {
                isStraight = true
                if (pointEarningHand < 5) {
                    console.log(tempUsageOnly[i][1])
                    winningCardStrength = tempUsageOnly[i][1]
                    pointEarningHand = 5
                }
            }

        }
        //flush and two pair
        var currentColorFlush = oneCycleCards[i][0][oneCycleCards[i][0].length - 1]
        var flushCounter = 0
        for (let j = 0; j < oneCycleCards.length; j++) {
            //flush //TODO itt valami gebasz van
            if (currentColorFlush == oneCycleCards[j][0][oneCycleCards[j][0].length - 1] && !flushCards.includes(oneCycleCards[j][1])) {
                flushCards.push(oneCycleCards[j][1])
                flushCounter++
            }
            if (flushCounter == 5) {
                if (pointEarningHand <= 6) {
                    pointEarningHand = 6
                }
                isFlush = true
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
    //straight flush or royal
    if (isFlush && isStraight) {
        var straightCount = 0
        for (let i = 0; i < 6; i++) {
            straightFlushTest = oneCycleCards[i][0][oneCycleCards[i][0].length - 1]

            if (oneCycleCards[i][1] == oneCycleCards[i + 1][1] - 1 &&
                oneCycleCards[i][0][oneCycleCards[i][0].length - 1] == straightFlushTest) {
                straightCount++

                if (straightCount == 5) {
                    pointEarningHand = 9
                    winningCardStrength = oneCycleCards[i - 4][1]
                    tempUsageBoolForStraightFlush = true
                    if (oneCycleCards[i][1] == 14) {
                        royalFlushCheck = true
                    }
                }
            }
            else {
                straightCount == 0
            }
        }
        var straightCountForStraightFlush = 0
        if (!tempUsageBoolForStraightFlush) {

            var tempUsageOnlyForStraightFlush = oneCycleCards
            if (tempUsageOnlyForStraightFlush[0][1] == 14) {
                tempUsageOnlyForStraightFlush = oneCycleCards.slice(1, 7)
                tempUsageOnlyForStraightFlush.push([oneCycleCards[0][0], 1])
            }

            for (let i = 0; i < 6; i++) {
                straightFlushTest = tempUsageOnlyForStraightFlush[i][0][tempUsageOnlyForStraightFlush[i][0].length - 1]

                if (tempUsageOnlyForStraightFlush[i][1] == tempUsageOnlyForStraightFlush[i + 1][1] - 1 &&
                    tempUsageOnlyForStraightFlush[i][0][tempUsageOnlyForStraightFlush[i][0].length - 1] == straightFlushTest) {
                    straightCountForStraightFlush++
                    if (straightCountForStraightFlush == 5) {
                        pointEarningHand = 9
                        winningCardStrength = tempUsageOnlyForStraightFlush[i - 4][1]
                        straightFlushWithAceAsOne
                    }
                }
                else {
                    straightCount == 0
                }
            }
        }
        if (royalFlushCheck) {
            if (pointEarningHand < 10) {
                pointEarningHand = 10
            }
        }

    }
    //Full House
    for (let i = 0; i < oneCycleCards.length - 1; i++) {
        if (threeOfAKind != "" && oneCycleCards[i][1] == oneCycleCards[i + 1][1] && threeOfAKind != oneCycleCards[i][1]) {
            if (pointEarningHand < 7) {
                winningCardStrength = threeOfAKind
                winningCardStrength2nd = oneCycleCards[i][1]
                console.log(winningCardStrength,winningCardStrength2nd)
                pointEarningHand = 7
            }
        }
    }

    //console.log(pointEarningHand, winningCardStrength)
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
                flushCards[0],
                flushCards[1],
                flushCards[2],
                flushCards[3],
                flushCards[4]
            ]
        case 7://full house
            top5cards = [
                winningCardStrength,
                winningCardStrength,
                winningCardStrength,
                winningCardStrength2nd,
                winningCardStrength2nd
            ]
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
                winningCardStrength,
                winningCardStrength - 1,
                winningCardStrength - 2,
                winningCardStrength - 3,
                winningCardStrength - 4
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