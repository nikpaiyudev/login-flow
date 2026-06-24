import { Controller, useFormContext } from "react-hook-form";
import Input from "../ui/Input";
import { EMAIL_REGEX } from "@/lib/constants/regex";

export default function SignupForm() {

    const { control } = useFormContext();

    return (
        <div className="flex gap-5 flex-col w-full">
            <Controller
                name="fullName"
                control={control}
                render={({ field, formState: { errors } }) => <Input errors={errors} label="Full Name" placeholder="Enter Fullname" {...field} />}
            />
            <Controller
                name="emailId"
                control={control}
                rules={{
                    required: 'EmailId is required', pattern: {
                        value: new RegExp(EMAIL_REGEX),
                        message: 'Emailid is invalid'
                    }
                }}
                render={({ field, formState: { errors } }) => <Input type="email" errors={errors} label="EmailId" placeholder="Enter EmailId" {...field} />}
            />
            <Controller
                name="username"
                control={control}
                rules={{
                    required: 'Username is required'
                }}
                render={({ field, formState: { errors } }) => <Input errors={errors} label="Username" placeholder="Enter Username" {...field} />}
            />
            <Controller
                name="password"
                control={control}
                rules={{ required: 'Password is required' }}
                render={({ field, formState: { errors } }) => <Input type="password" errors={errors} label="Password" placeholder="Enter Password" {...field} />}
            />
            <Controller
                name="passwordAgain"
                control={control}
                rules={{
                    required: 'Password Again is required', validate: (value) => {
                        if (value !== control._formValues.password) {
                            return 'Passwords do not match';
                        }
                        return true;
                    }
                }}
                render={({ field, formState: { errors } }) => <Input type="password" errors={errors} label="Enter Password again" placeholder="Enter Password Again" {...field} />}
            />
        </div>
    );
}