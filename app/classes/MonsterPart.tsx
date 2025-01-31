import { Hitzone, generateHitzonesFromArray, generateDefaultHitzones } from "./Hitzone";
import { PartBreakNotifier } from "./PartBreakNotifier";
import uuid from "react-native-uuid";

export class MonsterPart {

	//General Info
	private name: string;
	private id: string;

	//Part Break Info
	private partBreakThreshold: number;
	private partBreakThresholdIncrease: number;
	private timesPartCanBeBroken: number;
	private timesPartHasBeenBroken: number;
	private damageTaken: number;

	private hitzones: Array<Hitzone>;

	private partBreakNotifier: PartBreakNotifier;

	get getName(): string {
		return this.name;
	}

	get getId(): string {
		return this.id;
	}

	get getPartBreakThreshold(): number {
		return this.partBreakThreshold;
	}

	get getPartBreakThresholdIncrease(): number {
		return this.partBreakThresholdIncrease;
	}

	get getTimesPartCanBeBroken(): number {
		return this.timesPartCanBeBroken;
	}

	get getTimesPartHasBeenBroken(): number {
		return this.timesPartHasBeenBroken;
	}

	get getDamageTaken(): number {
		return this.damageTaken;
	}

	get getHitzones(): Array<Hitzone> {
		return this.hitzones;
	}

	get getPartBreakNotifier(): PartBreakNotifier {
		return this.partBreakNotifier;
	}

	private constructor(name: string, partBreakThreshold: number, partBreakThresholdIncrease: number, timesPartCanBeBroken: number, hitzones: Array<Hitzone>) {

		this.name = name;
		this.id = uuid.v4();

		this.partBreakThreshold = partBreakThreshold;
		this.partBreakThresholdIncrease = partBreakThresholdIncrease;
		this.timesPartCanBeBroken = timesPartCanBeBroken;
		this.timesPartHasBeenBroken = 0;
		this.damageTaken = 0;

		this.hitzones = hitzones;

		this.partBreakNotifier = new PartBreakNotifier;

	}

	//Use to apply damage to the part and automatically increment the number of times a part has been broken
	public applyDamageToPart(damage: number): void {

		this.damageTaken += damage;
		this.checkForPartBreak();

	}

	//Use to check if the current damage taken is enough to reach the part break threshold
	private checkForPartBreak(): void {

		const PART_CAN_BE_BROKEN = this.timesPartHasBeenBroken < this.timesPartCanBeBroken;

		if (!PART_CAN_BE_BROKEN) {
			console.log(`${this.getName} can't be broken anymore`);
			return;
		}

		if (this.damageTaken >= this.partBreakThreshold) {
			this.timesPartHasBeenBroken += 1;
			this.partBreakThreshold += this.partBreakThresholdIncrease;
			this.partBreakNotifier.notify();
			console.log(`${this.name} Broken`);
			this.checkForPartBreak();
			return;
		}
	}

	//Use to construct new MonsterParts with guaranteed properly initialized fields
	public static Builder = class {

		private name: string;

		private partBreakThreshold: number;
		private partBreakThresholdIncrease: number;
		private timesPartCanBeBroken: number;

		private hitzones: Array<Hitzone>;

		constructor() {
			this.name = "Example Name";

			this.partBreakThreshold = 0;
			this.partBreakThresholdIncrease = 0;
			this.timesPartCanBeBroken = 0;

			this.hitzones = generateDefaultHitzones();

		}

		public build() {
			return new MonsterPart(this.name, this.partBreakThreshold, this.partBreakThresholdIncrease, this.timesPartCanBeBroken, this.hitzones);
		}

		public reset() {

			this.name = "Example Name";

			this.partBreakThreshold = 0;
			this.partBreakThresholdIncrease = 0;
			this.timesPartCanBeBroken = 0;

			this.hitzones = generateDefaultHitzones();

			this.partBreakNotifier = new PartBreakNotifier();

		}

		public setName(name: string): this {
			this.name = name;
			return this;
		}

		public setPartBreakThreshold(partBreakThreshold: number): this {
			this.partBreakThreshold = partBreakThreshold;
			return this;
		}

		public setPartBreakThresholdIncrease(partBreakThresholdIncrease: number): this {
			this.partBreakThresholdIncrease = partBreakThresholdIncrease;
			return this;
		}

		public setTimesPartCanBeBroken(timesPartCanBeBroken: number): this {
			this.timesPartCanBeBroken = timesPartCanBeBroken;
			return this;
		}

		public setHitzones(hitzones: Array<Hitzone>): this {
			this.hitzones = generateHitzonesFromArray(hitzones);
			return this;
		}

		public setPartBreakNotifier(partBreakNotifier: PartBreakNotifier): this {
			this.partBreakNotifier = partBreakNotifier;
			return this;
		}

	}

}
