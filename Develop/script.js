// opened to store code clips
//clockChecker
//uploadEvents
//downloadEvents
//listener
//undo button (optional)
// color on entry; saves if another box is clicked

// use onblur and/or onsubmit https://www.w3schools.com/tags/ref_eventattributes.asp
// looks like .description is used for event description?

const allButtons = document.getElementsByClassName('saveBtn');


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



