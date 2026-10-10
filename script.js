const form = document.getElementById("variant-form");
const resultPanel = document.getElementById("result-panel");
const resultContent = document.getElementById("result-content");
const resetButton = document.getElementById("reset-button");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const gene = document.getElementById("gene").value.trim().toUpperCase();
  const variant = document.getElementById("variant").value.trim();
  const consequenceSelect = document.getElementById("consequence");
  const consequence = consequenceSelect.value
    ? consequenceSelect.options[consequenceSelect.selectedIndex].text
    : "Not provided";
  const source = document.getElementById("source").value.trim() || "Not provided";

  if (!gene) {
    alert("Please enter a gene name.");
    return;
  }

  // Use textContent rather than injecting user-entered text as HTML.
  resultContent.replaceChildren();

  const summary = [
    ["Gene", gene],
    ["Variant notation", variant || "Not provided"],
    ["Consequence", consequence],
    ["Information source", source]
  ];

  summary.forEach(function (item) {
    const row = document.createElement("p");
    const label = document.createElement("span");
    const value = document.createElement("span");

    label.className = "result-label";
    label.textContent = item[0] + ": ";
    value.className = "result-value";
    value.textContent = item[1];

    row.append(label, value);
    resultContent.appendChild(row);
  });

  const warning = document.createElement("p");
  warning.className = "notice";
  warning.textContent =
    "No risk classification or diagnosis has been generated. This prototype does not verify variants against a database and does not run a trained machine-learning model. Consult a qualified genetics professional for interpretation.";
  resultContent.appendChild(warning);

  resultPanel.hidden = false;
  resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
});

resetButton.addEventListener("click", function () {
  resultPanel.hidden = true;
  resultContent.replaceChildren();
});
