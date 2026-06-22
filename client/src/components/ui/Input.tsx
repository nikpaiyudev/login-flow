import { forwardRef, type ComponentProps } from "react";
import type { FieldErrors, FieldValues } from "react-hook-form";

interface InputProps extends ComponentProps<'input'> {
    label: string;
    errors: FieldErrors<FieldValues>
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    { label, errors, name, ...rest },
    ref
) {
    const id = label.toLowerCase();
    const isError = Boolean(errors) && errors[name];
    const error = errors[name];
    return (
        <div className="w-full flex flex-col gap-2">
            <label htmlFor={id} className="text-sm">{label}</label>
            <input ref={ref} id={id} type="text" placeholder="Type here" className={`input w-full ${isError ? 'border-red-600' : ''}`} {...rest} />
            {isError ? <small className="text-red-600">{error.message.toString()}</small> : null}
        </div>
    );
});

export default Input;