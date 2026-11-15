
import { describe, it, expect } from "vitest";

import {
    createTask,
    updateTaskTitle,
    toggleTask
} from "./taskUtils";

describe("Todo-Aufgaben testen", () => {

    it("Test 1: Eine neue Aufgabe soll erstellt werden", () => {
        const task = createTask("Einkaufen", 1);

        expect(task).toEqual({
            id: 1,
            title: "Einkaufen",
            completed: false,
            priority: "leicht"
        });
    });

    it("Test 2: Eine leere Aufgabe soll nicht erstellt werden", () => {
        const task = createTask("   ");

        expect(task).toBeNull();
    });

    it("Test 3: Der Titel einer Aufgabe soll geändert werden", () => {
        const task = createTask("Einkaufen", 1)!;

        const updatedTask = updateTaskTitle(task, "Lernen");

        expect(updatedTask?.title).toBe("Lernen");
    });

    it("Test 4: Eine Aufgabe soll als erledigt markiert werden", () => {
        const task = createTask("Einkaufen", 1)!;

        const updatedTask = toggleTask(task);

        expect(updatedTask.completed).toBe(true);
    });

});
