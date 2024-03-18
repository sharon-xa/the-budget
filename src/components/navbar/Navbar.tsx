import { Form } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="flex items-center justify-center">
            <div className="flex justify-between w-[100%] m-4 p-6 max-w-screen-2xl">
                <div>Refine</div>
                <Form action="/logout" method="post">
                    <button className={""}> Logout </button>
                </Form>
            </div>
        </header>
    )
}

export default Navbar;
