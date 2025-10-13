"use client";
import Link from "next/link";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <div className="fix-height !pt-7 text-center">
      <div className="text-3xl text-red-600 font-semibold">Something Went Wrong !</div>
      <h2 className="text-xl text-gray-700 !my-3">Error Message: {error.message}</h2>
      <button onClick={() => reset()} className="bg-blue-500 transition-all hover:bg-blue-700 text-white font-bold !py-2 !px-4 rounded-full cursor-pointer">
        Try Again
      </button>
      <Link href="/" className="text-xl underline text-blue-700 block !mt-6">
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
