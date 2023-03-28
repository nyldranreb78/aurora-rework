// Default values
var defaultSubject = "COMP";
var defaultTerm, defaultTermStart;
var defaultLevel = 0;

////////////////// Subject Filter
// Create the Subject list based on data from RegistrationData.js
var htmlContents = "";
const subjectSelect = document.querySelector("#subjectFilter");

subjectList.forEach(subject => {
    htmlContents += `
        <option value="` + subject.Abbreviation + `"` 
        + (subject.Abbreviation == defaultSubject? "selected" : "") // Make default selection the default defaultSubject
        + `>` + subject.Name + `</option>
    `;
});

subjectSelect.insertAdjacentHTML("afterbegin", htmlContents);

function filterBySubject() {
    return subjectSelect.value;
}

////////////////// Term Filter
// Filter the courses to the selected term by comparing against their start dates
// The values are the guaranteed starting months of each term
function filterByTerm(){
    var term = document.querySelector('input[name="termFilters"]:checked').value;

    switch(term){
        case "Winter":
            return "01";
        case "Summer":
            return "05";
        case "Fall":
            return "09";
    }
}

// Set the default term filter
// Get current month to determine the current term (for setting the default)
var currMonth = new Date().getMonth() + 1; // +1 for consistency since January = 0 

// Based on Important Dates and Deadlines, the registration period usually falls on
// March-April for Summer, July-August for Fall, and November-December for Winter,
// so the filter defaults to the term of the current/upcoming registration period
if(currMonth >= 3 && currMonth < 7)
    defaultTerm = "Summer";
else if(currMonth >= 7 && currMonth < 11)
    defaultTerm = "Fall";
else
    defaultTerm = "Winter";

// Reflect default Term Filter on the page
document.getElementById("btn" + defaultTerm).setAttribute("checked","");
defaultTermStart = filterByTerm(defaultTerm);

////////////////// Level Filter
function filterByLevel() {
    return document.querySelector('input[name="levelFilters"]:checked').value;
}

// Reflect default Level Filter on the page
document.getElementById("btn" + defaultLevel).setAttribute("checked","");

////////////////// Show/Hide Unavailable Classes Toggle
function showUnavailable() {
    var showToggle = document.getElementById("showToggle");

    if (showToggle.checked == true)
        return true;
    else 
        return false;
}