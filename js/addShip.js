import { clearInputs, getInputValues } from './dom_until.js';

document.addEventListener('DOMContentLoaded', () => {
  const submitButton = document.getElementById('submit_button');
  const form = document.getElementById('addShipForm');

  if (!submitButton) {
    console.error('Submit button not found!');
    return;
  }

  let ships = JSON.parse(localStorage.getItem('ships')) || [];

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputValues = getInputValues();
    if (validateForm(inputValues)) {
      const { title, description, dailyCost, type } = inputValues;

      const newShip = {
        id: uuid.v4(),
        title,
        description,
        dailyCost,
        type
      };

      ships.push(newShip);
      localStorage.setItem('ships', JSON.stringify(ships));

      clearInputs();
      alert('Ship successfully added!');
      window.location.href = 'index.html';
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

