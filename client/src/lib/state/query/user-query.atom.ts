import { loginUser, signupUser, verifyEmailId } from "@/lib/apis/query-functions";
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


/**
 * Jotai atom that manages the email verification mutation state using TanStack Query
 * Provides loading, error, and success states for the email verification process
 */
const verifyEmailIdQueryAtom = atomWithMutation(() => ({
    mutationFn: verifyEmailId,
    mutationKey: ['verifyEmail']
}));


export { loginUserQueryAtom, signupUserQueryAtom, verifyEmailIdQueryAtom };