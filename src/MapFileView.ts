import { TextFileView } from 'obsidian'
import { MAP_EDIT_VIEW } from './const'
import MapView from './MapView'

/**
 * ### Map File View
 * @description File View that manipulates the map view
 */
export default class MapFileView extends TextFileView {
    getViewType(): string {
        return MAP_EDIT_VIEW
    }

    onload(): void {
        super.onload()

        const container = this.containerEl.children[1]
        container.empty()
        container.createEl('h4', { text: 'Example view' })

        // this.leaf.getRoot(new Component(MapView))
    }

    onunload(): void {
        super.onunload()
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
