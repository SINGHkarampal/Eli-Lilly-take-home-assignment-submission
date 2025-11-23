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




## Objectives - Innovative Solutions
*For the challenge objectives, did you do anything in a particular way that you want to discuss? Is there anything you're particularly proud of that you want to highlight? Did you attempt some objectives multiple times, or go back and re-write particular sections of code? If so, why? Use this space to document any key points you'd like to tell us about.*

## Problems Faced
*Use this space to document and discuss any issues you faced while undertaking this challenge and how you solved them. We recommend doing this proactively as you experience and resolve the issues - make sure you don't forget! (Screenshots are helpful, though not required)*.

## Evaluation
*How did you feel about the challenge overall? Did some parts go better than others? Did you run out of time? If you were to do this again, and were given more time, what would you do differently?*