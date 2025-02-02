import { MonsterAttack } from "@/app/classes/MonsterAttack";
import { MonsterPart } from "@/app/classes/MonsterPart";
import { generateMonsterState } from "@/app/classes/MonsterState";

describe("Monster Attack", () => {

	test("Monster Attack returns its current description", () => {

		const ATTACK_DESCRIPTION = "Deals 1d10 piercing damage";

		const ATTACK = new MonsterAttack("Bite", [ATTACK_DESCRIPTION], []);

		expect(ATTACK.getCurrentDescription).toBe(ATTACK_DESCRIPTION);

	});

	test("Monster Attack Sets each field properly", () => {

		const NAME = "Test Name";
		const ATTACK_DESCRIPTIONS = [
			"Description 1",
			"Description 2"
		];
		const STATES_OF_USE = [generateMonsterState("Grounded"), generateMonsterState("Normal")];

		const ATTACK = new MonsterAttack(NAME, ATTACK_DESCRIPTIONS, STATES_OF_USE);

		expect(ATTACK.getName).toBe(NAME);
		expect(ATTACK.getDescriptions).toBe(ATTACK_DESCRIPTIONS);
		expect(ATTACK.getUsableStates).toBe(STATES_OF_USE);
		;
	});

	test("Monster Attack Properly Changes Description after Part Break", () => {

		const ATTACK_DESCRIPTION_1 = "Deals 1d8 piercing damage";
		const ATTACK_DESCRIPTION_2 = "Deals 1d6 piercing damage";
		const ATTACK_DESCRIPTION_3 = "Deals 1 piercing damage";

		const PART = new MonsterPart.Builder()
			.setName("Head")
			.setPartBreakThreshold(20)
			.setPartBreakThresholdIncrease(30)
			.setTimesPartCanBeBroken(2)
			.build();

		const ATTACK = new MonsterAttack("Bite", [ATTACK_DESCRIPTION_1, ATTACK_DESCRIPTION_2, ATTACK_DESCRIPTION_3], []);

		PART.getPartBreakNotifier.startListeningForPartBreaks(ATTACK);

		console.log(`${ATTACK.getName} ${ATTACK.getCurrentDescription}`);
		expect(ATTACK.getCurrentDescription).toBe(ATTACK_DESCRIPTION_1);

		console.log(`${PART.getName} takes ${20} damage`);
		PART.applyDamageToPart(20);

		console.log(`${ATTACK.getName} ${ATTACK.getCurrentDescription}`);
		expect(ATTACK.getCurrentDescription).toBe(ATTACK_DESCRIPTION_2);

		console.log(`${PART.getName} takes ${30} damage`);
		PART.applyDamageToPart(30);

		console.log(`${ATTACK.getName} ${ATTACK.getCurrentDescription}`);
		expect(ATTACK.getCurrentDescription).toBe(ATTACK_DESCRIPTION_3);

		console.log(`${PART.getName} takes ${500} damage`);
		PART.applyDamageToPart(500);

		console.log(`${ATTACK.getName} ${ATTACK.getCurrentDescription}`);
		expect(ATTACK.getCurrentDescription).toBe(ATTACK_DESCRIPTION_3);

	});

	test("Properly Adds and Removes Usable States", () => {

		const TEST_STATE = generateMonsterState("Test State 2");

		const ATTACK = new MonsterAttack("Attack Name", [], [generateMonsterState("Test State 1")]);

		expect(ATTACK.getUsableStates).toHaveLength(1);

		ATTACK.addState(TEST_STATE);

		expect(ATTACK.getUsableStates).toHaveLength(2);

		ATTACK.addState(TEST_STATE);

		expect(ATTACK.getUsableStates).toHaveLength(2);

		ATTACK.removeState(TEST_STATE);

		expect(ATTACK.getUsableStates).toHaveLength(1);

		ATTACK.removeState(TEST_STATE);

		expect(ATTACK.getUsableStates).toHaveLength(1);

	})

});
