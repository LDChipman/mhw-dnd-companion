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

	public addState(state: MonsterState): void {
		if (this.statesInWhichTheAttackIsUsable.filter((currentState) => currentState.id == state.id).length != 0) {
			console.log("This state is already stored in the attacks usable states.");
			return;
		}
		this.statesInWhichTheAttackIsUsable.push(state);
	}

	public removeState(state: MonsterState): void {
		const STATE_INDEX = this.statesInWhichTheAttackIsUsable.findIndex((currentState) => currentState.id == state.id);

		if (STATE_INDEX == -1) {
			console.log("This state is not part of this attacks usable states and therefore can't be removed");
			return;
		}

		this.statesInWhichTheAttackIsUsable.splice(STATE_INDEX, 1);
	}

	public update(): void {
		if (this.currentDescriptionIndex < this.descriptions.length - 1) {
			this.currentDescriptionIndex++;
		}
	}
}
