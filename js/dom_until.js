const titleInput = document.getElementById('shipName');
const descriptionInput = document.getElementById('description');
const dailyCostInput = document.getElementById('dailyCost');
const typeInput = document.getElementById('shipType');

const shipList = document.getElementById('shipList');

const itemTemplate = ({ id, title, description, dailyCost, type }) => `
  <li id="${id}" class="card mb-3 item-card">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">Description: ${description}</p>
      <p class="card-text">Daily Expense: $${dailyCost}</p>
      <p class="card-text">Type: ${type}</p>
    </div>
    <div class="card-buttons">
        <a href="editShip.html?id=${id}" class="edit-btn">Edit</a>
        <button class="delete-btn" data-id="${id}">Delete</button>
    </div>
  </li>`;

export const addItemToPage = ({ id, title, description, dailyCost, type }) => {
  shipList.insertAdjacentHTML('beforeend', itemTemplate({ id, title, description, dailyCost, type }));
};

export const clearInputs = () => {
  if (titleInput && descriptionInput && dailyCostInput && typeInput) {
    titleInput.value = '';
    descriptionInput.value = '';
    dailyCostInput.value = '';
    typeInput.value = '';
  } else {
    console.log('Form inputs not found on this page.');
  }
};

export const getInputValues = () => {
  if (titleInput && descriptionInput && dailyCostInput && typeInput) {
    return {
      title: titleInput.value,
      description: descriptionInput.value,
      dailyCost: dailyCostInput.value,
      type: typeInput.value
    };
  } else {
    console.log('Form inputs not found on this page.');
    return null;
  }
};
