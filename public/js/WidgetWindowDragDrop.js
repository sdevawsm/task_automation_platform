//   Drag and drop
  
// const container = document.querySelector('.wdg_conteiner');
// const items = document.querySelectorAll('.item');
// let draggedItem = null;
// let beforeItem = null;

// function handleDragStart(e) {
//   draggedItem = this;
//   beforeItem = this.previousElementSibling;
//   this.classList.add('dragging');
// }

// function handleDragOver(e) {
//   e.preventDefault();
// }

// function handleDragEnter(e) {
//   e.preventDefault();
//   this.classList.add('drag-over');
// }

// function handleDragLeave() {
//   this.classList.remove('drag-over');
// }

// function handleDrop(e) {
//   if (draggedItem !== this) {
//     const newPosition = this;
//     container.insertBefore(draggedItem, beforeItem);
//   }
//   this.classList.remove('drag-over');
//   draggedItem.classList.remove('dragging');
// }

// function handleDragEnd() {
//   draggedItem = null;
//   beforeItem = null;
// }

// items.forEach((item) => {
//   item.addEventListener('dragstart', handleDragStart);
//   item.addEventListener('dragover', handleDragOver);
//   item.addEventListener('dragenter', handleDragEnter);
//   item.addEventListener('dragleave', handleDragLeave);
//   item.addEventListener('drop', handleDrop);
//   item.addEventListener('dragend', handleDragEnd);
// });


 
///

const container = document.querySelector('.wdg_conteiner');
const items = document.querySelectorAll('.item');
let draggedItem = null;
let beforeItem = null;

function handleDragStart(e) {
draggedItem = this;
beforeItem = this.previousElementSibling;
this.classList.add('dragging');
}

function handleDragOver(e) {
e.preventDefault();
this.classList.add('drop-zone');
}

function handleDragEnter(e) {
e.preventDefault();
}

function handleDragLeave() {
this.classList.remove('drop-zone');
}

function handleDrop(e) {
if (draggedItem !== this) {
const newPosition = this;
container.insertBefore(draggedItem, beforeItem);
}
this.classList.remove('drop-zone');
draggedItem.classList.remove('dragging');
}

function handleDragEnd() {
draggedItem = null;
beforeItem = null;
}

items.forEach((item) => {
item.addEventListener('dragstart', handleDragStart);
item.addEventListener('dragover', handleDragOver);
item.addEventListener('dragenter', handleDragEnter);
item.addEventListener('dragleave', handleDragLeave);
item.addEventListener('drop', handleDrop);
item.addEventListener('dragend', handleDragEnd);

const nav = item.querySelector('nav');
nav.addEventListener('dragstart', (e) => {
e.stopPropagation();
});
});