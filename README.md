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

## To-Do

- [x] Map is another File View
- [x] Map is stored as chunks
- [ ] Map can be displayed
- [ ] Map Read/ Write can be saved
- [ ] Map can be dragged into another map
- [ ] Map can be edited: Heightmap
- [ ] Map can be edited: States, Nations and Political Borders
- [ ] Map can be edited: Refer to markdown notes, pins, etc.
- [ ] Map can be edited: PATHS: Rivers, Path & Routes

Idea is to follow Obsidian's [Atomic Notes](https://publish.obsidian.md/alexisrondeau/Atomic+notes) principle with maps: Every island, continent, state, etc. should be 'atomic', nations should be rather markdown notes, that are simply 'referred to'