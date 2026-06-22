import type { UserFormFields } from "../user";

export type UserLoginRequestDto = {
    emailId: string;
    password: string;
};

export type UserSignupRequestDto = Omit<UserFormFields, 'passwordAgain'>;