import { FileView, getIcon, TextFileView, WorkspaceLeaf } from 'obsidian'
import { MAP_EDIT_VIEW } from './const'

/**
 * ### Map File View
 * @description File View that manipulates the map view
 */
export default class MapFileView extends TextFileView {
    rendering: boolean
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D

    getViewType(): string {
        return MAP_EDIT_VIEW
    }

    onload(): void {
        super.onload()

        this.canvas = this.contentEl.createEl('canvas')
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
        this.rendering = true
        this.render()
    }

    onunload(): void {
        super.onunload()
        this.rendering = false
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

    ////////////
    // Render
    //

    render() {
        if (!this.rendering) return
        requestAnimationFrame(this.render.bind(this))

        // TODO render here
    }
}
