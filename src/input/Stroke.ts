import { MapView } from '../MapView'

/**
 * Abstraction for an unknown stroke event
 */
export class Stroke {
    strokeType: 'move' | 'edit'
    view: MapView

    constructor(view: MapView) {
        this.view = view
    }

    // Left Mouse Button : Press + Move + End
    onLeftMouseDown(evt: MouseEvent): void {}
    onLeftMouseMove(evt: MouseEvent): void {}
    onLeftMouseUp(evt: MouseEvent): void {}

    // Wheel Button : Press + Move + End
    onWheelMouseDown(evt: MouseEvent): void {}
    onWheelMouseMove(evt: MouseEvent): void {}
    onWheelMouseUp(evt: MouseEvent): void {}

    // Right Mouse Button : Press + Move + End
    onRightMouseDown(evt: MouseEvent): void {
        // Unless otherwise overwritten,
        // right button shares left
        // button behaviour
        this.onLeftMouseDown(evt)
    }
    onRightMouseMove(evt: MouseEvent): void {
        this.onLeftMouseMove(evt)
    }
    onRightMouseUp(evt: MouseEvent): void {
        this.onLeftMouseUp(evt)
    }

    // Mouse Scroll
    onMouseWheel(evt: WheelEvent): void {}

    // Reusable Helper Methods

    /**
     * Get canvas-local coordinates of mouse event
     */
    getCoordinates(evt: MouseEvent): [number, number] {
        const rect = this.view.svg.getBoundingClientRect()
        const x = evt.clientX - rect.left
        const y = evt.clientY - rect.top
        return [x, y]
    }

    getAbsoluteCoordinates(x: number, y: number): [number, number] {
        // document.querySelector('body')

        return [
            (x - this.view.offset[0]) / this.view.offset[2],
            (y - this.view.offset[1]) / this.view.offset[2],
        ]
    }
}

/**
 * Called when moving
 */
export class MoveStroke extends Stroke {
    strokeType: 'move'

    onLeftMouseMove(evt: MouseEvent): void {
        const [x, y] = this.getCoordinates(evt)
        this.view.offset[0] += evt.movementX
        this.view.offset[1] += evt.movementY
    }

    onMouseWheel(evt: WheelEvent): void {
        // Mouse Coordinates/ Zoom Focus
        const [x, y] = this.getCoordinates(evt)

        // Mouse Wheel Delta
        const [dx, dy] = [evt.deltaX, evt.deltaY]

        // Difference centre - mouse position
        const [cx, cy] = [x - this.view.offset[0], y - this.view.offset[1]]

        // Use delta x offset to move the
        // map in the x-direction
        this.view.offset[0] += dx

        // Zoom Logic
        this.view.offset[2] += dy / 1000

        // Offset Switch
        // Create Line between (0, 0) and
        // current offset, then move offset
        // depending on zoom delta

        this.view.offset[0] -= (cx * dy) / 1000
        this.view.offset[1] -= (cy * dy) / 1000

        // Recalculate voronoi
        this.view.recalculate()
    }
}

/**
 * Called when editing heightmap
 */
export class HeightEditStroke extends Stroke {
    strokeType: 'edit'
    size = 1

    manipulate(evt: MouseEvent, dir: number): void {
        const [x, y] = this.getCoordinates(evt)
        const [ex, ey] = this.getAbsoluteCoordinates(x, y)
        this.view.polygonHandler.manipulateHeight({
            x: ex,
            y: ey,
            dir,
            size: this.size
        })
    }

    normalize(evt: MouseEvent): void {
        const [x, y] = this.getCoordinates(evt)
        const [ex, ey] = this.getAbsoluteCoordinates(x, y)
        this.view.polygonHandler.normalize({
            x: ex,
            y: ey,
            size: this.size
        })
    }

    onLeftMouseDown(evt: MouseEvent): void {
        this.manipulate(evt, 1)
        this.view.st.record(this.getAbsoluteCoordinates(x, y))
    }

    onLeftMouseMove(evt: MouseEvent): void {
        this.manipulate(evt, 1)
        this.view.st.record(this.getAbsoluteCoordinates(x, y))
    }

    onWheelMouseDown(evt: MouseEvent): void {
        this.normalize(evt)
        this.view.st.record(this.getAbsoluteCoordinates(x, y))
    }

    onWheelMouseMove(evt: MouseEvent): void {
        this.normalize(evt)
        this.view.st.record(this.getAbsoluteCoordinates(x, y))
    }

    onRightMouseDown(evt: MouseEvent): void {
        this.manipulate(evt, -1)
        this.view.st.record(evt)
    }

    onRightMouseMove(evt: MouseEvent): void {
        this.manipulate(evt, -1)
        this.view.st.record(this.getAbsoluteCoordinates(x, y))
    }

    onMouseWheel(evt: WheelEvent): void {
        // Mouse Wheel Delta
        const [dx, dy] = [evt.deltaX, evt.deltaY]

        if (dy > 0) this.size += 1
        else this.size -= 1

        this.size = Math.max(this.size, 1)
    }

    onLeftMouseUp(evt: MouseEvent): void {
        this.view.recalculate()
        this.view.st.flush()
    }

    onWheelMouseUp(evt: MouseEvent): void {
        this.onLeftMouseUp(evt)
        this.view.st.flush()
    }
}

//////////////////////////
// REUSABLE HELP METHODS
//
