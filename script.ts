interface Task {
    id: number;
    title: string;
    completed: boolean;
}

const tasks: Task[] = [];
const input = document.querySelector<HTMLInputElement>("#taskInput")!;
const button = document.querySelector<HTMLButtonElement>("#addButton")!;
const list = document.querySelector<HTMLUListElement>("#taskList")!;

function addTask(): void {
    const title = input.value.trim();

    if (title === "") return;

    const task: Task = {
        id: Date.now(),
        title: title,
        completed: false
    };

    tasks.push(task);

    const li = document.createElement("li");
    li.textContent = task.title;

    list.appendChild(li);

    input.value = "";
}

button.addEventListener("click", addTask);