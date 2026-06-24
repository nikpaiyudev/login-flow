import type { ReactNode } from "react";

interface AuthContainerProps {
    children: ReactNode;
}

export default function AuthContainer(props: AuthContainerProps) {

    return (
        <div className="flex w-full justify-center items-center gap-5 min-h-screen">
            <div className="flex flex-col gap-5 items-start w-96 bg-white p-10 rounded">
                {props.children}
            </div>
        </div>
    );
}
