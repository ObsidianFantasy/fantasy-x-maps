import { MarkdownRenderChild } from 'obsidian'

/**
 * ### Map Markdown Render Child
 * @description MRC for the Map Display
 */
export class MapDisplay extends MarkdownRenderChild {
    constructor(containerEl: HTMLElement) {
        super(containerEl)
        // TODO
    }

    onload() {
        // TODO replace with map view
        console.log('onload')
        // this.containerEl.replaceWith('MAP DISPLAY GOES HERE')

        const emojiEl = this.containerEl.createSpan({
            text: 'Text',
        })
        this.containerEl.replaceWith(emojiEl)
    }
}
