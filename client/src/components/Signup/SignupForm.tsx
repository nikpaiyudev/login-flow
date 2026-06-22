import { Controller, useFormContext } from "react-hook-form";
import Input from "../ui/Input";

export default function SignupForm() {

    const { control } = useFormContext();

    return (
        <div className="flex gap-5 flex-col w-full">
            <Controller
                name="fullName"
                control={control}
                render={({ field }) => <Input label="Full Name" placeholder="Enter Fullname" {...field} />}
            />
            <Controller
                name="emailId"
                control={control}
                render={({ field }) => <Input label="EmailId" placeholder="Enter EmailId" {...field} />}
            />
            <Controller
                name="username"
                control={control}
                render={({ field }) => <Input label="Username" placeholder="Enter Username" {...field} />}
            />
            <Controller
                name="password"
                control={control}
                render={({ field }) => <Input label="Password" placeholder="Enter Password" {...field} />}
            />
            <Controller
                name="passwordAgain"
                control={control}
                render={({ field }) => <Input label="Enter Password again" placeholder="Enter Password Again" {...field} />}
            />
        </div>
    );
}