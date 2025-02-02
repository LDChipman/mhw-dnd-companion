import { MonsterAttack } from "@/app/classes/MonsterAttack";
import { MonsterPart } from "@/app/classes/MonsterPart";
import { generateMonsterState } from "@/app/classes/MonsterState";

describe("Monster", () => {

	test("Monster Properly Changes States", () => {

		const ENERGY_LEVELS = [generateMonsterState("Normal"), generateMonsterState("Enraged"), generateMonsterState("Tired")];
		const SPECIAL_STATES = [generateMonsterState("Flying"), generateMonsterState("Grounded")];
		const ATTACKS: Array<MonsterAttack> = [];
		const PARTS: Array<MonsterPart> = [];

		const MONSTER = new Monster("Name", ENERGY_LEVELS, SPECIAL_STATES, ATTACKS, PARTS);



		expect(MONSTER.getCurrentEnergyLevel).toBe(ENERGY_LEVELS.at(0));

		MONSTER.setCurrentEnergyLevel(ENERGY_LEVELS.at(1));

		expect(MONSTER.getCurrentEnergyLevel).toBe(ENERGY_LEVELS.at(1));

		MONSTER.setCurrentEnergyLevel(ENERGY_LEVELS.at(2));

		expect(MONSTER.getCurrentEnergyLevel).toBe(ENERGY_LEVELS.at(2));

		MONSTER.setCurrentEnergyLevel(generateMonsterState("Tired"));

		expect(MONSTER.getCurrentEnergyLevel).toBe(ENERGY_LEVELS.at(2));



		expect(MONSTER.getCurrentSpecialState).toBe(SPECIAL_STATES.at(0));

		MONSTER.setCurrentSpecialState(SPECIAL_STATES.at(1));

		expect(MONSTER.getCurrentSpecialState).toBe(SPECIAL_STATES.at(1));

		MONSTER.setCurrentSpecialState(generateMonsterState("Underwater"));

		expect(MONSTER.getCurrentSpecialState).toBe(SPECIAL_STATES.at(1));

	});

	test("Monster Properly Sets all of its Fields during instantiation", () => {

		const NAME = "Name";
		const ENERGY_LEVELS = [generateMonsterState("Normal"), generateMonsterState("Enraged"), generateMonsterState("Tired")];
		const SPECIAL_STATES = [generateMonsterState("Flying"), generateMonsterState("Grounded")];
		const ATTACKS: Array<MonsterAttack> = [new MonsterAttack("Bite", ["Deals 1d8+5 damage"], ENERGY_LEVELS.concat(SPECIAL_STATES))];
		const PARTS: Array<MonsterPart> = [new MonsterPart.Builder().build()];

		const MONSTER = new Monster(NAME, ENERGY_LEVELS, SPECIAL_STATES, ATTACKS, PARTS);

		expect(MONSTER.getEnergyLevels).toBe(ENERGY_LEVELS);
		expect(MONSTER.getSpecialStates).toBe(SPECIAL_STATES);
		expect(MONSTER.getAttacks).toBe(ATTACKS);
		expect(MONSTER.getParts).toBe(PARTS);

	});

	test.todo("Monster Properly Filters ItsNAMNAMEtacks to currently usable attacks");

	test.todo("Monster Properly Changes States Upon Hitting Certain Health Thresholds");

	test.todo("Monster Properly Applies Damage to its Health Bar when receiving an attack to one of its parts");

	test.todo("Monster Stamina Properly Updates when Using an attack and when taking damage");

	test.todo("Monster Properly Updates Status Conditions when dealt status damage from a specialized part")

})
