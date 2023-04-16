import { MultiPolygon, union } from 'polygon-clipping'
import { MapView } from '../MapView'
import { RenderLayer } from './RenderLayer'

// TODO move height map render here

/**
 * Display the continental borders
 */
export class HeightMap extends RenderLayer {
    cls = 'height-map'

    recalculate() {
        // TODO
    }
}
