const { ipcRenderer } = require('electron');
const items = require('./items');


const showModal = document.getElementById('show-modal');
const closeModal = document.getElementById('close-modal');
const modal = document.getElementById('modal');
const addItem = document.getElementById('add-item');
const itemUrl = document.getElementById('url');
const search = document.getElementById('search');


window.newItem = () => {
  showModal.click();
};


window.openItem = items.open;


window.deleteItem = () => {
  const selectedItem = items.getSelectedItem();
  items.delete(selectedItem.index);
};


window.openInBrowser = items.openInBrowser;


window.searchItems = () => {
  search.focus();
};


search.addEventListener('keyup', () => {
  Array.from(document.getElementsByClassName('read-item'))
    .forEach((item) => {
      const hasMatch = item.innerText.toLowerCase().includes(search.value);
      item.style.display = hasMatch ? 'flex' : 'none';
    });
});


document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    items.changeSelection(event.key);
  }
});


const toggleModalButton = () => {
  if (addItem.disabled === true) {
    addItem.disabled = false;
    addItem.style.opacity = 1;
    addItem.innerText = 'Add Item';
    closeModal.style.display = 'inline';
  } else {
    addItem.disabled = true;
    addItem.style.opacity = 0.5;
    addItem.innerText = 'Adding item...';
    closeModal.style.display = 'none';
  }
};


showModal.addEventListener('click', () => {
  modal.style.display = 'flex';
  itemUrl.focus();
});


closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});


addItem.addEventListener('click', () => {
  if (itemUrl.value) {
    ipcRenderer.send('newItem', itemUrl.value);
    toggleModalButton();
  }
});


ipcRenderer.on('newItemSuccess', (event, newItem) => {
  items.addItem(newItem);
  toggleModalButton();
  modal.style.display = 'none';
  itemUrl.value = '';
});


itemUrl.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    addItem.click();
  }
});
