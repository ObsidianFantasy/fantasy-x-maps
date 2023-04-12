import { Delaunay, Voronoi } from 'd3-delaunay'
import { MAP_CHUNK_SIZE, MAP_CHUNK_SPLIT_DIMENSION } from '../const'

export class PolygonChunk {
    position: number[]
    sourcePoints: Delaunay.Point[]
    delaunay: Delaunay<Delaunay.Point>
    voronoi: Voronoi<Delaunay.Point>

    height: number[]

    constructor(x: number, y: number) {
        this.position = [x, y, 0]
        this.sourcePoints = []
        this.height = []

        for (let i = 0; i < MAP_CHUNK_SPLIT_DIMENSION; i++) {
            for (let j = 0; j < MAP_CHUNK_SPLIT_DIMENSION; j++) {
                const x = (i + .5) * 10 + Math.random() * 6 - 3
                const y = (j + .5) * 10 + Math.random() * 6 - 3

                this.addDot(x, y)
            }
        }

        // for (let i = 0; i < Math.pow(MAP_CHUNK_SPLIT_DIMENSION, 2); i++) {
        //     this.addDot(Math.random() * 160, Math.random() * 160)
        // }

        this.calculateVoronoi()
    }

    calculateVoronoi() {
        this.delaunay = Delaunay.from(this.sourcePoints)
        this.voronoi = this.delaunay.voronoi([
            0,
            0,
            MAP_CHUNK_SIZE,
            MAP_CHUNK_SIZE,
        ])
    }

    addDot(x: number, y: number) {
        this.sourcePoints.push([x, y] as Delaunay.Point)
        this.height.push(Math.random() * 256)
    }

    render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        ctx.translate(
            this.position[0] * MAP_CHUNK_SIZE,
            this.position[1] * MAP_CHUNK_SIZE
        )

        // ctx.strokeStyle = '#3f3f3f' // TODO set to a variable
        for (let i = 0; i < this.delaunay?.points.length; i++) {
            ctx.beginPath()
            ctx.fillStyle = `rgba(255, 255, 255, ${this.height[i] / 255})`
            // ctx.fillStyle = `${i %2 == 0 ? 'white' : 'black'}`
            this.voronoi.renderCell(i, ctx)
            ctx.fill()
        }

        ctx.translate(
            -this.position[0] * MAP_CHUNK_SIZE,
            -this.position[1] * MAP_CHUNK_SIZE
        )
    }
}
