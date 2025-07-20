const API_URL = 'http://localhost:5000/api/contacts';
let editingId = null;

function fetchContacts() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#contactTable tbody");
      tbody.innerHTML = "";
      data.forEach(c => {
        tbody.innerHTML += `
          <tr>
            <td>${c.name}</td>
            <td>${c.email}</td>
            <td>${c.phone}</td>
            <td>${c.company}</td>
            <td>
              <button onclick="editContact('${c._id}', '${c.name}', '${c.email}', '${c.phone}', '${c.company}', '${c.address}')">Edit</button>
              <button onclick="deleteContact('${c._id}')">Delete</button>
            </td>
          </tr>`;
      });
    });
}

function openForm() {
  document.getElementById("formModal").style.display = "flex";
  document.getElementById("formTitle").innerText = "Add Contact";
  document.getElementById("contactForm").reset();
  editingId = null;
}

function closeForm() {
  document.getElementById("formModal").style.display = "none";
}

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const contact = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    company: document.getElementById("company").value,
    address: document.getElementById("address").value
  };
  const method = editingId ? "PUT" : "POST";
  const url = editingId ? `${API_URL}/${editingId}` : API_URL;
  fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact)
  }).then(() => {
    closeForm();
    fetchContacts();
  });
});

function editContact(id, name, email, phone, company, address) {
  editingId = id;
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("phone").value = phone;
  document.getElementById("company").value = company;
  document.getElementById("address").value = address;
  document.getElementById("formTitle").innerText = "Edit Contact";
  openForm();
}

function deleteContact(id) {
  if (confirm("Delete this contact?")) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => fetchContacts());
  }
}

fetchContacts();
