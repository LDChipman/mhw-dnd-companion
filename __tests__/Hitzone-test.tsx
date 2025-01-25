import { Hitzone, damageTypes, generateDefaultHitzones, generateHitzone, generateHitzonesFromArray } from "@/app/classes/Hitzone";

describe("Hitzone Building", () => {

	test("Generates Singular Hitzone Correctly", () => {
		const FULL_HITZONE = generateHitzone(damageTypes.unholy, 3, 5);
		const EMPTY_HITZONE = generateHitzone(damageTypes.sonic);
		const HALF_EMPTY_HITZONE = generateHitzone(damageTypes.cold, 7);

		expect(FULL_HITZONE.type).toBe(damageTypes.unholy);
		expect(FULL_HITZONE.hitzoneModifier).toBe(3);
		expect(FULL_HITZONE.minimumDamage).toBe(5);

		expect(EMPTY_HITZONE.type).toBe(damageTypes.sonic);
		expect(EMPTY_HITZONE.hitzoneModifier).toBe(0);
		expect(EMPTY_HITZONE.minimumDamage).toBe(0);

		expect(HALF_EMPTY_HITZONE.type).toBe(damageTypes.cold);
		expect(HALF_EMPTY_HITZONE.hitzoneModifier).toBe(7);
		expect(HALF_EMPTY_HITZONE.minimumDamage).toBe(0);
	});

	test("Default Hitzones Generate Properly", () => {
		const PROPERLY_GENERATED_DEFAULT_HITZONES: Array<Hitzone> = [
			generateHitzone(damageTypes.bludgeoning),
			generateHitzone(damageTypes.slashing),
			generateHitzone(damageTypes.piercing),
			generateHitzone(damageTypes.fire),
			generateHitzone(damageTypes.electricity),
			generateHitzone(damageTypes.cold),
			generateHitzone(damageTypes.acid),
			generateHitzone(damageTypes.sonic),
			generateHitzone(damageTypes.positive),
			generateHitzone(damageTypes.negative),
			generateHitzone(damageTypes.force),
			generateHitzone(damageTypes.holy),
			generateHitzone(damageTypes.unholy)];

		expect(generateDefaultHitzones()).toEqual(PROPERLY_GENERATED_DEFAULT_HITZONES);
	});

	test("Array of Hitzones is properly generated when passed array containing multiple of the same type", () => {
		const ARRAY_OF_HITZONES_TO_SET_MANUALLY: Array<Hitzone> = [generateHitzone(damageTypes.fire, 3, 1),
		generateHitzone(damageTypes.fire, 53, -300)];

		const HITZONES = generateHitzonesFromArray(ARRAY_OF_HITZONES_TO_SET_MANUALLY);

		expect(HITZONES.filter((currentHitzone) => currentHitzone.type == damageTypes.fire).at(0)!.hitzoneModifier).toBe(3);
		expect(HITZONES.filter((currentHitzone) => currentHitzone.type == damageTypes.fire).at(0)!.minimumDamage).toBe(1);

	});

	test("Properly creates a hitzone when the builder is passed an incomplete list of hitzones", () => {
		const ARRAY_OF_HITZONES_TO_SET_MANUALLY: Array<Hitzone> = [
			generateHitzone(damageTypes.slashing, 8, 4),
			generateHitzone(damageTypes.force, -2, 5),
			generateHitzone(damageTypes.holy, 30, -5)];

		const HITZONES = generateHitzonesFromArray(ARRAY_OF_HITZONES_TO_SET_MANUALLY);

		expect(HITZONES.filter((currentHitzone) => currentHitzone.type == damageTypes.slashing).at(0)!.hitzoneModifier).toBe(8);
		expect(HITZONES.filter((currentHitzone) => currentHitzone.type == damageTypes.slashing).at(0)!.minimumDamage).toBe(4);

		expect(HITZONES.filter((currentHitzone) => currentHitzone.type == damageTypes.force).at(0)!.hitzoneModifier).toBe(-2);
		expect(HITZONES.filter((currentHitzone) => currentHitzone.type == damageTypes.force).at(0)!.minimumDamage).toBe(5);

		expect(HITZONES.filter((currentHitzone) => currentHitzone.type == damageTypes.holy).at(0)!.hitzoneModifier).toBe(30);
		expect(HITZONES.filter((currentHitzone) => currentHitzone.type == damageTypes.holy).at(0)!.minimumDamage).toBe(-5);

	})

})
