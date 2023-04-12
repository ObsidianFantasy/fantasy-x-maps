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
        this.parent.canvas.addEventListener('mousedown', (e) =>
            this.onMouseDown(e)
        )
        // addEventListener('mousemove', this.onMouseMove)
        // addEventListener('wheel', this.onWheel)
        // addEventListener('mouseup', this.onMouseUp)
        // addEventListener('keypress', this.onKeyPress)

        this.addEvent('mousemove', this.onMouseMove)
        this.addEvent('wheel', this.onWheel)
        this.addEvent('mouseup', this.onMouseUp)
        this.addEvent('keypress', this.onKeyPress)

        // this.parent.registerEvent()
    }

    onunload(): void {
        for (const [t, l] of this.events) {
            removeEventListener(t, l)
        }
    }

    addEvent(type: keyof WindowEventMap, listener: (evt: any) => void) {
        const binding = listener.bind(this)
        addEventListener(type, binding)
        this.events.push([type, binding])
    }

    /////////////////
    // Mouse Events
    //

    onMouseDown(evt: MouseEvent) {
        this.strokeActive = true
    }

    onMouseMove(evt: MouseEvent) {
        if (!this.strokeActive) return

        switch (this.strokeType) {
            case 'move':
                this.parent.offset[0] += evt.movementX
                this.parent.offset[1] += evt.movementY
                break

            case 'edit':
                // TODO add stroke edit
                break
        }
    }

    onWheel(e: WheelEvent): any {
        // Mouse Coordinates
        const [x, y] = this.getCoordinates(e)

        // Mouse Wheel Delta
        const [dx, dy] = [e.deltaX, e.deltaY]

        // Difference centre - mouse position
        const [cx, cy] = [x - this.parent.offset[0], y - this.parent.offset[1]]

        // Use delta x offset to move the
        // map in the x-direction
        this.parent.offset[0] += dx

        // Zoom Logic
        this.parent.offset[2] += dy

        // Offset Switch
        // Create Line between (0, 0) and
        // current offset, then move offset
        // depending on zoom delta

        console.log(cx, cy)
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
}
