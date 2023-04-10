import { Notice, Plugin } from "obsidian";

// Remember to rename these classes and interfaces!

export default class MapPlugin extends Plugin {
    settings: {};

    async onload() {
        this.addRibbonIcon('map', 'Create map fragment', () => new Notice('Hello'))
    }

    onunload() {}
}
