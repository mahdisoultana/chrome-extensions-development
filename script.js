const timerEl = document.querySelector('#timer');
const NameEl = document.querySelector('#name');
const counter = document.querySelector('#counter');
console.log(timerEl);
console.log('hellloooooo');

// --------time and storage  --------------
function UpdateTime() {
  chrome.storage.sync.get(['time'], ({ time = 0 }) => {
    counter.textContent = time;
  });
  const date = new Date().toLocaleTimeString({ locales: 'en' });
  timerEl.innerHTML = date;
}
UpdateTime();
setInterval(UpdateTime, 1000);

// --------get the Name --------------

chrome.storage.sync.get(
  ['name'],
  ({ name = '???' }) => (NameEl.textContent = name),
);
