import { FormProvider, useForm } from "react-hook-form";
import type { UserFormFields } from "@/lib/models/user";
import LoginForm from "./LoginForm";
import LoginBtn from "./LoginBtn";
import ForgotPasswordBtn from "../ForgotPassword/ForgotPasswordBtn";

export default function Login() {
    const form = useForm<UserFormFields>({ mode: 'onSubmit' });

    return (
        <FormProvider {...form} >
            <form className="w-full flex flex-col gap-5">
                <LoginForm />
                <LoginBtn />
                <ForgotPasswordBtn />
            </form>
        </FormProvider>
    );
}