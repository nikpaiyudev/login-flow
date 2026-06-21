import type { ComponentProps } from "react";

interface InputProps extends ComponentProps<'input'> {
    label: string;
}

export default function Input({ label, ...rest }: InputProps) {
    const name = label.toLowerCase();
    return (
        <div className="w-full flex flex-col gap-2">
            <label htmlFor={name}>{label}</label>
            <input id={name} type="text" placeholder="Type here" className="input" {...rest} />
        </div>
    );
}