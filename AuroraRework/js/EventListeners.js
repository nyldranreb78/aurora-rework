////////////////// Filter Events
// EventListener for Subject select menu changes
const subject = document.querySelector("#subjectFilter");
subject.addEventListener('change', applyFilters);

// EventListener for Term filter changes
const termFilters = document.querySelectorAll('input[name="termFilters"]');
for(const term of termFilters){
    term.addEventListener('change', applyFilters);
}   

// EventListener for Level filter changes
const levelFilters = document.querySelectorAll('input[name="levelFilters"]');
for(const level of levelFilters){
    level.addEventListener('change', applyFilters);
}

// EventListener for Show/Hide toggle changes
const showToggle = document.getElementById("showToggle");
showToggle.addEventListener('change', applyFilters);

function applyFilters() {
    populateTable("classList", filterBySubject(), filterByTerm(), filterByLevel(), "class", showUnavailable());
    enablePopperFeatures();
}

////////////////// Registration Events
// EventListener for different Action buttons
function addBtnEventListeners() {
    const registerButtons = document.querySelectorAll('button[name="Register"]');
    for(const button of registerButtons){
        button.addEventListener('click', register);
    }   

    const expandButtons = document.querySelectorAll('button[name="Expand"]');
    for(const button of expandButtons){
        button.addEventListener('click', expand);
    }   

    const waitlistButtons = document.querySelectorAll('button[name="Waitlist"]');
    for(const button of waitlistButtons){
        button.addEventListener('click', waitlist);
    }
}

function addRadioEventListeners() {
    const radioButtons = document.querySelectorAll('input[name="Radio"]');
    for(const radio of radioButtons){
        radio.addEventListener('change', selectLab);
    }
}