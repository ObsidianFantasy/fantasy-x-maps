import { Delaunay } from 'd3-delaunay'

export interface PolygonData {
    /**
     * Chunk-Relative Position
     */
    pos: Delaunay.Point

    /**
     * Tile Height [-10.000; +100.000]
     */
    height: number
}
