import { Notice, Plugin } from 'obsidian'
import createFile from './lib/createFile'

// Remember to rename these classes and interfaces!

export default class MapPlugin extends Plugin {
    settings: {}

    addRibbon() {
        this.addRibbonIcon('map', 'Create map fragment', () =>
            createFile(this, 'map', '{}')
        ).addClass('fantasy-x-ribbon')
    }

    async onload() {
        this.addRibbon()
    }

    onunload() {}
}
