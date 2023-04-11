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

        this.contentEl.appendChild(this.map.containerEl)
        this.map.onload()
        
        // const leaf = this.app.workspace.getLeaf('tab')

        // leaf.setViewState({
        //     type: 'map-view',
        //     active: true
        // })

        // console.log()

        // const leaf = this.app.workspace.createLeafInParent(this.leaf, 0)

        // console.log(leaf)

        // this.app.workspace.iterateAllLeaves((leaf) => {
        //     console.log(leaf.getDisplayText())
        // })


        // this.contentEl.
        // this.leaf.detach()

        // this.leaf.getRoot(new Component(MapView))
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
