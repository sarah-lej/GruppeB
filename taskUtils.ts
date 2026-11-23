
export type Priority = "leicht" | "mittel" | "schwer";

export interface Task {
    id: number;
    title: string;
    completed: boolean;
    priority?: Priority;
}

// Erstellt eine neue Aufgabe
export function createTask(title: string, id = Date.now()): Task | null {
    const trimmedTitle = title.trim();

    if (trimmedTitle === "") {
        return null;
    }

    return {
        id,
        title: trimmedTitle,
        completed: false,
        priority: "leicht"
    };
}

// Ändert den Titel einer Aufgabe
export function updateTaskTitle(
    task: Task,
    newTitle: string
): Task | null {
    const trimmedTitle = newTitle.trim();

    if (trimmedTitle === "") {
        return null;
    }

    return {
        ...task,
        title: trimmedTitle
    };
}

// Markiert eine Aufgabe als erledigt oder offen
export function toggleTask(task: Task): Task {
    return {
        ...task,
        completed: !task.completed
    };
}
