import { Delaunay, Voronoi } from 'd3-delaunay'
import { PolygonChunk } from './PolygonChunk'
import { MAP_CHUNK_SIZE } from '../const'
import { MapView } from '../MapView'

export class Polygons {
    parent: MapView
    polygons: PolygonChunk[]
    delaunay: Delaunay<Delaunay.Point>
    voronoi: Voronoi<Delaunay.Point>

    constructor(parent: MapView) {
        this.parent = parent

        this.polygons = []

        for (let x = 2; x < 4; x++) {
            for (let y = 1; y < 3; y++) {
                this.polygons.push(new PolygonChunk(x, y))
            }
        }

        // this.polygons = []

        this.calculateVoronoi()
    }

    getSourcePoints(): Delaunay.Point[] {
        let points: Delaunay.Point[] = []

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

        // Scale points
        points = points.map((p) => [
            p[0] * this.parent.offset[2],
            p[1] * this.parent.offset[2],
        ])

        return points
    }

    calculateVoronoi() {
        const [mix, miy, max, may] = [
            this.getSourcePoints()
                .map((v) => v[0])
                .reduce((p, c) => Math.min(p, c)) - MAP_CHUNK_SIZE,
            this.getSourcePoints()
                .map((v) => v[1])
                .reduce((p, c) => Math.min(p, c)) - MAP_CHUNK_SIZE,
            this.getSourcePoints()
                .map((v) => v[0])
                .reduce((p, c) => Math.max(p, c)) + MAP_CHUNK_SIZE,
            this.getSourcePoints()
                .map((v) => v[1])
                .reduce((p, c) => Math.max(p, c)) + MAP_CHUNK_SIZE,
        ]
        this.delaunay = Delaunay.from(this.getSourcePoints())
        this.voronoi = this.delaunay.voronoi([mix, miy, max, may])
    }

    addPoint(x: number, y: number) {
        const [chunk_x, chunk_y] = [
            Math.floor(x / MAP_CHUNK_SIZE),
            Math.floor(y / MAP_CHUNK_SIZE),
        ]
        const [rx, ry] = [x % MAP_CHUNK_SIZE, y % MAP_CHUNK_SIZE]
        let chunk = this.polygons.find(
            (v) => v.position[0] == chunk_x && v.position[1] == chunk_y
        )
        if (!chunk) {
            chunk = new PolygonChunk(chunk_x, chunk_y)
            this.polygons.push(chunk)
        }
        // chunk.addDot(rx, ry)
        this.calculateVoronoi()
        // console.log(rx, ry, x, y)
    }

    // Render

    renderDebugPoints(parent: MapView) {
        const { ctx, offset } = parent

        ctx.fillStyle = 'white'

        const p = this.delaunay?.points
        for (let i = 0; i < p?.length; i += 2) {
            ctx.fillRect(p[i] + offset[0], p[i + 1] + offset[1], 1, 1)
        }
    }

    renderPolygons(parent: MapView) {
        const { ctx, offset } = parent

        ctx.translate(offset[0], offset[1])
        ctx.strokeStyle = '#3f3f3f' // TODO set to a variable

        for (let i = 0; i < this.delaunay?.points.length; i++) {
            ctx.beginPath()
            // ctx.fillStyle = `rgba(255, 255, 255, ${Math.random()})`
            // ctx.fillStyle = `${i % 2 == 0 ? 'white' : 'black'}`
            this.voronoi.renderCell(i, ctx)
            ctx.stroke()
        }

        ctx.translate(-offset[0], -offset[1])
    }

    render(parent: MapView) {
        this.renderPolygons(parent)
        // this.renderDebugPoints(parent)
    }
}
