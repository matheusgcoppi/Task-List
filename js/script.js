const inputTask = document.querySelector('.input-task');
const buttonTask = document.querySelector('.btn-task');
const tasks = document.querySelector('.tasks');

function createLi() {
    const li = document.createElement('li')
    return li;
}

function cleanInput() {
    inputTask.value = '';
    inputTask.focus(); //like cursor pointer
}

function createButtonDelete(li) {
    const buttonDelete = document.createElement('button');
    buttonDelete.innerText = 'delete';
    li.innerText += '' //space between button and li
    li.appendChild(buttonDelete);
    buttonDelete.setAttribute('class', 'delete'); //creating a class to button
    buttonDelete.setAttribute('title', 'delete this task'); //creating a class to button

}

inputTask.addEventListener('keypress',(e) => {
    if(e.keyCode === 13) {  //Enter keyCode is 13
      if(!inputTask.value) return;
      createTask (inputTask.value)      
    }
})

function createTask (textInput) {
    const li = createLi();
    li.innerText = textInput;
    tasks.appendChild(li);
    cleanInput();
    createButtonDelete(li);
    saveTasks();
}

buttonTask.addEventListener('click', () => {
    if(!inputTask.value) return;
    createTask(inputTask.value)
});

document.addEventListener('click', (e) => {
    const element = e.target; //target all clicks and if you do console.log, see it happens

    if(element.classList.contains('delete')) { 
        element.parentElement.remove(); // selected the parent of button delete and remove  
        saveTasks();
    }  
});

function saveTasks() {
    const liTasks = tasks.querySelectorAll('li'); //to capture all li
    const listOfTasks = []

    for (let task of liTasks) {
        let taskTexto = task.innerText; //just to get innerText in this case inside of li added
        taskTexto = taskTexto.replace('delete', '').trim(); //trim is to dont let a space. Remove 'delete'
        listOfTasks.push(taskTexto);
    }

    const taskJSON = JSON.stringify(listOfTasks); // now it transform the array in string and can to save 
    localStorage.setItem('tasks', taskJSON); //here you can only save strings
    //tasks is the name and taskJSON is What I put in add new task
}

function addTasksSaves() {
    const tasks = localStorage.getItem('tasks');
    const listOfTasks = JSON.parse(tasks); //parse use to convert to a object in js
    for (const task of listOfTasks) {
        createTask(task)
    }
}
addTasksSaves();


