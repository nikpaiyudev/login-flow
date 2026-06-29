import AuthContainer from "@/components/AuthContainer";
import { verifyEmailIdQueryAtom } from "@/lib/state/query/user-query.atom";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

export default function VerifyEmailIdPage() {

    const [searchParams] = useSearchParams();
    const token = searchParams.get('searchParams');

    const { mutateAsync, isPending, isError } = useAtomValue(verifyEmailIdQueryAtom);

    const verifyUserEmailId = async () => {
        try {
            const res = await mutateAsync(token);
            if (res.success) {

            }
        } catch (err) {
            console.log(err, 'err');
        }
    }

    useEffect(() => {
        if (!token) return;
        verifyUserEmailId();
    }, [token]);

    return (
        <AuthContainer>
            {
                isError ?
                    <span>Failed to Veridy Email Id</span>
                    : isPending ?
                        <span>Verification InProgress !</span>
                        : <span>Email Id Verified</span>
            }
        </AuthContainer>
    );
}