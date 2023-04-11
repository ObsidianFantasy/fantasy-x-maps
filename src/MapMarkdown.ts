import { MarkdownPostProcessorContext, MarkdownRenderChild } from 'obsidian'

/**
 * ### Map Markdown Post Processor
 * @description MPP that replaces map file embeds with map images
 */
export function MapMarkdownPostProcess(
    el: HTMLElement,
    ctx: MarkdownPostProcessorContext
) {
    const embeds = el.querySelectorAll(
        'span.internal-embed'
    ) as NodeListOf<HTMLElement>

    // console.log(ctx.sourcePath)

    for (let i = 0; i < embeds.length; i++) {
        const file_embed = embeds.item(i)

        const link = file_embed.getAttr('src')
        // const alt = file_embed.getAttr('alt') // TODO use alt later to label maps

        const is_map = /^[a-zA-Z0-9 _-]+\.map(\#.+)?$/.test(link || '')

        if (is_map) {
            ctx.addChild(new MapDisplay(file_embed))
        }
    }
}

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
        // console.log(this.containerEl.classList)

        // By removing the .internal-embed class, this
        // code prevents Obsidian from doing any post-
        // processes after we assign it the map
        this.containerEl.removeClass('internal-embed')
        this.containerEl.addClass('map-embed')

        // TODO remove later with custom css
        this.containerEl.addClass('file-embed', 'mod-generic')

        const emojiEl = this.containerEl.createSpan({
            text: 'TODO MAP DISPLAY GOES HERE',
        })
        this.containerEl.replaceChildren(emojiEl)
    }
}
