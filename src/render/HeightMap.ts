import { MultiPolygon, union } from 'polygon-clipping'
import { MapView } from '../MapView'
import { RenderLayer } from './RenderLayer'
import { getChunkRelative } from '../polygons/PolygonHandler'

// TODO move height map render here

/**
 * Display the continental borders
 */
export class HeightMap extends RenderLayer {
    cls = 'height-map'

    recalculate() {
        super.recalculate()

        const { polygonHandler } = this.view

        for (let i = 0; i < polygonHandler.points.length; i++) {
            // Absolute position
            const [x, y] = polygonHandler.points[i]

            // Chunk Relative
            const [rx, ry] = getChunkRelative([x, y])

            const chunk = polygonHandler.chunkOfPoint[i]
            const tile = chunk.getTileData(rx, ry)
            const height = tile.height

            const alpha = height / 10000
            const color = `rgba(255, 255, 255, ${alpha})`

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
