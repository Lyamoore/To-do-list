'use strict'

const $elemList = document.querySelector('.list__tasks')
const $elemAddBtn = document.querySelector('.list__addBtn')

let taskList = []

function Task(title, done = false) {
    this.title = title
    this.done = done
}


function save() {
    localStorage.setItem('taskList', JSON.stringify(taskList))
}

function upload() {
    taskList = JSON.parse(localStorage.getItem('taskList')) || []
}

function saveAndReload() {
    save()
    drawTasks()
}


// Добавление новой задачи в массив =====================

function addNewTask(title) {
    let newTask = new Task(title)

    taskList.push(newTask)
}


// Отрисовка одной задачи =====================

function drawTask(Task, index) {
    let html = `<div class="list__tasks__task">
    <button class="list__tasks__task__btn list__tasks__task__btn-check" data-id="${index}"></button>
    <input type="text" class="list__tasks__task__title ${Task.done ? 'done' : ''}" value="${Task.title}"/>
    <button class="list__tasks__task__btn list__tasks__task__btn-del" data-id="${index}"></button>
    </div>`

    $elemList.insertAdjacentHTML('afterbegin', html)
}


// Отрисовка блока задач =====================

function drawTasks() {
    $elemList.textContent = ''

    taskList.forEach((Task, index) => drawTask(Task, index))
}


// События на кнопку задач =====================

function addBtnClick(e) {
    const $elemField = document.querySelector('.list__field')
    let title = $elemField.value

    if ((e.key == 'Enter' || e.target == $elemAddBtn) && title) {
        addNewTask(title)
        saveAndReload()
    
        $elemField.value = '';
    }
}


// Назначение событий на кнопку добавления задачи =====================

$elemAddBtn.addEventListener('click', addBtnClick)
document.addEventListener('keypress', addBtnClick)


// Выполнение задач =====================

function checkTask (e) {
    const $elem = e.target

    if ($elem.tagName == 'BUTTON') {
        if ($elem.className.includes('list__tasks__task__btn-check')) {
            const index = Number($elem.dataset.id)
            const $doneItem = taskList.find((item, i) => i == index)

            $doneItem.done = !$doneItem.done

            saveAndReload()
        }
    }
}

$elemList.addEventListener('click', checkTask)

// Удаление задач =====================

function delTask(e) {
    const $elem = e.target

    if ($elem.tagName == 'BUTTON') {
        if ($elem.className.includes('list__tasks__task__btn-del')) {
            const index = Number($elem.dataset.id)

            taskList = taskList.filter((item, i) => i != index)

            saveAndReload()
        }
    }
}

$elemList.addEventListener('click', delTask)


// =====================

upload()
drawTasks()