import { forwardRef, type ComponentProps } from "react";

interface InputProps extends ComponentProps<'input'> {
    label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    { label, ...rest },
    ref
) {
    const id = label.toLowerCase();
    return (
        <div className="w-full flex flex-col gap-2">
            <label htmlFor={id} className="text-sm">{label}</label>
            <input ref={ref} id={id} type="text" placeholder="Type here" className="input w-full" {...rest} />
        </div>
    );
});

export default Input;