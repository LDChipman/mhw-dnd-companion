import { PartBreakListener } from "./PartBreakNotifier";
import uuid from "react-native-uuid";

export class MonsterAttack implements PartBreakListener {
	public id: string;
	private name: string;
	private descriptions: Array<string>;
	private currentDescriptionIndex: number;

	constructor(name: string, descriptions: Array<string>) {

		this.id = uuid.v4();
		this.name = name;
		this.descriptions = descriptions;
		this.currentDescriptionIndex = 0;

	}

	get getName() {
		return this.name;
	}

	get getDescriptions() {
		return this.descriptions;
	}

	get getCurrentDescription() {
		return this.descriptions.at(this.currentDescriptionIndex);
	}

	public update(): void {
		if (this.currentDescriptionIndex < this.descriptions.length - 1) {
			this.currentDescriptionIndex++;
		}
	}
}
