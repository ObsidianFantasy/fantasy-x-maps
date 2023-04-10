import { Plugin } from 'obsidian'

/**
 * Create a file with a name that's not reserved yet.
 * @param that FantasyMapPlugin
 * @param format file extension
 * @param defaultContent content format
 */
export default async function createFile(
    that: Plugin,
    format: string,
    defaultContent: string
) {
    const { adapter } = that.app.vault
    let attempt = 0
    const file_path = () =>
        './Untitled' + (attempt > 0 ? ' ' + attempt : '') + '.' + format

    while (await adapter.exists(file_path())) {
        attempt++
    }

    adapter.write(file_path(), defaultContent)
}
