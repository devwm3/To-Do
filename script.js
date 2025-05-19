const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

function addTask(text = '', completed = false) {
  const taskText = text || input.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');
  li.textContent = taskText;

  if (completed) li.classList.add('completed');

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  // Add delete button
  const del = document.createElement('span');
  del.textContent = '🗑️';
  del.style.float = 'right';
  del.style.cursor = 'pointer';
  del.style.marginLeft = '10px';
  del.addEventListener('click', (e) => {
    e.stopPropagation(); // Don't trigger toggle
    li.remove();
    saveTasks();
  });

  li.appendChild(del);
  list.appendChild(li);

  input.value = '';
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  list.querySelectorAll('li').forEach(li => {
    const text = li.firstChild.textContent;
    const completed = li.classList.contains('completed');
    tasks.push({ text, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTask(task.text, task.completed));
}

loadTasks();