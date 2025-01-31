import uuid from "react-native-uuid";

export type MonsterState = {
	name: string;
	id: string;
}

export function generateMonsterState(name: string): MonsterState {
	return { name: name, id: uuid.v4() };
}
