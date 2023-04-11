import { Menu, Notice, Plugin, Workspace } from 'obsidian'
import createFile from './lib/createFile'

import MapFileView from './MapFileView'
import MapView from './MapView'

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

        this.app.workspace

        this.registerExtensions([FILE_FORMAT], MAP_EDIT_VIEW)
        // TODO this.registerMarkdownPostProcessor

        this.addRibbon()

        // this.addRibbonIcon('dice', 'Activate view', (evt) => {
        //     const menu = new Menu()

        //     menu.addItem((item) =>
        //         item
        //             .setTitle('Copy')
        //             .setIcon('documents')
        //             .onClick(() => {
        //                 new Notice('Copied')
        //             })
        //     )

        //     menu.addItem((item) =>
        //         item
        //             .setTitle('Paste')
        //             .setIcon('paste')
        //             .onClick(() => {
        //                 new Notice('Pasted')
        //             })
        //     )

        //     menu.showAtMouseEvent(evt)
        // })
    }

    onunload() {
        this.app.workspace.detachLeavesOfType(MAP_EDIT_VIEW)
    }
}
