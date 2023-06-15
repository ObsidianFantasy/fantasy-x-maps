import { RenderLayer } from './RenderLayer'
import { getChunkCoordinates, getChunkRelative } from '../polygons/PolygonHandler'

/**
 * Display the continental borders
 */
export class StrokeTail extends RenderLayer {
    cls = 'stroke-tail'

    polygons: number[]
    
    constructor() {
        super()
        this.flush()
    }

    // Record Mouse Position
    record([x, y]: [number, number]) {
        const [chunk_x, chunk_y] = getChunkCoordinates([x, y])
        const [rx, ry] = getChunkRelative([x, y])
        
        this.recalculate()
    }

    // Reset Styling
    flush() {
        this.polygons = []
    }

    recalculate() {
        super.recalculate()

        const { polygonHandler } = this.view

        for (let i = 0; i < polygonHandler.points.length; i++) {
            const [x, y] = polygonHandler.points[i]
            const [rx, ry] = getChunkRelative([x, y])

            const chunk = polygonHandler.chunkOfPoint[i]
            const tile = chunk.getTileData(rx, ry)
            const height = tile.height

            const color = `rgba(0, 255, 255, 0.5)`

            if (height <= 0) continue

            let d = ''
            const ring = polygonHandler.voronoi.cellPolygon(i)

            for (const point of ring) {
                if (d.length == 0) {
                    d += `M${point[0]},${point[1]}`
                } else {
                    d += `L${point[0]},${point[1]}`
                }
            }

            this.element.createSvg('path', { attr: { d, fill: color } })
        }
    }
}
