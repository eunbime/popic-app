import RegisterForm from "@/components/form/register-form";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h1 className="text-2xl font-bold text-black dark:text-white">
        Register
      </h1>
      <RegisterForm />
    </div>
  );
}
