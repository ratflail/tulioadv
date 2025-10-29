'use strict';

const cards = document.querySelectorAll('.areas__card');
const header = document.getElementById('header');
const about = document.getElementById('about');
const areas = document.getElementById('areas');
const footer = document.getElementById('footer');

cards.forEach(card =>
  card.addEventListener('click', function (e) {
    e.preventDefault();
    card.classList.toggle('areas__card-flip');
  })
);
