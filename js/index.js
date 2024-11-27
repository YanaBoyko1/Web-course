import { addItemToPage, clearInputs, getInputValues } from './dom.js';

document.addEventListener('DOMContentLoaded', () => {
    const shipList = document.getElementById('shipList');
    const countExpensesButton = document.getElementById('countExpenses');
    const totalExpensesElement = document.getElementById('totalExpenses');
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchShip');
    const clearButton = document.getElementById('clearButton');
    const sortToggle = document.getElementById('sortShips');

    let currentSearch = '';
    let currentSort = 'asc'; 

    const fetchShips = async (search = '', sort = '', calculateTotal = false) => {
        try {
            let url = `http://localhost:3000/api/ships?`;

            if (search) {
                url += `search=${encodeURIComponent(search)}&`;
            }
            if (sort) {
                url += `sort=${encodeURIComponent(sort)}&`;
            }
            if (calculateTotal) {
                url += `calculateTotal=true`;
            }

            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch ships');

            const data = await response.json();

            if (calculateTotal) {
                totalExpensesElement.textContent = `$${data.totalExpenses.toFixed(2)}`;
                return;
            }

            shipList.innerHTML = ''; 
            data.forEach(ship => addItemToPage(ship));

            const deleteButtons = document.querySelectorAll('.delete-btn');
            deleteButtons.forEach(button => {
                button.addEventListener('click', handleDelete);
            });
        } catch (error) {
            console.error('Error fetching ships:', error);
        }
    };

  
    const handleDelete = async (event) => {
        const shipId = event.target.getAttribute('data-id');
        try {
            const response = await fetch(`http://localhost:3000/api/ships/${shipId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchShips(currentSearch, currentSort); 
            } else {
                throw new Error('Failed to delete ship');
            }
        } catch (error) {
            console.error('Error deleting ship:', error);
        }
    };

    fetchShips(currentSearch, currentSort);

    countExpensesButton.addEventListener('click', () => {
        fetchShips(currentSearch, currentSort, true); 
    });

    searchButton.addEventListener('click', () => {
        currentSearch = searchInput.value.toLowerCase().trim();
        fetchShips(currentSearch, currentSort); 
    });

    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        currentSearch = '';
        fetchShips(currentSearch, currentSort); 
    });

    sortToggle.addEventListener('change', () => {
        currentSort = sortToggle.checked ? 'desc' : 'asc';
        fetchShips(currentSearch, currentSort); 
    });
});
