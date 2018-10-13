var doc = document;
var listId = 0;
var taskId = 0;
var itemLists = [];
const click = "click";

/**
 * Add a event listener to the element.
 * @param {classname of the element} className
 * @param {event name} event
 * @param {function name} functionName
 */
function addEventListener(className, event, functionName) {
    var elements = getAllElementsByClassName(className);
    for (let index = 0; index < elements.length; index++) {
        elements[index].addEventListener(event, functionName);
    }
}

/**
 * Obtains all the element of the specified classname.
 * @param {classname of the element.} className
 */
function getAllElementsByClassName(className) {
    return doc.getElementsByClassName(className);
}

/**
 * Obtains  the element of the specified id.
 * @param {id of the element.} className
 */
function getElementById(elementId) {
    return doc.getElementById(elementId);
}

/**
 * show the date picker to select the remind date.
 */
function pickshowRemindDateToSelectDate() {
    var date = getElementsByClassName("date-picker");
    var today = new Date()
    date.min = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    makeDisplayBlock("date-picker");
}

/**
 * set the reminder date.
 * @param {task object} task
 */
function setRemindDate(task) {
    var text = getElementsByClassName("remind-me-value");
    if (null != task.remindDate) {
        text.innerHTML = task.remindDate;
    } else {
        text.innerHTML = "Remind me";
    }
}

/**
 * add the remind date to the task.
 * @param {event} e
 */
function addRemindDate(e) {
    if (e.target.value != null) {
        var rightContent = getElementsByClassName("right-nav-bar");
        var listId = getElementsByClassName("new-content").id;
        var listItem = getElementByListId(listId);
        var task = getElementByTaskId(listItem, rightContent.id);
        var dateValue = e.target.value;
        task.remindDate = dateValue;
        makeDisplayNone("date-picker");
        setRemindDate(task);
    }
}

/**
 * show the date picker to select the due date.
 */
function pickshowDueDateToSelectDate() {
        var date = getElementsByClassName("due-date-picker");
        var today = new Date()
        date.min = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
        makeDisplayBlock("due-date-picker");
    }
    /**
     * set the due date.
     * @param {task object} task
     */
function setDueDate(task) {
        var text = getElementsByClassName("due-date-value");
        if (null != task.dueDate) {
            text.innerHTML = task.dueDate;
        } else {
            text.innerHTML = "Due date";
        }
    }
    /**
     * add the due date to the task.
     * @param {event} e
     */
function addDueDate(e) {
    if (e.target.value != null) {
        var rightContent = getElementsByClassName("right-nav-bar");
        var listId = getElementsByClassName("new-content").id;
        var listItem = getElementByListId(listId);
        var task = getElementByTaskId(listItem, rightContent.id);
        var dateValue = e.target.value;
        task.dueDate = dateValue;
        makeDisplayNone("due-date-picker");
        setDueDate(task);
    }
}

/**
 * set the task hint.
 * @param {task object} task
 */
function setTaskHint(task) {
        var textArea = getElementsByClassName("textarea-content");
        if (null != task.hint) {
            textArea.value = task.hint;
        } else {
            textArea.value = "";
        }
    }
    /**
     * Add a hint to the particular task.
     * @param {event } e
     */
function addTaskHint(e) {
    var rightContent = getElementsByClassName("right-nav-bar");
    var listId = getElementsByClassName("new-content").id;
    var listItem = getElementByListId(listId);
    var task = getElementByTaskId(listItem, rightContent.id);
    task.hint = (e.target.value);
    setTaskHint(task);
}

/**
 * Init function
 */
