// Get DOM Elements
const modal = document.querySelector('#my-modal');
const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.querySelector('.close');
const confirmBtn = document.querySelector('#confirm-btn');
const cancelBtn = document.querySelector('#cancel-btn');
const changeBtn = document.querySelector('#change-btn');


// Events
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);
confirmBtn.addEventListener('click', nextStep);
cancelBtn.addEventListener('click', closeModal);
changeBtn.addEventListener('click', changeImg)

//img
function changeImg(){
  console.log("Hello")
}

// Open
function openModal() {
  modal.style.display = 'block';
}

// Close
function closeModal() {
  modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

// next step if Confirm
function nextStep(){
    window.location.href='index2.html'
    modal.style.display = 'block';
    
}



