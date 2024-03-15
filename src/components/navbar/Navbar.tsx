import { Form } from "react-router-dom";

const Navbar = () => {

    return (
        <nav className="">
            <div className="">
                <Form action="/logout" method="post">
                    <button className={""}> Logout </button>
                </Form>
            </div>
        </nav>
    )
}

export default Navbar;
