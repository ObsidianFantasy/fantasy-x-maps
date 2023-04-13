import { Delaunay, Voronoi } from 'd3-delaunay'
import { PolygonChunk } from './Chunk'
import { MAP_CHUNK_SIZE, MAP_CHUNK_BORDER_CLOSE } from '../const'
import { MapView } from '../MapView'
// import { heightToRgb } from './Colors'

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
        this.recalculate()
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
                    point.pos[0] + chunk.position[0] * MAP_CHUNK_SIZE,
                    point.pos[1] + chunk.position[1] * MAP_CHUNK_SIZE,
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

    findNeighbours([x, y]): number[] {
        const tile = this.delaunay.find(x, y)
        const neighbors = this.delaunay.neighbors(tile)
        return Array.from(neighbors)
    }

    findNeighboursData([x, y]) {
        return this.findNeighbours([x, y]).map((n) => {
            const chunk = this.chunkOfPoint[n]
            const [x, y] = this.points[n]
            const [rx, ry] = getChunkRelative([x, y])
            return chunk.getTileData(rx, ry)
        })
    }

    // addPoint(x: number, y: number) {
    //     const [chunk_x, chunk_y] = getChunkCoordinates([x, y])
    //     const [rx, ry] = getChunkRelative([x, y])
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
            const [rx, ry] = getChunkRelative([x, y])

            const chunk = this.chunkOfPoint[i]
            const tile = chunk.getTileData(rx, ry)
            const height = tile.height

            // Drawing
            ctx.beginPath()

            ctx.fillStyle = `rgba(255, 255, 255, ${height / 1000})`
            // ctx.fillStyle = heightToRgb(height)

            // ctx.fillStyle = `rgba(255, 255, 255, ${Math.random()})`
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
        const [chunk_x, chunk_y] = getChunkCoordinates([x, y])
        const [rx, ry] = getChunkRelative([x, y])
        const chunk = this.pingChunk(chunk_x, chunk_y)
        return chunk.getTile(rx, ry)
    }

    // TODO FIX BUG where zooming offsets the brush
    manipulateHeight({ x, y, dir }) {
        const [chunk_x, chunk_y] = getChunkCoordinates([x, y])
        const [rx, ry] = getChunkRelative([x, y])

        // Ping neighbour to load tiles,
        // if considered close
        const neighbours = closeToChunkBorder([rx, ry])

        // TODO fix weird behaviour with negative chunks
        if (!(neighbours[0] == 0 && neighbours[1] == 0))
            this.pingChunk(chunk_x + neighbours[0], chunk_y + neighbours[1])

        // Ping self
        const chunk = this.pingChunk(chunk_x, chunk_y)
        const tile = chunk.getTileData(rx, ry)

        // console.log(chunk.position, index, chunk.height[index])

        tile.height += dir * 100
    }

    normalize({ x, y }) {
        const [chunk_x, chunk_y] = getChunkCoordinates([x, y])
        const [rx, ry] = getChunkRelative([x, y])

        // Ping neighbour to load tiles,
        // if considered close
        const neighbours = closeToChunkBorder([rx, ry])

        // TODO fix weird loading behaviour with negative chunks
        if (!(neighbours[0] == 0 && neighbours[1] == 0))
            this.pingChunk(chunk_x + neighbours[0], chunk_y + neighbours[1])

        // Ping self
        const tile = this.pingChunk(chunk_x, chunk_y).getTileData(rx, ry)

        // Get neighbours
        let height = tile.height
        let tiles = 1

        const neighbors = this.findNeighboursData([x, y])

        console.log(neighbors.length)

        for (const poly of neighbors) {
            height += poly.height
            tiles++
        }

        tile.height = height / tiles

        // Set neighbours
        for (const poly of neighbors) {
            poly.height = height / tiles
        }
    }
}

function getChunkCoordinates([x, y]: [number, number]): [number, number] {
    return [Math.floor(x / MAP_CHUNK_SIZE), Math.floor(y / MAP_CHUNK_SIZE)]
}

function getChunkRelative([x, y]: [number, number]): [number, number] {
    return [Math.abs(x % MAP_CHUNK_SIZE), Math.abs(y % MAP_CHUNK_SIZE)]
}

function closeToChunkBorder([rx, ry]: [number, number]): [number, number] {
    const v: [number, number] = [0, 0]

    if (rx < MAP_CHUNK_BORDER_CLOSE) v[0] = -1
    else if (rx > MAP_CHUNK_SIZE - MAP_CHUNK_BORDER_CLOSE) v[0] = 1
    if (ry < MAP_CHUNK_BORDER_CLOSE) v[1] = -1
    else if (ry > MAP_CHUNK_SIZE - MAP_CHUNK_BORDER_CLOSE) v[1] = 1

    return v
}
