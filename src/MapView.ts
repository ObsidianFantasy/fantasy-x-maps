import { View, WorkspaceLeaf } from 'obsidian'
import { MAP_VIEW } from './const'
import { PolygonHandler } from './polygons/PolygonHandler'
import { RenderLayer } from './render/RenderLayer'
import { LandBorder } from './render/LandBorder'
import { HeightMap } from './render/HeightMap'

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

        this.addLayer(new LandBorder())
        this.addLayer(new HeightMap())
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
            cls: ['map-view']
        })
        this.polygonHandler.recalculate()

        for (const layer of this.layers) {
            layer.onload(this)
        }

        this.render()
    }

    addLayer(l: RenderLayer) {
        this.layers.push(l)

        if (this.loaded) {
            l.onload(this)
        }
    }

    onunload(): void {
        this.loaded = false
        super.onunload()

        for (const layer of this.layers) {
            layer.onunload()
        }
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

        for (const layer of this.layers) {
            layer.recalculate()
        }
    }
}
