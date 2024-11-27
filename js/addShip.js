import { clearInputs, getInputValues } from './dom.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addShipForm');

    if (!form) {
        console.error('Form with id "addShipForm" not found!');
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const inputValues = getInputValues();
        if (validateForm(inputValues)) {
            const { title, description, dailyCost, type } = inputValues;

            const newShip = {
                title,
                description,
                dailyCost,
                type
            };

            try {
                const response = await fetch('http://localhost:3000/api/ships', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newShip)
                });

                if (response.ok) {
                    clearInputs();
                    alert('Ship successfully added!');
                    window.location.href = 'index.html';
                } else {
                    throw new Error('Failed to add ship');
                }
            } catch (error) {
                alert(error.message);
            }
        }
    });

    function validateForm({ title, description, dailyCost, type }) {
        if (title.length < 1 || title.length > 30) {
            alert('Ship name should be between 3 and 30 characters.');
            return false;
        }

        if (description.length < 1) {
            alert('Description should be at least 1 character long.');
            return false;
        }

        if (dailyCost <= 0) {
            alert('Daily expense must be a positive number greater than 0.');
            return false;
        }

        if (!type) {
            alert('Please select a ship type.');
            return false;
        }

        return true;
    }
});
