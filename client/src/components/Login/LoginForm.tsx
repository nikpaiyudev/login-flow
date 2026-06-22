import { Controller, useFormContext } from "react-hook-form";
import Input from "../ui/Input";
import { EMAIL_REGEX } from "@/lib/constants/regex";

export default function LoginForm() {

    const { control } = useFormContext();

    return (
        <div className="flex gap-5 flex-col w-full">
            <Controller
                name="emailId"
                control={control}
                defaultValue={''}
                rules={{
                    required: 'EmailId is required', pattern: {
                        message: 'Enter a valid emailId',
                        value: new RegExp(EMAIL_REGEX)
                    }
                }}
                render={({ field, formState: errors }) => <Input errors={errors.errors} label="EmailId" placeholder="Enter EmailId" {...field} />}
            />
            <Controller
                name="password"
                control={control}
                defaultValue={''}
                rules={{ required: 'Password is required' }}
                render={({ field, formState: errors }) => <Input type="password" errors={errors.errors} label="Password" placeholder="Enter Password" {...field} />}
            />
        </div>
    );
}