// types
interface Todo {
  text: string;
  id: string;
}

// -----------------
const UlEl = document.querySelector('ul')!;
const formEl = document.querySelector('form')!;
const inputEl = document.querySelector('#input')! as HTMLInputElement;
const startBtn = document.getElementById('start-btn')! as HTMLButtonElement;
const restBtn = document.getElementById('rest-btn')! as HTMLButtonElement;
const timerEl = document.getElementById('timer')!;

let todos: Todo[] = [];

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = inputEl.value;
  const id = Math.random() * 100 * Math.random() * 100 + '';
  if (text.length > 3) {
    const todo = { text, id };
    addTask(todo);
    AddTodoToMemory(todo);
  }
});
function formaTime(time: number): string {
  return String(time).padStart(2, '0');
}
function AddTodoToMemory(todo: Todo) {
  todos.push(todo);
  // @ts-expect-error
  chrome.storage.sync.set({ todos });
}
function getTodos(): void {
  // @ts-ignore
  chrome.storage.sync.get(
    ['todos'],
    ({ todos: todosInit = [] }: { todos: Todo[] }) => {
      todosInit.forEach((todo) => addTask(todo));
      todos = todosInit;
    },
  );
}
function addTask(todo: Todo) {
  const { text, id } = todo;
  const liEl = document.createElement('li');
  const paragraphEl = document.createElement('p');
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'X';
  paragraphEl.textContent = text;
  paragraphEl.id = id;
  liEl.appendChild(paragraphEl);
  liEl.appendChild(deleteBtn);
  UlEl.appendChild(liEl);

  // -------events
  deleteBtn.addEventListener('click', () => {
    todos = todos.filter((todoI) => todoI !== todo);
    // @ts-ignore
    chrome.storage.sync.set({ todos });
    liEl.remove();
  });
}

startBtn.addEventListener('click', () => {
  // @ts-ignore
  chrome.storage.sync.get(['isRunning'], ({ isRunning = false }) => {
    if (isRunning) {
      startBtn.textContent = 'Start';
    } else {
      startBtn.textContent = 'Pause';
    }
    // @ts-ignore
    chrome.storage.sync.set({ isRunning: !isRunning });
  });
});
function restTimer() {
  // @ts-ignore
  chrome.storage.sync.set({ isRunning: false, timer: 0 }, () => {
    startBtn.textContent = 'Start';
  });
}
restBtn.addEventListener('click', restTimer);

function updateTimer() {
  // @ts-ignore
  chrome.storage.sync.get(
    ['timer', 'POMODORTime', 'isRunning', 'complete'],
    ({
      timer = 0,
      POMODORTime = 1,
      isRunning = false,
    }: {
      timer: number;
      POMODORTime: number;
      isRunning: boolean;
    }) => {
      let SECS = 60;
      const secInMinute = timer / 60;

      if (timer == 0) SECS = 0;

      const sec = SECS - (timer % 60);
      const timerInMinute = Math.ceil(POMODORTime - secInMinute);
      if (isRunning) {
        console.log('complete');
        console.log(sec);
        if (timerInMinute <= 0 && sec === 1) {
          restTimer();
          // @ts-ignore
          chrome.storage.sync.set({ complete: true });
        }
      } else {
        // @ts-expect-error
        chrome.storage.sync.set({ complete: false });
      }
      timerEl.textContent = `${formaTime(timerInMinute)} : ${formaTime(sec)}`;
    },
  );
}
setInterval(updateTimer, 1000);

// init
updateTimer();
getTodos();
