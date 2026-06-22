import { Controller, useFormContext } from "react-hook-form";
import Input from "../ui/Input";

export default function LoginForm() {

    const { control } = useFormContext();

    return (
        <div className="flex gap-5 flex-col w-full">
            <Controller
                name="emailId"
                control={control}
                render={({ field }) => <Input label="EmailId" placeholder="Enter EmailId" {...field} />}
            />
            <Controller
                name="password"
                control={control}
                render={({ field }) => <Input label="Password" placeholder="Enter Password" {...field} />}
            />
        </div>
    );
}