import { useUserContext } from "../context/user-context";

export default function Register() {
  const { registerHandler } = useUserContext();
  return (
    <div>
      <h1 className="text-xl font-bold mb-6">Register</h1>

      <form onSubmit={registerHandler} className="flex flex-col gap-4">

        <label htmlFor="">Name:</label>
        <input className="border" type="text" name="name" />
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
