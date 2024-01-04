// make random array
function getRandArr(arr, num){
    if(isNaN(num)){
        num = arr.length;
    }
    let newArr = [];
    for(let i = 0 ; i < num ; i++){
        let index = Math.floor(Math.random()*arr.length);
        newArr.push(arr[index]);
        arr = removeItemFromArrByIndex(arr, index);
    }
    return newArr;
}

// remove item from array by index
function removeItemFromArrByIndex(arr, index){
    return arr = arr.slice(0, index).concat(arr.slice(index+1));
}

// edit grid
function editGrid(colsNum, rowsNum){
    cards.style = 
    `
    --colsNum: `+colsNum+`;
    --rowsNum: `+rowsNum+`;
    `
}

// customize cards grid
function customizeGrid(cardsNum){
    switch(cardsNum){
        case 8:
            editGrid(4, 2);
            break;
        case 20:
            editGrid(5, 4);
            break;
        case 30:
            editGrid(6, 5);
            break;
    }
}

// put cards
function putCards(){
    // empty cards
    cards.innerHTML = "";
    for(let i of randImgs){
        // create card
        let card = document.createElement("div");
        card.innerHTML = '\
<div>\
    <div class="front"></div>\
    <div class="back">\
    <img src="images/'+i+'.jpg">\
    </div>\
</div>\
        ';
        card.setAttribute("index", i);
        card.classList.add("card");
        // card is pressed
        card.addEventListener("click", (e) => {
            let element = e.currentTarget;
            // if card not actived
            if(!element.classList.contains("actived")){
                let actived = null;
                element.parentNode.querySelectorAll(".card").forEach((e) => {
                    if(e.classList.contains("active")){
                        actived = e;
                    }
                });
                element.classList.add("active");
                if(actived !== null && actived !== element){
                    element.classList.remove("active");
                    actived.classList.remove("active");
                    element.classList.add("actived");
                    actived.classList.add("actived");
                    // correct cards
                    if(element.getAttribute("index") === actived.getAttribute("index")){
                        correctTime++;
                        // check if win
                        let activedNum = 0;
                        document.querySelectorAll(".card").forEach((e) => {
                            if(e.classList.contains("actived")){
                                activedNum++;
                            }
                        });
                        if(activedNum === randImgs.length){
                            // win
                            setTimeout(() => {
                                let popup = document.createElement("div");
                                popup.classList.add("popup", "popup-blue", "popup-shadow");
                                popup.innerHTML=
`
<h1>!لقد فزت</h1>
<p>هل تريد اللعب مجددا؟</p>
<p>اختر عدد البطاقات</p>
<div>
    <button onclick="popupBtn(this, 8)">8</button>
    <button onclick="popupBtn(this, 20)">20</button>
    <button onclick="popupBtn(this, 30)">30</button>
</div>
`
                                document.body.appendChild(popup);
                            }, 500);
                        }
                    }
                    // wrong cards
                    else{
                        setTimeout(() => {
                            element.classList.remove("actived");
                            actived.classList.remove("actived");
                            stop = false;
                        }, 500);
                    }
                }
            }
        });
        cards.appendChild(card);
    }
}

// popup button is pressed
function popupBtn(btn, cardsNum){
    btn.parentNode.parentNode.remove();
    newGame(cardsNum);
}

// new game function
function newGame(cardsNum){
    // get random imgs
    randImgs = getRandArr(imgs, cardsNum / 2);
    randImgs = randImgs.concat(randImgs);
    randImgs = getRandArr(randImgs);

    // empty correct num
    correctTime = 0;

    // customize cards grid
    customizeGrid(cardsNum);

    // put cards
    putCards();
}

// main variables
let cards = document.querySelector(".cards");
let imgs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let randImgs = [];
let correctTime = 0;

// create start popup
let popup = document.createElement("div");
popup.classList.add("popup", "popup-blue", "popup-shadow");
popup.innerHTML=
`
<p>اختر عدد البطاقات</p>
<div>
    <button onclick="popupBtn(this, 8)">8</button>
    <button onclick="popupBtn(this, 20)">20</button>
    <button onclick="popupBtn(this, 30)">30</button>
</div>
`
document.body.appendChild(popup);