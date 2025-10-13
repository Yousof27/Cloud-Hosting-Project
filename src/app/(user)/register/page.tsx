import RegisterForm from "@/components/forms/RegisterForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value;

  if (token) redirect("/");

  return (
    <main className="fix-height container !m-auto !px-7 flex items-center justify-center">
      <div className="!m-auto bg-white rounded-lg !p-5 w-full md:w-2/3">
        <h1 className="text-3xl font-bold text-gray-800 !mb-5">Create New Account</h1>
        <RegisterForm />
      </div>
    </main>
  );
};

export default RegisterPage;
