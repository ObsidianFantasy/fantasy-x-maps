import { FileView, getIcon, TextFileView, WorkspaceLeaf } from 'obsidian'
import { EDIT_VIEW } from './const'

type MapData = { delaunay_points: string }

export default class MapFileView extends TextFileView {
    static create_view(leaf: WorkspaceLeaf) {
        return new MapFileView(leaf)
    }

    onload(): void {
        super.onload()
    }

    onunload(): void {
        super.onunload()
    }

    //////////////////////
    // Data Manipulation
    //

    getViewData(): string {
        console.log('get')
        return '{}'
    }

    setViewData(data: string, clear: boolean): void {
        console.log('set', data, clear)
    }

    clear(): void {
        console.log('clear')
    }

    getViewType(): string {
        return EDIT_VIEW
    }
}
