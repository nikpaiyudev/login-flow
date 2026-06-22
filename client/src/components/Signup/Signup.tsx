import { FormProvider, useForm } from "react-hook-form";

import type { UserFormFields } from "@/lib/models/user";
import SignupForm from "./SignupForm";
import SignupBtn from "./SignupBtn";

export default function Signup() {
    const form = useForm<UserFormFields>({ mode: 'onChange' });

    return (
        <FormProvider {...form} >
            <form className="w-full flex flex-col gap-5">
                <SignupForm />
                <SignupBtn />
            </form>
        </FormProvider>
    );
}