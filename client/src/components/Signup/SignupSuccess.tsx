import { CircleCheck } from "lucide-react";
import { motion } from "motion/react";

export default function SignupSuccess() {

    return (
        <motion.div
            key="success"
            className="w-full flex flex-col justify-center items-start gap-3 mt-5 bg-green-100 p-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <CircleCheck className="text-green-500" />
            <span>Successfully signed up ! Please check your mailbox for verification email</span>
        </motion.div>
    );
}