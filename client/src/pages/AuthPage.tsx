import AuthContainer from "@/components/AuthContainer"; 
import Login from "@/components/Login/Login";
import Signup from "@/components/Signup/Signup";
import useAuth from "@/lib/hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function AuthPage() {

    const [activeTab, setActiveTab] = useState<number>(1);
    const isLogin = activeTab === 1;
    const isSignup = activeTab === 2;
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/home');
        }
    }, [isLoggedIn]);

    return (
        <AuthContainer>
            <span className="font-bold text-base">LINEAR AI</span>   
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
        </AuthContainer>
    );
}