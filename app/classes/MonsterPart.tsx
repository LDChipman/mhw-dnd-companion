import { damageTypes, Hitzone, generateHitzonesFromArray, generateDefaultHitzones } from "./Hitzone";
import { PartBreakNotifier } from "./PartBreakNotifier";
import uuid from "react-native-uuid";

export class MonsterPart {

	//General Info
	private name: string;
	private id: string;

	//Part Break Info
	private partBreakThreshold: number;
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

	private constructor(name: string, partBreakThreshold: number, timesPartCanBeBroken: number, timesPartHasBeenBroken: number, damageTaken: number, hitzones: Array<Hitzone>, partBreakNotifier: PartBreakNotifier) {

		this.name = name;
		this.id = uuid.v4();

		this.partBreakThreshold = partBreakThreshold;
		this.timesPartCanBeBroken = timesPartCanBeBroken;
		this.timesPartHasBeenBroken = timesPartHasBeenBroken;
		this.damageTaken = damageTaken;

		this.hitzones = hitzones;

		this.partBreakNotifier = partBreakNotifier;

	}

	//Use to construct new MonsterParts with guaranteed properly initialized fields
	public static Builder = class {

		private name: string;

		private partBreakThreshold: number;
		private timesPartCanBeBroken: number;
		private timesPartHasBeenBroken: number;
		private damageTaken: number;

		private hitzones: Array<Hitzone>;

		private partBreakNotifier: PartBreakNotifier;

		constructor() {
			this.name = "Example Name";

			this.partBreakThreshold = 0;
			this.timesPartCanBeBroken = 0;
			this.timesPartHasBeenBroken = 0;
			this.damageTaken = 0;

			this.hitzones = generateDefaultHitzones();

			this.partBreakNotifier = new PartBreakNotifier();

		}

		public build() {
			return new MonsterPart(this.name, this.partBreakThreshold, this.timesPartCanBeBroken, this.timesPartHasBeenBroken, this.damageTaken, this.hitzones, this.partBreakNotifier);
		}

		public reset() {

			this.name = "Example Name";

			this.partBreakThreshold = 0;
			this.timesPartCanBeBroken = 0;
			this.timesPartHasBeenBroken = 0;
			this.damageTaken = 0;

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

		public setTimesPartCanBeBroken(timesPartCanBeBroken: number): this {
			this.timesPartCanBeBroken = timesPartCanBeBroken;
			return this;
		}

		public setTimesPartHasBeenBroken(timesPartHasBeenBroken: number): this {
			this.timesPartHasBeenBroken = timesPartHasBeenBroken;
			return this;
		}

		public setDamageTaken(damageTaken: number): this {
			this.damageTaken = damageTaken;
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

	//Use to get damage number adjusted against the relevant hitzone 
	public adjustDamageForHitzone(rawDamage: number, damageType: damageTypes): number {

		const HITZONE = this.hitzones.filter((hitzone) => hitzone.type == damageType).at(0);

		if (HITZONE == undefined) {
			console.log(`Didn't find hitzone of type ${damageType}`);
			console.log("Returning raw damage to caller");

			return rawDamage;
		}

		const ADJUSTED_DAMAGE = rawDamage + HITZONE.hitzoneModifier;

		return ADJUSTED_DAMAGE >= HITZONE.minimumDamage ? ADJUSTED_DAMAGE : HITZONE.minimumDamage;

	}

	//Use to apply damage to the part and automatically increment the number of times a part has been broken
	public applyDamageToPart(damage: number): void {

		this.damageTaken += damage;
		this.checkForPartBreak();

	}

	//Use to check if the current damage taken is enough to reach the part break threshold
	private checkForPartBreak(): void {

		const PART_CAN_BE_BROKEN = this.timesPartHasBeenBroken < this.timesPartCanBeBroken;
		if (PART_CAN_BE_BROKEN && this.damageTaken >= this.partBreakThreshold) {
			this.timesPartHasBeenBroken += 1;
			this.partBreakThreshold *= 2;
			this.partBreakNotifier.notify();
			this.checkForPartBreak();
		}

	}

}
