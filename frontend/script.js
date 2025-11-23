async function loadMedicines() {
  try {
    // Call the backend API
    const response = await fetch("http://localhost:8000/medicines");

    // If response is not OK, throw an error
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    // Parse JSON body
    const data = await response.json();

    // The backend returns an object like: { "medicines": [ ... ] } (JSON)
    console.log("Raw response from /medicines:", data);
    console.log("Medicines array:", data.medicines);
  } catch (error) {
    console.error("Error loading medicines:", error);
  }
}

// Run when the HTML page has finished loading
document.addEventListener("DOMContentLoaded", loadMedicines);