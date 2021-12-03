const emptyHourAndTextArray = [
    {hour: "0800", textValue: ""},
    {hour: "0900", textValue: ""},
    {hour: "1000", textValue: ""},
    {hour: "1100", textValue: ""},
    {hour: "1200", textValue: ""},
    {hour: "1300", textValue: ""},
    {hour: "1400", textValue: ""},
    {hour: "1500", textValue: ""},
    {hour: "1600", textValue: ""},
    {hour: "1700", textValue: ""}
];
var todaysEventsArray = {
    date: "", // code todays date here
    arrayHourAndText: emptyHourAndTextArray;
};
const dateInHeader = document.getElementById("currentDay");
const allButtons = document.getElementsByClassName('saveBtn');
const allTextAreas = document.getElementsByTagName('textarea');
const allTimeBlocks = document.getElementsByClassName('time-block');
const numberOfWorkHours = 9; //this needs to match the number of time blocks  // consider deleting


var uploadNewEvent = function(){
    // update todaysEventsArray
    localStorage.setItem("todaysEvents", JSON.stringify(todaysEventsArray));
};

var downloadTodaysEvents = function(){
    var localStorageDownload = localStorage.getItem("todaysEvents");
    // check whether localStorage has today's events
    if ( localStorageDownload !== null ){
        localStorageDownload = JSON.parse(localStorageDownload);
        if ( localStorageDownload.date == today ){
            todaysEventsArray = localStorageDownload;
            populateStoredEventsToDOM(todaysEventsArray);
        } else {
            // create todaysEventsArray
        }
    } else {
        // create todaysEventsArray
    };
};

var updateHighScoresArray = function(initials,score){
    for ( i = 0 ; i < numberOfHighScores ; i++ ){
        if ( score > highScoresArray[i].score ) {
            highScoresArray.splice(i,0,{initials: initials, score: score});
            highScoresArray.pop();
            uploadHighScores();
            updateHighScoresInDOM();
            i = numberOfHighScores; // this ends the for loop
        };
    };
};

var displayTodaysEvents = function(){
    //download calendar File
    downloadTodaysEvents();
    //populate dom with saved events
}

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
    //address transition to a new day
        // reset todaysEventsArray
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

var newEvent = function(e){
    console.log("blur");
    console.log(e.target);
    console.log(e.target.name);
    console.log(e.target.value);
    //user confirmation stuff - change button color or whatever
    //add / replace existing event
    uploadNewEvent(e.target.HOUR, e.target.value);
    //save to workingCalDate
    //upload to localStorage
}

for ( i=0 ; i < allTextAreas.length; i++){
    allTextAreas[i].addEventListener("blur", newEvent);
}

addDateToHeader();
colorTimeBlocks();
displayTodaysEvents();
activateEventListenersForTextAreas();