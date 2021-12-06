# Work Day Scheduler

## Fifth Challenge for UC Berkeley Extension Full-Stack Developer Bootcamp Course

This website is the completed code for the fifth "challenge" of the course, to create a work day scheduler, which included these instructions:
* Show a workday calendar
* Color-code the hours of the calendar to signify past, present, and future
* Provide editable time blocks in which the user can type events
* The text for the events should persist in local storage if the page is refreshed

## What Was Done (and Not Done)

1. The `html` was built-out with timeblocks for the working hours.  This could have been done with javaScript, but it was easier to build and test with static code.
2. Created code to display the events.  When the site is first loaded, the code checks whether there is an existing calendar events file for the current day in `localStorage`.  If there is, those events are saved to the DOM.
3. Created code to accept new events.  This is done using `addEventListener` which is fired upon a `blur` in a `textArea`.  The event information is used to save the new text to `localStorage`.
4. Created code to change the color of the `textArea` elements depending on whether they are past, present, or future.  This code also checks for a new day in case the user leaves the browser open overnight.

I used `setTimeout` to check hourly for time changes.  Testing indicated that `setTimeout` is not precise.  That is, although the argument is in milliseconds, the length of the timeout period can be substantial (on the order of 90 seconds in an hour).  Therefore an improvement would be to have an updated time check perhaps two minutes before the change of hour so that the `setTimeout` period can be refined when there is a shorter amount of time until the change of hour.
  
## Link to Live Work Day Scheduler
  
The live work day scheduler webpage can be found at this link: 
https://stuart-rickard.github.io/calendar-ch/Develop/index.html

## Screenshot

Here is a screenshot of the webpage:

![screenshot of the work day scheduler](/work_day_scheduler_screenshot.png)
