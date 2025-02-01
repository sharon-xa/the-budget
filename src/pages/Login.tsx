import { Form, useActionData, useNavigate, useNavigation } from "react-router-dom";
import { getAuthToken } from "../utils/auth";
import { useEffect } from "react";

const inputStyles = "w-[100%] bg-[transparent] border-2 border-light-blue focus:outline-none text-light-blue placeholder:text-light-blue px-8 p-[14px]";

const Login = () => {
    const data = useActionData() as { errors: Error[] };
    const navigation = useNavigation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = getAuthToken();
        if (token) {
            navigate("/");
        }
    });

    if (data?.errors) {
        alert("WTF???\n")
    }
    const isSubmitting = navigation.state === "submitting";

    return (
        <div className="flex flex-col justify-center items-center gap-14 h-screen w-[600px]">
            <div className="flex flex-col justify-center items-center gap-4">
                <h1 className="text-white font-bungee text-9xl">REFINE</h1>
                <p className="text-light-blue font-jura text-xl text-justify">
                    We are a team of aspiring developers who aim to challenge the conventional software development and design methods and practices of our community to make a change and refine the current software situation in iraq.
                </p>
            </div>

            <Form method="post" className="flex flex-col justify-center items-center gap-4 text-center font-comfortaa w-96">
                {/* email */}
                <input className={inputStyles} type="text" name="email" placeholder="Email" />

                {/* password */}
                <input className={inputStyles} type="password" name="password" placeholder="Password" />

                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="text-white bg-light-blue py-4 w-[100%] px-16 mt-4 hover:bg-opacity-90"
                >
                    {isSubmitting ? "Loading..." : "Login"}
                </button>
            </Form>
        </div>
    )
}

export default Login;

