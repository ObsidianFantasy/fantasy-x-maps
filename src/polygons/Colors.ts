import Color from 'color'

/**
 * Tile Height [-10.000; +100.000]
 */
export function heightToRgb(height: number): string {
    if (height > 1000) return Color('#d62c20').rgb().toString()
    if (height > 750) return Color('#d66f20').rgb().toString()
    if (height > 500) return Color('#d18924').rgb().toString()
    if (height > 250) return Color('#cdd92b').rgb().toString()
    if (height > 100) return Color('#93d620').rgb().toString()
    if (height > 0) return Color('#57c716').rgb().toString()

    return 'rgba(0,0,0,0)'
}
