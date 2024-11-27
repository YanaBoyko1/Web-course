import { clearInputs, getInputValues } from './dom.js';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const shipId = params.get('id');

    let shipToEdit;

    const fetchShip = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/ships/${shipId}`);
            if (!response.ok) throw new Error('Failed to fetch ship');
            shipToEdit = await response.json();
            populateForm(shipToEdit);
        } catch (error) {
            alert(error.message);
        }
    };

    const populateForm = (ship) => {
        if (ship) {
            document.getElementById('shipName').value = ship.title;
            document.getElementById('description').value = ship.description;
            document.getElementById('dailyCost').value = ship.dailyCost;
            document.getElementById('shipType').value = ship.type;
        }
    };

    const editShipForm = document.getElementById('editShipForm');

    editShipForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const updatedShip = {
            id: shipId,
            title: document.getElementById('shipName').value,
            description: document.getElementById('description').value,
            dailyCost: parseFloat(document.getElementById('dailyCost').value),
            type: document.getElementById('shipType').value
        };

        if (validateForm(updatedShip)) {
            try {
                const response = await fetch(`http://localhost:3000/api/ships/${shipId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedShip)
                });

                if (response.ok) {
                    alert('Ship successfully updated!');
                    window.location.href = 'index.html';
                } else {
                    throw new Error('Failed to update ship');
                }
            } catch (error) {
                alert(error.message);
            }
        }
    });

    function validateForm({ title, description, dailyCost, type }) {
        if (title.length < 3 || title.length > 30) {
            alert('Ship name should be between 3 and 30 characters.');
            return false;
        }

        if (description.length < 10) {
            alert('Description should be at least 10 characters long.');
            return false;
        }

        if (dailyCost <= 0 || isNaN(dailyCost)) {
            alert('Daily expense must be a positive number greater than 0.');
            return false;
        }

        if (!type) {
            alert('Please select a ship type.');
            return false;
        }

        return true;
    }

    fetchShip();
});
