
// Helpers to safely display data

function safeName(name) {
  if (!name || typeof name !== "string" || !name.trim()) {
    return "(No name provided)";
  }
  return name.trim();
}

function formatPrice(price) {
  if (price === null || price === undefined || isNaN(Number(price))) {
    return "N/A";
  }
  const num = Number(price);
  return "£" + num.toFixed(2);
}

// Stage 4 – safe rendering + basic error message

async function loadMedicines() {
  const errorEl = document.getElementById("error-message");

  // Clear any previous error
  if (errorEl) {
    errorEl.textContent = "";
  }

  try {
    const response = await fetch("http://localhost:8000/medicines");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    console.log("Raw response from /medicines:", data);

    const medicines = Array.isArray(data.medicines) ? data.medicines : [];
    console.log("Medicines array:", medicines);

    const tbody = document.getElementById("medicine-table-body");
    if (!tbody) {
      console.error("Could not find table body element with id 'medicine-table-body'");
      return;
    }

    // Clear existing rows
    tbody.innerHTML = "";

    // Create rows safely
    medicines.forEach((med) => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = safeName(med.name);

      const priceCell = document.createElement("td");
      priceCell.textContent = formatPrice(med.price);
      priceCell.classList.add("numeric-cell");

      row.appendChild(nameCell);
      row.appendChild(priceCell);

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading medicines:", error);
    if (errorEl) {
      errorEl.textContent =
        "Failed to load medicines. Please check the server and try again.";
    }
  }
}

// Run when the page has loaded
document.addEventListener("DOMContentLoaded", loadMedicines);
