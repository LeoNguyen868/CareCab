document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    menuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
});

var icon = document.querySelector('.mobile-menu-btn');
icon.addEventListener('click', function() {
    this.classList.toggle('open');
})