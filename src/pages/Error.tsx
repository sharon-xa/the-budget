import { isRouteErrorResponse, useRouteError } from "react-router-dom";

function ErrorPage() {
   const error = useRouteError();

   let title = "An error occurred!";
   let message = "Something went wrong!";

   if (isRouteErrorResponse(error)) {
      if (error.status === 500) {
         message = error.data.message;
      }

      if (error.status === 404) {
         title = "Not found!";
         message = "Could not find resource or page.";
      }

      if (error.status === 400) {
         title = "Bad Request";
         message = "Couldn't parse request data.";
      }
   }

   return (
      <div className="">
         <h1>{title}</h1>
         <p>{message}</p>
      </div>
   );
}

export default ErrorPage;
