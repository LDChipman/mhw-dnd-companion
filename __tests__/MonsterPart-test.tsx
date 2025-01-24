import { MonsterPart } from "@/app/classes/MonsterPart";

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

})
