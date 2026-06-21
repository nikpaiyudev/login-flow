import Input from "./ui/Input";

export default function LoginForm() {

    return (
        <form>
            <Input label={'Full Name'} placeholder={'Enter Fullname'} />
            <Input label={'EmailId'} placeholder={'Enter EmailId'} />
            <Input label={''} />
        </form>
    );
}