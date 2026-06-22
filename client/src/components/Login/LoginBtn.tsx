import type { UserFormFields } from "@/lib/models/user";
import { loginUserQueryAtom } from "@/lib/state/query/user-query.atom";
import { useAtomValue } from "jotai";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";

export default function LoginBtn() {

    const { handleSubmit } = useFormContext();
    const { mutate } = useAtomValue(loginUserQueryAtom);
    const navigate = useNavigate();

    const onSubmit = (data: Omit<UserFormFields, 'fullName' | 'username' | 'passwordAgain'>) => {
        console.log(data, 'data');
        mutate(data);
        navigate('/home');
    }

    return (
        <button type="submit" onClick={handleSubmit(onSubmit)} className="btn btn-primary">Login</button>
    );
}