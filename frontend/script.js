
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

async function handleAddMedicine(event) {
  event.preventDefault();

  const nameInput = document.getElementById("med-name");
  const priceInput = document.getElementById("med-price");
  const messageEl = document.getElementById("form-message");

  const name = nameInput.value.trim();
  const price = priceInput.value;

  // Basic validation
  if (!name || !price) {
    if (messageEl) {
      messageEl.textContent = "Please enter both a name and a price.";
    }
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);

  try {
    const response = await fetch("http://localhost:8000/create", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Create request failed with status ${response.status}`);
    }

    const result = await response.json();
    console.log("Create result:", result);

    if (messageEl) {
      messageEl.textContent = "Medicine added successfully.";
    }

    // Clear inputs
    nameInput.value = "";
    priceInput.value = "";

    // Reload table so new item appears
    await loadMedicines();
  } catch (error) {
    console.error("Error adding medicine:", error);
    if (messageEl) {
      messageEl.textContent =
        "Error adding medicine. Please try again.";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // load table
  loadMedicines();

  // attach form handler
  const form = document.getElementById("add-medicine-form");
  if (form) {
    form.addEventListener("submit", handleAddMedicine);
  }
});

