import { Hitzone, damageTypes, generateDefaultHitzones, generateHitzonesFromArray } from "@/app/classes/Hitzone";

describe("Hitzone Building", () => {

	test("Default Hitzones Generate Properly", () => {
		const PROPERLY_BUILT_HITZONES: Array<Hitzone> = [{
			type: damageTypes.bludgeoning,
			hitzoneModifier: 0,
			minimumDamage: 0
		},
		{
			type: damageTypes.slashing,
			hitzoneModifier: 0,
			minimumDamage: 0
		},
		{
			type: damageTypes.piercing,
			hitzoneModifier: 0,
			minimumDamage: 0
		},
		{
			type: damageTypes.fire,
			hitzoneModifier: 0,
			minimumDamage: 0
		},
		{
			type: damageTypes.electricity,
			hitzoneModifier: 0,
			minimumDamage: 0
		},
		{
			type: damageTypes.cold,
			hitzoneModifier: 0,
			minimumDamage: 0
		},
		{
			type: damageTypes.acid,
			hitzoneModifier: 0,
			minimumDamage: 0
		},
		{
			type: damageTypes.sonic,
			hitzoneModifier: 0,
			minimumDamage: 0
		},
		{
			type: damageTypes.positive,
			hitzoneModifier: 0,
			minimumDamage: 0
		},
		{
			type: damageTypes.negative,
			hitzoneModifier: 0,
			minimumDamage: 0
		},
		{
			type: damageTypes.force,
			hitzoneModifier: 0,
			minimumDamage: 0
		},
		{
			type: damageTypes.holy,
			hitzoneModifier: 0,
			minimumDamage: 0
		},
		{
			type: damageTypes.unholy,
			hitzoneModifier: 0,
			minimumDamage: 0
		}];

		expect(generateDefaultHitzones()).toEqual(PROPERLY_BUILT_HITZONES);
	});

	test("Array of Hitzones is properly generated when passed array containing multiple of the same type", () => {
		const ARRAY_OF_HITZONES_TO_SET_MANUALLY: Array<Hitzone> = [{
			type: damageTypes.fire,
			hitzoneModifier: 3,
			minimumDamage: 1
		},
		{
			type: damageTypes.fire,
			hitzoneModifier: 53,
			minimumDamage: -300
		}];

		const hitzones = generateHitzonesFromArray(ARRAY_OF_HITZONES_TO_SET_MANUALLY);

		expect(hitzones.filter((currentHitzone) => currentHitzone.type == damageTypes.fire).at(0)!.hitzoneModifier).toBe(3);
		expect(hitzones.filter((currentHitzone) => currentHitzone.type == damageTypes.fire).at(0)!.minimumDamage).toBe(1);

	});

	test("Properly creates a hitzone when the builder is passed an incomplete list of hitzones", () => {
		const ARRAY_OF_HITZONES_TO_SET_MANUALLY: Array<Hitzone> = [{
			type: damageTypes.slashing,
			hitzoneModifier: 8,
			minimumDamage: 4
		},
		{
			type: damageTypes.force,
			hitzoneModifier: -2,
			minimumDamage: 5
		},
		{
			type: damageTypes.holy,
			hitzoneModifier: 30,
			minimumDamage: -5
		}];

		const hitzones = generateHitzonesFromArray(ARRAY_OF_HITZONES_TO_SET_MANUALLY);

		expect(hitzones.filter((currentHitzone) => currentHitzone.type == damageTypes.slashing).at(0)!.hitzoneModifier).toBe(8);
		expect(hitzones.filter((currentHitzone) => currentHitzone.type == damageTypes.slashing).at(0)!.minimumDamage).toBe(4);

		expect(hitzones.filter((currentHitzone) => currentHitzone.type == damageTypes.force).at(0)!.hitzoneModifier).toBe(-2);
		expect(hitzones.filter((currentHitzone) => currentHitzone.type == damageTypes.force).at(0)!.minimumDamage).toBe(5);

		expect(hitzones.filter((currentHitzone) => currentHitzone.type == damageTypes.holy).at(0)!.hitzoneModifier).toBe(30);
		expect(hitzones.filter((currentHitzone) => currentHitzone.type == damageTypes.holy).at(0)!.minimumDamage).toBe(-5);

	})

})
