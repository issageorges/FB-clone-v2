import { useBlogContext } from "../context/blog-context";

export default function CreateBlog() {
  const { createBlogHandler } = useBlogContext();
  return (
    <form className="flex px-2 flex-col gap-4" onSubmit={createBlogHandler}>
      <label htmlFor="">Title:</label>
      <input className="border" type="text" name="title" />
      <input type="file" name="blog-image" />
      <textarea
        className="border"
        name="content"
        cols="30"
        rows="10"
      ></textarea>
      <button type="submit" className="border w-16">
        Submit
      </button>
    </form>
  );
}
