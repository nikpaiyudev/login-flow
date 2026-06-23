import { useNavigate } from "react-router";

export default function ForgotPasswordBtn() {
    const navigate = useNavigate();
        
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate('/forgot-password');
    }
    return (
        <button onClick={handleClick} className="btn btn-ghost" >Forgot Password</button>
    );
}