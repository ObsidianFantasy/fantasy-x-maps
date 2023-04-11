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
    // const embeds = el.querySelectorAll('code')

    // for (let i = 0; i < embeds.length; i++) {
    //     const embed = embeds.item(i)

    //     const link = embed.getAttr('src')
    //     const alt = embed.getAttr('alt')

    //     ctx.addChild(new MapDisplay(embed as HTMLElement))
    // }

    const codeblocks = el.querySelectorAll('code')

    for (let index = 0; index < codeblocks.length; index++) {
        const codeblock = codeblocks.item(index)
        const text = codeblock.innerText.trim()
        const isEmoji = text[0] === ':' && text[text.length - 1] === ':'

        if (isEmoji) {
            ctx.addChild(new MapDisplay(codeblock))
        }
    }
}