function init() {

    var inputTask = getElementsByClassName("input-type");
    inputTask.addEventListener("keydown", function e(e) {
        if (e.keyCode == 13) {
            createTask();
        }
    });

    inputTask.addEventListener("focusout", function hideAddTask() {
        if (inputTask.value != '') {
            createTask();
        } else {
            closeTask();
        }
    });

    var listNameInput = getElementsByClassName("add-list-name");
    listNameInput.addEventListener("keydown", function e(e) {
        if (e.keyCode == 13) {
            if (listNameInput.value != '') {
                createNewList();
            }
        }
    });

    listNameInput.addEventListener("focusout", function hideAddTask() {
        if (listNameInput.value != '') {
            createNewList();
        } else {
            hideAddListName();
        }
    });


    getElementsByClassName("delete-icon").addEventListener(click, deleteTask);
    getElementsByClassName("next-icon").addEventListener(click, closeRightNavBar);
    getElementsByClassName("add-task").addEventListener(click, showCreateTask);
    getElementsByClassName("fa fa-bars").addEventListener(click, manageSideNav);
    getElementsByClassName("add-button").addEventListener(click, createTask);
    getElementsByClassName("new-list").addEventListener(click, showNewListInput);
    getElementsByClassName("add-name-button").addEventListener(click, createNewList);
    getElementsByClassName("fa fa-trash").addEventListener(click, deleteList);
    getElementsByClassName("remind-me-value").addEventListener(click, pickshowRemindDateToSelectDate)
    getElementsByClassName("date-picker").addEventListener("focusout", addRemindDate);
    getElementsByClassName("due-date-picker").addEventListener("focusout", addDueDate);
    getElementsByClassName("due-date-value").addEventListener(click, pickshowDueDateToSelectDate)
    getElementsByClassName("textarea-content").addEventListener("focusout", addTaskHint);

}

init();



/**
 * make the task important
 * @param {event} e
 */
function makeTaskSelected(e) {
    var listId = getElementsByClassName("new-content").id;
    var listItem = getElementByListId(listId);
    var task = getElementByTaskId(listItem, e.target.parentElement.id);
    if (task.isSelected) {
        task.isSelected = false;
    } else {
        task.isSelected = true;
    }
    setId(task.id, getElementsByClassName("right-nav-bar"));
    getElementsByClassName("content").innerHTML = task.taskName;
    makeDisplayBlock("right-nav-bar");
    changeSelectIcon(task);
    if (e.currentTarget.classList.contains("fa-circle-o")) {
        e.currentTarget.classList.replace("fa-circle-o", "fa-check-circle");
    } else {
        e.currentTarget.classList.replace("fa-check-circle", "fa-circle-o");
    }
}


/**
 * make the task important
 * @param {event} e
 */
function makeTaskStarred(e) {
    var listId = getElementsByClassName("new-content").id;
    var listItem = getElementByListId(listId);
    var task = getElementByTaskId(listItem, e.target.parentElement.id);
    if (task.isStarred) {
        task.isStarred = false;
    } else {
        task.isStarred = true;
    }
    setId(task.id, getElementsByClassName("right-nav-bar"));
    getElementsByClassName("content").innerHTML = task.taskName;
    makeDisplayBlock("right-nav-bar");
    changeStarIcon(task);
    if (e.currentTarget.classList.contains("fa-star-o")) {
        e.currentTarget.classList.replace("fa-star-o", "fa-star");
    } else {
        e.currentTarget.classList.replace("fa-star", "fa-star-o");
    }
}


/**
 * Delete a list from the entire lists.
 * @param {event} event
 */
function deleteList(event) {
    var listItem = getElementByListId(event.target.id);
    var listsContent = getElementsByClassName("newly-added-list");
    var deletedList = getElementById(listItem.id);
    for (let index = 0; index < itemLists.length; index++) {
        if (itemLists[index].id == listItem.id) {
            itemLists.splice(index, 1);
        }
    }
    listsContent.removeChild(deletedList);
    getElementsByClassName("my-list-label").innerHTML = "My List";
    makeDisplayNone("fa fa-trash");
    removeTaskContent();
    closeTask();
}

/**
 * Remove all the task content present.
 */
function removeTaskContent() {
    var taskContent = doc.getElementsByClassName("task-content");
    var main = getElementsByClassName("new-content");
    for (let index = 0; index < taskContent.length; index++) {
        if (taskContent[index].parentElement.className == "new-content") {
            main.removeChild(taskContent[index]);
            index--;
        }
    }
}

/**
 * Make the task selected based on the flag present.
 * @param {task object} task
 */
