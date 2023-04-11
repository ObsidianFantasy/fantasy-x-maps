import { MarkdownPostProcessorContext } from 'obsidian'

/**
 * ### Map Markdown Post Processor
 * @description MPP that replaces map file embeds with map images
 */
export default function post_process (el: HTMLElement, ctx: MarkdownPostProcessorContext) {
    const embeds = el.querySelectorAll(".internal-embed")

    console.log(embeds)

    for (const embed of embeds) {
        const link = embed.getAttr('src')
        const alt = embed.getAttr('alt')

        console.log(link, alt)
    }
}