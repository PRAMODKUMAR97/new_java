// Admin JavaScript

// Check if admin is logged in
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    const currentPage = window.location.pathname;
    
    if (!isLoggedIn && !currentPage.includes('admin-login.html') && !currentPage.includes('index.html')) {
        window.location.href = 'admin-login.html';
    }
}

// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('errorMessage');

        try {
            const result = await api.login(username, password);
            if (result.success) {
                sessionStorage.setItem('adminLoggedIn', 'true');
                window.location.href = 'admin-dashboard.html';
            } else {
                errorMessage.textContent = 'Invalid username or password';
            }
        } catch (error) {
            errorMessage.textContent = 'Server error. Please try again.';
        }
    });
}

// Logout Handler
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('adminLoggedIn');
        window.location.href = 'index.html';
    });
}

// Dashboard Statistics
async function loadDashboardStats() {
    try {
        const fines = await api.getAllFines();
        
        const totalFines = fines.length;
        const unpaidFines = fines.filter(f => f.paymentStatus === 'UNPAID').length;
        const paidFines = fines.filter(f => f.paymentStatus === 'PAID').length;
        const totalAmount = fines.reduce((sum, f) => sum + f.fineAmount, 0);

        document.getElementById('totalFines').textContent = totalFines;
        document.getElementById('unpaidFines').textContent = unpaidFines;
        document.getElementById('paidFines').textContent = paidFines;
        document.getElementById('totalAmount').textContent = '₹' + totalAmount.toLocaleString();

        // Load recent fines
        const recentFinesBody = document.getElementById('recentFinesBody');
        if (recentFinesBody) {
            const recentFines = fines.slice(-5).reverse();
            recentFinesBody.innerHTML = recentFines.map(fine => `
                <tr>
                    <td>${fine.id}</td>
                    <td>${fine.vehicleNumber}</td>
                    <td>${fine.violationType}</td>
                    <td>₹${fine.fineAmount}</td>
                    <td><span class="status-badge status-${fine.paymentStatus.toLowerCase()}">${fine.paymentStatus}</span></td>
                </tr>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
    }
}

// Add Fine Form Handler
const addFineForm = document.getElementById('addFineForm');
if (addFineForm) {
    // Set default date to today
    document.getElementById('fineDate').valueAsDate = new Date();

    addFineForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formMessage = document.getElementById('formMessage');

        const fineData = {
            vehicleNumber: document.getElementById('vehicleNumber').value.toUpperCase(),
            violationType: document.getElementById('violationType').value,
            fineAmount: parseInt(document.getElementById('fineAmount').value),
            date: document.getElementById('fineDate').value,
            paymentStatus: document.getElementById('paymentStatus').value
        };

        try {
            const result = await api.addFine(fineData);
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Fine added successfully! ID: ' + result.id;
            addFineForm.reset();
            document.getElementById('fineDate').valueAsDate = new Date();
        } catch (error) {
            formMessage.className = 'form-message error';
            formMessage.textContent = 'Error adding fine. Please try again.';
        }
    });
}

// View Fines Page
async function loadAllFines() {
    try {
        const fines = await api.getAllFines();
        renderFinesTable(fines);
    } catch (error) {
        console.error('Error loading fines:', error);
    }
}

function renderFinesTable(fines) {
    const tbody = document.getElementById('finesTableBody');
    const noDataMessage = document.getElementById('noDataMessage');
    
    if (!tbody) return;

    if (fines.length === 0) {
        tbody.innerHTML = '';
        noDataMessage.style.display = 'block';
        return;
    }

    noDataMessage.style.display = 'none';
    tbody.innerHTML = fines.map(fine => `
        <tr>
            <td>${fine.id}</td>
            <td>${fine.vehicleNumber}</td>
            <td>${fine.violationType}</td>
            <td>₹${fine.fineAmount.toLocaleString()}</td>
            <td>${fine.date}</td>
            <td><span class="status-badge status-${fine.paymentStatus.toLowerCase()}">${fine.paymentStatus}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-primary btn-sm" onclick="openEditModal(${fine.id}, '${fine.vehicleNumber}', '${fine.paymentStatus}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteFine(${fine.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Filter functionality
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');

if (searchInput) {
    searchInput.addEventListener('input', filterFines);
}
if (statusFilter) {
    statusFilter.addEventListener('change', filterFines);
}

async function filterFines() {
    const searchTerm = searchInput?.value.toUpperCase() || '';
    const statusValue = statusFilter?.value || '';

    try {
        let fines = await api.getAllFines();
        
        if (searchTerm) {
            fines = fines.filter(f => f.vehicleNumber.includes(searchTerm));
        }
        
        if (statusValue) {
            fines = fines.filter(f => f.paymentStatus === statusValue);
        }
        
        renderFinesTable(fines);
    } catch (error) {
        console.error('Error filtering fines:', error);
    }
}

// Edit Modal
const editModal = document.getElementById('editModal');
const closeBtn = document.querySelector('.close-btn');

function openEditModal(id, vehicle, status) {
    document.getElementById('editFineId').value = id;
    document.getElementById('editVehicle').value = vehicle;
    document.getElementById('editStatus').value = status;
    editModal.classList.add('active');
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        editModal.classList.remove('active');
    });
}

// Edit Form Handler
const editForm = document.getElementById('editForm');
if (editForm) {
    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editFineId').value;
        const status = document.getElementById('editStatus').value;

        try {
            await api.updateFineStatus(id, status);
            editModal.classList.remove('active');
            loadAllFines();
        } catch (error) {
            alert('Error updating fine status');
        }
    });
}

// Delete Fine
async function deleteFine(id) {
    if (confirm('Are you sure you want to delete this fine?')) {
        try {
            await api.deleteFine(id);
            loadAllFines();
        } catch (error) {
            alert('Error deleting fine');
        }
    }
}

// Initialize pages
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    
    if (document.getElementById('totalFines')) {
        loadDashboardStats();
    }
    
    if (document.getElementById('finesTableBody')) {
        loadAllFines();
    }
});