import { TextFileView, WorkspaceLeaf, getIcon } from 'obsidian'
import { MAP_EDIT_VIEW } from './const'
import { MapView } from './MapView'
import { InputController } from './input/Controller'

/**
 * ### Map File View
 * @description File View that manipulates the map view
 */
export class MapFileView extends TextFileView {
    map: MapView
    inputController: InputController

    constructor(leaf: WorkspaceLeaf) {
        super(leaf)
        this.map = new MapView(this.leaf)
        this.inputController = new InputController(this.map)
    }

    getViewType(): string {
        return MAP_EDIT_VIEW
    }

    onload(): void {
        super.onload()

        // Set padding of .view-content child to zero
        this.containerEl.children[1].setAttr('style', 'padding:0px')

        // Add map to current view body
        this.contentEl.appendChild(this.map.containerEl)
        this.map.onload()

        // Add edit buttons to view navigation bar
        this.addViewButtons()

        // Connect input controls
        this.inputController.onload()
    }

    onunload(): void {
        this.inputController.onunload()
        super.onunload()
        this.map.onunload()
    }

    addViewButtons() {
        const left_action = document.querySelector(`[data-type=${this.getViewType()}] .view-header-nav-buttons`)
        const right_action = document.querySelector(`[data-type=${this.getViewType()}] .view-actions`)

        const add_left = (logo: string) => {
            if (left_action == null) return
            const icon = left_action.createEl('a', {cls: ['clickable-icon', 'fantasy-x-ribbon']})
            icon?.append(getIcon(logo) as Node)
            // return icon
        }

        const add_right = (logo: string) => {
            if (right_action == null) return
            const icon = right_action.createEl('a', {cls: ['clickable-icon', 'fantasy-x-ribbon']})
            icon?.append(getIcon(logo) as Node)
            right_action.insertBefore(icon, right_action.firstChild);
            // return icon
        }

        // TODO give these buttons functionality, rewrite

        add_left('inspect')
        add_left('pencil') // highlighter?
        add_left('paintbrush')
        add_left('paint-bucket')
        add_left('eraser')
        add_left('map-pin')

        add_right('gear')
        add_right('hexagon')
        add_right('mountain-snow')
        add_right('landmark')
        add_right('trees')
        add_right('cloud-sun')
        add_right('map-pin')
        add_right('type') // tag, tags ?
    }

    //////////////////////
    // Data Manipulation
    //

    getViewData(): string {
        // console.log('get')
        return '{}'
    }

    setViewData(data: string, clear: boolean): void {
        // console.log('set', data, clear)
    }

    clear(): void {
        // console.log('clear')
    }
}

// TODO research into these icons for navigation/ edit

// Other Icon Ideas:
// 'flame' war zone
// 'flag' event? nations?
// 'hand' - 'grab' - 'pointer'
// 'highlighter' - draw style?
// 'layers'
// 'moon' (cycles?) 'sun'
// palette (draw in colors?)
// 'person-standing' population display?
// 'rotate-3d' map as globe
// 'type' for text
// 'wand' ??
// 'waves' - sea, water, 'wind'
// 'zap' lightning
// 'spline' ??
// 'image' -> graphical textures
// 'hexagon' -> draw hexagon grid
// pin, map-pin, locate
// shield?