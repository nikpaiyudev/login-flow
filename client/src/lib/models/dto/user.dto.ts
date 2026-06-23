import { atom } from "jotai";
import type { UserFormFields } from "../user";


export type UserLoginRequestDto = {
    emailId: string;
    password: string;
};

export type UserSignupRequestDto = Omit<UserFormFields, 'passwordAgain'>;


export type ResponseDto<T> = {
    data: T,
    message: string;
    success: boolean;
}