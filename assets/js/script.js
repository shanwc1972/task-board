//Define some global variables
const taskSubmitEl = $('#tasksubmit');
const taskTitleInputEl = $('#tasktitle');
const taskDateInputEl = $('#taskduedate');
const taskDescriptionInputEl = $('#taskdesc');

//The following function reads the tasklist from localstorage. Resolves conditions where reading from the list would produce a null result 
function readTasksFromStorage() {
    // Retrieve tasks from localStorage and parse the JSON to an array
        let arrTasks = JSON.parse(localStorage.getItem('tasks'));
  
    // If no tasks were retrieved from localStorage, assign tasks to a new empty array.
    if (!arrTasks) {
      arrTasks = [];
    }
  
    // Return the projects array either empty or with data in it whichever it was determined to be by the logic right above.
    return arrTasks;
  }

// Retrieve tasks and nextId from localStorage
let taskList = readTasksFromStorage();

// The following function generates a unique task id and returns it
function generateTaskId() {
    const nTaskID = crypto.randomUUID();
    return nTaskID;
}

// The function below create a task card and returns the reference to the card insertion point
function createTaskCard(task) {
    const taskCard = $('<div>')
    .addClass('card task-card draggable my-3')
    .attr('data-task-id', task.id);
    const cardHeader = $('<div>').addClass('card-header h4').text(task.name);
    const cardBody = $('<div>').addClass('card-body');
    const cardDescription = $('<p>').addClass('card-text').text(task.description);
    const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);
    const cardDeleteBtn = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .attr('data-task-id', task.id);
    cardDeleteBtn.on('click', handleDeleteTask);

    if (task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');
    
        // If the task is due today, make the card yellow. If it is overdue, make it red.
        if (now.isSame(taskDueDate, 'day')) {
          taskCard.addClass('bg-warning text-white');
        } else if (now.isAfter(taskDueDate)) {
          taskCard.addClass('bg-danger text-white');
          cardDeleteBtn.addClass('border-light');
        }
      }

    cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
    taskCard.append(cardHeader, cardBody);

    return taskCard;
}

// The following function renders the task list and make cards draggable
function renderTaskList() {
    const tasks = readTasksFromStorage();
    //Empty existing task cards out of the lanes
    
    const todoList = $('#todo-cards');
    todoList.empty();

    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();

    const doneList = $('#done-cards');
    doneList.empty();

    // Loop through the tasks and create task items for each status
    for (let task of tasks) {
            if (task.status === 'to-do') {
                todoList.append(createTaskCard(task));        
            } else if (task.status === 'in-progress') {
                inProgressList.append(createTaskCard(task));
            } else if (task.status === 'done') {
                doneList.append(createTaskCard(task));
            }
        }

    // Use JQuery UI to make task cards draggable
    $('.draggable').draggable({
        opacity: 0.7,
        zIndex: 100,
        helper: function (e) {
        const original = $(e.target).hasClass('ui-draggable')
            ? $(e.target)
            : $(e.target).closest('.ui-draggable');
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
}

// The following function handles adding a new task
function handleAddTask(event){
    event.preventDefault();

    // Read the form inputs
    const taskTitle = taskTitleInputEl.val().trim();
    const taskDate = taskDateInputEl.val();
    const taskDesc = taskDescriptionInputEl.val().trim();

    const newTask = {
        id: generateTaskId(),
        name: taskTitle,
        dueDate: taskDate,
        description: taskDesc,
        status: 'to-do',
    };

    if((taskTitle == "") || (taskDate == "") || (taskDesc =="")) {
      alert("This task entry is incomplete. Please ensure that you complete all the fields for Task Title, due date and description accordingly");
      return handleAddTask;
    }
    //Read the task oject array back for recent changes
    taskList = readTasksFromStorage();

    //Append new task to the task object array
    taskList.push(newTask);
    
    //Update our new augmented array into LocalStorage
    localStorage.setItem('tasks', JSON.stringify(taskList));

    //Render the change to the screen
    renderTaskList();
    
    //Clear form inputs
    taskTitleInputEl.val('');
    taskDateInputEl.val('');
    taskDescriptionInputEl.val('');
}

// The following function deletes a task when the delete button is clicked
function handleDeleteTask(event){
    const taskId = $(this).attr('data-task-id');
    const tasks = readTasksFromStorage();

    tasks.forEach((task) => {
        if (task.id === taskId) {
          tasks.splice(tasks.indexOf(task), 1);
        }
    });

    //Update the modified tasklist back to localstorage 
    localStorage.setItem('tasks', JSON.stringify(tasks));

    //Render our new changes
    renderTaskList();
}

// The function below handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const tasks = readTasksFromStorage();

    const taskId = ui.draggable[0].dataset.taskId;

    const newStatus = event.target.id;

    for (let task of tasks) {
       if (task.id === taskId) {
          task.status = newStatus;
        }
      }

    //Update our changes back to localstorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
}

//Added an event listener for the submit button on the modal
taskSubmitEl.on('click', handleAddTask);

// When the document is ready, print the project data to the screen and make the lanes droppable. Also, initialize the date picker.
$(document).ready(function () {
    renderTaskList();

    // Datepicker widget
    $(function () {
        $('#taskduedate').datepicker({
          changeMonth: true,
          changeYear: true,
        });
    });
  
    // Make the swim lanes droppable
    $('.lane').droppable({
      accept: '.draggable',
      drop: handleDrop,
    });
});
