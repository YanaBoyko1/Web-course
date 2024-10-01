document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const shipId = params.get('id');

  let ships = JSON.parse(localStorage.getItem('ships')) || [];
  const shipToEdit = ships.find(ship => ship.id === shipId);

  if (shipToEdit) {
    document.getElementById('shipName').value = shipToEdit.title;
    document.getElementById('description').value = shipToEdit.description;
    document.getElementById('dailyCost').value = shipToEdit.dailyCost;
    document.getElementById('shipType').value = shipToEdit.type;
  }

  const editShipForm = document.getElementById('editShipForm');
  editShipForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const updatedShip = {
      id: shipId,
      title: document.getElementById('shipName').value,
      description: document.getElementById('description').value,
      dailyCost: document.getElementById('dailyCost').value,
      type: document.getElementById('shipType').value
    };

    if (validateForm(updatedShip)) {
      ships = ships.map(ship => (ship.id === shipId ? updatedShip : ship));
      localStorage.setItem('ships', JSON.stringify(ships));
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
