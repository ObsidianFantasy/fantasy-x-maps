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
        super.onload()
        console.log(this.containerEl.classList)

        // By removing the internal-embed class, this
        // code prevents Obsidian from doing any post-
        // processes after we assign it the map
        this.containerEl.removeClass('internal-embed')
        this.containerEl.addClass('map-embed')

        // TODO remove later with custom css
        this.containerEl.addClass('file-embed', 'mod-generic')

        // console.log(this.containerEl)

        const emojiEl = this.containerEl.createSpan({text: 'TODO MAP DISPLAY GOES HERE'})

        // this.containerEl.replaceChildren('Map goes here')

        // console.log(this.containerEl.textContent)

        // console.log(this.containerEl.querySelector('*'))
        // console.log(this.containerEl.childNodes[0].)

        // this.containerEl.firstChild?.replaceWith(createSpan({text: 'MAP DISPLAY GOES HERE'}))
        this.containerEl.replaceChildren(emojiEl)
    }
}
