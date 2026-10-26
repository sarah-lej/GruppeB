interface Task {
    id: number;
    title: string;
    completed: boolean;
}

const tasks: Task[] = [];

const input = document.querySelector<HTMLTextAreaElement>("#newToDo")!;
const button = document.querySelector<HTMLButtonElement>("#btnCreateToDo")!;
const list = document.querySelector<HTMLUListElement>("#taskList")!;

function renderTasks(): void {
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            renderTasks();
        });

        const titleSpan = document.createElement("span");
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

function addTask(): void {
    const title = input.value.trim();

    if (title === "") return;

    const task: Task = {
        id: Date.now(),
        title: title,
        completed: false
    };

    tasks.push(task);
    renderTasks();

    input.value = "";
}

button.addEventListener("click", addTask);