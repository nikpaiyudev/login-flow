import type { UserFormFields } from "@/lib/models/user";
import { useFormContext } from "react-hook-form";

export default function LoginBtn() {

    const { handleSubmit } = useFormContext();

    const onSubmit = (data: UserFormFields) => {
        console.log(data, 'data');
    }

    return (
        <button type="submit" onClick={handleSubmit(onSubmit)} className="btn btn-primary">Login</button>
    );
}