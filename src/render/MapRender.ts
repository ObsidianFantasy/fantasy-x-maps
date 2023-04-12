import { MapView } from '../MapView'
import { Polygons } from './Polygons'

export class PolygonData {
    /**
     * [-10.000 meters; +10.000 meters]
     */
    height = 0

    // TODO Biome, Nations, Climate+Rain+Wind+Pressure Generations, et c.
}

export class MapRender {
    parent: MapView
    polygons: Polygons
    data: Map<string, PolygonData> // TODO architecture

    constructor(parent: MapView) {
        this.parent = parent
        this.polygons = new Polygons(parent)
    }

    render() {
        
    }
}
