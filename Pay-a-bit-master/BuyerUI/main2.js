// Get DOM Elements
const modal = document.querySelector('#my-modal');
//const modalBtn = document.querySelector('#modal-btn');
//const closeBtn = document.querySelector('.close');
const confirmBtn = document.querySelector('#confirm-btn');
//const cancelBtn = document.querySelector('#cancel-btn');
const changeBtn = document.querySelector('#change-btn');


// Events
//modalBtn.addEventListener('click', openModal);
//closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);
confirmBtn.addEventListener('click', nextStep);
//ancelBtn.addEventListener('click', closeModal);
changeBtn.addEventListener('click', changeImg)

//img
function changeImg(){

  document.getElementById("qr").style.display = "none";
  document.getElementById("loader").style.display = "block";
    myFunction();

//   document.getElementById("loader").style ="";

}

function myFunction() {
    
    setTimeout(function(){ 
        document.getElementById("qr").style.display = "block";
        document.getElementById("loader").style.display = "none";
        document.getElementById("qr").src = "Screen Shot 2019-02-21 at 8.46.14 PM.png"; 
        document.getElementById("qr").style.marginLeft = "20%";
        document.getElementById("change-btn").style.display = "none";
        document.getElementById("confirm-btn").innerHTML = "View Receipt";
        document.getElementById("success").innerHTML = "Transaction Approved! <br> Your Transcation hash: e763eb4184d9f393429a<br>8313127b72831cb535e650a629351c5277e29cb9beeb "
    
    }, 30000);
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



