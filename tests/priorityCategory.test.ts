describe('Priorität und Kategorien', () => {
    beforeEach(() => {
        // Neue HTML-Struktur für jeden Test
        document.body.innerHTML = `
      <textarea id="taskInput"></textarea>
      <button id="addButton">Aufgabe erstellen</button>
      <ul id="taskList"></ul>

      <input id="newCategory" />
      <button id="btnCreateCategory">Kategorie erstellen</button>
      <ul id="categoryList"></ul>
    `;
        // gespeicherte Daten entfernen
        localStorage.clear();

        // die Anwendung für jeden Test neu laden
        jest.resetModules();
        require('../script');
    });

    test('Die Priorität einer Aufgabe kann geändert werden', () => {
        const input = document.querySelector('#taskInput') as HTMLTextAreaElement;
        const button = document.querySelector('#addButton') as HTMLButtonElement;

        input.value = 'Hausarbeit schreiben';
        button.click();

        const select = document.querySelector('#taskList select') as HTMLSelectElement;

        // neue Aufgaben starten mit "leicht"
        expect(select.value).toBe('leicht');

        select.value = 'schwer';
        select.dispatchEvent(new Event('change'));

        // Priorität wird gespeichert
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        expect(tasks[0].priority).toBe('schwer');

        // nach dem Neu-Rendern ist das Dropdown rot
        const newSelect = document.querySelector('#taskList select') as HTMLSelectElement;
        expect(newSelect.style.backgroundColor).toBe('red');
    });

    test('Eine neue Kategorie wird erstellt und angezeigt', () => {
        const categoryInput = document.querySelector('#newCategory') as HTMLInputElement;
        const categoryButton = document.querySelector('#btnCreateCategory') as HTMLButtonElement;

        categoryInput.value = '  Uni  ';
        categoryButton.click();

        // Kategorie erscheint in der Liste (ohne Leerzeichen)
        const items = document.querySelectorAll('#categoryList li');
        expect(items).toHaveLength(1);
        expect(items[0].textContent).toBe('Uni');

        // Kategorie wird gespeichert und das Eingabefeld geleert
        const categories = JSON.parse(localStorage.getItem('categories') || '[]');
        expect(categories).toHaveLength(1);
        expect(categories[0].name).toBe('Uni');
        expect(categoryInput.value).toBe('');
    });
});
