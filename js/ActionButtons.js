function register() {
    const CRN = this.getAttribute("id");

    this.textContent = "Registered";
    this.setAttribute("class", "btn btn-sm btn-success");
    this.setAttribute("data-bs-original-title", registerComplete);
    this.removeEventListener("click", register);

    disableOtherSections(CRN)
    updateSlots(CRN, "available");
}

function expand() {
    const CRN = this.getAttribute("id");

    this.textContent = "Collapse";
    this.setAttribute("class", "btn btn-sm btn-outline-primary");
    this.removeAttribute("data-bs-original-title");
    this.removeEventListener("click", expand);
    this.addEventListener("click", cancelLab);
    showLabSections(CRN);
}

function waitlist() {
    const CRN = this.getAttribute("id");

    this.textContent = "Waitlisted";
    this.setAttribute("class", "btn btn-sm btn-outline-dark");
    this.setAttribute("data-bs-original-title", waitlistInfo);

    updateSlots(CRN, "waitlist");
}

function selectLab() {
    const currClass = getClass(this.getAttribute("id"));
    const confirmBtn = document.getElementById(currClass.Labs + "confirm");

    confirmBtn.removeAttribute("disabled");
    confirmBtn.addEventListener("click", confirmLab);
}

function confirmLab() {
    const parentCRN = this.getAttribute("name");
    const parentBtn = document.getElementById(parentCRN);

    clearLabSections(parentCRN);

    parentBtn.textContent = "Registered";
    parentBtn.setAttribute("class", "btn btn-sm btn-success");
    parentBtn.setAttribute("data-bs-original-title", registerComplete);
    parentBtn.removeEventListener("click", expand);
    parentBtn.removeEventListener("click", cancelLab);

    disableOtherSections(parentCRN);
}

function cancelLab() {
    const callerName = this.getAttribute("name");
    var CRN = callerName;

    if(callerName == "Expand")
        CRN = this.getAttribute("id");

    const expandBtn = document.getElementById(CRN);

    clearLabSections(CRN);

    expandBtn.textContent = "Expand";
    expandBtn.setAttribute("class", "btn btn-sm btn-primary");
    expandBtn.setAttribute("data-bs-original-title", expandMsg);
    expandBtn.addEventListener("click", expand);
}