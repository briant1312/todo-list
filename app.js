const addNewTask = document.querySelector('#addNewTask');
const deleteCompletedTasks = document.querySelector('#deleteCompletedTasks');
const list = document.querySelector('#list');

let previousTasks = JSON.parse(localStorage.getItem("tasks"));
if(previousTasks) {
    for(let task of previousTasks) {
        addTaskToList(task.text, task.id, task.isCompleted);
    }
}

class task {
    constructor(text, id) {
        this.text = text;
        this.isCompleted = false;
        this.id = id;
    }
}

function addTaskToStorage(task) {
    if(localStorage.getItem("tasks")) {
        let tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
        localStorage.setItem("tasks", JSON.stringify([task]));
    }
}

addNewTask.addEventListener('click', () => {
    let newTask = prompt('What would you like to add?');
    if(newTask !== null && newTask !== ''){
        let taskId = crypto.randomUUID();
        addTaskToList(newTask, `task${taskId}`);
        let obj = new task(newTask, `task${taskId}`);
        addTaskToStorage(obj, taskId);
    }
})

function addTaskToList(newTask, taskId, isCompleted = false) {
    let newDiv = document.createElement('div');
    let newCheckbox = document.createElement('input');
    let newLabel = document.createElement('label');
    list.append(newDiv);
    newCheckbox.setAttribute('type', 'checkbox');
    newCheckbox.setAttribute('id', `${taskId}`);
    newLabel.setAttribute('for', `${taskId}`);
    newLabel.innerHTML = newTask;
    newLabel.classList.add('active');
    if(isCompleted) {
        newLabel.classList.remove('active');
        newLabel.classList.add('completedTasks');
        newCheckbox.setAttribute("checked", true);
    }
    newDiv.append(newCheckbox);
    newDiv.append(newLabel);
    createEventListener(newCheckbox);
}

function createEventListener(newCheckbox) {
    newCheckbox.addEventListener('change', () => {
        const id = newCheckbox.id;
        const label = document.querySelector(`label[for=${id}]`);
        label.classList.toggle('completedTasks');
        label.classList.toggle('active');

        const tasks = JSON.parse(localStorage.getItem("tasks"));
        const currTask = tasks.find(task => task.id === id);
        currTask.isCompleted = !currTask.isCompleted;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    })
}


deleteCompletedTasks.addEventListener('click', () => {
    allCheckbox = document.querySelectorAll('input');
    for(checkbox of allCheckbox){
        if(checkbox.checked) {
            checkbox.parentElement.remove();
        }
    }

    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = tasks.filter(task => task.isCompleted === false);
    localStorage.setItem("tasks", JSON.stringify(tasks));
})
