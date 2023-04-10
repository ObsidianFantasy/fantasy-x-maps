import { Notice, Plugin } from 'obsidian'
import createFile from './lib/createFile'
import MapFileView from './MapFileView'
import { EDIT_VIEW, FILE_FORMAT } from './const'

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

        this.registerView(EDIT_VIEW, MapFileView.create_view)
        this.registerExtensions([FILE_FORMAT], EDIT_VIEW)
    }

    onunload() {}
}
