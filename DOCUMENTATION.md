# Lilly Technical Challenge Documentation Template

*This documentation template serves as a place for you to discuss how you approached this challenge, any issues you faced & how you overcame them, or any other points that you feel would be relevant for the interviewers to know. The text in italics is here to guide you - feel free to remove it once you fill out each section!*

***Not every section in this document is required. This is just a template to help get you started. Feel free to add or remove sections as you feel necessary.***

## Approach

### Stage 1 - Setup
    - Cloned Repositery and launched Start.bash file.
    - Verified that `GET /medicines` returns data using the browser and `/docs` using Postman.
    - Opened `frontend/index.html` in the browser to confirm the basic page loads.

### Stage 2 – Connect frontend to backend

    - Implemented an asynchronous `loadMedicines` function in `frontend/script.js`.
    - Called `GET http://localhost:8000/medicines` from the browser when the page loads.
    - Logged the raw JSON response and the `medicines` array to the console to verify the data shape.
    - Confirmed that the frontend can successfully communicate with the backend before building the UI.

### Stage 3 – Display medicines in the UI

    - Added a table structure in `frontend/index.html` to display medicines (name and price).
    - Updated `frontend/script.js` to:
    - Fetch data from `GET /medicines`.
    - Extract the `medicines` array from the JSON response.
    - Dynamically create table rows for each medicine and insert them into the page.
    - Kept console logging for debugging and to verify the data shape.

### Stage 4 – Error handling and safe data rendering

    - Introduced helper functions `safeName` and `formatPrice` in `frontend/script.js` to:
    - Avoid showing `undefined` or empty strings if data is missing.
    - Format prices consistently with a currency symbol and two decimal places.
    - Updated the table rendering logic to use these helpers so the UI stays readable even with invalid or incomplete data.
    - Added a simple error message element and styling so that if the API request fails (e.g. backend is not running), the user sees a clear message instead of a blank page.

### Stage 5 – Add-medicine form and create flow

    - Added a simple form in `frontend/index.html` to allow the user to add a new medicine with a name and price.
    - Implemented `handleAddMedicine` in `frontend/script.js` to:
    - Prevent the default form submission.
    - Send the data to the backend `/create` endpoint as form data.
    - Show feedback messages to the user on success or failure.
    - Refresh the medicines table after a successful creation so the new entry is visible immediately.
    - Updated the DOMContentLoaded handler to initialise both the table loading and the form submission handler.


## Objectives - Innovative Solutions
*For the challenge objectives, did you do anything in a particular way that you want to discuss? Is there anything you're particularly proud of that you want to highlight? Did you attempt some objectives multiple times, or go back and re-write particular sections of code? If so, why? Use this space to document any key points you'd like to tell us about.*

## Problems Faced
*Use this space to document and discuss any issues you faced while undertaking this challenge and how you solved them. We recommend doing this proactively as you experience and resolve the issues - make sure you don't forget! (Screenshots are helpful, though not required)*.

## Evaluation
*How did you feel about the challenge overall? Did some parts go better than others? Did you run out of time? If you were to do this again, and were given more time, what would you do differently?*