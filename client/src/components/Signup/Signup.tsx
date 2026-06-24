import { FormProvider, useForm } from "react-hook-form";

import type { UserFormFields } from "@/lib/models/user";
import SignupForm from "./SignupForm";
import SignupBtn from "./SignupBtn";
import { signupUserQueryAtom } from "@/lib/state/query/user-query.atom";
import { useAtomValue } from "jotai";
import SignupSuccess from "./SignupSuccess";

export default function Signup() {
    const form = useForm<UserFormFields>({ mode: 'onChange' });
    const { data } = useAtomValue(signupUserQueryAtom);
    const isUserSignup = data && data.success;

    return (
        <div className="w-full">
            {
                isUserSignup ?
                    <SignupSuccess />
                    :
                    <FormProvider {...form} >
                        <form className="w-full flex flex-col gap-5">
                            <SignupForm />
                            <SignupBtn />
                        </form>
                    </FormProvider>
            }

        </div>
    );
}