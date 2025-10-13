import Link from "next/link";

const NotFoundPage = () => {
  return (
    <section className="fix-height flex flex-col justify-center items-center">
      <h1 className="text-7xl text-gray-800 font-bold">404</h1>
      <p className="text-gray-500 text-3xl !mt-2 !mb-5">Page Not Found</p>
      <Link href="/" className="text-xl underline text-blue-700 block !mt-6">
        Go back to Home
      </Link>
    </section>
  );
};

export default NotFoundPage;
