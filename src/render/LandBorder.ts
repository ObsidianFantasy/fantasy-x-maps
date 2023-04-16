import { MultiPolygon, union } from 'polygon-clipping'
import { MapView } from '../MapView'
import { Delaunay } from 'd3-delaunay'
import { RenderLayer } from './RenderLayer'

// TODO CHANGE HOW MULTIPLE POLYGON CUTTING WORK (READ BELOW)
//

////////    var polygonClipping = require("polygon-clipping")
//////// 
////////    const pb = [[ [0,0], [10,0], [10,1], [0,1], [0,0] ]]
////////    const pt = [[ [0,9], [10,9], [10,10], [0,10], [0,9] ]]
//////// 
////////    const pl = [[ [0,0], [1,0], [1,10], [0,10], [0,0] ]]
////////    const pr = [[ [9,0], [10,0], [10,10], [9,10], [9,0] ]]
//////// 
////////    const c = [[ [3,3], [6,3], [3, 6], [3,3] ]]
//////// 
////////    polygonClipping.union(pb, pr, pt, pl, c)

//
// OUTPUTS
//

////////    Array (2 items)
////////        0: Array (2 items)
////////            0: [[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]]
////////            1: [[1, 1], [1, 9], [9, 9], [9, 1], [1, 1]]
////////        1: [[[3, 3], [6, 3], [3, 6], [3, 3]]]

// OUTER = BODY MASS
// INNER = CUTS

//
// END TODO


/**
 * Display the continental borders
 */
export class LandBorder extends RenderLayer {
    cls = 'land-border'
    polygons: MultiPolygon

    onload(view: MapView): void {
        super.onload(view)
        this.element.setAttr('stroke','#888888')

        // TODO FIX BUG WHERE INNER CIRCLES ARE FILLED
        this.element.setAttr('fill','#00000000')
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
            for (const ring of polygon) {
                let d = ''

                for (const point of ring) {
                    // const vec = `${Math.floor(point[0])}, ${Math.floor(point[1])}`
                    if (d.length == 0) {
                        d += `M${point[0]},${point[1]}`
                    } else {
                        d += `L${point[0]},${point[1]}`
                    }
                }

                this.element.createSvg('path', {attr: {d}})
            }
        }
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
