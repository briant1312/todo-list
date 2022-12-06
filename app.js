const addNewTask = document.querySelector('#addNewTask');
const deleteCompletedTasks = document.querySelector('#deleteCompletedTasks');
const list = document.querySelector('#list');


addNewTask.addEventListener('click', () => {
    let newTask = prompt('What would you like to add?');
    if(newTask !== null && newTask !== ''){
        addTaskToList(newTask)
    }
})

const addTaskToList = (newTask) => {
    let taskId = crypto.randomUUID();
    let newDiv = document.createElement('div');
    let newCheckbox = document.createElement('input');
    let newLabel = document.createElement('label');
    list.append(newDiv);
    newCheckbox.setAttribute('type', 'checkbox');
    newCheckbox.setAttribute('id', `task${taskId}`);
    newLabel.setAttribute('for', `task${taskId}`);
    newLabel.innerHTML = newTask;
    newLabel.classList.add('active')
    newDiv.append(newCheckbox);
    newDiv.append(newLabel);
    createEventListener(newCheckbox);
}

const createEventListener = (newCheckbox) => {
    newCheckbox.addEventListener('change', () => {
        const id = newCheckbox.id;
        const label = document.querySelector(`label[for=${id}]`);
        label.classList.toggle('completedTasks');
        label.classList.toggle('active');
    })
}


deleteCompletedTasks.addEventListener('click', () => {
    allCheckbox = document.querySelectorAll('input');
    for(checkbox of allCheckbox){
        if(checkbox.checked) {
            checkbox.parentElement.remove();
        }
    }
})
