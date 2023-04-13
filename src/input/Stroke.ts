import { MapView } from '../MapView'

export abstract class Stroke {
    strokeType: 'move'

    abstract onMouseDown(evt: MouseEvent): void
    abstract onMouseMove(evt: MouseEvent): void
    abstract onMouseUp(evt: MouseEvent): void
    abstract onMouseWheel(evt: WheelEvent): void
}

/**
 * ### The Input Controller of the MapView
 */
export class MoveStroke extends Stroke {
    strokeType: 'move'

    onMouseDown(evt: MouseEvent): void {
        throw new Error('Method not implemented.')
    }
    onMouseMove(evt: MouseEvent): void {
        throw new Error('Method not implemented.')
    }
    onMouseUp(evt: MouseEvent): void {
        throw new Error('Method not implemented.')
    }
    onMouseWheel(evt: WheelEvent): void {
        throw new Error('Method not implemented.')
    }
}
