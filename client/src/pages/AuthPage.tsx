import Login from "@/components/Login/Login";
import Signup from "@/components/Signup/Signup";
import { useState } from "react";

export default function AuthPage() {

    const [activeTab, setActiveTab] = useState<number>(1);
    const isLogin = activeTab === 1;
    const isSignup = activeTab === 2;
    return (
        <div className="flex w-full gap-5 flex-col justify-center items-center h-full ">
            <div className="flex flex-col gap-5 items-start w-96 bg-white p-10 shadow rounded">
                <span className="font-bold">Linear</span>
                <div className="flex flex-col gap-5 items-start w-full">
                    <div role="tablist" className="tabs tabs-box">
                        <a role="tab" onClick={() => setActiveTab(1)} className={`tab ${isLogin ? 'tab-active' : ''}`}>Login</a>
                        <a role="tab" onClick={() => setActiveTab(2)} className={`tab ${isSignup ? 'tab-active' : ''}`}>Signup</a>
                    </div>
                    <div className="flex w-full">
                        {
                            isLogin ?
                                <Login /> :
                                <Signup />
                        }
                    </div>
                </div>

            </div>

        </div>
    );
}