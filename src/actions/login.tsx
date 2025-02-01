import axios from "axios";
import { json, redirect } from "react-router-dom";

export async function loginAction({ request }: { request: Request }) {
  const data = await request.formData();
  const authData = {
    email: data.get("email")?.toString().trim(),
    password: data.get("password")?.toString().trim(),
  };

  const user = await axios.post("/login", JSON.stringify(authData)).then((response) => {
    const user = response.data as LoginResponseType;
    axios.defaults.headers.common["Authorization"] = user.token;
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
