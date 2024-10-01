import { addItemToPage } from './dom_until.js';

document.addEventListener('DOMContentLoaded', function () {
  const shipList = document.getElementById('shipList');
  const countExpensesButton = document.getElementById('countExpenses');
  const totalExpensesElement = document.getElementById('totalExpenses');
  const searchButton = document.getElementById('searchButton');
  const searchInput = document.getElementById('searchShip');
  const clearButton = document.getElementById('clearButton');
  const sortToggle = document.getElementById('sortShips');

  if (!shipList) {
    console.error('Ship list container not found!');
    return;
  }

  let ships = JSON.parse(localStorage.getItem('ships')) || [];
  let filteredShips = [...ships];
  let unmodifiedFilteredShips = [...ships];

  const renderShips = (shipsToRender) => {
    shipList.innerHTML = ''; 
    shipsToRender.forEach(ship => addItemToPage(ship));
  };

  renderShips(filteredShips);

  const calculateTotalExpenses = (shipsArray) => {
    const totalExpenses = shipsArray.reduce((sum, ship) => sum + parseFloat(ship.dailyCost), 0);
    return totalExpenses;
  };

  countExpensesButton.addEventListener('click', () => {
    const total = calculateTotalExpenses(filteredShips);
    totalExpensesElement.textContent = `$${total.toFixed(2)}`;
  });

  searchButton.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase().trim();
    filteredShips = ships.filter(ship => ship.title.toLowerCase().includes(query));
    unmodifiedFilteredShips = [...filteredShips];
    renderShips(filteredShips); 
  });

  clearButton.addEventListener('click', () => {
    filteredShips = [...ships]; 
    unmodifiedFilteredShips = [...ships]; 
    renderShips(filteredShips);
    searchInput.value = ''; 
  });

  sortToggle.addEventListener('change', () => {
    if (sortToggle.checked) {

      filteredShips.sort((a, b) => b.dailyCost - a.dailyCost);
    } else {
      filteredShips = [...unmodifiedFilteredShips];
    }
    renderShips(filteredShips);
  });

});

