import { MapView } from './MapView'

/**
 * ### The Input Controller of the MapView
 */
export class InputController {
    parent: MapView
    events: [keyof WindowEventMap, any][] = []

    /**
     * Is the current 'mouse stroke' active?
     * Yes, if started in the map canvas.
     * If not active, ignore followed events.
     */
    strokeActive = false

    /**
     * Stroke Type
     */
    strokeType = 'move'

    ////////////////////
    // Implementation
    //

    constructor(parent: MapView) {
        this.parent = parent
    }

    /////////////
    // Loading
    //

    onload(): void {
        this.addEvent('mousedown', this.onMouseDown, this.parent.canvas)
        this.addEvent('mousemove', this.onMouseMove)
        this.addEvent('wheel', this.onWheel)
        this.addEvent('mouseup', this.onMouseUp)
        this.addEvent('keypress', this.onKeyPress)
    }

    onunload(): void {
        for (const [t, l] of this.events) {
            removeEventListener(t, l)
        }
    }

    addEvent(
        type: keyof WindowEventMap,
        listener: (evt: any) => void,
        el?: HTMLElement
    ) {
        const binding = listener.bind(this)
        if (el) {
            el.addEventListener(type, binding)
        } else {
            addEventListener(type, binding)
        }
        this.events.push([type, binding])
    }

    /////////////////
    // Mouse Events
    //

    onMouseDown(evt: MouseEvent) {
        this.strokeActive = true
        const [x, y] = this.getCoordinates(evt)

        switch (this.strokeType) {
            case 'edit':
                const [ex, ey] = this.getAbsoluteCoordinates(x, y)
                this.parent.polygons.addPoint(ex, ey)
                break
        }
    }

    onMouseMove(evt: MouseEvent) {
        if (!this.strokeActive) return
        const [x, y] = this.getCoordinates(evt)

        switch (this.strokeType) {
            case 'move':
                this.parent.offset[0] += evt.movementX
                this.parent.offset[1] += evt.movementY
                break

            case 'edit':
                const [ex, ey] = this.getAbsoluteCoordinates(x, y)
                this.parent.polygons.addPoint(ex, ey)
                break
        }
    }

    onWheel(e: WheelEvent): any {
        // Mouse Coordinates/ Zoom Focus
        const [x, y] = this.getCoordinates(e)

        // Mouse Wheel Delta
        const [dx, dy] = [e.deltaX, e.deltaY]

        // Difference centre - mouse position
        const [cx, cy] = [x - this.parent.offset[0], y - this.parent.offset[1]]

        // Use delta x offset to move the
        // map in the x-direction
        this.parent.offset[0] += dx

        // Zoom Logic
        this.parent.offset[2] += dy / 1000

        // Offset Switch
        // Create Line between (0, 0) and
        // current offset, then move offset
        // depending on zoom delta

        this.parent.offset[0] -= (cx * dy) / 1000
        this.parent.offset[1] -= (cy * dy) / 1000

        // Recalculate voronoi
        this.parent.polygons.calculateVoronoi()
    }

    onMouseUp(evt: MouseEvent) {
        if (!this.strokeActive) return
        this.strokeActive = false
    }

    ////////////////////
    // Keyboard Events
    //

    onKeyPress(evt: KeyboardEvent) {
        // console.log(evt.key)
        switch (evt.key) {
            case 'm':
                this.strokeType = 'move'
                break

            case 'e':
                this.strokeType = 'edit'
                break
        }
    }

    //////////
    // Other
    //

    /**
     * Get canvas-local coordinates of mouse event
     */
    getCoordinates(evt: MouseEvent): [number, number] {
        const rect = this.parent.canvas.getBoundingClientRect()
        const x = evt.clientX - rect.left
        const y = evt.clientY - rect.top
        return [x, y]
    }

    getAbsoluteCoordinates(x: number, y: number): [number, number] {
        return [
            (x - this.parent.offset[0]) / this.parent.offset[2],
            (y - this.parent.offset[1]) / this.parent.offset[2],
        ]
    }
}
