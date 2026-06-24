import AuthContainer from "@/components/AuthContainer";
import Login from "@/components/Login/Login";
import Signup from "@/components/Signup/Signup";
import useAuth from "@/lib/hooks/useAuth";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function AuthPage() {

    const [activeTab, setActiveTab] = useState<number>(1);
    const [direction, setDirection] = useState<number>(1);
    const isLogin = activeTab === 1;
    const isSignup = activeTab === 2;
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    function handleTabChange(nextTab: number) {
        if (nextTab === activeTab) {
            return;
        }

        setDirection(nextTab > activeTab ? 1 : -1);
        setActiveTab(nextTab);
    }

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
                    <a role="tab" onClick={() => handleTabChange(1)} className={`tab ${isLogin ? 'tab-active' : ''}`}>Login</a>
                    <a role="tab" onClick={() => handleTabChange(2)} className={`tab ${isSignup ? 'tab-active' : ''}`}>Signup</a>
                </div>
                <div className="flex w-full">
                    <AnimatePresence mode="wait" initial={false} custom={direction}>
                        {isLogin ? (
                            <motion.div
                                key="login"
                                className="w-full"
                                custom={activeTab}
                                initial={{ opacity: 0, x: direction * -24 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: direction * 24 }}
                                transition={{ duration: 0.28, ease: "easeOut" }}
                            >
                                <Login />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="signup"
                                className="w-full"
                                custom={activeTab}
                                initial={{ opacity: 0, x: direction * 24 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: direction * -24 }}
                                transition={{ duration: 0.28, ease: "easeOut" }}
                            >
                                <Signup />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </AuthContainer>
    );
}
