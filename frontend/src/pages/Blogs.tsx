import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton";

import useBlogs from "../hooks";
export default function Blogs(){
    const {loading, blogs} = useBlogs()

    if(loading){
        return <div>
            <Appbar/>
         <div className="flex justify-center">
            <div>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            <BlogSkeleton/>
            </div>
        </div>
        </div>
    }
    return <div>
        <Appbar/>
        <div className="flex justify-center ">
     <div >
        {blogs.map(blog=><BlogCard id={blog.id} authorName={blog.author.name || "Anonymous"} title={blog.title} content={blog.content} date="October 8, 2024, 2:00 PM"/>)}
        



    </div>
    </div>
    </div>
}
