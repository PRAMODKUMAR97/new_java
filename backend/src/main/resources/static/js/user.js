// User JavaScript

// Search Form Handler
const searchForm = document.getElementById('searchForm');
const resultsSection = document.getElementById('resultsSection');
const noResults = document.getElementById('noResults');
const finesResults = document.getElementById('finesResults');

if (searchForm) {
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const vehicleNumber = document.getElementById('vehicleNumber').value.toUpperCase();

        try {
            const fines = await api.getFinesByVehicle(vehicleNumber);
            
            if (fines.length === 0) {
                resultsSection.style.display = 'none';
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
                resultsSection.style.display = 'block';
                renderUserFines(fines);
            }
        } catch (error) {
            console.error('Error searching fines:', error);
            alert('Error searching for fines. Please try again.');
        }
    });
}

function renderUserFines(fines) {
    finesResults.innerHTML = fines.map(fine => `
        <div class="fine-card">
            <div class="fine-details">
                <h3>${fine.vehicleNumber}</h3>
                <p><strong>Violation:</strong> ${fine.violationType}</p>
                <p><strong>Date:</strong> ${fine.date}</p>
                <p><strong>Status:</strong> <span class="status-badge status-${fine.paymentStatus.toLowerCase()}">${fine.paymentStatus}</span></p>
            </div>
            <div class="fine-action">
                <p class="fine-amount">₹${fine.fineAmount.toLocaleString()}</p>
                ${fine.paymentStatus === 'UNPAID' ? 
                    `<button class="btn btn-success" onclick="openPaymentModal(${fine.id}, '${fine.vehicleNumber}', '${fine.violationType}', ${fine.fineAmount})">Pay Now</button>` :
                    `<span class="status-badge status-paid">Paid ✓</span>`
                }
            </div>
        </div>
    `).join('');
}

// Payment Modal
const paymentModal = document.getElementById('paymentModal');
const successModal = document.getElementById('successModal');
const paymentCloseBtn = paymentModal?.querySelector('.close-btn');
const confirmPayBtn = document.getElementById('confirmPayBtn');
const closeSuccessBtn = document.getElementById('closeSuccessBtn');

function openPaymentModal(id, vehicle, violation, amount) {
    document.getElementById('payFineId').value = id;
    document.getElementById('payVehicle').textContent = vehicle;
    document.getElementById('payViolation').textContent = violation;
    document.getElementById('payAmount').textContent = amount.toLocaleString();
    paymentModal.classList.add('active');
}

if (paymentCloseBtn) {
    paymentCloseBtn.addEventListener('click', () => {
        paymentModal.classList.remove('active');
    });
}

if (confirmPayBtn) {
    confirmPayBtn.addEventListener('click', async () => {
        const fineId = document.getElementById('payFineId').value;

        try {
            await api.payFine(fineId);
            paymentModal.classList.remove('active');
            successModal.classList.add('active');
            
            // Refresh search results
            const vehicleNumber = document.getElementById('vehicleNumber').value.toUpperCase();
            const fines = await api.getFinesByVehicle(vehicleNumber);
            renderUserFines(fines);
        } catch (error) {
            alert('Error processing payment. Please try again.');
        }
    });
}

if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
    });
}

// Close modals on outside click
window.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
        paymentModal.classList.remove('active');
    }
    if (e.target === successModal) {
        successModal.classList.remove('active');
    }
});