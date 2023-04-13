import { Delaunay, Voronoi } from 'd3-delaunay'
import { PolygonChunk } from './Chunk'
import { MAP_CHUNK_SIZE } from '../const'
import { MapView } from '../MapView'

export class PolygonHandler {
    parent: MapView
    chunks: PolygonChunk[]
    delaunay: Delaunay<Delaunay.Point>
    voronoi: Voronoi<Delaunay.Point>

    private points: Delaunay.Point[]
    private chunkOfPoint: PolygonChunk[]

    constructor(parent: MapView) {
        this.parent = parent
        this.chunks = [new PolygonChunk(0, 0)]
        this.recalculatePoints()
        this.calculateVoronoi()
    }

    recalculate() {
        this.recalculatePoints()
        this.calculateVoronoi()
    }

    private recalculatePoints() {
        this.points = []
        this.chunkOfPoint = []

        for (let i = 0; i < this.chunks.length; i++) {
            const chunk = this.chunks[i]
            // points.push(...chunk.source)
            for (let j = 0; j < chunk.source.length; j++) {
                const point = chunk.source[j]
                this.points.push([
                    point[0] + chunk.position[0] * MAP_CHUNK_SIZE,
                    point[1] + chunk.position[1] * MAP_CHUNK_SIZE,
                ])
                this.chunkOfPoint.push(chunk)
            }
        }

        // Scale points
        this.points = this.points.map((p) => [
            p[0] * this.parent.offset[2],
            p[1] * this.parent.offset[2],
        ])
    }

    calculateVoronoi() {
        const [mix, miy, max, may] = [
            this.points.map((v) => v[0]).reduce((p, c) => Math.min(p, c)) -
                MAP_CHUNK_SIZE,
            this.points.map((v) => v[1]).reduce((p, c) => Math.min(p, c)) -
                MAP_CHUNK_SIZE,
            this.points.map((v) => v[0]).reduce((p, c) => Math.max(p, c)) +
                MAP_CHUNK_SIZE,
            this.points.map((v) => v[1]).reduce((p, c) => Math.max(p, c)) +
                MAP_CHUNK_SIZE,
        ]
        this.delaunay = Delaunay.from(this.points)
        this.voronoi = this.delaunay.voronoi([mix, miy, max, may])
    }

    pingChunk(cx: number, cy: number): PolygonChunk {
        let chunk = this.chunks.find(
            (v) => v.position[0] == cx && v.position[1] == cy
        )

        if (!chunk) {
            chunk = new PolygonChunk(cx, cy)
            this.chunks.push(chunk)
            this.recalculate()
        }

        return chunk
    }

    // addPoint(x: number, y: number) {
    //     const [chunk_x, chunk_y] = [
    //         Math.floor(x / MAP_CHUNK_SIZE),
    //         Math.floor(y / MAP_CHUNK_SIZE),
    //     ]
    //     const [rx, ry] = [x % MAP_CHUNK_SIZE, y % MAP_CHUNK_SIZE]
    //     this.pingChunk(chunk_x, chunk_y)

    //     // chunk.addDot(rx, ry)
    //     this.calculateVoronoi()
    //     // console.log(rx, ry, x, y)
    // }

    // Render

    renderDebugPoints(parent: MapView) {
        const { ctx, offset } = parent

        ctx.fillStyle = 'white'

        // const p = this.delaunay?.points
        // for (let i = 0; i < p?.length; i += 2) {
        //     ctx.fillRect(p[i] + offset[0], p[i + 1] + offset[1], 1, 1)
        // }

        for (let i = 0; i < this.points.length; i++) {
            const [x, y] = this.points[i]
            ctx.fillRect(x + offset[0], y + offset[1], 1, 1)
        }
    }

    renderPolygons(parent: MapView) {
        const { ctx, offset } = parent

        ctx.translate(offset[0], offset[1])
        ctx.strokeStyle = '#3f3f3f' // TODO set to a variable

        for (let i = 0; i < this.points.length; i++) {
            // Absolute position
            const [x, y] = this.points[i]

            // Chunk Relative
            const [rx, ry] = [x % MAP_CHUNK_SIZE, y % MAP_CHUNK_SIZE]

            const chunk = this.chunkOfPoint[i]
            const index = chunk.getTile(rx, ry)
            const height = chunk.height[index]

            // Drawing
            ctx.beginPath()

            // ctx.fillStyle = `rgb(${chunk.position[0] % 2 * 255}, ${chunk.position[1] % 2 * 255}, 255)`
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(height / 1000, 1000)})`

            // // ctx.fillStyle = `rgba(255, 255, 255, ${Math.random()})`
            // // ctx.fillStyle = `${i % 2 == 0 ? 'white' : 'black'}`
            this.voronoi.renderCell(i, ctx)
            // // this.voronoi.renderCell(this.delaunay.find(x + chunk.position[0], y + chunk.position[1]), ctx)

            ctx.fill()
            // ctx.fillRect(x, y, 1, 1)
        }

        ctx.translate(-offset[0], -offset[1])
    }

    render(parent: MapView) {
        this.renderPolygons(parent)
        this.renderDebugPoints(parent)
    }

    /////////////////////
    // Map Manipulation
    //

    getPolygon({ x, y }: { x: number; y: number }) {
        const [chunk_x, chunk_y] = [
            Math.floor(x / MAP_CHUNK_SIZE),
            Math.floor(y / MAP_CHUNK_SIZE),
        ]
        const [rx, ry] = [x % MAP_CHUNK_SIZE, y % MAP_CHUNK_SIZE]
        const chunk = this.pingChunk(chunk_x, chunk_y)
        return chunk.getTile(rx, ry)
    }

    manipulateHeight({ x, y }) {
        const [chunk_x, chunk_y] = [
            Math.floor(x / MAP_CHUNK_SIZE),
            Math.floor(y / MAP_CHUNK_SIZE),
        ]
        const [rx, ry] = [x % MAP_CHUNK_SIZE, y % MAP_CHUNK_SIZE]
        const chunk = this.pingChunk(chunk_x, chunk_y)
        const index = chunk.getTile(rx, ry)

        // console.log(chunk.position, index, chunk.height[index])

        chunk.height[index] += 100
    }
}
