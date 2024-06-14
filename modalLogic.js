'use strict';

//HOW TO PLAY MODAL
const howToPlayBtn = document.querySelector(".how-to-play");
const howToPlayModal = document.querySelector(".how-to-play-modal");
const overlay = document.querySelector(".overlay")
const closeModalBtn = document.querySelector(".close-modal")

howToPlayBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener("click", function(){
    if (overlay.style.display === "block") {
        closeModal();
    }
});

document.addEventListener('keydown', function(e){
    if (e.key === "Escape" && howToPlayModal.style.display === "block") {
        closeModal();
    }
});

function openModal() {
    howToPlayModal.style.display = 'block';
    overlay.style.display = 'block';
    howToPlayModal.offsetWidth;
    howToPlayModal.classList.add('show');
}

function closeModal() {
    howToPlayModal.classList.remove('show');
    howToPlayModal.classList.add('closing');
    overlay.style.display = 'none'
    setTimeout(function() {
        howToPlayModal.style.display = 'none'
        howToPlayModal.classList.remove('closing');
    }, 300); 
}


