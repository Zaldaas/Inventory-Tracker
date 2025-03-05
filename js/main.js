// Initialize the inventory with sample data or load from localStorage
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];

// DOM Elements
const inventoryForm = document.getElementById('inventoryForm');
const itemNameInput = document.getElementById('itemName');
const itemQuantityInput = document.getElementById('itemQuantity');
const itemCategoryInput = document.getElementById('itemCategory');
const inventoryList = document.getElementById('inventoryList');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');

// Initialize the app
function init() {
    renderInventory();
    
    // Event Listeners
    inventoryForm.addEventListener('submit', addItem);
    searchInput.addEventListener('input', filterInventory);
    sortSelect.addEventListener('change', sortInventory);
}

// CRUD Operations
// Create: Add a new item to inventory
function addItem(e) {
    e.preventDefault();
    
    const newItem = {
        id: Date.now(), // Use timestamp as unique ID
        name: itemNameInput.value.trim(),
        quantity: parseInt(itemQuantityInput.value),
        category: itemCategoryInput.value.trim() || 'Uncategorized'
    };
    
    inventory.push(newItem);
    saveInventory();
    
    // Reset form
    inventoryForm.reset();
    
    // Add new item to the table with animation
    const newRow = createItemRow(newItem);
    newRow.classList.add('fade-in');
    inventoryList.appendChild(newRow);
    
    // Remove animation class after animation completes
    setTimeout(() => {
        newRow.classList.remove('fade-in');
    }, 500);
}

// Read: Display all inventory items
function renderInventory() {
    inventoryList.innerHTML = '';
    
    if (inventory.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = '<td colspan="4">No items in inventory</td>';
        inventoryList.appendChild(emptyRow);
        return;
    }
    
    inventory.forEach(item => {
        const row = createItemRow(item);
        inventoryList.appendChild(row);
    });
}

// Create a table row for an item
function createItemRow(item) {
    const row = document.createElement('tr');
    row.dataset.id = item.id;
    
    row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.category}</td>
        <td>
            <button class="action-btn edit-btn" onclick="editItem(${item.id})">Edit</button>
            <button class="action-btn delete-btn" onclick="deleteItem(${item.id})">Delete</button>
        </td>
    `;
    
    return row;
}

// Update: Edit an existing item
function editItem(id) {
    const item = inventory.find(item => item.id === id);
    
    if (!item) return;
    
    // Prompt user for new values
    const newName = prompt('Enter new name:', item.name);
    if (newName === null) return; // User cancelled
    
    const newQuantity = prompt('Enter new quantity:', item.quantity);
    if (newQuantity === null) return; // User cancelled
    
    const newCategory = prompt('Enter new category:', item.category);
    if (newCategory === null) return; // User cancelled
    
    // Update item
    item.name = newName.trim() || item.name;
    item.quantity = parseInt(newQuantity) || item.quantity;
    item.category = newCategory.trim() || item.category;
    
    saveInventory();
    
    // Update the row with animation
    const row = document.querySelector(`tr[data-id="${id}"]`);
    row.classList.add('fade-in');
    row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${item.category}</td>
        <td>
            <button class="action-btn edit-btn" onclick="editItem(${item.id})">Edit</button>
            <button class="action-btn delete-btn" onclick="deleteItem(${item.id})">Delete</button>
        </td>
    `;
    
    setTimeout(() => {
        row.classList.remove('fade-in');
    }, 500);
}

// Delete: Remove an item
function deleteItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    const row = document.querySelector(`tr[data-id="${id}"]`);
    
    // Add fade-out animation
    row.classList.add('fade-out');
    
    // Remove item after animation completes
    setTimeout(() => {
        inventory = inventory.filter(item => item.id !== id);
        saveInventory();
        renderInventory();
    }, 500);
}

// Save inventory to localStorage
function saveInventory() {
    localStorage.setItem('inventory', JSON.stringify(inventory));
}

// Search/Filter functionality
function filterInventory() {
    const searchTerm = searchInput.value.toLowerCase();
    
    const filteredInventory = inventory.filter(item => 
        item.name.toLowerCase().includes(searchTerm) || 
        item.category.toLowerCase().includes(searchTerm)
    );
    
    renderFilteredInventory(filteredInventory);
}

// Render filtered inventory
function renderFilteredInventory(filteredItems) {
    inventoryList.innerHTML = '';
    
    if (filteredItems.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = '<td colspan="4">No matching items found</td>';
        inventoryList.appendChild(emptyRow);
        return;
    }
    
    filteredItems.forEach(item => {
        const row = createItemRow(item);
        inventoryList.appendChild(row);
    });
}

// Sorting functionality
function sortInventory() {
    const sortValue = sortSelect.value;
    
    switch (sortValue) {
        case 'name-asc':
            inventory.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            inventory.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'quantity-asc':
            inventory.sort((a, b) => a.quantity - b.quantity);
            break;
        case 'quantity-desc':
            inventory.sort((a, b) => b.quantity - a.quantity);
            break;
    }
    
    renderInventory();
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
