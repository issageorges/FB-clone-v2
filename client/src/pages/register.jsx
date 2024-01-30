import { useUserContext } from "../context/user-context";

export default function Register() {
  const { registerHandler,profilePicHandler } = useUserContext();

  return (
    <div>
      <h1 className="text-xl font-bold mb-6">Register</h1>

      <form onSubmit={registerHandler} className="flex flex-col gap-4">
        <label htmlFor="name">Name:</label>
        <input className="border" type="text" name="name" id="name" />

        <label htmlFor="email">Email:</label>
        <input className="border" type="email" name="email" id="email" />

        <label htmlFor="password">Password:</label>
        <input className="border" type="password" name="password" id="password" />

        <label htmlFor="profile-image">Upload Image:</label>
        <input
          id="profile-image"
          className="border"
          type="file"
          name="profile-image"
        />

        <button type="submit" className="border w-16 mt-4">
          Submit
        </button>
      </form>
    </div>
  );
}
