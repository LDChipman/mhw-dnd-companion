import { damageTypes } from "../enums";

type Hitzone = {
	type: damageTypes;
	hitzoneModifier: number;
	minimumDamage: number;
}

class MonsterPart {

	//General Info
	public name: string;
	public id: string;
	//Part Break Info
	private partBreakThreshold: number;
	private timesPartCanBeBroken: number;
	private timesPartHasBeenBroken: number;
	private damageTaken: number;

	private hitzones: Array<Hitzone>;

	get getTimesPartHasBeenBroken(): number {
		return this.timesPartHasBeenBroken;
	}

	constructor(name: string, id: string, partBreakThreshold: number, timesPartCanBeBroken: number, timesPartHasBeenBroken: number, hitzones: Array<Hitzone>) {

		this.name = name;
		this.id = id;

		this.partBreakThreshold = partBreakThreshold;
		this.timesPartCanBeBroken = timesPartCanBeBroken;
		this.timesPartHasBeenBroken = timesPartHasBeenBroken;
		this.damageTaken = 0;

		this.hitzones = [];

		Object.values(damageTypes).forEach(currentDamageType => {

			const HAS_HITZONE_OF_DAMAGE_TYPE = hitzones.filter((hitzone) => hitzone.type == currentDamageType).length > 0;
			const HAS_MULTIPLE_HITZONES_OF_SAME_TYPE = hitzones.filter((hitzone) => hitzone.type == currentDamageType).length > 1;

			if (!HAS_HITZONE_OF_DAMAGE_TYPE) {
				console.log(`Given Array of Hitzones does not contain hitzone of type ${currentDamageType}`);
				console.log(`Adding new Hitzone of type ${currentDamageType} with default values for Hitzone Modifier and Minimum Damage`);

				const NEW_HITZONE: Hitzone = { type: currentDamageType, hitzoneModifier: 0, minimumDamage: 0 };

				this.hitzones.push(NEW_HITZONE);
				return;
			}

			if (HAS_MULTIPLE_HITZONES_OF_SAME_TYPE) {
				const HITZONE = hitzones.filter((hitzone) => hitzone.type == currentDamageType).at(0);
				console.log(`Given array contains multiple hitzones of type ${currentDamageType} values from the first instance in the array will be used and the rest will be ignored`);
				console.log(`Adding new hitzone of type ${currentDamageType} with Hitzone Modifier ${HITZONE?.hitzoneModifier} and minimum damage of ${HITZONE?.minimumDamage}`)

				const NEW_HITZONE: Hitzone = { type: currentDamageType, hitzoneModifier: HITZONE!.hitzoneModifier, minimumDamage: HITZONE!.hitzoneModifier };

				this.hitzones.push(NEW_HITZONE);
				return;
			}

			const HITZONE = hitzones.filter((hitzone) => hitzone.type == currentDamageType).at(0);
			const NEW_HITZONE: Hitzone = { type: currentDamageType, hitzoneModifier: HITZONE!.hitzoneModifier, minimumDamage: HITZONE!.minimumDamage };
			this.hitzones.push(NEW_HITZONE);

		}
		)

	}

	//Use to get damage number adjusted against the relevant hitzone 
	public adjustDamageForHitzone(rawDamage: number, damageType: damageTypes): number {

		const HITZONE = this.hitzones.filter((hitzone) => hitzone.type == damageType).at(0);
		const ADJUSTED_DAMAGE = rawDamage - HITZONE.hitzoneModifier;

		if (HITZONE == undefined) {
			console.log(`Didn't find hitzone of type ${damageType}`);
			console.log("Returning raw damage to caller");

			return rawDamage;
		}

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
			this.checkForPartBreak();
		}

	}

}
