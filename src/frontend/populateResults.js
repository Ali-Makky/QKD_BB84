// Function to determine if bases are the same
const areSameBases = (basis1, basis2) => basis1 === basis2;

// Function to populate table row with experiment data
export const populateRow = (
  alice_basis,
  alice_bit,
  eve_basis,
  eve_bit,
  bob_basis,
  bob_bit
) => {
  const sameBases = areSameBases(alice_basis, bob_basis) ? "YES" : "NO";

  const rowHTML = `
        <tr class="data-row">
            <td>${alice_basis}</td>
            <td>${alice_bit}</td>
            <td>${eve_basis}</td>
            <td>${eve_bit == -1 ? "" : eve_bit}</td>
            <td>${bob_basis}</td>
            <td>${bob_bit}</td>
            <td>${sameBases}</td>
        </tr>
    `;

  // Using jQuery to append the row
  $("#table-body-experiment").prepend(rowHTML);
};
