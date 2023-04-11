import { MarkdownPostProcessorContext } from 'obsidian'
import { MapDisplay } from './MapMRC'

/**
 * ### Map Markdown Post Processor
 * @description MPP that replaces map file embeds with map images
 */
export default function MapMarkdownPostProcess(
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
