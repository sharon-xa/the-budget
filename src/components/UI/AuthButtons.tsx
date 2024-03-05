import { Form, Link } from "react-router-dom";

const buttonStyle = `py-3 px-6 rounded bg-slate-700 text-[#fff] hover:bg-slate-600 bg-white bg-opacity-10 hover:bg-opacity-20`;

export const LoginButton = () => {
    return (
        <Link to={"/login"}>
            <button className={buttonStyle}> Sign in </button>
        </Link>
    )
}

export const LogoutButton = () => {
    return (
        <Form action="/logout" method="post">
            <button className={buttonStyle}> Logout </button>
        </Form>
    )
}
