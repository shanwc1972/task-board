# Task-Board

## Description

This application represents you with a Kanban Task Board where you can add multiple tasks and then drag them between the three columns called To Do, In Progress and Done accordingly. Tasks that are due on the current day will turn yellow in color, whereas tasks that are past the current day will appear in red. All other tasks, where the due date has not yet elapsed will appear in white. Any yellow or red tasks will turn white when dragged into the Done column. All tasks have a delete option which allows them to be removed from the board. All tasks particulars are saved within Localstorage so that they are retained even the the browser is closed and then reopened. 


## Installation

N/A

## Usage

Website can be reached by https://shanwc1972.github.io/task-board .


The following images shows the web application's appearance and functionality:

![Empty task board](https://github.com/shanwc1972/task-board/assets/166612646/24b0bd02-2a78-4751-8d50-1936198834fb)

![Task Baord with added items](https://github.com/shanwc1972/task-board/assets/166612646/b45c916e-baab-4b63-9deb-40c8ebfba756)


Tasks can be added by clicking on the Add Task button, wherefrom a modal form will be presented where a user may enter a title, due date and decription. The field for due date will present the user with the date picker to save them from manually entering a date. Once completing all of the fields, the Add Task button can be clicked to submit those details to the board. By default, all new task items are added to the To Do column. The user may drag the item between two columns to change the status of those items accordingly. Tasks with a due date of current day will appear in yellow. Tasks past the due day will appear in red. All other tasks where the date has not yet elapsed will appear in white. Any task dragged into the Done column will turn white. All tasks have a delete button below their description and can be removed from the board simply by clicking on it.


## Credits

Javascript code located in assets/js, as well as supporting HTML files were refactored and/or populated by Warren Shan

## License

N/A
