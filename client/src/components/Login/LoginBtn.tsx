import type { UserFormFields } from "@/lib/models/user";
import { accessTokenAtom } from "@/lib/state/atoms/user.atom";

import { loginUserQueryAtom } from "@/lib/state/query/user-query.atom";
import { useAtomValue, useSetAtom } from "jotai";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";

export default function LoginBtn() {

    const { handleSubmit } = useFormContext();
    const { mutateAsync } = useAtomValue(loginUserQueryAtom);
    const setAccessToken = useSetAtom(accessTokenAtom);
    const navigate = useNavigate();

    const onSubmit = async (data: Omit<UserFormFields, 'fullName' | 'username' | 'passwordAgain'>) => {
        const res = await mutateAsync(data);
        setAccessToken(res.data.accessToken);
        navigate('/home');
    }

    return (
        <button type="submit" onClick={handleSubmit(onSubmit)} className="btn btn-primary">Login</button>
    );
}