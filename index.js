//変数定義
let deck = []
let newDeck = []
let canHit = true
let canStay = true
let result
let dealerSum = 0
let mySum = 0
let myAceCount = 0
let dealerAceCount = 0
let cardData
let value



const startGame = () => {
    document.getElementById('startBtn').hidden = true

    buildDeck()
    shuffleDeck()
    chooseCard()
    cardSum()
}

const buildDeck = () => { //52枚のデッキを作る　
    let numbers = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
    let types = ["Spade", "Heart", "Diamond", "Club"]

    for(let i = 0; i < numbers.length; i++) {
        for(let j = 0; j < types.length; j++) {
            deck.push(numbers[i] + "_" + types[j])
        }
  
    }

}

const shuffleDeck = () => {
    while (deck.length > 0) { //前のデッキの枚数が０になるまで繰り返す
        i = Math.floor(Math.random() * deck.length) //ランダムな数字を出す
        newDeck.push(deck[i]) //新しいデッキに今のデッキのi番目の要素を追加
        deck.splice(i, 1)   //前のデッキのi番目の要素を削除
   }

   console.log(newDeck)
}

const drawCard = () => {
    return newDeck.pop()
}

const chooseCard = () => {
    dealerCard1 = drawCard()
    dealerCard2 = drawCard()
    myCard1 = drawCard()
    myCard2 = drawCard()

    dealerAceCount += checkAce(dealerCard1)
    dealerAceCount += checkAce(dealerCard2)

    myAceCount += checkAce(myCard1)
    myAceCount += checkAce(myCard2)
    
    
    //最初のカードの画像を代入
    
    document.getElementById('dealer-card-2').src = "img/" + dealerCard2 + ".png"
    document.getElementById('my-card-1').src = "img/" + myCard1 + ".png"
    document.getElementById('my-card-2').src = "img/" + myCard2 + ".png"
    
}

const getValue = (card) => {
    cardData = card.split('_') //[4_Spade] → ['4', 'Spade']
    value = cardData[0]

    if (isNaN(value)) { //isNaNはNot-a-Number 数値じゃない時true 数値の時false
        if (value == 'A') {
            return 11 //Aの時11として数える
        }else {
            return 10 //JQKの時10として数える
        }
    } 

    return parseInt(value) //parseInt() 文字列を整数に変換する
}





const cardSum = () => {
    dealerSum = getValue(dealerCard2)
    mySum = getValue(myCard1) + getValue(myCard2)

    document.getElementById('dealer-sum').innerHTML = dealerSum
    document.getElementById('my-sum').innerHTML = mySum

    if (mySum == 21) {
        stay()
    }

}


const hitCard = () => {
    if(!canHit) {
        return;
    }

    let card = drawCard()
    cardImg = document.createElement('img')
    cardImg.src = "img/" + card + ".png"
    mySum += getValue(card)
    myAceCount += checkAce(card)

    document.getElementById("my-cards").append(cardImg)
    

    if (reduceMyAce() > 21) {   
        canHit = false;
        document.getElementById('my-sum').innerHTML = mySum
        stay() 
    } else if (mySum > 21) {
        canHit = false;
        document.getElementById('my-sum').innerHTML = mySum
        stay() 
    }

    document.getElementById('my-sum').innerHTML = mySum

    

    
}

const checkAce = (card) => {
    if (card[0] == 'A') {
        return 1
    } else 
        return 0
  }

const reduceMyAce = () => {
    while (mySum > 21 && myAceCount > 0) {
        mySum -= 10
        myAceCount -= 1
    } return mySum
}

const reduceDealerAce = () => {
    while (dealerSum > 21 && dealerAceCount > 0) {
        dealerSum -= 10
        dealerAceCount -= 1
    } return dealerSum
}

const stay = () => {

    if (!canStay) {
        return
    }

    canHit = false
    document.getElementById('dealer-card-1').src = "img/" + dealerCard1 + ".png"

    dealerSum += getValue(dealerCard1)
    document.getElementById('dealer-sum').innerHTML = dealerSum
    
    while (dealerSum < 17) {
            let card = drawCard()
            cardImg = document.createElement('img')
            cardImg.src = "img/" + card + ".png"
            dealerSum += getValue(card)
            dealerAceCount += checkAce(card)
            document.getElementById("dealer-cards").append(cardImg)

            if (reduceDealerAce() > 21) {
                judgeResult()
            }
    
        }
    
        document.getElementById('dealer-sum').innerHTML = dealerSum
        judgeResult()


}

const judgeResult = () => {

    if (dealerSum > 21 && mySum < 21) {
        result = "あなたの勝ち!"
    } else if (dealerSum > 21 && mySum > 21) {
        result = "引き分け"
    } else if (dealerSum < 21 && mySum > 21) {
        result = "あなたの負け"
    } else if (mySum == 21 && !(dealerSum == 21)) {
        result = "あなたの勝ち"
    } else if (!(mySum == 21) && dealerSum == 21) {
        result = "あなたの負け"
    } else if (mySum == 21 && dealerSum == 21) {
        result = "引き分け"
    } else if (mySum > dealerSum) {
        result = "あなたの勝ち"
    } else if (mySum < dealerSum) {
        result = "あなたの負け"
    } else if (mySum = dealerSum) {
        result = "引き分け"
    }
   
    canStay = false

    document.getElementById('status').innerHTML = result

}