var parentDir = "../";
var homeLink = "index.html";
var imgLink = "assets/UM-logo-horizontal-CMYK.png";
var regPageLink = "pages/registration.html";

// HTML files within "/pages" need to move up to the parent directory (parentDir)
// first before following the file path specified
if(!document.location.pathname.endsWith("index.html"))
{
    homeLink = parentDir + homeLink;
    imgLink = parentDir + imgLink;
}

// Avoid errors when selecting the registration page from NavBar while in the
// registration page
if(document.location.pathname.endsWith("registration.html"))
{
    regPageLink = document.location.pathname;
}

// To avoid duplicate code, we use this script to create the NavBar programatically
// for every page
document.body.insertAdjacentHTML("afterbegin", `
    <div class="container-fullwidth">
        <div class="container-fullwidth px-4 pt-1 pb-2 um-yellow-bg">
            <img src="` + imgLink + `" width="150" class="py-1 inline-element"></img>
            <h1 class="mx-3 mt-1 um-brown inline-element align-middle">|</h1>
            <h3 class="mt-2 um-brown inline-element align-middle"><a class="navbar-brand" href="` + homeLink + `">Aurora</a></h3>
        </div>
        <nav class="navbar navbar-expand-lg px-4 um-brown-bg">
            <ul class="navbar-nav me-auto">
                <li class="nav-item dropdown me-2">
                    <a class="nav-link dropdown-toggle text-light" href="" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <b>Personal Information</b>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item disabled" href="">Not covered by prototype</a>
                    </div>
                </li>
                
                <li class="nav-item dropdown me-2">
                    <a class="nav-link dropdown-toggle  text-light" href="" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <b>Enrolment & Academic Records</b>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item disabled" href="">Declarations</a>
                        <a class="dropdown-item" href="` + regPageLink +`">Registration & Exams</a>
                        <a class="dropdown-item disabled" href="">Student Records</a>
                        <a class="dropdown-item disabled" href="">Canadian Tax Forms</a>
                    </div>
                </li>

                <li class="nav-item dropdown me-2">
                    <a class="nav-link dropdown-toggle  text-light" href="" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <b>Student Awards & Financial Aid</b>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item disabled" href="">Not covered by prototype</a>
                    </div>
                </li>
            </ul>

            <span class="nav-item white-text">
                <a 
                    class="nav-link" 
                    href=""
                    data-bs-toggle="tooltip" 
                    data-bs-trigger="hover" 
                    data-bs-placement="left" 
                    data-bs-original-title="This prototype simulates what a logged-in user sees." 
                >
                    <b>Sign Out</b>
                </a>
            </span>
        </nav>
    </div>
`);