function getClass(CRN) {
    return classList.filter((section) => section.CRN == CRN)[0];
}

function getLabSections(parentSection) {
    const matchingLabs = parentSection.Labs.split(";");
    var labSections = new Array();
    
    matchingLabs.forEach(section => {
        labSections.push(classList.filter((lab) => lab.CRN == section)[0]);
    });

    return labSections;
}

function showLabSections(CRN) {
    const currClass = getClass(CRN);
    const labSections = getLabSections(currClass);

    var currRow = document.getElementById(CRN + "row");
    var numFields = document.querySelectorAll('th').length;

    currRow.insertAdjacentHTML('afterend', `
        <tr 
            class="bs-light-grey" 
            id="` + CRN + `instructions" 
            name="` + CRN + `labRow"
        >
            <td colspan="` + numFields + `">
                <h6 class="m-2">
                    This course must be taken with a laboratory/tutorial. 
                    Select one of the matching sections below to confirm your registration.
                </h6>
            </td>
        </tr>
    `)

    currRow = document.getElementById(CRN + "instructions");

    labSections.forEach(section => {
        currRow.insertAdjacentHTML('afterend', createRow(section));
        currRow = document.getElementById(section.CRN + "row");
    })
    
    currRow.insertAdjacentHTML('afterend', `
        <tr 
            class="bs-light-grey text-center" 
            id="` + CRN + `instructions" 
            name="` + CRN + `labRow"
        >
            <td colspan="` + numFields + `">
                <button 
                    type="button" 
                    class="btn btn-sm btn-success m-1" 
                    id="` + CRN + `confirm" 
                    name="` + CRN + `"
                    disabled
                >
                    Confirm Registration
                </button>

                <button 
                    type="button" 
                    class="btn btn-sm btn-danger m-1" 
                    id="` + CRN + `cancel" 
                    name="` + CRN + `"
                >
                    Cancel Registration
                </button>
            </td>
        </tr>
    `);

    document.getElementById(CRN + "cancel").addEventListener("click", cancelLab);

    addRadioEventListeners();
}

function clearLabSections(CRN) {
    const labRows = document.querySelectorAll(`tr[name="` + CRN + `labRow"]`);
    for(const row of labRows){
        row.parentNode.removeChild(row);
    }   
}

function updateSlots(CRN, slotName) {
    const updatedClass = getClass(CRN);
    const column = document.getElementById(CRN + slotName);
    var prefix = slotName == "waitlist"? "WL" : "";

    column.innerHTML = (updatedClass[prefix + "Act"] + 1) + "/" + updatedClass[prefix + "Cap"];
}