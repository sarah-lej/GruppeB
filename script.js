var PRIORITIES = ["leicht", "mittel", "schwer"];
var PRIORITY_COLORS = {
    leicht: "green",
    mittel: "orange",
    schwer: "red"
};
var tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
var input = document.querySelector("#taskInput");
var button = document.querySelector("#addButton");
var list = document.querySelector("#taskList");
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function renderTasks() {
    list.innerHTML = "";
    tasks.forEach(function (task) {
        var _a;
        var li = document.createElement("li");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", function () {
            task.completed = checkbox.checked;
            saveTasks();
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
        var currentPriority = (_a = task.priority) !== null && _a !== void 0 ? _a : "leicht";
        var prioritySelect = document.createElement("select");
        prioritySelect.setAttribute("aria-label", "Priorität der Aufgabe");
        prioritySelect.title = "Priorität auswählen";
        PRIORITIES.forEach(function (p) {
            var option = document.createElement("option");
            option.value = p;
            option.textContent = p.charAt(0).toUpperCase() + p.slice(1);
            prioritySelect.appendChild(option);
        });
        prioritySelect.value = currentPriority;
        prioritySelect.style.backgroundColor = PRIORITY_COLORS[currentPriority];
        prioritySelect.style.color = "white";
        li.style.borderLeft = "6px solid ".concat(PRIORITY_COLORS[currentPriority]);
        prioritySelect.addEventListener("change", function () {
            task.priority = prioritySelect.value;
            saveTasks();
            renderTasks();
        });
        li.appendChild(prioritySelect);
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
        completed: false,
        priority: "leicht"
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
    input.value = "";
}
button.addEventListener("click", addTask);
var categories = JSON.parse(localStorage.getItem("categories") || "[]");
var categoryInput = document.querySelector("#newCategory");
var categoryButton = document.querySelector("#btnCreateCategory");
var categoryList = document.querySelector("#categoryList");
function saveCategories() {
    localStorage.setItem("categories", JSON.stringify(categories));
}
function renderCategories() {
    categoryList.innerHTML = "";
    categories.forEach(function (category) {
        var li = document.createElement("li");
        li.textContent = category.name;
        categoryList.appendChild(li);
    });
}
function addCategory() {
    var name = categoryInput.value.trim();
    if (name === "")
        return;
    var category = {
        id: Date.now(),
        name: name
    };
    categories.push(category);
    saveCategories();
    renderCategories();
    categoryInput.value = "";
}
categoryButton.addEventListener("click", addCategory);
renderTasks();
renderCategories();
