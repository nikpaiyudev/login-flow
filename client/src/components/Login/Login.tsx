import { FormProvider, useForm } from "react-hook-form";
import type { UserFormFields } from "@/lib/models/user";
import LoginForm from "./LoginForm";
import LoginBtn from "./LoginBtn";

export default function Login() {
    const form = useForm<UserFormFields>({ mode: 'onChange' });

    return (
        <FormProvider {...form} >
            <form className="w-full flex flex-col gap-5">
                <LoginForm />
                <LoginBtn />
            </form>
        </FormProvider>
    );
}