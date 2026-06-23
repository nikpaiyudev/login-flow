import { useAtomValue } from "jotai";
import { accessTokenAtom } from "../state/atoms/user.atom";

export default function useAuth() {

    const accessToken = useAtomValue(accessTokenAtom);
    const isLoggedIn = Boolean(accessToken);

    return {
        isLoggedIn
    }
}