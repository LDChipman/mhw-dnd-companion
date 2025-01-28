import { MonsterPart } from "@/app/classes/MonsterPart";
import { damageTypes, generateHitzonesFromArray, generateHitzone, Hitzone, adjustDamageForHitzone } from "@/app/classes/Hitzone";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

//Use to get a random number that can be any number between the negative of the number provided and the number provided
export function getRandomIntWithNegatives(maxValue: number): number {
	const MAX_DOUBLED = maxValue * 2;
	return Math.floor((Math.random() * MAX_DOUBLED) - maxValue);
}

//Use to get a random number that can be any number from 0 to the number provided
export function getRandomInt(maxValue: number): number {
	return Math.floor(Math.random() * maxValue);
}

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
			.setHitzones(TEST_HITZONES)
			.build();

		expect(PART.getName).toBe("Test Name");
		expect(PART.getPartBreakThreshold).toBe(5);
		expect(PART.getPartBreakThresholdIncrease).toBe(8);
		expect(PART.getTimesPartCanBeBroken).toBe(13);
		expect(PART.getTimesPartHasBeenBroken).toBe(17);
		expect(PART.getDamageTaken).toBe(21);
		expect(PART.getHitzones).toEqual(TEST_HITZONES);
	})

	test("Properly applies damage to part", () => {
		const PART = new MonsterPart.Builder()
			.setPartBreakThreshold(20)
			.setPartBreakThresholdIncrease(20)
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

	test("Creation and Use of Monster Part", () => {
		const PART_BREAK_THRESHOLD_AND_INCREASE = getRandomInt(20);
		const TIMES_PART_CAN_BE_BROKEN = getRandomInt(10);
		const HITZONE_MODIFIER = getRandomIntWithNegatives(100);
		const HITZONE_MINIMUM = getRandomInt(10);
		const HITZONE = generateHitzone(damageTypes.piercing, HITZONE_MODIFIER, HITZONE_MINIMUM);
		const RAW_DAMAGE = getRandomInt(500);

		const PART = new MonsterPart.Builder()
			.setPartBreakThreshold(PART_BREAK_THRESHOLD_AND_INCREASE)
			.setPartBreakThresholdIncrease(PART_BREAK_THRESHOLD_AND_INCREASE)
			.setTimesPartCanBeBroken(TIMES_PART_CAN_BE_BROKEN)
			.setHitzones([HITZONE])
			.build();

		const CURRENT_HITZONE = PART.getHitzones.filter((currentHitzone) => currentHitzone.type == damageTypes.piercing).at(0);

		PART.applyDamageToPart(adjustDamageForHitzone(RAW_DAMAGE, CURRENT_HITZONE!));

		if (RAW_DAMAGE + HITZONE_MODIFIER <= HITZONE_MINIMUM) {
			expect(PART.getDamageTaken).toBe(HITZONE_MINIMUM);
		} else {
			expect(PART.getDamageTaken).toBe(RAW_DAMAGE + HITZONE_MODIFIER);
		}

		if (RAW_DAMAGE + HITZONE_MODIFIER >= PART_BREAK_THRESHOLD_AND_INCREASE) {
			if (Math.floor(RAW_DAMAGE / PART_BREAK_THRESHOLD_AND_INCREASE) <= TIMES_PART_CAN_BE_BROKEN) {
				expect(PART.getTimesPartHasBeenBroken).toBe(RAW_DAMAGE / PART_BREAK_THRESHOLD_AND_INCREASE);
			} else {
				expect(PART.getTimesPartHasBeenBroken).toBe(TIMES_PART_CAN_BE_BROKEN);
			}
		}

	})

})
