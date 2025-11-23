// ---- Helpers to safely display data ----

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

// Keep a copy of all medicines so we can filter on the frontend
let allMedicines = [];

// ---- Rendering ----

function renderMedicines(list) {
  const tbody = document.getElementById("medicine-table-body");
  if (!tbody) {
    console.error("Could not find table body element with id 'medicine-table-body'");
    return;
  }

  // Clear existing rows
  tbody.innerHTML = "";

  list.forEach((med) => {
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
}

// ---- Load medicines + handle error message ----

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

    allMedicines = medicines;
    renderMedicines(allMedicines);
  } catch (error) {
    console.error("Error loading medicines:", error);
    if (errorEl) {
      errorEl.textContent =
        "Failed to load medicines. Please check the server and try again.";
    }
  }
}

// ---- Search ----

function handleSearch(event) {
  const term = event.target.value.toLowerCase();

  if (!term) {
    renderMedicines(allMedicines);
    return;
  }

  const filtered = allMedicines.filter((med) => {
    const name = safeName(med.name).toLowerCase();
    return name.includes(term);
  });

  renderMedicines(filtered);
}


// ---- Add-medicine form ----

async function handleAddMedicine(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById("med-name");
    const priceInput = document.getElementById("med-price");
    const messageEl = document.getElementById("form-message");
    
    const name = nameInput.value.trim();
    const price = priceInput.value;
    
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

    nameInput.value = "";
    priceInput.value = "";

    // Reload data & average, then re-apply any search
    await loadMedicines();
    await loadAveragePrice();

    const searchInput = document.getElementById("search-input");
    if (searchInput && searchInput.value) {
      handleSearch({ target: searchInput });
    }
  } catch (error) {
    console.error("Error adding medicine:", error);
    if (messageEl) {
        messageEl.textContent = "Error adding medicine. Please try again.";
    }
}
}

// Average
async function loadAveragePrice() {
  const avgEl = document.getElementById("average-price");
  if (!avgEl) {
    return;
  }

  try {
    const response = await fetch("http://localhost:8000/average");

    if (!response.ok) {
      throw new Error(`Average request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("Average price data:", data);

    if (data.average_price === null || data.average_price === undefined) {
      avgEl.textContent = "Average price (valid entries): N/A";
      return;
    }

    avgEl.textContent =
      "Average price (valid entries): " + formatPrice(data.average_price);
  } catch (error) {
    console.error("Error loading average price:", error);
    avgEl.textContent = "Could not load average price.";
  }
}
// ---- Initialisation ----

document.addEventListener("DOMContentLoaded", () => {
  // Load table
  loadMedicines();

  // Load average price
  loadAveragePrice();

  // Attach form handler
  const form = document.getElementById("add-medicine-form");
  if (form) {
    form.addEventListener("submit", handleAddMedicine);
  }

  // Attach search handler
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", handleSearch);
  }
});

