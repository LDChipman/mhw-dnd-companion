import { MonsterAttack } from "@/app/classes/MonsterAttack";
import { MonsterPart } from "@/app/classes/MonsterPart";

describe("Part Break Notifier", () => {

	test("Properly Adds and Removes Listeners", () => {

		const ATTACK = new MonsterAttack("", [], []);
		const PART = new MonsterPart.Builder()
			.build();

		PART.getPartBreakNotifier.startListeningForPartBreaks(ATTACK);

		expect(PART.getPartBreakNotifier.getListeners).toHaveLength(1);

		PART.getPartBreakNotifier.stopListeningForPartBreaks(ATTACK);

		expect(PART.getPartBreakNotifier.getListeners).toHaveLength(0);

	});

})
