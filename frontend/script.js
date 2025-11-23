
async function loadMedicines() {
  try {
    // Call the backend API
    const response = await fetch("http://localhost:8000/medicines");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Log for debugging 
    console.log("Raw response from /medicines:", data);

    // The backend returns: { "medicines": [ { "name": "...", "price": ... }, ... ] }
    const medicines = data.medicines || [];
    console.log("Medicines array:", medicines);

    // Find table body element
    const tbody = document.getElementById("medicine-table-body");
    if (!tbody) {
      console.error("Could not find table body element with id 'medicine-table-body'");
      return;
    }

    // Clear any existing rows
    tbody.innerHTML = "";

    // Create a row for each medicine
    medicines.forEach((med) => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = med.name;

      const priceCell = document.createElement("td");
      priceCell.textContent = med.price;
      priceCell.classList.add("numeric-cell");   

      row.appendChild(nameCell);
      row.appendChild(priceCell);

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading medicines:", error);
  }
}

// Run when the page has loaded
document.addEventListener("DOMContentLoaded", loadMedicines);
