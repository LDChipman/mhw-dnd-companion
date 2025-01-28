import { MonsterAttack } from "@/app/classes/MonsterAttack";
import { MonsterPart } from "@/app/classes/MonsterPart";

describe("Monster Attack", () => {

	test("Monster Attack returns its current description", () => {

		const ATTACK_DESCRIPTION = "Deals 1d10 piercing damage";

		const ATTACK = new MonsterAttack("Bite", [ATTACK_DESCRIPTION]);

		expect(ATTACK.getCurrentDescription).toBe(ATTACK_DESCRIPTION);

	});

	test("Monster Attack Sets each field properly", () => {

		const NAME = "Test Name";
		const ATTACK_DESCRIPTIONS = [
			"Description 1",
			"Description 2"
		];

		const ATTACK = new MonsterAttack(NAME, ATTACK_DESCRIPTIONS);

		expect(ATTACK.getName).toBe(NAME);
		expect(ATTACK.getDescriptions).toBe(ATTACK_DESCRIPTIONS);

	});

	test("Monster Attack Properly Changes Description after Part Break", () => {

		const ATTACK_DESCRIPTION_1 = "Deals 1d8 piercing damage";
		const ATTACK_DESCRIPTION_2 = "Deals 1d6 piercing damage";
		const ATTACK_DESCRIPTION_3 = "Deals 1 piercing damage";

		const PART = new MonsterPart.Builder()
			.setPartBreakThreshold(20)
			.setPartBreakThresholdIncrease(30)
			.setTimesPartCanBeBroken(2)
			.build();

		const ATTACK = new MonsterAttack("Bite", [ATTACK_DESCRIPTION_1, ATTACK_DESCRIPTION_2, ATTACK_DESCRIPTION_3]);

		PART.getPartBreakNotifier.startListeningForPartBreaks(ATTACK);

		expect(ATTACK.getCurrentDescription).toBe(ATTACK_DESCRIPTION_1);

		PART.applyDamageToPart(20);

		expect(ATTACK.getCurrentDescription).toBe(ATTACK_DESCRIPTION_2);

		PART.applyDamageToPart(30);

		expect(ATTACK.getCurrentDescription).toBe(ATTACK_DESCRIPTION_3);

		PART.applyDamageToPart(500);

		expect(ATTACK.getCurrentDescription).toBe(ATTACK_DESCRIPTION_3);

	});

	test("Monster Attack Properly Starts and Stops Listening for Part Breaks", () => {

		const ATTACK = new MonsterAttack("", []);
		const PART = new MonsterPart.Builder()
			.build();

		PART.getPartBreakNotifier.startListeningForPartBreaks(ATTACK);

		expect(PART.getPartBreakNotifier.getListeners).toHaveLength(1);

		PART.getPartBreakNotifier.stopListeningForPartBreaks(ATTACK);

		expect(PART.getPartBreakNotifier.getListeners).toHaveLength(0);

	});

});
