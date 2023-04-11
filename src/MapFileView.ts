import { TextFileView, WorkspaceLeaf } from 'obsidian'
import { MAP_EDIT_VIEW } from './const'
import MapView from './MapView'

/**
 * ### Map File View
 * @description File View that manipulates the map view
 */
export default class MapFileView extends TextFileView {
    map: MapView

    constructor(leaf: WorkspaceLeaf) {
        super(leaf)
        this.map = new MapView(this.leaf)
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
    }

    onunload(): void {
        super.onunload()
        this.map.onunload()
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
