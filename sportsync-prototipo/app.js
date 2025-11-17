// ===================== LOGIN =====================
const loginBtn = document.getElementById("btn-login");
const loginScreen = document.getElementById("login-screen");
const app = document.getElementById("app");

loginBtn.addEventListener("click", () => {
    let user = document.getElementById("login-user").value;
    let pass = document.getElementById("login-pass").value;

    if (user === "admin" && pass === "demo") {
        loginScreen.classList.add("hidden");
        app.classList.remove("hidden");
    } else {
        alert("Usuario o contraseña incorrectos");
    }
});

// ===================== NAVEGACIÓN =====================
const navButtons = document.querySelectorAll(".navbtn");
const views = document.querySelectorAll(".view");

navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        let view = btn.dataset.view;

        navButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        views.forEach(v => v.classList.remove("active"));
        document.getElementById(view).classList.add("active");
    });
});

// ===================== INVENTARIO =====================
let products = [
    { ref: "P001", name: "Zapatilla Runner", size: "42", qty: 12 },
    { ref: "P002", name: "Camiseta Sport", size: "M", qty: 5 },
    { ref: "P003", name: "Balón Oficial", size: "5", qty: 2 }
];

function renderInventory() {
    const tbody = document.getElementById("inventory-table");
    tbody.innerHTML = "";

    products.forEach((p, index) => {
        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${p.ref}</td>
            <td>${p.name}</td>
            <td>${p.size}</td>
            <td>${p.qty}</td>
            <td>
                <button onclick="editProduct(${index})">Editar</button>
                <button onclick="deleteProduct(${index})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    loadSelects();
}

renderInventory();

function deleteProduct(index) {
    products.splice(index, 1);
    renderInventory();
}

function editProduct(index) {
    let newQty = prompt("Nueva cantidad:", products[index].qty);
    if (newQty !== null) {
        products[index].qty = parseInt(newQty);
        renderInventory();
    }
}

// ===================== SEARCH =====================
document.getElementById("search").addEventListener("input", (e) => {
    let term = e.target.value.toLowerCase();

    const tbody = document.getElementById("inventory-table");
    tbody.innerHTML = "";

    products
        .filter(p => p.name.toLowerCase().includes(term))
        .forEach((p, index) => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${p.ref}</td>
                <td>${p.name}</td>
                <td>${p.size}</td>
                <td>${p.qty}</td>
                <td>
                    <button onclick="editProduct(${index})">Editar</button>
                    <button onclick="deleteProduct(${index})">Eliminar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
});

// ===================== SELECTS (VENTAS/DEVOLUCIONES) =====================
function loadSelects() {
    const saleSel = document.getElementById("sale-product");
    const returnSel = document.getElementById("return-product");

    saleSel.innerHTML = "";
    returnSel.innerHTML = "";

    products.forEach(p => {
        let op1 = document.createElement("option");
        op1.textContent = `${p.name} (${p.qty} uds)`;
        saleSel.appendChild(op1);

        let op2 = document.createElement("option");
        op2.textContent = `${p.name} (${p.qty} uds)`;
        returnSel.appendChild(op2);
    });
}

// ===================== VENTAS =====================
document.getElementById("btn-sale").addEventListener("click", () => {
    let productName = document.getElementById("sale-product").value.split("(")[0].trim();
    let qty = parseInt(document.getElementById("sale-qty").value);

    let product = products.find(p => p.name === productName);

    if (!qty || qty <= 0) return alert("Cantidad inválida");

    if (product.qty < qty) return alert("No hay suficiente inventario");

    product.qty -= qty;
    renderInventory();
});

// ===================== DEVOLUCIONES =====================
document.getElementById("btn-return").addEventListener("click", () => {
    let productName = document.getElementById("return-product").value.split("(")[0].trim();
    let qty = parseInt(document.getElementById("return-qty").value);

    if (!qty || qty <= 0) return alert("Cantidad inválida");

    let product = products.find(p => p.name === productName);
    product.qty += qty;

    renderInventory();
});

// ===================== PROVEEDORES =====================
let providers = [];

document.getElementById("btn-provider").addEventListener("click", () => {
    let name = document.getElementById("provider-name").value;
    let phone = document.getElementById("provider-phone").value;

    if (!name) return;

    providers.push({ name, phone });
    renderProviders();
});

function renderProviders() {
    const ul = document.getElementById("provider-list");
    ul.innerHTML = "";

    providers.forEach(p => {
        let li = document.createElement("li");
        li.textContent = `${p.name} - ${p.phone}`;
        ul.appendChild(li);
    });
}

// ===================== DASHBOARD CHART =====================
let ctx = document.getElementById("salesChart");

new Chart(ctx, {
    type: "bar",
    data: {
        labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
        datasets: [{
            label: "Ventas",
            data: [3, 4, 2, 6, 5, 8, 2],
            backgroundColor: "#4caf50"
        }]
    }
});

