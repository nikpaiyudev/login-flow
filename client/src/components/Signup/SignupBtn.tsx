import type { UserFormFields } from "@/lib/models/user";
import { signupUserQueryAtom } from "@/lib/state/query/user-query.atom";
import { useAtomValue } from "jotai";
import { useFormContext } from "react-hook-form";

export default function SignupBtn() {

    const { handleSubmit } = useFormContext();
    const { mutate } = useAtomValue(signupUserQueryAtom);

    const onSubmit = (data: UserFormFields) => {
        if (!data) return;
        const { emailId, fullName, password, username } = data;
        mutate({ emailId, fullName, password, username });
    }

    return (
        <button type="submit" onClick={handleSubmit(onSubmit)} className="btn btn-primary">Signup</button>
    );
}