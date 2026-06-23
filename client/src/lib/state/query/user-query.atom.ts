import { loginUser, signupUser } from "@/lib/apis/query-functions";
import { atomWithMutation } from "jotai-tanstack-query";



/**
 * Jotai atom that manages the login mutation state using TanStack Query
 * Provides loading, error, and success states for the user authentication process
 */
const loginUserQueryAtom = atomWithMutation(() => ({
    mutationFn: loginUser,
    mutationKey: ['login']
}));

/**
 * Jotai atom that manages the signup mutation state using TanStack Query
 * Provides loading, error, and success states for the user registration process
 */
const signupUserQueryAtom = atomWithMutation(() => ({
    mutationFn: signupUser,
    mutationKey: ['signup']
}));


export { loginUserQueryAtom, signupUserQueryAtom };