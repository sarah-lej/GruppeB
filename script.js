var tasks = [];
var input = document.querySelector("#newToDo");
var button = document.querySelector("#btnCreateToDo");
var list = document.querySelector("#taskList");
function renderTasks() {
    list.innerHTML = "";
    tasks.forEach(function (task) {
        var li = document.createElement("li");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", function () {
            task.completed = checkbox.checked;
            renderTasks();
        });
        var titleSpan = document.createElement("span");
        titleSpan.textContent = task.title;
        if (task.completed) {
            titleSpan.style.textDecoration = "line-through";
            titleSpan.style.color = "gray";
        }
        li.appendChild(checkbox);
        li.appendChild(titleSpan);
        list.appendChild(li);
    });
}
function addTask() {
    var title = input.value.trim();
    if (title === "")
        return;
    var task = {
        id: Date.now(),
        title: title,
        completed: false
    };
    tasks.push(task);
    renderTasks();
    input.value = "";
}
button.addEventListener("click", addTask);
