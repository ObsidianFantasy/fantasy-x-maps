import { MultiPolygon, union } from 'polygon-clipping'
import { MapView } from '../MapView'
import { Drawable } from './Drawable'

// TODO move height map render here

/**
 * Display the continental borders
 */
export class HeightMap implements Drawable {
    polygons: MultiPolygon

    recalculate(parent: MapView) {
        // TODO
    }

    render(parent: MapView) {
        // TODO
    }
}
