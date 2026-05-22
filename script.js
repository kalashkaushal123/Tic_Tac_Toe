let boxes = document.querySelectorAll(".box");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let player1Select = document.querySelector("#player1-icon");
let player2Select = document.querySelector("#player2-icon");

let turnO = true;

const winpatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    boxes.forEach((box) => {
        box.style.backgroundColor = "#2d2d2d";
    })
};

boxes.forEach((box) => {

    box.addEventListener("click", () => {

        if(turnO){

            box.textContent = player1Select.value;
            box.style.backgroundColor = "#f5ede3";

            turnO = false;

        } else {

            box.textContent = player2Select.value;
            box.style.backgroundColor = "#d6b98c";

            turnO = true;
        }

        box.disabled = true;

        checkWinner();

    });

});

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.textContent = "";
    });
};

const showWinner = (winner) => {

    msg.innerText = `🏆 Winner is ${winner}`;

    msgContainer.classList.remove("hide");

    disableBoxes();

};

const checkWinner = () => {

    let filledBoxes = 0;

    for(let pattern of winpatterns){

        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 !== "" && pos2 !== "" && pos3 !== ""){

            if(pos1 === pos2 && pos2 === pos3){

                showWinner(pos1);

                return;
            }
        }
    }

    boxes.forEach((box) => {
        if(box.innerText !== ""){
            filledBoxes++;
        }
    });

    if(filledBoxes === 9){

        msg.innerText = "😐 It's a Draw!";
        msgContainer.classList.remove("hide");

    }
};

newGameBtn.addEventListener("click", resetGame);