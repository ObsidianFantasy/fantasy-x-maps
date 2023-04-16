import { MapView } from '../MapView'

/**
 * The interface that declares
 * behavior of render-able
 * components like LandBorder
 * and HeightMap
 */
export abstract class RenderLayer {
    /**
     * Classes to assign to element of self
     */
    cls: string | string[] | undefined

    /**
     * Element of self
     */
    element: SVGGElement

    /**
     * Root Element: Map View
     */
    view: MapView

    /**
     * Recalculate is called on major changes to map (new tiles, mouse stroke, etc.)
     */
    abstract recalculate(): void

    // TODO add 'moved' method to be called when zoom/ offset move occurs
    // move(offset ?) ??

    /**
     * Called onload, the root view is provided as argument
     */
    onload(view: MapView) {
        this.view = view

        this.element = view.svg.createSvg('g', { cls: this.cls })
        
        this.recalculate()
    }

    /**
     * Called when RenderLayer is unloaded: Hidden or map destroyed
     */
    onunload() {}
}
