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

    /**
     * Is the current 'mouse stroke' active?
     * Yes, if started in the map canvas.
     * If not active, ignore followed events.
     */
    strokeActive = false

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

        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e))
        addEventListener('mousemove', (e) => this.onMouseMove(e))
        addEventListener('mouseup', (e) => this.onMouseUp(e))
    }

    onunload(): void {
        // TODO remove event listeners (cleanup)
        // removeEventListener('mousedown', this.onMouseDown)
        // removeEventListener('mousemove', this.onMouseMove)
        // removeEventListener('mouseup', this.onMouseUp)

        super.onunload()
        this.rendering = false
    }

    /////////////////
    // Mouse Events
    //

    onMouseDown(evt: MouseEvent) {
        this.strokeActive = true
    }

    onMouseMove(evt: MouseEvent) {
        if (!this.strokeActive) return

        this.offset[0] += evt.movementX
        this.offset[1] += evt.movementY
    }

    onMouseUp(evt: MouseEvent) {
        if (!this.strokeActive) return
        this.strokeActive = false
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
