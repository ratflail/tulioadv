'use strict';

const cards = document.querySelectorAll('.areas__card');
const header = document.getElementById('header');
const about = document.getElementById('about');
const areas = document.getElementById('areas');
const footer = document.getElementById('footer');
const toggle = document.getElementById('menu__toggle');
const overlay = document.querySelector('.overlay');
const toggleClass = document.querySelector('.popup');

cards.forEach(card =>
  card.addEventListener('click', function (e) {
    e.preventDefault();
    card.classList.toggle('areas__card-flip');
  })
);

toggle.addEventListener('click', function (e) {
  e.preventDefault();

  toggleClass.classList.toggle('visible');
  overlay.classList.toggle('visible');
});

overlay.addEventListener('click', function () {
  toggleClass.classList.toggle('visible');
  overlay.classList.toggle('visible');
});
