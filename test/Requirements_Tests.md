# Requirements Tests SIC
## Erreichbarkeitstests
Hier sollen alle endpoints des SIC auf Erreichbarkeit getestet sein:
- Circuit
- Designer
- Alle Rest-API-Endpoints
- Alle Rest-Schnittellen, die von SIC-Frontend benötigt werden.

## Websockets
- Socket-IO Schnittstellen

## REST-API Logik (Gutfall)
- Get(/Skills) sollte die komplette Liste der gespeicherten Skills zurückgeben und die Skills sollten unserem Schema entsprechen, wie es in der Swagger-Datei definiert ist.
- Genauso ist Get(/skills/{moduleName}) zu testen. Hier sollen die Skills eines Moduls zurückgegeben werden.
- Post(/skills). Hier soll ausgelöst werden, dass das SIC einen vordefinierten OPCUA-Server durchsucht. Anschließend soll geprüft werden, ob alle Skills gefunden werden. Link zu einer Beispiel Implementierung findest Du hier: https://github.com/jupiterbak/Skill_Insert, https://github.com/jupiterbak/Skill_Load_Unload, https://github.com/jupiterbak/Skill_Add_V1, https://github.com/jupiterbak/Skill_Add_V2, https://github.com/jupiterbak/Skill_Add
- Delete(/skills/{moduleName})

## REST-API Logik (Fehlerfälle)
- SIC ist über einen Browser geöffnet. Sicherstellen, dass Fehlermeldungen zurückgegeben werden.
  
## SIC Komponente
- Der Test sollte die Komponenten auflisten und prüfen, ob alle definierten Komponenten vorhanden sind.