function markSelected(task) {
    var unMarkedIcon = getElementsByClassName(" fa fa-circle-o color opacity");
    var MarkedIcon = getElementsByClassName(" fa fa-check-circle color opacity");
    if (task.isSelected) {
        if (unMarkedIcon) {
            setClassName("fa fa-check-circle color opacity", unMarkedIcon);
        }
    } else {
        if (MarkedIcon) {
            setClassName("fa fa-circle-o color opacity", MarkedIcon);
        }
    }
}


/**
 * Make the task select from the entire tasks.
 * @param {list of task} tasks
 */
function makeTaskStar(tasks) {
    var unMarkedIcon = doc.getElementsByClassName("fa fa-star-o starred ");
    var MarkedIcon = doc.getElementsByClassName("fa fa-star starred ");
    for (let index = 0; index < tasks.length; index++) {
        if (tasks[index].isStarred) {
            if (unMarkedIcon[index]) {
                alert(tasks[index].isStarred);

                setClassName("fa fa-star starred ", unMarkedIcon[index]);
            }
        } else {
            if (MarkedIcon[index]) {
                setClassName("fa fa-star-o starred ", unMarkedIcon[index]);
            }
        }
    }
}

/**
 * Make the task select from the entire tasks.
 * @param {list of task} tasks
 */
function makeTaskSelect(tasks) {
    var unMarkedIcon = doc.getElementsByClassName("fa fa-circle-o color aa");
    var MarkedIcon = doc.getElementsByClassName("fa fa-check-circle color aa");
    for (let index = 0; index < tasks.length; index++) {
        if (tasks[index].isSelected) {
            if (unMarkedIcon[index]) {

                setClassName("fa fa-check-circle color aa", unMarkedIcon[index]);
            }
        } else {
            if (MarkedIcon[index]) {
                setClassName("fa fa-check-circle color aa", unMarkedIcon[index]);
            }
        }
    }
}

/**
 * Display a particular list by the specified list id.
 * @param {event} event
 */
function displaySelectedList(event) {
    makeDisplayNone("right-nav-bar");
    var listId = event.target.id;
    var listItem = getElementByListId(listId);
    getElementsByClassName("my-list-label").innerHTML = (listItem.listName);
    setId(listId, getElementsByClassName("new-content"));
    setId(listId, getElementsByClassName("fa fa-trash"));
    makeDisplayInlineBlock("fa fa-trash");
    removeTaskContent();
    var main = getElementsByClassName("new-content");
    var message = getAllElementsByClassName("message");
    if (listItem.tasks.length > 0) {
        for (let index = 0; index < listItem.tasks.length; index++) {
            main.innerHTML += '<div class="task-content" id = ' + listItem.tasks[index].id + '><i class="fa fa-circle-o color aa" id = ' + listItem.tasks[index].id + '></i><p class="message" id= ' + listItem.tasks[index].id + '>' + listItem.tasks[index].taskName + '</p><i class="fa fa-star-o starred"></i></div>';
        }
        makeTaskSelect(listItem.tasks);
        makeTaskStar(listItem.tasks);


        addEventListener("message", click, openRightContent);
        addEventListener("fa fa-circle-o", click, makeTaskSelected);
        addEventListener("fa fa-star-o", click, makeTaskStarred);

    }
}


/**
 * show the input box to add new list.
 */
function showNewListInput() {
    makeDisplayNone("new-list");
    makeDisplayInlineBlock("add-name-button");
    makeDisplayBlock("list-name");
    getElementsByClassName("add-list-name").focus();
}

/**
 * hide the input box which helps to add new list.
 */
function hideAddListName() {
    makeDisplayNone("list-name");
    makeDisplayInline("new-list");
}


/**
 * Obtains the first element with the specified class name/
 * @param {class name of the element} className
 */
function getElementsByClassName(className) {
    return doc.getElementsByClassName(className)[0];
}

/**
 * creates a new list.
 */
