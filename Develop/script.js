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
    date: "", 
    arrayHourAndText: emptyHourAndTextArray
};
const dateInHeader = document.getElementById("currentDay");
const allTextAreas = document.getElementsByTagName('textarea');
const allTimeBlocks = document.getElementsByClassName('time-block');

var createEmptyTodaysEventsArray = function(){
    todaysEventsArray.date = dayjs().format("YYYYMMDD");
    todaysEventsArray.arrayHourAndText = emptyHourAndTextArray;
}

var uploadNewEvent = function(hour,text){
    // update todaysEventsArray
    debugger;
    for ( i=0 ; i<allTimeBlocks.length; i++ ){
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
        if ( localStorageDownload.date == dayjs().format("YYYYMMDD") ){
            todaysEventsArray = localStorageDownload;
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
    for ( i = 0; i < allTimeBlocks.length; i++ ){
        if ( todaysEventsArray.arrayHourAndText[i].textValue ) {
            allTimeBlocks[i].children[1].value = todaysEventsArray.arrayHourAndText[i].textValue;
        }
    }
}

var addDateToHeader = function(){
    dateInHeader.innerText = dayjs().format( "dddd, MMMM D" )
}

var rightNowInMilitary = dayjs().format("HHmm");

var colorTimeBlocks = function(){
    // this sub-function determines how much time is there to the next hour
    var intervalToNextColor = function() {
        // check second and minutes separately, then combine
        var seconds = 60 - dayjs().format("ss");
        var minutes = 60 - dayjs().format("mm");
        // set interval to the amount of time to the next hour plus two seconds to be sure that we are checking after the new hour has happened
        var intervalInMilliseconds = ( 2000 + ( seconds * 1000 ) + ( minutes * 60 * 1000 ));
        return intervalInMilliseconds;
    }
    clearInterval(interval);
    for ( i=0 ; i<allTimeBlocks.length ; i++ ){
        if ( allTimeBlocks[i].children[1].id < rightNowInMilitary ){
            // color changes are made by changing the class
            allTimeBlocks[i].children[1].className = "col-9 past";
            if ( ( rightNowInMilitary - allTimeBlocks[i].children[1].id ) < 60 ) {
                allTimeBlocks[i].children[1].className = "col-9 present";
            }
        } else {
            allTimeBlocks[i].children[1].className = "col-9 future";
        }
    }
    // reset upon transition to a new day
    if ( todaysEventsArray.date != dayjs().format("YYYYMMDD") ) {
        addDateToHeader();
        displayTodaysEvents();
    };
    // update colors two seconds after the hour changes
    interval = setInterval( colorTimeBlocks, intervalToNextColor() );
}

var newEvent = function(e){
    e.preventDefault();
    // add / replace existing event
    uploadNewEvent(e.target.id, e.target.value);
}

var activateEventListenersForTextAreas = function() {
    for ( i=0 ; i < allTextAreas.length; i++){
        allTextAreas[i].addEventListener("blur", newEvent);
    }
}

addDateToHeader();
displayTodaysEvents();
activateEventListenersForTextAreas();
var interval = setInterval( colorTimeBlocks, 0 );