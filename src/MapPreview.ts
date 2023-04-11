export const PreviewObserver = () => new MutationObserver(observe)

/**
 * ### Map Markdown Preview Observer
 * @description Observer for div.popover.hover-popover
 */
export async function observe(m_record: MutationRecord[], o: MutationObserver) {
    for (let i = 0; i < m_record.length; i++) {
        const element = m_record[i]
        for (const node of element.addedNodes) {
            if (node instanceof HTMLElement && node.hasClass('hover-popover')) {
                preview(node)
            }
        }
    }
}

export async function preview(previewContainer: HTMLElement) {
    // TODO change preview if textContent is a ".map"
    console.log(previewContainer.children[0].children[0].textContent)
}