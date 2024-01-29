import { usePostContext } from "../context/post-context";

export default function CreatePost() {
  const { createPostHandler } = usePostContext();
  return (
    <div className="flex justify-center pt-10">
      <form className="w-full max-w-2xl bg-white rounded-lg shadow p-6 space-y-4" onSubmit={createPostHandler}>
        <h2 className="text-lg font-semibold text-gray-900">Create Post</h2>
        <div>
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">What's on your mind?</label>
          <input
            id="title"
            className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            name="title"
            placeholder="Hello world!"
          />
        </div>
        <div>
          <label htmlFor="post-image" className="block mb-2 text-sm font-medium text-gray-700">Upload Image</label>
          <input
            id="post-image"
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
            type="file"
            name="post-image"
          />
        </div>
        <div>
          <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            name="content"
            rows="4"
            placeholder="Tell us more..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Post
        </button>
      </form>
    </div>
  );
}
