import type { ReactNode } from "react";

interface AuthContainerProps {
    children: ReactNode;
}

export default function AuthContainer(props: AuthContainerProps) {

    return (
               <div className="flex w-full gap-5 flex-col justify-center items-center h-full ">
                    <div className="flex flex-col gap-5 items-start w-96 bg-white p-10 shadow rounded">
                        {props.children}
                    </div>
                </div>
    );
}
