import { Hitzone, MonsterPart } from "@/app/classes/MonsterPart";
import { damageTypes } from "@/app/enums";

describe("Monster Part Building", () => {

	test("Monster Part Builder Creates Proper Blank Part", () => {
		const PART = new MonsterPart.Builder().build();
		const PROPERLY_BUILT_BASIC_MONSTER_PART = {
			name: "Example Name",
			id: "0000-0000-0000-0000",
			partBreakThreshold: 0,
			timesPartCanBeBroken: 0,
			timesPartHasBeenBroken: 0,
			damageTaken: 0,

		};
		expect(PART.name).toBe(PROPERLY_BUILT_BASIC_MONSTER_PART.name);
		expect(PART.id).toBe(PROPERLY_BUILT_BASIC_MONSTER_PART.id);
		expect(PART.partBreakThreshold).toBe(PROPERLY_BUILT_BASIC_MONSTER_PART.partBreakThreshold);
		expect(PART.timesPartCanBeBroken).toBe(PROPERLY_BUILT_BASIC_MONSTER_PART.timesPartCanBeBroken);
		expect(PART.timesPartHasBeenBroken).toBe(PROPERLY_BUILT_BASIC_MONSTER_PART.timesPartHasBeenBroken);
		expect(PART.damageTaken).toBe(PROPERLY_BUILT_BASIC_MONSTER_PART.damageTaken);
	});

})
describe("Hitzone Building", () => {

	let partBuilder = new MonsterPart.Builder();

	beforeEach(() => {
		partBuilder.reset();
	});

	test("Hitzone Array Creation from Empty", () => {
		const PART = partBuilder.build();
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

		expect(PART.hitzones).toEqual(PROPERLY_BUILT_HITZONES);
	});

	test("Properly creates a hitzone when the builder is passed multiple hitzones of the same type", () => {
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

		partBuilder.setHitzones(ARRAY_OF_HITZONES_TO_SET_MANUALLY);
		const PART = partBuilder.build();

		expect(PART.hitzones.filter((currentHitzone) => currentHitzone.type == damageTypes.fire).at(0)!.hitzoneModifier).toBe(3);
		expect(PART.hitzones.filter((currentHitzone) => currentHitzone.type == damageTypes.fire).at(0)!.minimumDamage).toBe(1);

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

		partBuilder.setHitzones(ARRAY_OF_HITZONES_TO_SET_MANUALLY);
		const PART = partBuilder.build();

		expect(PART.hitzones.filter((currentHitzone) => currentHitzone.type == damageTypes.slashing).at(0)!.hitzoneModifier).toBe(8);
		expect(PART.hitzones.filter((currentHitzone) => currentHitzone.type == damageTypes.slashing).at(0)!.minimumDamage).toBe(4);

		expect(PART.hitzones.filter((currentHitzone) => currentHitzone.type == damageTypes.force).at(0)!.hitzoneModifier).toBe(-2);
		expect(PART.hitzones.filter((currentHitzone) => currentHitzone.type == damageTypes.force).at(0)!.minimumDamage).toBe(5);

		expect(PART.hitzones.filter((currentHitzone) => currentHitzone.type == damageTypes.holy).at(0)!.hitzoneModifier).toBe(30);
		expect(PART.hitzones.filter((currentHitzone) => currentHitzone.type == damageTypes.holy).at(0)!.minimumDamage).toBe(-5);

	})

})
