# ToDo-App

Dies ist ein einfacher ToDo-Manager, der es Benutzern ermöglicht, ToDo-Aufgaben zu erstellen, anzuzeigen, zu aktualisieren und zu löschen.

## Inhaltsverzeichnis

- [Installation](#installation)
- [Verwendung](#verwendung)
- [Routen](#routen)
- [Beispiele](#beispiele)
- [Mitwirkende](#mitwirkende)
- [Lizenz](#lizenz)

## Installation

1. Klone dieses Repository:

```bash
git clone https://github.com/Kuigan/todo-app.git
```

2. Wechsle in das Projektverzeichnis:

```bash
cd todo-app
```

3. Installiere die Abhängigkeiten:

```bash
npm install
```

4. Starte den Server:

```bash
npm start
```

## Verwendung

Sobald der Server gestartet ist, kann auf die folgenden Endpunkte zugreifen werden:

- `GET /info`: Zeigt Informationen über den Server an.
- `GET /todos`: Gibt eine Liste aller ToDo-Aufgaben zurück.
- `GET /todos/:id`: Gibt eine bestimmte ToDo-Aufgabe anhand ihrer ID zurück.
- `POST /todos`: Fügt eine neue ToDo-Aufgabe hinzu.
- `PUT /todos/:id`: Aktualisiert eine vorhandene ToDo-Aufgabe.
- `PATCH /todos/:id`: Aktualisiert selektiv eine vorhandene ToDo-Aufgabe.
- `DELETE /todos/:id`: Löscht eine ToDo-Aufgabe anhand ihrer ID.

## Routen

Die Routen sind wie folgt organisiert:

- `infoRouter`: Verarbeitet Anfragen bezüglich allgemeiner Informationen zum Server.
- `todosRouter`: Verarbeitet Anfragen bezüglich der Verwaltung von ToDo-Aufgaben.

## Beispiele

### GET /todos

Anfrage:
```
GET /todos
```

Antwort:
```json
[
  {
    "id": 1,
    "todo": "Einkaufen gehen",
    "deadline": "2024-05-01",
    "assignee": "Max Mustermann",
    "owner": "Max Mustermann",
    "status": "not started"
  },
  {
    "id": 2,
    "todo": "Bericht schreiben",
    "deadline": "2024-04-28",
    "assignee": "Anna Schmidt",
    "owner": "Max Mustermann",
    "status": "in progress"
  }
]
```

## Mitwirkende

- Igor Kulinski <info@kuigan.de>

## Lizenz

Dieses Projekt ist unter der [MIT Lizenz](LICENSE) lizenziert.
```