interface Task {
    id: number;
    title: string;
    completed: boolean;
    priority?: Priority;
}

type Priority = "leicht" | "mittel" | "schwer";

const PRIORITIES: Priority[] = ["leicht", "mittel", "schwer"];

const PRIORITY_COLORS: Record<Priority, string> = {
    leicht: "green",
    mittel: "orange",
    schwer: "red"
};

const tasks: Task[] = JSON.parse(
    localStorage.getItem("tasks") || "[]"
);

// merkt sich, welche Aufgabe gerade bearbeitet wird (null = keine)
let editingTaskId: number | null = null;

const input = document.querySelector<HTMLInputElement>("#taskInput")!;
const button = document.querySelector<HTMLButtonElement>("#addButton")!;
const list = document.querySelector<HTMLUListElement>("#taskList")!;

function saveTasks(): void {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(): void {
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.alignItems = "center";
        li.style.gap = "8px";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        li.appendChild(checkbox);

        let editInput: HTMLInputElement | null = null;

        if (editingTaskId === task.id) {
            // Bearbeitungsmodus: Inputfeld + Speichern-Button
            const currentInput = document.createElement("input");
            currentInput.type = "text";
            currentInput.value = task.title;
            currentInput.style.flex = "1";
            editInput = currentInput;

            const saveEdit = (): void => {
                const newTitle = currentInput.value.trim();
                if (newTitle === "") return;
                task.title = newTitle;
                editingTaskId = null;
                saveTasks();
                renderTasks();
            };

            currentInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") saveEdit();
                if (e.key === "Escape") {
                    editingTaskId = null;
                    renderTasks();
                }
            });

            const saveButton = document.createElement("button");
            saveButton.textContent = "Speichern";
            saveButton.addEventListener("click", saveEdit);

            li.appendChild(currentInput);
            li.appendChild(saveButton);
        } else {
            // Normalmodus: Titel + Bearbeiten-Button
            const titleSpan = document.createElement("span");
            titleSpan.textContent = task.title;
            titleSpan.style.flex = "1";

            if (task.completed) {
                titleSpan.style.textDecoration = "line-through";
                titleSpan.style.color = "gray";
            }

            const editButton = document.createElement("button");
            editButton.textContent = "Bearbeiten";
            editButton.addEventListener("click", () => {
                editingTaskId = task.id;
                renderTasks();
            });

            li.appendChild(titleSpan);
            li.appendChild(editButton);
        }

        // Priorität: Dropdown mit Farbzuordnung
        const currentPriority: Priority = task.priority ?? "leicht";

        const prioritySelect = document.createElement("select");
        prioritySelect.setAttribute("aria-label", "Priorität der Aufgabe");
        prioritySelect.title = "Priorität auswählen";

        PRIORITIES.forEach(p => {
            const option = document.createElement("option");
            option.value = p;
            option.textContent = p.charAt(0).toUpperCase() + p.slice(1);
            prioritySelect.appendChild(option);
        });

        prioritySelect.value = currentPriority;
        prioritySelect.style.backgroundColor = PRIORITY_COLORS[currentPriority];
        prioritySelect.style.color = "white";
        prioritySelect.style.marginLeft = "auto";
        li.style.borderLeft = `6px solid ${PRIORITY_COLORS[currentPriority]}`;

        prioritySelect.addEventListener("change", () => {
            task.priority = prioritySelect.value as Priority;
            saveTasks();
            renderTasks();
        });

        li.appendChild(prioritySelect);
        list.appendChild(li);

        // Fokus erst setzen, wenn das li im DOM hängt
        if (editInput) editInput.focus();
    });
}

function addTask(): void {
    const title = input.value.trim();

    if (title === "") return;

    const task: Task = {
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

// NEW: Press ENTER to add a To-Do
input.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter" && !event.isComposing) {
        event.preventDefault();
        addTask();
    }
});


interface Category {
    id: number;
    name: string;
}

const categories: Category[] = JSON.parse(
    localStorage.getItem("categories") || "[]"
);

const categoryInput = document.querySelector<HTMLInputElement>("#newCategory")!;
const categoryButton = document.querySelector<HTMLButtonElement>("#btnCreateCategory")!;
const categoryList = document.querySelector<HTMLUListElement>("#categoryList")!;

function saveCategories(): void {
    localStorage.setItem("categories", JSON.stringify(categories));
}

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
    saveCategories();
    renderCategories();

    categoryInput.value = "";
}

categoryButton.addEventListener("click", addCategory);

renderTasks();
renderCategories();