import type { UserLoginRequestDto, UserSignupRequestDto } from "@/lib/models/dto/user.dto";
import { atomWithMutation } from "jotai-tanstack-query";

/**
 * Authenticates a user with their login credentials
 * @param userLoginRequestDto - The user's login information containing username/email and password
 * @returns The server response containing authentication details or error information
 */
async function loginUser(userLoginRequestDto: UserLoginRequestDto) {
    console.log(userLoginRequestDto, 'user');
    const res = await fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(userLoginRequestDto),
        headers: {
            "Content-Type": 'application/json'
        }
    });
    return await res.json();
}

/**
 * Registers a new user with their signup information
 * @param userSignupRequestDto - The user's registration information containing username, email, password and other required details
 * @returns The server response containing account creation details or error information
 */
async function signupUser(userSignupRequestDto: UserSignupRequestDto) {
    const res = await fetch('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userSignupRequestDto),
        headers: {
            "Content-Type": 'application/json'
        }
    });
    return await res.json();
}

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