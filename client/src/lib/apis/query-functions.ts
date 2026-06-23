import type { UserLoginRequestDto, ResponseDto, UserSignupRequestDto } from "../models/dto/user.dto";
import type { UserFormFields } from "../models/user";

/**
 * Authenticates a user with their login credentials
 * @param userLoginRequestDto - The user's login information containing username/email and password
 * @returns The server response containing authentication details or error information
 */
async function loginUser(userLoginRequestDto: UserLoginRequestDto): Promise<ResponseDto<{ accessToken: string }>> {
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
async function signupUser(userSignupRequestDto: UserSignupRequestDto): Promise<ResponseDto<UserFormFields>> {
    const res = await fetch('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userSignupRequestDto),
        headers: {
            "Content-Type": 'application/json'
        }
    });
    return await res.json();
}

export { loginUser, signupUser };