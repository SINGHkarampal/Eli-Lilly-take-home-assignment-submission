
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

### Stage 6 – Search/filter functional

    - Added a simple search bar above the medicines table in `index.html`.
    - Introduced a global `allMedicines` array and a `renderMedicines` function in `script.js` to separate rendering from data loading.
    - Implemented `handleSearch` to filter the list of medicines on the frontend by name as the user types.
    - Ensured that adding a new medicine reloads the data and re-applies any active search filter so the behaviour remains consistent.

### Stage 7 – Average price endpoint and display

    - Implemented a new backend endpoint `GET /medicines/average` in `backend/main.py` to calculate the average price of all medicines that have a valid numeric price. The endpoint returns both the average and the number of medicines included.
    - Added a small summary line below the table in `frontend/index.html` to display the average price.
    - Introduced a `loadAveragePrice` function in `frontend/script.js` which calls the new endpoint and formats the result using the existing `formatPrice` helper.
    - Ensured that the average price is loaded when the page first loads and is recalculated after a new medicine is created.

## Objectives – Innovative Solutions

- **Defensive frontend design**:  
  I focused on making the UI resilient to imperfect data. Rather than assuming all fields would always be present and valid, I added reusable helpers (`safeName`, `formatPrice`) so the app can cope gracefully with missing or invalid values without breaking the layout.

- **Separation of concerns in the frontend**:  
  I separated data loading (`loadMedicines`) from rendering (`renderMedicines`) and search handling (`handleSearch`). This made it easier to add new features such as the search bar and average price without rewriting the core logic for displaying a list of medicines.

- **Client-side search for usability**:  
  Instead of calling the backend repeatedly for searching, I chose to fetch the medicines once and maintain an in-memory `allMedicines` array. The search bar filters this local list, which keeps the UI responsive and reduces unnecessary network calls.

- **Incremental UI enhancements**:  
  I started with a very simple table and then iteratively improved it (basic alignment, numeric right-alignment, simple form styling), balancing clarity with time constraints. This staged approach shows a practical way to improve UX without over-engineering the design.

- **Optional analytics feature (average price)**:  
  Adding the average price endpoint and display was an extra step beyond the basic CRUD and listing. It demonstrates working across both backend and frontend: computing a derived metric on the server and surfacing it in a compact, user-friendly summary.

---

## Problems Faced


### 1. UI alignment and table styling

- **Issue**: The UI panel and table alignment did not look consistent at first – columns felt slightly messy, and the overall layout was not very readable.  
- **Cause**: I started with a bare HTML table without any structured container or basic spacing rules, so the content was technically correct but not visually tidy.  
- **Solution**: I simplified the styling to a general, clean table:
  - Introduced a `panel` wrapper, a `table-container` div and a single `.medicine-table` class.
  - To make the rows easier to scan, light borders and a single header backdrop were used.
  - Right-aligned the price column using a `.numeric-cell` class.  
  This greatly enhanced readability while maintaining the design's simplicity.

### 2.. Average price calculation (string vs number)

- **Issue**: When I first implemented the average price endpoint, the frontend showed `Average price (valid entries): N/A`.  
- **Cause**: The list of "valid numeric prices" ended up being empty because I first handled prices in the backend too rigorously as numbers, or more accurately, as strings.  The response from the endpoint was `average_price` as `null`. 
- **Solution**: I updated the backend logic to:
  - Accept both numeric types (`int`, `float`) directly.
  - If at all possible, try to convert string values to `float`; only truly non-numeric values should be ignored.  
   Following this modification, a numeric `average_price` was returned by the endpoint, which the frontend could appropriately display using `formatPrice`.


---

## Evaluation

Overall, I found the challenge a good balance between backend and frontend work:

- **What went well:**
  - Breaking the work into stages helped keep the structure clear: setup → basic fetch → UI → error handling → create flow → search → average price.
  - It was simpler to add features like search and the average price display without duplicating functionality by using tiny, reusable functions (`safeName`, `formatPrice`, `renderMedicines`).
   - Once I had the fundamental routes running, it was easy to add another endpoint to the FastAPI backend.

- **What was more challenging:**
  - Getting the UI to look “simple but tidy” took a couple of iterations, especially around table alignment and not over-styling it.
  - The average price calculation required a small correction when dealing with numeric types vs strings, which highlighted the importance of thinking about data types even in a small JSON file.

- **If I had more time, I would:**
  - Add more robust form validation (e.g. clearer error messages for invalid or negative prices, and more detailed feedback near the form fields).
  - Boost accessibility (ARIA features, improved attention states, and more distinct contrast for those who are blind or visually impaired).
  - Consider adding sorting on table columns (e.g. by price or name) to make the UI more interactive while keeping the same data model.

This challenge gave me the opportunity to show how I think about both the API layer and the browser UI, as well as how, under time constraints, I gradually develop and improve features.