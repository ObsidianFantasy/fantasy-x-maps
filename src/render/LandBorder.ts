import { MultiPolygon, union } from 'polygon-clipping'
import { MapView } from '../MapView'
import { Delaunay } from 'd3-delaunay'
import { RenderLayer } from './RenderLayer'

/**
 * Display the continental borders
 */
export class LandBorder extends RenderLayer {
    cls = 'land-border'
    polygons: MultiPolygon

    onload(view: MapView): void {
        super.onload(view)
    }

    recalculate() {
        super.recalculate()

        const polygonHandler = this.view.polygonHandler
        const polygons: Delaunay.Polygon[][] = []

        for (let i = 0; i < polygonHandler?.points.length; i++) {
            const point = polygonHandler.points[i]
            const data = polygonHandler.getPointData([point[0], point[1]])

            if (data.height > 0) {
                const hull = [polygonHandler.voronoi.cellPolygon(i)]
                polygons.push(hull)
            }
        }

        this.polygons = union(polygons)

        for (const polygon of this.polygons) {
            let d = ''

            for (const ring of polygon) {
                for (let i = 0; i < ring.length; i++) {
                    const point = ring[i]
                    if (i == 0) {
                        d += `M${point[0]},${point[1]}`
                    } else {
                        d += `L${point[0]},${point[1]}`
                    }
                }

                d += 'Z'
            }

            this.element.createSvg('path', { attr: { d } })
        }
    }
}
