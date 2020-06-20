//declared variables
var numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
var lastKnownButtonId = undefined;
var lastKnownButtonNumber = undefined;
var wait = false;
var matches = 0;

//elements
var buttons = document.querySelectorAll("button");


//code - call functions
shuffle(numbers);
distributeNumbers();

for (i=0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function(e) {
        var turnable = e.target.dataset.turnable;

        //first click
        if(wait="false" && lastKnownButtonId == undefined && lastKnownButtonNumber ==undefined && turnable == "true") {
            e.target.dataset.turnable = "false";

            e.target.textContent = e.target.dataset.number;
            e.target.style.backgroundColor ='orange';

            lastKnownButtonId = e.target.dispatchEvent;
            lastKnownButtonNumber = e.target.dataset.number;
        }

        //second click
        else if (wait="false" && lastKnownButtonId !== undefined && lastKnownButtonNumber !== undefined && turnable == "true" && e.target.id != lastKnownButtonId) {
            e.target.dataset.turnable = "false";
            e.target.textContent = e.target.dataset.number;

            //match
            if(e.target.dataset.number == lastKnownButtonNumber) {
                e.target.style.backgroundColor ='green';
                document.getElementById(lastKnownButtonId).style.backgroundColor ='green';

                lastKnownButtonId = undefined;
                lastKnownButtonNumber = undefined;

                matches++;

                if(matches == 8) {
                    showWinScreen();
                }
            }

            //no match           
            else {
                document.getElementById(lastKnownButtonId).style.backgroundColor = "red";
                e.target.style.backgroundColor = "red";  
                wait = "true";

                setTimeout() {
                    e.target.dataset.turnable ="true";
                    e.target.style.backgroundColor ="white";
                    e.target.textContent ="";

                    var tempLastClickedButton = document.getElementById(lastKnownButtonId);

                    tempLastClickedButton.dataset.turnable = "true";
                    tempLastClickedButton.style.backgroundColor = "white";
                    tempLastClickedButton.textContent = "";

                    lastKnownButtonId = undefined;
                    lasttKnownButtonNumber = undefined;
                    wait = false;
                }, 1000);
                
                } 
            }
        }
    });
}

//functions
function distributeNumbers() {
    for(i=0; i < buttons.length; i++) {
        buttons[i].dataset.number = numbers[i];
    }
}

function shuffle(array) {
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
}