function createNewList() {
    var mylistItem = {
        id: "list" + ++listId,
        listName: null,
        tasks: [],
    };
    var listContent = getElementsByClassName("newly-added-list");
    var textValue = getElementsByClassName("add-list-name").value;
    var newLi = createElement("li");
    var newAnchor = createElement("a");
    var newIcon = createElement("i");
    var newPara = createElement("p");
    setClassName("label-my-list content-data", newPara);
    setClassName(" fa fa-list-ul icon-my-list icons-size", newIcon);
    newAnchor.appendChild(newIcon);
    newAnchor.appendChild(newPara);
    var node = doc.createTextNode(textValue);
    newPara.appendChild(node);
    setClassName("list-icon", newLi);
    getElementsByClassName("add-list-name").focus();
    getElementsByClassName("add-list-name").value = "";
    newLi.appendChild(newAnchor);
    listContent.appendChild(newLi);
    setId(mylistItem.id, newLi);
    mylistItem.listName = textValue;
    itemLists.push(mylistItem);
    newLi.addEventListener(click, displaySelectedList);
}


/**
 * delete a task from the list.
 */
function deleteTask() {
    var ele = getElementsByClassName("active").parentNode;
    var main = getElementsByClassName("new-content");
    var taskContent = getElementsByClassName("right-nav-bar");
    var listItem = getElementByListId(main.id);
    var task = getElementByTaskId(listItem, taskContent.id);
    for (let index = 0; index < listItem.tasks.length; index++) {
        if (listItem.tasks[index].id == task.id) {
            listItem.tasks.splice(index, 1);
        }
    }
    main.removeChild(ele);
    makeDisplayNone("right-nav-bar");
}

/**
 * Helps to find a list from the specified list id.
 * @param {list id to be found} listId
 */
function getElementByListId(listId) {
    var element;
    for (let index = 0; index < itemLists.length; index++) {
        if (listId == itemLists[index].id) {
            element = (itemLists[index]);
        }
    }
    return element;
}


/**
 * Search a particular task from the list with the specified task id.
 * @param {list object} list
 * @param {task id to be searched from the list} taskId
 */
function getElementByTaskId(list, taskId) {
    var task;
    for (index = 0; index < list.tasks.length; index++) {
        if (list.tasks[index].id == taskId) {
            task = list.tasks[index];
        }
    }
    return task;
}



/**
 * Create a new task.
 * @param {event} event
 */
function createTask(event) {
    var task = {
        id: "task" + ++taskId,
        taskName: null,
        isSelected: false,
        isStarred: false,
        remindDate: null,
        dueDate: null,
        hint: null,
    };

    var textValue = getElementsByClassName("input-type").value;
    if (textValue != "") {
        var divContent = getElementsByClassName("new-content");
        var newDiv = createElement("div");
        var newSelectIcon = createElement("i");
        var newStarIcon = createElement("i");
        var para = createElement("p");
        setClassName("task-content", newDiv);
        setClassName("fa fa-circle-o color aa", newSelectIcon);
        setClassName("message", para);
        setClassName("fa fa-star-o starred", newStarIcon);
        var node = doc.createTextNode(textValue);
        para.appendChild(node);
        newDiv.appendChild(newSelectIcon);
        newDiv.appendChild(newStarIcon);
        newDiv.appendChild(para);
        divContent.appendChild(newDiv);
        getElementsByClassName("input-type").value = "";
        getElementsByClassName("input-type").focus();
        para.addEventListener(click, openRightContent);
        newSelectIcon.addEventListener(click, makeTaskSelected);
        newStarIcon.addEventListener(click, makeTaskStarred);

        setId(task.id, newSelectIcon);
        setId(task.id, para);
        setId(task.id, newDiv);
        task.taskName = textValue;
        for (let index = 0; index < itemLists.length; index++) {
            if (divContent.id == itemLists[index].id) {
                itemLists[index].tasks.push(task);
            }
        }
    }
}

/**
 * toggle the side navigation bar.
 */
