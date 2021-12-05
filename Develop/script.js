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
const allButtons = document.getElementsByClassName('saveBtn'); // delete unless coded for
const allTextAreas = document.getElementsByTagName('textarea');
const allTimeBlocks = document.getElementsByClassName('time-block');
const numberOfWorkHours = 9; //this needs to match the number of time blocks  // consider deleting
var intervalLength = 1000; // I wanted this to be long enough that the function has time to reset this variable - one second should be plenty

// var provideTimeInfo = function(format){
//     switch (format) {
//         case "date":
//             return dayjs().format("YYYYMMDD");
//         case "":
//             dayjs().format("dddd, MMMM D");
//         case "":

//     }
// }


var createEmptyTodaysEventsArray = function(){
    todaysEventsArray.date = dayjs().format("YYYYMMDD");
    todaysEventsArray.arrayHourAndText = emptyHourAndTextArray;
}

var uploadNewEvent = function(hour,text){
    // update todaysEventsArray
    for ( i=0 ; i<numberOfWorkHours; i++ ){
        if (todaysEventsArray.arrayHourAndText[i].hour == hour){
            todaysEventsArray.arrayHourAndText[i].textValue = text;
        }
    }
    localStorage.setItem("todaysEvents", JSON.stringify(todaysEventsArray));
};

// if todays events are in local storage, download them; otherwise create a new, empty TodaysEventsArray
var downloadTodaysEvents = function(){
    var localStorageDownload = localStorage.getItem("todaysEvents");
    // check whether localStorage has today's events
    if ( localStorageDownload !== null ){
        localStorageDownload = JSON.parse(localStorageDownload);
        if ( localStorageDownload.date == today ){
            todaysEventsArray = localStorageDownload;
            populateStoredEventsToDOM(todaysEventsArray);
        } else {
            createEmptyTodaysEventsArray();
        }
    } else {
        createEmptyTodaysEventsArray();
    };
};

var displayTodaysEvents = function(){
    //download calendar File
    downloadTodaysEvents();
    //populate dom with saved events, if any
    for ( i = 0; i < numberOfWorkHours; i++ ){
        if ( todaysEventsArray.arrayHourAndText[i].textValue ) {
            allTimeBlocks[i].children[1].value = todaysEventsArray.arrayHourAndText[i].textValue;
        }
    }
}

// var downloadCurrentTime = function(){
    
// }

var addDateToHeader = function(){
    dateInHeader.innerText = dayjs().format( "dddd, MMMM D" )
}

var rightNowInMilitary = dayjs().format("HHmm");

var colorTimeBlocks = function(){
    rightNowInMilitary = "1130"; // remember to delete this
    var intervalToNextColor = function() {
        // how much time is there to the next hour; check second and minutes separately, then combine
        var seconds = 60 - dayjs().format(ss);
        var minutes = 60 - dayjs().format(mm);
        // calculate the amount of time to the next hour plus two seconds to be sure that we are checking after the new hour has happened
        var intervalInMilliseconds = ( 2000 + ( seconds * 1000 ) + ( minutes * 60 * 1000 ));
        return intervalInMilliseconds;
    }
    // var intervalToNextColor = 2000; // placeholder 
    clearInterval(interval);
    console.log("in colorTimeBlocks");    
    console.log(rightNowInMilitary);
    for ( i=0 ; i<numberOfWorkHours ; i++ ){
        // replace with switch
        if ( allTimeBlocks[i].children[0].id < rightNowInMilitary ){
            console.log(allTimeBlocks[i].children[0].id + " is before now");
            // insert class change here
            allTimeBlocks[i].children[1].className = "col-9 past";
            if ( ( rightNowInMilitary - allTimeBlocks[i].children[0].id ) < 60 ) {
                allTimeBlocks[i].children[1].className = "col-9 present";
            }
        } else {
            console.log(allTimeBlocks[i].children[0].id + " is after now");
            // if not in current hour, show as future, otherwise current
            allTimeBlocks[i].children[1].className = "col-9 future";
            
        }
    }

    //address transition to a new day
    if ( todaysEventsArray.date != dayjs().format("YYYYMMDD") ) {
        displayTodaysEvents();
    };
    
    interval = setInterval( colorTimeBlocks, intervalToNextColor() );
}

// for(var i =0; i < allButtons.length; i++){
//     allButtons[i].addEventListener('click', function(e){
        
//         const hour = this.parentNode.childNodes[1].innerText;
//         const event = this.previousElementSibling;

//         console.log(hour);

//         console.log(event);
     
//         // grab the sibilibgs of the save button

//         // save to localStorage
//     })
// }

var newEvent = function(e){
    console.log("blur");
    console.log(e.target);
    console.log(e.target.name);
    console.log(e.target.value);
    //user confirmation stuff - change button color or whatever
    //add / replace existing event
    uploadNewEvent("0900", e.target.value); //e.target.HOUR
    //save to workingCalDate
    //upload to localStorage
}

for ( i=0 ; i < allTextAreas.length; i++){
    allTextAreas[i].addEventListener("blur", newEvent);
}

addDateToHeader();
displayTodaysEvents();
activateEventListenersForTextAreas();

var interval = setInterval( colorTimeBlocks, intervalLength );