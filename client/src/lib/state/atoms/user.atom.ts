import { atomWithReset } from "jotai/utils";

export const accessTokenAtom = atomWithReset<string | null>(null);

