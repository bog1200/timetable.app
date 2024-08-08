import { doSocialLogin } from "@/app/actions";

const SocialLogins = () => {
    return (
        <form action={doSocialLogin}>
            <button
                className="bg-black text-white p-1 rounded-md m-1 text-lg"
                type="submit"
                name="action"
                value="github"
            >
                Sign In With GitHub
            </button>
        </form>
    );
};

export default SocialLogins;