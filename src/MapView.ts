import { View, WorkspaceLeaf } from 'obsidian'
import { MAP_VIEW } from './const'

/**
 * View File
 */
export default class MapFileView extends View {
    rendering: boolean
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D

    ////////////////////
    // Implementation
    //

    constructor(leaf: WorkspaceLeaf) {
        super(leaf)
    }

    getViewType(): string {
        return MAP_VIEW
    }

    getDisplayText(): string {
        return 'Map Preview'
    }

    /////////////
    // Loading
    //

    onload(): void {
        super.onload()

        this.containerEl.createEl('h4', { text: 'Example view' })

        this.canvas = this.containerEl.createEl('canvas')
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

    render(): void {
        if (!this.rendering) return
        requestAnimationFrame(this.render.bind(this))

        // TODO render here
    }
}
