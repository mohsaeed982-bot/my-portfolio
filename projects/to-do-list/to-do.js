
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const tasksCount = document.getElementById('tasksCount');
const clearAllBtn = document.getElementById('clearAllBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

// جلب المهام المحفوظة مسبقاً من Local Storage أو مصفوفة فارغة
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

// عرض المهام عند فتح الصفحة
renderTasks();

// إضافة مهمة جديدة
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (text === '') return;

  const newTask = {
    id: Date.now(),
    text: text,
    completed: false
  };

  tasks.push(newTask);
  saveAndRender();
  taskInput.value = '';
}

// رسم وعرض المهام في الشاشة
function renderTasks() {
  taskList.innerHTML = '';

  let filteredTasks = tasks.filter(task => {
    if (currentFilter === 'pending') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<p style="text-align: center; color: #64748b; font-size: 0.85rem; padding: 20px;">لا توجد مهام حالياً</p>`;
  }

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;

    li.innerHTML = `
      <div class="task-content">
        <input 
          type="checkbox" 
          class="task-checkbox" 
          ${task.completed ? 'checked' : ''} 
          onchange="toggleTask(${task.id})"
        >
        <span class="task-text" onclick="toggleTask(${task.id})">${task.text}</span>
      </div>
      <div class="task-actions">
        <button class="delete-btn" onclick="deleteTask(${task.id})">🗑️</button>
      </div>
    `;

    taskList.appendChild(li);
  });

  updateCount();
}

// تبديل حالة المهمة (مكتملة / قيد التنفيذ)
function toggleTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  saveAndRender();
}

// حذف مهمة واحدة
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveAndRender();
}

// حذف جميع المهام
clearAllBtn.addEventListener('click', () => {
  tasks = [];
  saveAndRender();
});

// أزرار الفلترة
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.getAttribute('data-filter');
    renderTasks();
  });
});

// تحديث العداد
function updateCount() {
  const pendingCount = tasks.filter(task => !task.completed).length;
  tasksCount.textContent = `${pendingCount} مهمة متبقية`;
}

// حفظ في Local Storage وتحديث العرض
function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}