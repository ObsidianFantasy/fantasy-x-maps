import { Plugin } from "obsidian";

// Remember to rename these classes and interfaces!

export default class MapPlugin extends Plugin {
    settings: {};

    async onload() {
    }

    onunload() {}
}

// class SampleModal extends Modal {
// 	constructor(app: App) {
// 		super(app);
// 	}

// 	onOpen() {
// 		const {contentEl} = this;
// 		contentEl.setText('Woah!');
// 	}

// 	onClose() {
// 		const {contentEl} = this;
// 		contentEl.empty();
// 	}
// }
