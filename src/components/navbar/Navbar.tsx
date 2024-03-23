import { Form } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="flex items-center justify-center">
            <div className="flex justify-between items-center w-[100%] max-w-screen-2xl text-white m-6">
                <a href="http://localhost:5173">
                    <h1 className="font-bungee text-5xl cursor-pointer">Refine</h1>
                </a>
                <Form action="/logout" method="post">
                    <button className="btn bg-grey font-comfortaa !py-4 !px-8"> Logout </button>
                </Form>
            </div>
        </header>
    )
}

export default Navbar;
