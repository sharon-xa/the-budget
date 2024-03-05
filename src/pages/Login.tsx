import axios from "axios";
import { Form, json, redirect, useActionData, useNavigation } from "react-router-dom";

const Login = () => {
    const data = useActionData() as { errors: Error[] };
    const navigation = useNavigation();

    if (data?.errors) {
        alert("nigga WTF???\n")
    }
    const isSubmitting = navigation.state === "submitting";

    return (
        <div className="h-96 w-[90%] max-w-4xl bg-black bg-opacity-40 rounded-lg flex justify-center items-center shadow-xl">
            <Form method="post" className="flex flex-col justify-center items-center p-10 gap-6 text-center">
                <span className="font-semibold text-xl">
                    Member Login
                </span>
                <div className="flex flex-col gap-2">
                    {/* username */}
                    <input className="w-[100%] p-1" type="text" name="username" placeholder="Username" />

                    {/* email */}
                    <input className="w-[100%] p-1" type="text" name="email" placeholder="Email" />

                    {/* password */}
                    <input className="w-[100%] p-1" type="password" name="password" placeholder="Password" />
                </div>

                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="bg-green hover:bg-[#19cc8ad8] text-white bg-opacity-50 py-2 px-16 rounded-md"
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
        username: data.get("username")?.toString().trim(),
        email: data.get("email")?.toString().trim(),
        password: data.get("password")?.toString().trim(),
    };

    const user = await axios.post("http://localhost:8080/login", JSON.stringify(authData)).then((response) => {
        const user = response.data as LoginResponseType;
        return user
    }).catch(function (error) {
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

    if (!user)
        return


    const { token, role } = user;
    if (!token) return null

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 24);
    localStorage.setItem("expiration", expiration.toISOString());

    return redirect("/");
}