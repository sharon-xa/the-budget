import axios from "axios";
import { Form, json, redirect, useActionData, useNavigation } from "react-router-dom";

const inputStyles = "w-[100%] bg-[transparent] border-2 border-light-blue focus:outline-none text-light-blue placeholder:text-light-blue px-8 py-4";

const Login = () => {
    const data = useActionData() as { errors: Error[] };
    const navigation = useNavigation();

    if (data?.errors) {
        alert("nigga WTF???\n")
    }
    const isSubmitting = navigation.state === "submitting";

    return (
        <div className="flex flex-col justify-center items-center gap-14 h-screen w-[600px]">
            <div className="flex flex-col justify-center items-center gap-4">
                <h1 className="text-white font-bungee text-9xl">REFINE</h1>
                <p className="text-light-blue font-jura text-xl text-justify">
                    We have each other, we have a leader, and also have a "budget", in the other hand we have the spirit, the potential, the meaning of continuing the great work to "refine"  the technology in our wonderful country.
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


export async function action({ request }: { request: Request }) {
    const data = await request.formData();
    const authData = {
        email: data.get("email")?.toString().trim(),
        password: data.get("password")?.toString().trim(),
    };

    const user = await axios.post("http://localhost:8080/login", JSON.stringify(authData)).then((response) => {
        const user = response.data as LoginResponseType;
        return user
    }).catch(function(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            // "422" unprocessable entity, 401 Unauthorized
            if (error.response.status === 422 || error.response.status === 401 || error.response.status === 400)
                throw json({ message: "Could not authenticate user." }, { status: 500 });

            if (error.response.status !== 200)
                throw json({ message: "Could not authenticate user." }, { status: 500 });
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
        return null
    })

    if (!user) return;

    const { token, role } = user;
    if (!token) return null

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 24);
    localStorage.setItem("expiration", expiration.toISOString());

    return redirect("/");
}
