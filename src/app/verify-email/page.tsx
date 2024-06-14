import { verifyEmail } from "@/actions/authActions";
import { Card, Spinner } from "flowbite-react";
import clsx from "clsx";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const VerifyEmailPage = async ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
  const result = await verifyEmail(searchParams.token);
  return (
    <div className="items-center flex justify-center align-middle h-screen">
      <Card className="max-w-sm w-4/5 mx-auto items-center flex justify-center">
      <h5>Verifying your email please wait</h5>
      {!result && <Spinner />}
      <div
        className={clsx(
          "p-3 rounded-xl w-full flex items-center justify-center gap-x-2 text-sm",
          {
            "text-danger-800 bg-danger-50": result?.status === "error",
            "text-success-800 bg-success-50": result?.status === "success",
          }
        )}
      >
        {result.status === "success" ? (
          <FaCheckCircle size={20}/>
        ) : (
          <FaExclamationTriangle size={20}/>
        )}

        <p>{ result.status === 'success' ? result.data : result.error as string }</p>
      </div>
    </Card>
    </div>
  );
};

export default VerifyEmailPage;
