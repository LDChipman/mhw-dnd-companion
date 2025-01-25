export type Hitzone = {
	type: damageTypes;
	hitzoneModifier: number;
	minimumDamage: number;
}

export enum damageTypes {
	bludgeoning = "BLUDGEONING",
	slashing = "SLASHING",
	piercing = "PIERCING",
	fire = "FIRE",
	electricity = "ELECTRICITY",
	cold = "COLD",
	acid = "ACID",
	sonic = "SONIC",
	positive = "POSITIVE",
	negative = "NEGATIVE",
	force = "FORCE",
	holy = "HOLY",
	unholy = "UNHOLY"
}

export function generateHitzonesFromArray(hitzones: Array<Hitzone>): Array<Hitzone> {
	let newHitzones: Array<Hitzone> = [];

	Object.values(damageTypes).forEach(currentDamageType => {

		const HAS_HITZONE_OF_DAMAGE_TYPE = hitzones.filter((hitzone) => hitzone.type == currentDamageType).length > 0;
		const HAS_MULTIPLE_HITZONES_OF_SAME_TYPE = hitzones.filter((hitzone) => hitzone.type == currentDamageType).length > 1;

		if (!HAS_HITZONE_OF_DAMAGE_TYPE) {
			console.log(`Given Array of Hitzones does not contain hitzone of type ${currentDamageType}`);
			console.log(`Adding new Hitzone of type ${currentDamageType} with default values for Hitzone Modifier and Minimum Damage`);

			return newHitzones.push(generateHitzone(currentDamageType));
		}

		if (HAS_MULTIPLE_HITZONES_OF_SAME_TYPE) {
			const HITZONE = hitzones.filter((hitzone) => hitzone.type == currentDamageType).at(0);
			console.log(`Given array contains multiple hitzones of type ${currentDamageType} values from the first instance in the array will be used and the rest will be ignored`);
			console.log(`Adding new hitzone of type ${currentDamageType} with Hitzone Modifier ${HITZONE!.hitzoneModifier} and minimum damage of ${HITZONE!.minimumDamage}`)

			return newHitzones.push(generateHitzone(currentDamageType, HITZONE!.hitzoneModifier, HITZONE!.minimumDamage));
		}

		const HITZONE = hitzones.filter((hitzone) => hitzone.type == currentDamageType).at(0);
		return newHitzones.push(generateHitzone(currentDamageType, HITZONE!.hitzoneModifier, HITZONE!.minimumDamage));

	}
	);
	return newHitzones;
}

export function generateDefaultHitzones(): Array<Hitzone> {

	let hitzones: Array<Hitzone> = [];

	Object.values(damageTypes).forEach(currentDamageType => {

		const NEW_HITZONE: Hitzone = generateHitzone(currentDamageType);

		hitzones.push(NEW_HITZONE);

	}
	);

	return hitzones;
}

export function generateHitzone(type: damageTypes, modifier?: number, minimumDamage?: number): Hitzone {
	if (modifier == undefined && minimumDamage == undefined) {
		return { type: type, hitzoneModifier: 0, minimumDamage: 0 };
	}
	if (minimumDamage == undefined) {
		return { type: type, hitzoneModifier: modifier!, minimumDamage: 0 };
	}

	return { type: type, hitzoneModifier: modifier!, minimumDamage: minimumDamage! };
}

export function adjustDamageForHitzone(rawDamage: number, hitzone: Hitzone): number {

	const ADJUSTED_DAMAGE = rawDamage + hitzone.hitzoneModifier;

	return ADJUSTED_DAMAGE >= hitzone.minimumDamage ? ADJUSTED_DAMAGE : hitzone.minimumDamage;

}
