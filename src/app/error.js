"use client";

const ErrorPage = () => {
  return (
    <div>
      <h1>Error</h1>
      {/* <p>{error.message}</p> */}
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default ErrorPage;
