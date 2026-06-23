import AuthContainer from "@/components/AuthContainer";
import Input from "@/components/ui/Input";
import { EMAIL_REGEX } from "@/lib/constants/regex";
import { Controller, useForm } from "react-hook-form";

export default function ForgotPasswordPage() {

    const { control } = useForm({ mode: 'onSubmit' });

    return (
        <AuthContainer>
            <span className="font-bold">Linear</span>
            <span>Please enter your email to reset password</span>
            <form className="flex flex-col w-full gap-5">
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
                <button className="btn btn-primary">Submit</button>
            </form>
        </AuthContainer>
    );
}