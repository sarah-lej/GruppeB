describe('Todo-Liste', () => {
    beforeEach(() => {
        // JNeue HTMLStruktur für jeden Test
        document.body.innerHTML = `
      <textarea id="taskInput"></textarea>
      <button id="addButton">Aufgabe erstellen</button>
      <ul id="taskList"></ul>

      <input id="newCategory" />
      <button id="btnCreateCategory">Kategorie erstellen</button>
      <ul id="categoryList"></ul>
    `;
        //alte Aufgaben entfernen
        localStorage.clear();

        //die Anwendung für jeden Test neu laden
        jest.resetModules();
        require('../script');
    });

    test('Eine neue Aufgabe wird hinzugefügt', () => {
        const input = document.querySelector(
            '#taskInput',
        ) as HTMLTextAreaElement;

        const button = document.querySelector(
            '#addButton',
        ) as HTMLButtonElement;

        input.value = 'Für KMS lernen';

        button.click();

        const list = document.querySelector('#taskList');

        expect(list?.textContent).toContain('Für KMS lernen');

        //prüfen ob die Aufgabe gespeichert wurde
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        expect(tasks).toHaveLength(1);
        expect(tasks[0].title).toBe('Für KMS lernen');
        expect(tasks[0].completed).toBe(false);
    });

    test('Leere Aufgaben werden nicht hinzugefügt', () => {
        const input = document.querySelector(
            '#taskInput',
        ) as HTMLTextAreaElement;

        const button = document.querySelector(
            '#addButton',
        ) as HTMLButtonElement;

        //wenn der Benutzer ausschließlich Leerzeichen einträgt
        input.value = '   ';
        button.click();

        //darf keine Aufgabe gespeichert werden
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        expect(tasks).toHaveLength(0);
    });
});
