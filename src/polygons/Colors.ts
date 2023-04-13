import Color from 'color'

export class Color {
    value: number

    // Constructions

    constructor(hex: string) {
        if (!hex.startsWith('#')) return

        this.red = parseInt(hex.substring(1, 3), 16)
        this.green = parseInt(hex.substring(3, 5), 16)
        this.blue = parseInt(hex.substring(5, 7), 16)
        this.alpha = 1

        console.log(this.css)
    }

    // Get 0 - 1 float

    get alpha (): number {
        return Math.abs((Math.floor(this.value >> 24) % 256) / 256)
    }

    // Get 0 - 255

    get red (): number {
        return Math.abs(Math.floor(this.value >> 16) % 256)
    }

    get green (): number {
        return Math.abs(Math.floor(this.value >> 8) % 256)
    }

    get blue (): number {
        return Math.abs(this.value % 256)
    }

    // Set 0 - 1 - float

    set alpha (v: number) {
        v = Math.floor(Math.min(1, Math.max(0, v)) * 256)
        this.value = (this.value & 0x00FFFFFF) | (v << 24)
    }

    // Set 0 - 255

    set red (v: number) {
        v = Math.min(255, Math.max(0, v))
        this.value = (this.value & 0xFF00FFFF) | (v << 16)
    }

    set green (v: number) {
        v = Math.min(255, Math.max(0, v))
        this.value = (this.value & 0xFFFF00FF) | (v << 8)
    }

    set blue (v: number) {
        v = Math.min(255, Math.max(0, v))
        this.value = (this.value & 0xFFFFFF00) | v
    }

    // Format

    get css (): string {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`
    }
}

/**
 * Tile Height [-10.000; +100.000]
 */
export function heightToRgb(height: number): Color {
    if (height > 1000) return new Color('#d62c20')
    if (height > 750) return new Color('#d66f20')
    if (height > 500) return new Color('#d18924')
    if (height > 250) return new Color('#cdd92b')
    if (height > 100) return new Color('#93d620')
    if (height > 0) return new Color('#57c716')

    return new Color('')
}
