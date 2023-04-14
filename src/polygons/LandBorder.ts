import { MultiPolygon, union } from 'polygon-clipping'
import { MapView } from '../MapView'
import { Delaunay } from 'd3-delaunay'

/**
 * Display the continental borders
 */
export class LandBorder {
    static recalculate(parent: MapView): MultiPolygon {
        const polygonHandler = parent.polygonHandler
        const polygons : Delaunay.Polygon[][] = []

        for (let i = 0; i < polygonHandler?.points.length; i++) {
            const point = polygonHandler.points[i]
            const data = polygonHandler.getPointData([point[0], point[1]])

            if (data.height > 0) {
                const hull = [polygonHandler.voronoi.cellPolygon(i)]
                polygons.push(hull)
            }
        }

        return union(polygons)
    }

    static render(parent: MapView, polygons: MultiPolygon) {
        // TODO render land border
        const { ctx, offset } = parent

        ctx.translate(offset[0], offset[1])
        ctx.strokeStyle = 'white' // TODO set to a variable

        for (const polygon of polygons) {
            for (const ring of polygon) {
                ctx.beginPath()
                let i = 0
                for (const point of ring) {
                    if (i == 0) ctx.moveTo(point[0], point[1])
                    else ctx.lineTo(point[0], point[1])
                    i++
                }
                ctx.stroke()
            }
        }

        ctx.translate(-offset[0], -offset[1])
    }
}
