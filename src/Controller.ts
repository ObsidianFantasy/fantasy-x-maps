import { MapView } from './MapView'

/**
 * ### The Input Controller of the MapView
 */
export class InputController {
    parent: MapView

    /**
     * Is the current 'mouse stroke' active?
     * Yes, if started in the map canvas.
     * If not active, ignore followed events.
     */
    strokeActive = false

    /**
     * Is the current 'mouse stroke' active?
     * Yes, if started in the map canvas.
     * If not active, ignore followed events.
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
        addEventListener('mousemove', (e) => this.onMouseMove(e))
        addEventListener('mouseup', (e) => this.onMouseUp(e))
        addEventListener('keypress', (e) => this.onKeyPress(e))
    }

    onunload(): void {
        // TODO remove event listeners (cleanup)
        // removeEventListener('mousedown', this.onMouseDown)
        // removeEventListener('mousemove', this.onMouseMove)
        // removeEventListener('mouseup', this.onMouseUp)
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
                console.log('edit')
                break
        }
    }

    onMouseUp(evt: MouseEvent) {
        if (!this.strokeActive) return
        this.strokeActive = false
    }

    ////////////////////
    // Keyboard Events
    //

    onKeyPress(evt: KeyboardEvent) {
        console.log(evt.key)
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
