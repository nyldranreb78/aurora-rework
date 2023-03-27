# COMP 3020 Winter 2023<br>Milestone 3 - High-Fidelity Prototype

## Project: Aurora Rework
This prototype demonstrates potential improvements to University of Manitoba's Aurora website featuring an intuitive navigation system, simplified class look up and registration, and a complete modern overhaul of the user interface.<br><br>
The main interface/experience being improved upon by this project is the Course Registration page, which currently takes a significant amount of steps to reach and interact with.<br><br>
Try it here: [https://aurora-rework.netlify.app/](https://aurora-rework.netlify.app/)

## Running

To run the prototype, simply **open `index.html` on a browser of choice**.
- Make sure to keep the files and the folder structure as is after unzipping the project `.zip` file.
- Since Bootstrap is included via CDN, **an internet connection is necessary** to load all the design elements.


## Features/Improvements
- A universal navigation bar present on all pages
  - Dropdown menus for each link category
  - The name "Aurora" doubling as a `Home` button
- The home page (`index.html`) serving as a welcome page
  - Offers shortcut links to the Aurora pages that most students log in to Aurora for
  - Offers useful external links to official University of Manitoba resources
- A complete overhaul of the Course Registration Interaction
  - The page is now easily reachable through the landing page or the navigation bar
  - `Select Subject` and `Select Term` pages are simplified into table filters.
    - `Subject` defaults to the major degree of the user (the prototype user is a Computer Science major)
    - `Term` defaults to the current/upcoming registration period (or the ongoing term if neither)
  - Two new filters added:
    - `Level`
        - Filters classes by the beginning digit of a course number (e.g. COMP <u>**3**</u>020)
        - Goes from 1 to 8 and includes an `All` option (default)
    - `Unavailable Classes`
        - Features a `Show/Hide` toggle to filter out classes that can no longer be registered for
        - Defaults to `Show`
  - Action buttons now vary depending on the status of the class:
    - `Register`: slots are available
    - `Expand`: slots are available and the class requires a laboratory/tutorial section
    - `Waitlist`: slots are full but waitlisting is an option and there are waitlist slots available
    - `Unavailable`: both class and waitlist slots are full and/or the class has been closed for registration
    - Hovering on these buttons shows **tooltips that explain their meaning**.
  - When a class requires a laboratory/tutorial, clicking on `Expand` will now **show all the matching laboratory/tutorial sections** to the user and requires them to register for them to complete the registration.
    - In the current version of Aurora (8.9.1), the matching laboratory/tutorial sections are presented in plain text. Failing to check off two matching sections will result in an error when trying to finish the registration.
  - When a user has finished registering or waitlisting for a class, the respective Action button for them changes:
    - `Register` & `Expand` -> `Registered`
    - `Waitlist` -> `Waitlisted`
    - As with the original buttons, hovering over the new ones will show tooltips with updated messages.
  - The rest of the important Aurora elements that are not implemented by this prototype are still presented as `disabled` buttons and links.

## Technology Used
- HTML
- CSS
- JavaScript
- Bootstrap 5 (Popper.js included)

## Contributors
- Nyl Salvador
- Brendan Willmott

## Credits and Sources
- **University of Manitoba**
  - Aurora
  -- https://aurora.umanitoba.ca
  - Brand Colors and Logo
  -- https://umanitoba.ca/about-um/brand
  -- https://umanitoba.ca/sites/default/files/2019-12/UM_Brand-Guidelines.pdf
  - `index.html` Background Image
  -- https://umanitoba.ca/about-um/our-campuses
  -- Direct link: https://umanitoba.ca/sites/default/files/styles/21x9_1920w/public/2019-07/our-campuses-buhler-atrium-01c.jpg?itok=hiC4a7a2
  <br>
- **Bootstrap**
  - https://getbootstrap.com/
