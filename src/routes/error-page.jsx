import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  const handleError = () => {
    if (
      error.message ===
      "Cannot read properties of undefined (reading 'proposer')"
    ) {
      return <>Proposal does not exist</>;
    }
  };

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>
        Sorry, <i>{error.statusText || handleError()}</i>
      </p>
    </div>
  );
}
