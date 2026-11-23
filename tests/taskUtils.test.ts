
import { describe, it, expect } from "@jest/globals";

import {
    createTask,
    updateTaskTitle,
    toggleTask
} from "../taskUtils";

describe("Todo-Aufgaben testen", () => {

    beforeEach(() => {
        // Module für jeden Test neu laden
        jest.resetModules();
    });

    test("Test 1: Eine neue Aufgabe soll erstellt werden", () => {
        const task = createTask("Einkaufen", 1);

        // Prüfen, ob die Aufgabe korrekt erstellt wurde
        expect(task).toEqual({
            id: 1,
            title: "Einkaufen",
            completed: false,
            priority: "leicht"
        });
    });

    test("Test 2: Eine leere Aufgabe soll nicht erstellt werden", () => {
        const task = createTask("   ");

        // Prüfen, ob keine Aufgabe erstellt wurde
        expect(task).toBeNull();
    });

    test("Test 3: Der Titel einer Aufgabe soll geändert werden", () => {
        const task = createTask("Einkaufen", 1)!;

        const updatedTask = updateTaskTitle(task, "Lernen");

        // Prüfen, ob der Titel geändert wurde
        expect(updatedTask?.title).toBe("Lernen");
    });

    test("Test 4: Eine Aufgabe soll als erledigt markiert werden", () => {
        const task = createTask("Einkaufen", 1)!;

        const updatedTask = toggleTask(task);

        // Prüfen, ob die Aufgabe als erledigt markiert wurde
        expect(updatedTask.completed).toBe(true);
    });

});
