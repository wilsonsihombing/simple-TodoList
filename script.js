document.addEventListener('DOMContentLoaded', (event) => {
    loadList();
});

function openTab(event, day) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tab-content');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove('active');
    }
    tablinks = document.getElementsByClassName('tab-button');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove('active');
    }
    document.getElementById(day).classList.add('active');
    event.currentTarget.classList.add('active');
}

var addButton = document.getElementById('add-button');
addButton.addEventListener('click', addToDoItem);

function getCurrentDayList() {
    var activeTab = document.querySelector('.tab-content.active');
    return activeTab.querySelector('.todo-list');
}

var toDoEntryBox = document.getElementById('todo-entry-box');

function newToDoItem(itemText, completed, currentDayList) {
    var toDoItem = document.createElement('li');
    var toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);

    var removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', function() {
        toDoItem.remove();
    });
    toDoItem.appendChild(removeButton);

    if (completed) {
        toDoItem.classList.add('completed');
    }

    toDoItem.addEventListener('dblclick', toggleToDoItemState);
    currentDayList.appendChild(toDoItem);
}

function addToDoItem() {
    var itemText = toDoEntryBox.value.trim();
    if (itemText !== "") {
        var currentDayList = getCurrentDayList();
        newToDoItem(itemText, false, currentDayList);
        toDoEntryBox.value = '';
    }
}

function toggleToDoItemState() {
    this.classList.toggle('completed');
}

function clearCompletedToDoItems() {
    var activeList = getCurrentDayList();
    var completedItems = activeList.querySelectorAll('.completed');
    completedItems.forEach(item => item.remove());
}

function emptyList() {
    getCurrentDayList().innerHTML = '';
}

function saveList() {
    var toDos = {};
    var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    days.forEach(day => {
        var dayList = document.getElementById('todo-list-' + day).children;
        toDos[day] = [];
        for (var i = 0; i < dayList.length; i++) {
            var toDo = dayList.item(i);
            var toDoInfo = {
                "task": toDo.childNodes[0].nodeValue,
                "completed": toDo.classList.contains('completed')
            };
            toDos[day].push(toDoInfo);
        }
    });
    localStorage.setItem('toDos', JSON.stringify(toDos));
    console.log("List saved!");
}

function loadList() {
    if (localStorage.getItem('toDos') != null) {
        var toDos = JSON.parse(localStorage.getItem('toDos'));
        var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        days.forEach(day => {
            if (toDos[day]) {
                var currentDayList = document.getElementById('todo-list-' + day);
                toDos[day].forEach(toDo => {
                    newToDoItem(toDo.task, toDo.completed, currentDayList);
                });
            }
        });
    }
    console.log("List loaded!");
}
