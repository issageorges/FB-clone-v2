import { useUserContext } from "../context/user-context";
import Footer from '../components/footer';

export default function Register() {
  const { registerHandler } = useUserContext();

  return (
    <>
      <div className="flex items-center justify-center bg-gray-100 px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-start w-full max-w-4xl bg-white shadow-md">
          <div className="md:w-full p-6 m-6">
            <form onSubmit={registerHandler} className="flex flex-col">
              <h2 className="text-4xl font-bold text-blue-600 mb-4">Register</h2>

              <label htmlFor="name" className="mt-4">Name:</label>
              <input className="mb-3 p-2 border rounded-md" type="text" name="name" />

              <label htmlFor="email">Email:</label>
              <input className="mb-3 p-2 border rounded-md" type="email" name="email" />

              <label htmlFor="password">Password:</label>
              <input className="mb-3 p-2 border rounded-md" type="password" name="password" />

              <label htmlFor="profile-image">Upload Image:</label>
              <input
                id="profile-image"
                className="border"
                type="file"
                name="profile-image"
              />

              <button type="submit" className="mb-3 p-2 bg-blue-600 text-white rounded-md">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

