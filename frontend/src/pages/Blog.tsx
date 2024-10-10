import FullBlog from "../components/FullBlog"
import Spinner from "../components/Spinner";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom"

export default function Blog(){
    const {id} = useParams()
    if (!id) {
        return <div>Invalid blog ID</div>;
      }
      
    const {loading, blog} = useBlog({
        id : id || ""
    })
    
    if(loading){
        return <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
            <Spinner/>
            </div>
            
        </div>
    }
    if (!blog) {
        return <div>Loading blog...</div>;
    }
    return <div>
        <FullBlog blog={blog} />
    </div>
}