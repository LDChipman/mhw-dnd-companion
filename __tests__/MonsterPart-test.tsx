import { MonsterPart } from "@/app/classes/MonsterPart";
import { Hitzone, damageTypes } from "@/app/classes/Hitzone";

describe("Monster Part Building", () => {

	test("Monster Part Builder Creates Proper Blank Part", () => {
		const PART = new MonsterPart.Builder().build();
		const PROPERLY_BUILT_BASIC_MONSTER_PART = {
			name: "Example Name",
			partBreakThreshold: 0,
			timesPartCanBeBroken: 0,
			timesPartHasBeenBroken: 0,
			damageTaken: 0,

		};
		expect(PART.getName).toBe(PROPERLY_BUILT_BASIC_MONSTER_PART.name);
		expect(PART.getPartBreakThreshold).toBe(PROPERLY_BUILT_BASIC_MONSTER_PART.partBreakThreshold);
		expect(PART.getTimesPartCanBeBroken).toBe(PROPERLY_BUILT_BASIC_MONSTER_PART.timesPartCanBeBroken);
		expect(PART.getTimesPartHasBeenBroken).toBe(PROPERLY_BUILT_BASIC_MONSTER_PART.timesPartHasBeenBroken);
		expect(PART.getDamageTaken).toBe(PROPERLY_BUILT_BASIC_MONSTER_PART.damageTaken);
	});

	test("Properly applies damage to part", () => {
		const PART = new MonsterPart.Builder()
			.setPartBreakThreshold(20)
			.setTimesPartCanBeBroken(3)
			.build();

		PART.applyDamageToPart(19);
		
		expect(PART.getDamageTaken()).toBe(19);
		expect(PART.getTimesPartHasBeenBroken()).toBe(0);

		PART.applyDamageToPart(1);

		expect(PART.getDamageTaken()).toBe(20);
		expect(PART.getTimesPartHasBeenBroken()).toBe(1);

		PART.applyDamageToPart(60);

		expect(PART.getDamageTaken()).toBe(80);
		expect(PART.getTimesPartHasBeenBroken).toBe(3);

		PART.applyDamageToPart(500);

		expect(PART.getDamageTaken()).toBe(580);
		expect(PART.getTimesPartHasBeenBroken).toBe(3);
	});

})
