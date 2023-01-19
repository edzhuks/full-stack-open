```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: 201: CREATED
    deactivate server
    
    Note right of browser: The browser adds the note to the list, does not load anything else

```
