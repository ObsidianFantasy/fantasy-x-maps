import { View, WorkspaceLeaf } from 'obsidian'
import { MAP_VIEW } from './const'
import { Polygons } from './render/Polygons'
import { InputController } from './Controller'

/**
 * ### The Core Renderer of the Map
 */
export class MapView extends View {
    rendering: boolean
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    inputController: InputController

    ////////////////////
    // Render specific
    //

    /**
     * [x-translate, y-translate, zoom-level]
     */
    offset = [0, 0, 1]

    /**
     * Map Polygons, the base unit
     */
    polygons: Polygons

    ////////////////////
    // Implementation
    //

    constructor(leaf: WorkspaceLeaf) {
        super(leaf)
        this.inputController = new InputController(this)
        this.polygons = new Polygons(this)
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

        this.canvas = this.containerEl.createEl('canvas')
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
        this.ctx.imageSmoothingEnabled = true
        this.rendering = true

        this.inputController.onload()
        this.render()
    }

    onunload(): void {
        this.inputController.onunload()
        super.onunload()
        this.rendering = false
    }

    ////////////
    // Render
    //

    render(): void {
        if (!this.rendering) return
        requestAnimationFrame(this.render.bind(this))

        this.canvas.width = this.containerEl.offsetWidth
        this.canvas.height = this.containerEl.offsetHeight

        this.polygons.render(this)
    }
}
