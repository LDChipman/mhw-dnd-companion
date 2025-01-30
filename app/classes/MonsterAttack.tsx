import { MonsterState } from "./MonsterState";
import { PartBreakListener } from "./PartBreakNotifier";
import uuid from "react-native-uuid";

export class MonsterAttack implements PartBreakListener {
	public readonly id: string;
	private name: string;
	private descriptions: Array<string>;
	private currentDescriptionIndex: number;
	private statesInWhichTheAttackIsUsable: Array<MonsterState>;

	constructor(name: string, descriptions: Array<string>, usableStates: Array<MonsterState>) {

		this.id = uuid.v4();
		this.name = name;
		this.descriptions = descriptions;
		this.currentDescriptionIndex = 0;
		this.statesInWhichTheAttackIsUsable = usableStates;

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

	get getUsableStates() {
		return this.statesInWhichTheAttackIsUsable;
	}

	public update(): void {
		if (this.currentDescriptionIndex < this.descriptions.length - 1) {
			this.currentDescriptionIndex++;
		}
	}
}
