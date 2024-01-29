import { useUserContext } from "../context/user-context";

export default function Login() {
  const { loginHandler } = useUserContext();

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">Login</h1>

      <form onSubmit={loginHandler} className="flex flex-col gap-4">
        <label htmlFor="">Email:</label>
        <input className="border" type="email" name="email" />
        <label htmlFor="">Password:</label>
        <input className="border" type="password" name="password" />
        <button type="submit" className="border w-16">
          Submit
        </button>
      </form>
    </div>
  );
}