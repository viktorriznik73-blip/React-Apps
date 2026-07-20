document.querySelector('form').addEventListener('submit', function (event) {
    alert(document.querySelector('#name').value);
    event.preventDefault();
})
let body = document.querySelector('body');
document.querySelector('#red').addEventListener('click', function() {
    body.style.backgroundColor = 'red';
})
document.querySelector('#green').addEventListener('click', function() {
    body.style.backgroundColor = 'green';
})
document.querySelector('#blue').addEventListener('click', function() {
    body.style.backgroundColor = 'blue';
})
document.querySelector('#white').addEventListener('click', function() {
    body.style.backgroundColor = 'white';
})
navigator.geolocation.getCurrentPosition(function(position) {
    document.write(position.coords.latitude + ", " + position.coords.longitude);
})