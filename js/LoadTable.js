function clearTable(tbodyID){
    const tableBody = document.getElementById(tbodyID);

    if(tableBody && tableBody.firstChild) {
        while(tableBody.firstChild){
            tableBody.removeChild(tableBody.firstChild);
        }
    }
}

function populateTable(tbodyID, subjectFilter, termStart, levelFilter, sectionType, showUnavailable){
    const tableBody = document.getElementById(tbodyID);
    var htmlContents = "";

    clearTable(tbodyID);

    classList.forEach(c => { // c for "class" as it contradicts with javascript `class`
        // Useful pre-calculated course information
        var hasSlots = c.Cap - c.Act > 0;
        var hasWLSlots = c.WLCap - c.WLAct > 0;
        var isUnavailable = !hasSlots && !hasWLSlots;
        
        // Apply the table filters by comparing them with the class info
        // subjectFilter, termStart, and levelFilter are defined in TableFilters.js
        if(c.Subject == subjectFilter 
            && c.Date.slice(0, 2) == termStart 
            && (levelFilter > 0? Math.floor(c.Course/1000) == levelFilter : 1 == 1 ) // trivial test condition for when levelFilter = "All"
            && (sectionType == "class"? c.Section.charAt(0) != 'B' : c.Section.charAt(0) == 'B')
            && (!isUnavailable || showUnavailable)){ 
            
            htmlContents += createRow(c);
        }
    });

    if(htmlContents.length == 0) // i.e., if table is empty after applying filters
    {
        var numFields = document.querySelectorAll('th').length;
        var term = document.querySelector('input[name="termFilters"]:checked').value;
        htmlContents += `
                <tr>
                    <td colspan="` + numFields + `" class="text-center">
                        <h6>
                            There are currently no ` 
                            + (levelFilter > 0? levelFilter + `000-level ` : "") 
                            + subjectFilter + ` courses ` 
                            + (!showUnavailable? `available` : `being offered`)
                            + ` for the ` + term + ` term.
                        </h6>
                    </td>
                </tr>
            `;
    }

    tableBody.insertAdjacentHTML("afterbegin", htmlContents);
    addBtnEventListeners();

    
}

// Each `<td>` tag corresponds to the respective column values for:
// Action | CRN | Course | Section | Title | Credits | Campus | Days | Time | Available Slots | Waitlist Slots | Instructor | Location
// The <a> tag creates a popover that shows the course details
function createRow(c) {
    // Useful pre-calculated course information
    var courseName = c.Subject + ` ` + c.Course;
    var hasSlots = c.Cap - c.Act > 0;
    var hasWLSlots = c.WLCap - c.WLAct > 0;
    var isLab = c.Section.charAt(0) == 'B';

    // Adds a Bootstrap class to the row to add a tint depending on class availability
    // "table-active:   grey tint to indicate that the section is a laboratory/tutorial
    // "table-warning": yellow tint to indicate that class is full but waitlist is available
    // "table-danger":  red tint to indicate that class is full and/or closed
    const rowClass = isLab? "bs-light-grey" : hasSlots? `` : hasWLSlots? `table-warning` : `table-danger`;

    // Simplifies the slot availability display
    const availableSlots = c.Act + `/` + c.Cap;
    const waitlistSlots = c.WLAct + `/` + c.WLCap;

    return `
        <tr 
            class="`+ rowClass +`" 
            id="` + c.CRN + `row"
            name="` + (isLab? c.Labs + "labRow" : "classRow") + `"
        >
            <td class="text-center"> ` 
                + (isLab? createRadio(c) : createActionButton(c)) + ` 
            </td>
            <td>` + c.CRN + `</td>
            <td>
                <a 
                    tabindex="0" 
                    role="button" 
                    class="` + (isLab? "invisible": "") + `" 
                    data-bs-html="true"
                    data-bs-toggle="popover" 
                    data-bs-trigger="hover" 
                    data-bs-original-title="` + courseName + `" 
                    data-bs-content="` + getCourseInformation(courseName) + `"
                >
                    <u>` + courseName + `</u>
                </a>
            </td>
            <td class="text-center">` + c.Section + `</td>
            <td>` + (isLab? "" : c.Title) + `</td>
            <td class="text-center">` + (isLab? "" : c.Credits) + `</td>
            <td class="text-center">` + c.Campus + `</td>
            <td>` + c.Days + `</td>
            <td>` + c.Time + `</td>
            <td class="text-center" id="` + c.CRN + `available">` + availableSlots + `</td>
            <td class="text-center" id="` + c.CRN + `waitlist">` + (isLab? "" : waitlistSlots) + `</td>
            <td>` + c.Instructor + `</td>
            <td>` + c.Location + `</td>
        </tr>
    `
}

function getCourseInformation(courseName) {
    const courseInfo = courseInformationList.filter((info) => info.Course == courseName)[0];
    var information = noInfoMsg;

    if(courseInfo) {
        var hasPrereqs = courseInfo.Prerequisites.slice(0,3) != "No ";
        var hasRestrictions = courseInfo.Restrictions.slice(0,3) != "No ";

        information = courseInfo.Description + "<br>";

        if(!hasPrereqs && !hasRestrictions) {
            information += "<br>" + noConstraintMsg;
        }
        else {
            if(hasPrereqs)
                information += "<br><strong>Prerequisites:</strong> " + courseInfo.Prerequisites;
            
            if(hasRestrictions)
                information += "<br><strong>Restrictions:</strong> " + courseInfo.Restrictions;
        }
    }
    return information;
}

function createRadio(c) {
    var hasSlots = c.Cap - c.Act > 0;
    var radio = `<span>Full</span>`

    if(hasSlots) {
        radio =  `
            <input 
                class="form-check-input black-border" 
                type="radio" 
                name="Radio" 
                id="` + c.CRN + `" ` 
                + (hasSlots? "" : "disabled") + `
            >
            </input>
        `
    }

    return radio;
}

function createActionButton(c) {
    var hasSlots = c.Cap - c.Act > 0;
    var hasWLSlots = c.WLCap - c.WLAct > 0;
    var hasLab = c.Labs.length > 0;
    var tooltipText;

    var action = hasSlots? hasLab? `Expand` : `Register` : hasWLSlots? `Waitlist` : `Unavailable`;

    switch(action) {
        case `Register`:
            btnClass = `primary`;
            tooltipText = registerMsg;
            break;

        case `Expand`:
            btnClass = `primary`;
            tooltipText = expandMsg;
        break;

        case `Waitlist`:
            btnClass = `warning`;
            tooltipText = waitlistMsg;
            break;

        case `Unavailable`:
            btnClass = `secondary`;
            tooltipText = unavailableMsg;
            break;
    }

    return `
        <button 
            type="button" 
            class="btn btn-sm btn-` + btnClass + `" 
            data-bs-toggle="tooltip" 
            data-bs-trigger="hover" 
            data-bs-placement="right" 
            data-bs-original-title="` + tooltipText + `" 
            id="` + c.CRN + `" 
            name="` + action + `">` 
                + action 
        + `</button>
    `;
}

populateTable("classList", defaultSubject, defaultTermStart, defaultLevel, 'class', true); // Populate the table the first time this script is loaded