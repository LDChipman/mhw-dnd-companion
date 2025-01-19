import { damageTypes } from "../enums";

export class Hitzone {
	public type: damageTypes;
	public hitzoneModifier: number;
	public minimumDamage: number;

	constructor(type: damageTypes, hitzoneModifier?: number, minimumDamage?: number) {
		this.type = type;
		this.hitzoneModifier = hitzoneModifier ? hitzoneModifier : 0;
		this.minimumDamage = minimumDamage ? minimumDamage : 0;
	}
}
