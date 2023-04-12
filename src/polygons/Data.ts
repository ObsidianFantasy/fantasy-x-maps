export class PolygonData {
    /**
     * X-Position relative to chunk
     */
    x: number

    /**
     * Y-Position relative to chunk
     */
    y: number

    /**
     * [-10.000 meters; +100.000 meters]
     */
    height: number

    constructor({ x, y }: { x: number; y: number }) {
        this.x = x
        this.y = y
        this.height = 0
    }

    // TODO Biome, Nations, Climate+Rain+Wind+Pressure Generations, et c.
}
