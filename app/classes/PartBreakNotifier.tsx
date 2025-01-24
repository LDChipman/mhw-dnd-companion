export interface PartBreakListener {

	readonly id: string;

	update(): void

}

export class PartBreakNotifier {

	private partBreakListeners: Array<PartBreakListener>;

	public constructor() {
		this.partBreakListeners = [];
	}

	public startListeningForPartBreaks(partBreakListener: PartBreakListener): void {

		const LISTENER_ALREADY_IS_LISTENING = this.partBreakListeners.find((currentPartBreakListener) => partBreakListener.id == currentPartBreakListener.id);

		if (LISTENER_ALREADY_IS_LISTENING) {
			console.log("Found a partBreakListener of the same ID already in the list");
			return;
		}

		this.partBreakListeners.push(partBreakListener);

	}

	public stopListeningForPartBreaks(partBreakListener: PartBreakListener): void {

		const LISTENER_INDEX = this.partBreakListeners.findIndex((currentPartBreakListener) => partBreakListener.id == currentPartBreakListener.id);

		if (LISTENER_INDEX == -1) {
			console.log("Didn't find any partBreakListeners with that id.")
			return;
		}

		this.partBreakListeners.splice(LISTENER_INDEX, LISTENER_INDEX);

	}

	public notify() {
		this.partBreakListeners.forEach((currentPartBreakListener) => currentPartBreakListener.update());
	}

}