function manageSideNav() {
    var x = getElementsByClassName("side-nav-bar");
    var listData = doc.getElementsByClassName("content-data");
    if (x.style.width == "21%") {
        getElementsByClassName("side-nav-bar").style.width = "4%";
        getElementsByClassName("main-content").style.width = "96%";
        for (let index = 0; index < listData.length; index++) {
            doc.getElementsByClassName("content-data")[index].style.display = 'none';
        }
    } else {
        for (let index = 0; index < listData.length; index++) {
            doc.getElementsByClassName("content-data")[index].style.display = 'inline';
        }
        x.style.width = "21%";
    }
}


/**
 * make the select icon change to checked.
 * @param {task object} task
 */
function changeSelectIcon(task) {
    var unCheckedIcon = getElementsByClassName("fa fa-circle-o color opacity");
    var selectedIcon = getElementsByClassName("fa fa-check-circle color opacity");
    var rightContent = getElementsByClassName("right-nav-bar");
    if (task.isSelected && rightContent.id == task.id) {
        if (unCheckedIcon) {
            setClassName("fa fa-check-circle color opacity", unCheckedIcon);
        }
    } else {
        if (selectedIcon) {
            setClassName(" fa fa-circle-o color opacity", selectedIcon);
        }
    }
}


/**
 * make the select icon change to checked.
 * @param {task object} task
 */
function changeStarIcon(task) {
    var unCheckedIcon = getElementsByClassName("fa fa-star-o starred opacity");
    var selectedIcon = getElementsByClassName("fa fa-star starred opacity");
    var rightContent = getElementsByClassName("right-nav-bar");
    alert(task.isStarred);

    if (task.isStarred) {
        if (unCheckedIcon) {
            setClassName("fa fa-star starred opacity", unCheckedIcon);
        }
    } else {
        if (selectedIcon) {
            setClassName(" fa fa-star-o starred opacity", selectedIcon);
        }
    }
}




/**
 * show the right navigation bar.
 * @param {event} event
 */
function openRightContent(event) {
    var mainContentTaskId = (event.currentTarget.parentElement.id);
    var main = getElementsByClassName("new-content");
    var listItem = getElementByListId(main.id);
    var task = getElementByTaskId(listItem, event.target.id);
    changeSelectIcon(task);
    changeStarIcon(task);

    markSelected(task);

    setRemindDate(task);
    setDueDate(task);
    setTaskHint(task);
    setId(event.target.id, getElementsByClassName("right-nav-bar"));
    var rightContent = getElementsByClassName("right-nav-bar");
    setClassName("active", event.target);
    getElementsByClassName("content").innerHTML = event.target.innerHTML;
    makeDisplayBlock("right-nav-bar");
}

/**
 * close the right navigation bar.
 */
function closeRightNavBar() {
    makeDisplayNone("right-nav-bar");
}

/**
 * show the input to create a new task.
 */
function showCreateTask() {
    makeDisplayNone("add-task");
    makeDisplayBlock("task-content display-none");
    getElementsByClassName("input-type").focus();
}

/**
 * hide the input box which allows to create a new task.
 */
function closeTask() {
    makeDisplayBlock("add-task");
    makeDisplayNone("task-content display-none");
}


/**
 * Make the element display as none.
 * @param {class name of the element} className
 */
function makeDisplayNone(className) {
    getElementsByClassName(className).style.display = 'none';
}


/**
 * Make the element display as block.
 * @param {class name of the element} className
 */
function makeDisplayBlock(className) {
    getElementsByClassName(className).style.display = 'block';
}


/**
 * Make the element display as inline block.
 * @param {class name of the element} className
 */
function makeDisplayInlineBlock(className) {
    getElementsByClassName(className).style.display = 'inline-block';
}

/**
 * Make the element display as inline.
 * @param {class name of the element} className
 */
function makeDisplayInline(className) {
    getElementsByClassName(className).style.display = 'inline';
}

/**
 * Create a new element.
 * @param {element} element
 */
function createElement(element) {
    return doc.createElement(element);
}

/**
 * Set the class name to a specified element.
 * @param {class name } elementClassName
 * @param {element} element
 */
function setClassName(elementClassName, element) {
    element.className = elementClassName;
}

/**
 * Set the id to a specified element.
 * @param {id} id
 * @param {element} element
 */
function setId(id, element) {
    element.id = id;
}