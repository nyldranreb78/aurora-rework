// NOT our code;
// Provided and required by Bootstrap in their documentation to enable Popper features
function enablePopperFeatures() {
    // Enables Popovers
    // Used to provide course information upon hovering on a course name
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    })

    // Enables Tooltips
    // Used to provide more information on registration actions
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })
}

// Enable all Popper features on initial load
enablePopperFeatures();