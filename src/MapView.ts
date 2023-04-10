import { FileView, getIcon, ItemView, TextFileView, WorkspaceLeaf } from 'obsidian'
import { MAP_EDIT_VIEW } from './const'

/**
 * 
 */
export default class MapFileView extends ItemView {
    getViewType(): string {
        return 'map-view'
    }

    getDisplayText(): string {
        throw new Error('Method not implemented.')
    }

    rendering: boolean
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D

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

    ////////////
    // Render
    //

    render() {
        if (!this.rendering) return
        requestAnimationFrame(this.render.bind(this))

        // TODO render here
    }
}
