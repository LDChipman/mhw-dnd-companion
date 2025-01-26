import { MonsterPart } from "@/app/classes/MonsterPart";
import { Hitzone, damageTypes } from "@/app/classes/Hitzone";

describe("Monster Part Building", () => {

	test("Monster Part Builder Creates Proper Blank Part", () => {
		const PART = new MonsterPart.Builder().build();
		const PROPERLY_BUILT_BASIC_MONSTER_PART = {
			name: "Example Name",
			partBreakThreshold: 0,
			partBreakThresholdIncrease: 0,
			timesPartCanBeBroken: 0,
			timesPartHasBeenBroken: 0,
			damageTaken: 0,

		};
		expect(PART.getName).toBe(PROPERLY_BUILT_BASIC_MONSTER_PART.name);
		expect(PART.getPartBreakThreshold).toBe(PROPERLY_BUILT_BASIC_MONSTER_PART.partBreakThreshold);
		expect(PART.getPartBreakThresholdIncrease).toBe(PROPERLY_BUILT_BASIC_MONSTER_PART.partBreakThresholdIncrease);
		expect(PART.getTimesPartCanBeBroken).toBe(PROPERLY_BUILT_BASIC_MONSTER_PART.timesPartCanBeBroken);
		expect(PART.getTimesPartHasBeenBroken).toBe(PROPERLY_BUILT_BASIC_MONSTER_PART.timesPartHasBeenBroken);
		expect(PART.getDamageTaken).toBe(PROPERLY_BUILT_BASIC_MONSTER_PART.damageTaken);
	});

	test("Monster Part Builder Correctly Sets All Fields", () => {
		const TEST_HITZONES = generateHitzonesFromArray([
			generateHitzone(damageTypes.bludgeoning, 1, 3),
			generateHitzone(damageTypes.slashing, 5, 7),
			generateHitzone(damageTypes.piercing, 9, 11),
			generateHitzone(damageTypes.fire, 13, 15),
			generateHitzone(damageTypes.electricity, 17, 19),
			generateHitzone(damageTypes.cold, 21, 23),
			generateHitzone(damageTypes.acid, 25, 27),
			generateHitzone(damageTypes.sonic, 29, 31),
			generateHitzone(damageTypes.positive, 33, 35),
			generateHitzone(damageTypes.negative, 37, 39),
			generateHitzone(damageTypes.force, 41, 43),
			generateHitzone(damageTypes.holy, 45, 47),
			generateHitzone(damageTypes.unholy, 49, 51)
		]);
		
		const PART = new MonsterPart.Builder()
			.setName("Test Name")
			.setPartBreakThreshold(5)
			.setPartBreakThresholdIncrease(8)
			.setTimesPartCanBeBroken(13)
			.setTimesPartHasBeenBroken(17)
			.setDamageTaken(21)
			.setHitzone(TEST_HITZONES)
			.build();

		expect(PART.getName).toBe("Test Name");
		expect(PART.partBreakThreshold).toBe(5);
		expect(PART.partBreakThresholdIncrease).toBe(8);
		expect(PART.timesPartCanBeBroken).toBe(13);
		expect(PART.timesPartHasBeenBroken).toBe(17);
		expect(PART.damageTaken).toBe(21);
		expect(PART.getHitzones).toEqual(TEST_HITZONES);
	})

	test("Properly applies damage to part", () => {
		const PART = new MonsterPart.Builder()
			.setPartBreakThreshold(20)
			.setPartBreakThreshold(20)
			.setTimesPartCanBeBroken(3)
			.build();

		PART.applyDamageToPart(19);
		
		expect(PART.getDamageTaken).toBe(19);
		expect(PART.getTimesPartHasBeenBroken).toBe(0);

		PART.applyDamageToPart(1);

		expect(PART.getDamageTaken).toBe(20);
		expect(PART.getTimesPartHasBeenBroken).toBe(1);

		PART.applyDamageToPart(40);

		expect(PART.getDamageTaken).toBe(60);
		expect(PART.getTimesPartHasBeenBroken).toBe(3);

		PART.applyDamageToPart(500);

		expect(PART.getDamageTaken).toBe(560);
		expect(PART.getTimesPartHasBeenBroken).toBe(3);
	});

})
