import { Plugin } from 'obsidian'
import createFile from './lib/createFile'

import MapFileView from './MapFileView'
import MapView from './MapView'
import MapMPP from './MapMPP'

import { MAP_EDIT_VIEW, FILE_FORMAT, MAP_VIEW } from './const'

export default class MapPlugin extends Plugin {
    settings: {}

    addRibbon() {
        this.addRibbonIcon('map', 'Create map fragment', () =>
            createFile(this, 'map', '{}')
        ).addClass('fantasy-x-ribbon')
    }

    async onload() {
        this.registerView(MAP_EDIT_VIEW, (leaf) => new MapFileView(leaf))
        this.registerView(MAP_VIEW, (leaf) => new MapView(leaf))

        this.registerExtensions([FILE_FORMAT], MAP_EDIT_VIEW)
        this.registerMarkdownPostProcessor(MapMPP)

        this.addRibbon()
    }

    onunload() {
        this.app.workspace.detachLeavesOfType(MAP_EDIT_VIEW)
    }
}
