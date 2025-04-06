const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

addBtn.addEventListener('click', addTask);
input.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

function addTask() {
  const taskText = input.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  li.className = 'task';
  li.innerHTML = `
    <span>${taskText}</span>
    <div>
      <button onclick="toggleDone(this)">✅</button>
      <button onclick="deleteTask(this)">❌</button>
    </div>
  `;

  taskList.appendChild(li);
  input.value = '';
}

function deleteTask(btn) {
  const task = btn.closest('li');
  task.classList.add('fall');
  task.addEventListener('transitionend', () => task.remove());
}

function toggleDone(btn) {
  const task = btn.closest('li');
  task.classList.toggle('done');
}
