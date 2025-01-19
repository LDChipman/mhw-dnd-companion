import { damageTypes } from "../enums";
import { Hitzone } from "./Hitzone";

class MonsterPart {

	//General Info
	public name: string = "Default Name";
	public id: string = "0000-0000-0000-0000";

	//Part Break Info
	private partBreakThresholdMax: number;
	private partBreakThreshholdCurrent: number;
	private timesPartCanBeBroken: number;
	private timesPartHasBeenBroken: number;

	private hitzones: Array<Hitzone> = [];

	constructer(name: string, id: string, partBreakThresholdMax: number, partBreakThreshholdCurrent: number, timesPartCanBeBroken: number, timesPartHasBeenBroken: number, hitzones: Array<Hitzone>) {

		this.name = name;
		this.id = id;

		this.partBreakThresholdMax = partBreakThresholdMax;
		this.partBreakThreshholdCurrent = partBreakThreshholdCurrent;
		this.timesPartCanBeBroken = timesPartCanBeBroken;
		this.timesPartHasBeenBroken = timesPartHasBeenBroken;

		Object.values(damageTypes).forEach(damageType => {

			let hasHitzoneOfDamageType = hitzones.filter((hitzone) => hitzone.type == damageType).length > 0;
			let hasMultipleHitzonesOfSameType = hitzones.filter((hitzone) => hitzone.type == damageType).length > 1;

			if (!hasHitzoneOfDamageType) {
				console.log(`Given Array of Hitzones does not contain hitzone of type ${damageType}`);
				console.log(`Adding new hitzone of type ${damageType} with default values for Hitzone Modifier and Minimum Damage`);

				this.hitzones.push(new Hitzone(damageType, 0, 0));
				return;
			}

			if (hasMultipleHitzonesOfSameType) {
				let hitzone = hitzones.filter((hitzone) => hitzone.type == damageType).at(0);
				console.log(`Given array contains multiple hitzones of type ${damageType} values from the first instance in the array will be used and the rest will be ignored`);
				console.log(`Adding new hitzone of type ${damageType} with Hitzone Modifier ${hitzone?.hitzoneModifier} and minimum damage of ${hitzone?.minimumDamage}`)

				this.hitzones.push(new Hitzone(damageType, hitzone?.hitzoneModifier, hitzone?.minimumDamage));
				return;
			}

			let hitzone = hitzones.filter((hitzone) => hitzone.type == damageType).at(0);
			this.hitzones.push(new Hitzone(damageType, hitzone?.hitzoneModifier, hitzone?.minimumDamage));

		}
		)

	}

	//Takes in the raw damage dealt to the part and the damage type, adjusts the damage for the hitzone value of the part, and returns the adjusted damage to the caller.
	public applyDamageToPart(rawDamage: number, damageType: damageTypes): number {

		let hitzone = this.hitzones.filter((hitzone) => hitzone.type == damageType).at(0);

		if (hitzone == undefined) {
			console.log(`Didn't find hitzone of type ${damageType}`);
			console.log("Returning raw damage to caller");

			return rawDamage;
		}

		let adjustedDamage = rawDamage - hitzone?.hitzoneModifier;
		return adjustedDamage >= hitzone?.minimumDamage ? adjustedDamage : hitzone?.minimumDamage;

	}


}
