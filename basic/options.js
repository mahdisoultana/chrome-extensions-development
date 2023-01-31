const timerForm = document.getElementById('timer-form');
const input = timerForm.querySelector('input');
timerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputValue = e.target['name-input'].value;
  //chrome.storage.sync.set({ key: value}, () => {})
  chrome.storage.sync.set({ name: inputValue });
  e.target['name-input'].value = '';
});

chrome.storage.sync.get(['name'], (values) => {
  input.value = values.name ?? '???';
});

console.log('hello from options');
