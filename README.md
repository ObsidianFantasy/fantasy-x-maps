# Obsidian Maps Plugin

Obsidian Plugin that supports the creation and edit of maps.

## Code Documentation

| File | Purpose |
|-|-|
| `main.ts` | Entry Point and Registering of all submodules |
| **Views** | |
| `MapFileView.ts` | File-View of the Map Display, contains Input Controller logic and display |
| `MapView.ts` | Renderer-core of the Map |
| `MapMarkdown.ts` | TODO Transformation of Markdown to MapView display |
| **Renderer** | |
| `render/PolygonChunk.ts` | TODO |
| `render/Polygons.ts` | TODO |
| **Input Logic** | |
| `Controller.ts` | Operative centre for mouse and input events on a MapView, handled by the MapFileView |