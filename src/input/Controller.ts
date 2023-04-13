import { MapView } from '../MapView'
import { HeightEditStroke, MoveStroke, Stroke } from './Stroke'

/**
 * ### The Input Controller of the MapView
 */
export class InputController {
    view: MapView
    events: [keyof WindowEventMap, any][] = []

    strokeTypeActive = -1
    stroke: Stroke

    ////////////////////
    // Implementation
    //

    constructor(parent: MapView) {
        this.view = parent
        this.stroke = new MoveStroke(this.view)
    }

    /////////////
    // Loading
    //

    onload(): void {
        this.addEvent('mousedown', this.onMouseDown, this.view.canvas)
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
        this.strokeTypeActive = evt.button

        switch (evt.button) {
            case 0:
                this.stroke.onLeftMouseDown(evt)
                break

            case 1:
                this.stroke.onWheelMouseDown(evt)
                break

            case 2:
                this.stroke.onRightMouseDown(evt)
                break

            default:
                console.log('Weird Mouse: ' + evt.button)
                break
        }
    }

    onMouseMove(evt: MouseEvent) {
        if (this.strokeTypeActive < 0) return

        switch (this.strokeTypeActive) {
            case 0:
                this.stroke.onLeftMouseMove(evt)
                break

            case 1:
                this.stroke.onWheelMouseMove(evt)
                break

            case 2:
                this.stroke.onRightMouseMove(evt)
                break
        }
    }

    onWheel(e: WheelEvent): any {
        this.stroke.onMouseWheel(e)
    }

    onMouseUp(evt: MouseEvent) {
        if (this.strokeTypeActive < 0) return
        this.strokeTypeActive = -1

        switch (this.strokeTypeActive) {
            case 0:
                this.stroke.onLeftMouseUp(evt)
                break

            case 1:
                this.stroke.onWheelMouseUp(evt)
                break

            case 2:
                this.stroke.onRightMouseUp(evt)
                break
        }
    }

    ////////////////////
    // Keyboard Events
    //

    onKeyPress(evt: KeyboardEvent) {
        // console.log(evt.key)
        this.stroke = (() => {
            switch (evt.key) {
                case 'm':
                    return new MoveStroke(this.view)

                case 'e':
                    return new HeightEditStroke(this.view)

                default:
                    return new Stroke(this.view)
            }
        })()
    }
}
