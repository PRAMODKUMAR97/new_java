const API_BASE_URL = 'http://localhost:8080/api';

const api = {
    async login(username, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            return await response.json();
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    async getAllFines() {
        try {
            const response = await fetch(`${API_BASE_URL}/fines`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Get all fines error:', error);
            throw error;
        }
    },

    async getFinesByVehicle(vehicleNumber) {
        try {
            const response = await fetch(`${API_BASE_URL}/fines/vehicle/${vehicleNumber}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Get fines by vehicle error:', error);
            throw error;
        }
    },

    async addFine(fineData) {
        try {
            const response = await fetch(`${API_BASE_URL}/fines/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fineData)
            });
            return await response.json();
        } catch (error) {
            console.error('Add fine error:', error);
            throw error;
        }
    },

    async payFine(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/fines/pay/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Pay fine error:', error);
            throw error;
        }
    },

    async updateFineStatus(id, status) {
        try {
            if (status === 'PAID') {
                return await this.payFine(id);
            }
            throw new Error('Only PAID status updates are supported');
        } catch (error) {
            console.error('Update fine status error:', error);
            throw error;
        }
    },

    async deleteFine(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/fines/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.ok;
        } catch (error) {
            console.error('Delete fine error:', error);
            throw error;
        }
    }
};
