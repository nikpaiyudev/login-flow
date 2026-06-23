import { Controller, useForm } from "react-hook-form";
import Input from "../ui/Input";

export default function ForgotPassword() {
    const { control } = useForm();
    return (
        <form className="w-full flex flex-col gap-5">
            <Controller
                name="password"
                control={control}
                defaultValue={''}
                rules={{ required: 'Password is required' }}
                render={({ field, formState: errors }) => <Input type="emailid" errors={errors.errors} label="emailId" placeholder="Enter Email ID" {...field} />}
            />
        </form>
    );
}