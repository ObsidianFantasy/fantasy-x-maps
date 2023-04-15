import { MapView } from '../MapView'

/**
 * The interface that declares
 * behavior of render-able
 * components like LandBorder
 * and HeightMap
 */
export interface Drawable {
    /**
     * Recalculate is called on major changes to map (new tiles, mouse stroke, etc.)
     */
    recalculate(view: MapView): void

    // TODO add 'moved' method to be called when zoom/ offset move occurs
    // move(offset ?) ??

    /**
     * Render is called 60 times a second
     */
    render(view: MapView): void
}
