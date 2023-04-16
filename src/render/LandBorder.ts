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
        const polygonHandler = this.view.polygonHandler
        const polygons : Delaunay.Polygon[][] = []

        for (let i = 0; i < polygonHandler?.points.length; i++) {
            const point = polygonHandler.points[i]
            const data = polygonHandler.getPointData([point[0], point[1]])

            if (data.height > 0) {
                const hull = [polygonHandler.voronoi.cellPolygon(i)]
                polygons.push(hull)
            }
        }

        this.polygons = union(polygons)
    }

    render(parent: MapView) {
        // TODO render land border
        const { offset } = this.view

        // ctx.translate(offset[0], offset[1])
        // ctx.lineWidth = 0.1
        // ctx.strokeStyle = 'rgb(127,127,127)' // TODO set to a variable

        // for (const polygon of this.polygons) {
        //     for (const ring of polygon) {
        //         ctx.beginPath()
        //         let i = 0
        //         for (const point of ring) {
        //             if (i == 0) ctx.moveTo(point[0], point[1])
        //             else ctx.lineTo(point[0], point[1])
        //             i++
        //         }
        //         ctx.stroke()
        //     }
        // }

        // ctx.translate(-offset[0], -offset[1])
    }
}
