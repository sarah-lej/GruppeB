interface Task {
    id: number;
    title: string;
    completed: boolean;
}

const tasks: Task[] = [];
//<<<<<<< Updated upstream

//=======
const input = document.querySelector<HTMLInputElement>("#taskInput")!;
const button = document.querySelector<HTMLButtonElement>("#addButton")!;
const list = document.querySelector<HTMLUListElement>("#taskList")!;


//>>>>>>> Stashed changes
function renderTasks(): void {
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        //<<<<<<< Updated upstream
        //=======

        //>>>>>>> Stashed changes
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            renderTasks();
        });


        //=======
        // Text-Container für den Titel
        const titleSpan = document.createElement("span");
        titleSpan.textContent = task.title;


        //>>>>>>> Stashed changes
        if (task.completed) {
            titleSpan.style.textDecoration = "line-through";
            titleSpan.style.color = "gray";
        }

        li.appendChild(checkbox);
        li.appendChild(titleSpan);
        list.appendChild(li);
    });
}

function addTask(): void {
    const title = input.value.trim();

    if (title === "") return;

    const task: Task = {
        id: Date.now(),
        title: title,
        completed: false
    };

    tasks.push(task);
    //<<<<<<< Updated upstream
    //=======

    //>>>>>>> Stashed changes
    renderTasks();

    input.value = "";
}

button.addEventListener("click", addTask);


interface Category {
    id: number;
    name: string;
}

const categories: Category[] = [];

const categoryInput = document.querySelector<HTMLInputElement>("#newCategory")!;
const categoryButton = document.querySelector<HTMLButtonElement>("#btnCreateCategory")!;
const categoryList = document.querySelector<HTMLUListElement>("#categoryList")!;

function renderCategories(): void {
    categoryList.innerHTML = "";

    categories.forEach(category => {
        const li = document.createElement("li");
        li.textContent = category.name;

        categoryList.appendChild(li);
    });
}

function addCategory(): void {
    const name = categoryInput.value.trim();

    if (name === "") return;

    const category: Category = {
        id: Date.now(),
        name: name
    };

    categories.push(category);
    renderCategories();

    categoryInput.value = "";
}

categoryButton.addEventListener("click", addCategory);