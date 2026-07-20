let wordArray = [];
let input = document.querySelector('input');
let ul = document.querySelector('ul');
fetch('./google-10000-english-usa-no-swears.txt')
.then(response => response.text())
.then(data => {
    wordArray = data.split(/\r?\n/).map(w => w.trim()).filter(w => w !== '');
})

input.addEventListener('keyup', function(event) {
    let query = input.value.toLowerCase();

    if (query === '') {
        ul.innerHTML = ''
        return;
    }

    let html = '';
    for (const word of wordArray) {
        if (word.toLowerCase().startsWith(query)) {
            html += `<li>${word}</li>`;
            if (html.split('li').length > 10) return;
        }
    }
    ul.innerHTML = html;
});
document.addEventListener('DOMContentLoaded', function() {
    input.addEventListener('keyup', function(event) {
        let name = document.querySelector('p');
        if (input.value) {
            name.innerHTML = input.value;
        } else {
            name.innerHTML = ``
        }
    })
});
  function blink() {
    let h1 = document.querySelector('h1')
   if (h1) {
    h1.classList.toggle('hidden');
   }
  }
window.setInterval(blink, 500)
