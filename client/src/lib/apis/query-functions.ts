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

/**
 * Verifies a user's email address using the verification token sent to their email
 * @param verificationToken - The unique token received via email to confirm the user's email ownership
 * @returns The server response containing verification status or error information
 */
async function verifyEmailId(verificationToken: string): Promise<ResponseDto<null>> {
    const res = await fetch('/auth/verify-email', {
        method: 'POST',
        body: JSON.stringify({ token: verificationToken }),
        headers: {
            "Content-Type": 'application/json'
        }

    });
    return await res.json();
}

export { loginUser, signupUser, verifyEmailId };