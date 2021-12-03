
const dateInHeader = document.getElementById("currentDay");
const allButtons = document.getElementsByClassName('saveBtn');
const allTextAreas = document.getElementsByTagName('textarea');
const allTimeBlocks = document.getElementsByClassName('time-block');
const numberOfWorkHours = 9; //this needs to match the number of time blocks


var downloadCurrentTime = function(){
    
}

var addDateToHeader = function(){
    dateInHeader.innerText = dayjs().format("dddd, MMMM D");

}

var rightNowInMilitary = dayjs().format("HHmm");
console.log(rightNowInMilitary);

var colorTimeBlocks = function(){
    rightNowInMilitary = "1130"; // remember to delete this 
    console.log(rightNowInMilitary);
    for ( i=0 ; i<numberOfWorkHours ; i++ ){
        // replace with switch
        if ( allTimeBlocks[i].children[0].id < rightNowInMilitary ){
            console.log(allTimeBlocks[i].children[0].id + " is before now");
            // insert class change here
            allTimeBlocks[i].children[1].className = "col-9 past";
        } else {
            console.log(allTimeBlocks[i].children[0].id + " is after now");
        }
    }
}

for(var i =0; i < allButtons.length; i++){
    allButtons[i].addEventListener('click', function(e){
        
        const hour = this.parentNode.childNodes[1].innerText;
        const event = this.previousElementSibling;

        console.log(hour);

        console.log(event);
     
        // grab the sibilibgs of the save button

        // save to localStorage
    })
}

var blurEvent = function(e){
    console.log("blur");
    console.log(e.target);
    console.log(e.target.name);
    console.log(e.target.value);
}

for ( i=0 ; i < allTextAreas.length; i++){
    allTextAreas[i].addEventListener("blur", blurEvent);
}


addDateToHeader();
colorTimeBlocks();


// TODO how to use onblur?
// allTextAreas[1].onblur(function(){
//     console.log("blur2");
// });