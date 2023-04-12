import { View, WorkspaceLeaf } from 'obsidian'
import { MAP_VIEW } from './const'
import { Polygons } from './render/Polygons'

/**
 * ### The Core Renderer of the Map
 */
export class MapView extends View {
    rendering: boolean
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D

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
        this.polygons = new Polygons()
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

        this.render()

        this.canvas.addEventListener('mousedown', this.onMouseDown)
    }

    onunload(): void {
        removeEventListener('mousedown', this.onMouseDown)

        super.onunload()
        this.rendering = false
    }

    /////////////////
    // Mouse Events
    //

    onMouseDown(evt: MouseEvent) {
        console.log(evt)
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
