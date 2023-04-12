import { Delaunay, Voronoi } from 'd3-delaunay'
import { PolygonChunk } from './PolygonChunk'
import { MAP_CHUNK_SIZE } from '../const'

export class Polygons {
    polygons: PolygonChunk[]
    delaunay: Delaunay<Delaunay.Point>
    voronoi: Voronoi<Delaunay.Point>

    constructor() {
        // this.polygons = []

        // for (let x = 0; x < 6; x++) {
        //     for (let y = 0; y < 3; y++) {
        //         this.polygons.push(new PolygonChunk(x, y))
        //     }
        // }

        this.polygons = [new PolygonChunk(0, 0), new PolygonChunk(0, 1), new PolygonChunk(2, 2)]

        this.calculateVoronoi()
    }

    getSourcePoints(): Delaunay.Point[] {
        const points: Delaunay.Point[] = []

        for (let i = 0; i < this.polygons.length; i++) {
            const chunk = this.polygons[i]
            for (let j = 0; j < chunk.sourcePoints.length; j++) {
                const point = chunk.sourcePoints[j]
                points.push([
                    point[0] + chunk.position[0] * MAP_CHUNK_SIZE,
                    point[1] + chunk.position[1] * MAP_CHUNK_SIZE,
                ])
            }
        }

        return points
    }

    calculateVoronoi() {
        this.delaunay = Delaunay.from(this.getSourcePoints())
        this.voronoi = this.delaunay.voronoi([0, 0, 6 * 160, 3 * 160])
    }

    renderDebugPoints(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white'

        const p = this.delaunay?.points
        for (let i = 0; i < p?.length; i += 2) {
            ctx.fillRect(p[i], p[i+1], 1, 1)
        }
    }

    renderPolygons(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = '#3f3f3f' // TODO set to a variable
        for (let i = 0; i < this.delaunay?.points.length; i++) {
            ctx.beginPath()
            // ctx.fillStyle = `rgba(255, 255, 255, ${Math.random()})`
            ctx.fillStyle = `${i % 2 == 0 ? 'white' : 'black'}`
            this.voronoi.renderCell(i, ctx)
            ctx.fill()
        }
    }

    render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.renderPolygons(ctx)
        // this.renderDebugPoints(ctx)
    }
}
