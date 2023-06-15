import { View, WorkspaceLeaf } from 'obsidian'
import { MAP_VIEW } from './const'
import { PolygonHandler } from './polygons/PolygonHandler'
import { RenderLayer } from './render/RenderLayer'
import { Landmass } from './render/Landmass'
import { HeightMap } from './render/HeightMap'
import { StrokeTail } from './render/StrokeTail'

/**
 * ### The Core Renderer of the Map
 */
export class MapView extends View {
    /**
     * Map View (Root Attribute)
     */
    svg: SVGElement

    /**
     * [x-translate, y-translate, zoom-level]
     */
    offset = [0, 0, 1]

    /**
     * Map Polygons, the base unit
     */
    polygonHandler: PolygonHandler

    /**
     * Render Layers
     */
    layers: RenderLayer[] = []
    debugLayers: RenderLayer[] = []
    st: StrokeTail

    /**
     * Is the view loaded?
     */
    loaded = false

    ////////////////////
    // Implementation
    //

    constructor(leaf: WorkspaceLeaf) {
        super(leaf)

        this.polygonHandler = new PolygonHandler(this)

        this.addLayer(new Landmass())
        this.addLayer(new HeightMap())

        this.st = this.addLayer(new StrokeTail(), true) as StrokeTail
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
        this.loaded = true

        this.svg = this.containerEl.createSvg('svg', {
            cls: ['map-view'],
        })
        this.polygonHandler.recalculate()

        for (const layer of this.layers) layer.onload(this)
        for (const layer of this.debugLayers) layer.onload(this)

        this.render()
    }

    addLayer(l: RenderLayer, debug?: boolean): RenderLayer {
        ;(debug ? this.debugLayers : this.layers).push(l)

        if (this.loaded) {
            l.onload(this)
        }

        return l
    }

    onunload(): void {
        this.loaded = false
        super.onunload()

        for (const layer of this.layers) layer.onunload()
        for (const layer of this.debugLayers) layer.onunload()
    }

    ////////////
    // Render
    //

    render(): void {
        if (!this.loaded) return
        requestAnimationFrame(this.render.bind(this))

        // this.canvas.width = this.containerEl.offsetWidth
        // this.canvas.height = this.containerEl.offsetHeight

        this.svg.setAttr('width', this.containerEl.offsetWidth)
        this.svg.setAttr('height', this.containerEl.offsetHeight)

        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        // this.polygonHandler.render(this)
    }

    recalculate(): void {
        this.polygonHandler.recalculate()

        // TODO display debug layers only on debug
        for (const layer of this.layers) layer.recalculate()
        for (const layer of this.debugLayers) layer.recalculate()
    }
}
