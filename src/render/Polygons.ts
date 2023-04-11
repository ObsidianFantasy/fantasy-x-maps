import { Delaunay, Voronoi } from 'd3-delaunay'

export class Polygons {
    sourcePoints: Delaunay.Point[]
    delaunay: Delaunay<Delaunay.Point>
    voronoi: Voronoi<Delaunay.Point>

    height: number[]

    constructor() {
        this.sourcePoints = []
        this.height = []

        for (let i = 0; i < 100; i++) {
            for (let j = 0; j < 55; j++) {
                const x = i * 10.25 + Math.random() * 10 - 5
                const y = j * 10 + Math.random() * 10 - 5

                this.addDot(x, y)
            }
        }

        this.calculateVoronoi()
    }

    calculateVoronoi() {
        this.delaunay = Delaunay.from(this.sourcePoints)
        this.voronoi = this.delaunay.voronoi([0, 0, 960, 500])
    }

    addDot(x: number, y: number) {
        this.sourcePoints.push([x, y] as Delaunay.Point)
        this.height.push(Math.random() * 256)
    }

    render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        // ctx.strokeStyle = '#3f3f3f' // TODO set to a variable
        for (let i = 0; i < this.delaunay?.points.length; i++) {
            ctx.beginPath()
            ctx.fillStyle = `rgba(255, 255, 255, ${this.height[i] / 255})`
            // ctx.fillStyle = `${i %2 == 0 ? 'white' : 'black'}`
            this.voronoi.renderCell(i, ctx)
            ctx.fill()
        }
    }
}
