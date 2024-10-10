import { Link } from "react-router-dom"

interface BlogCardProps {
    authorName : string
    title : string
    content : string
    date : string
    id : number
}


export default function BlogCard({authorName, title, content, date, id}: BlogCardProps){
    return <Link to={`/blog/${id}`}>
    <div className="border-b border-slate-200 pb-4 p-4 w-screen max-w-screen-md cursor-pointer" >
        <div className="flex">
            <div className="">
            <Avatar name={authorName}/>
            </div>
          
           <div className="font-extralight pl-2 text-sm flex justify-center flex-col"> {authorName} </div>
           <div className="flex justify-center flex-col pl-2 ">
            <Circle/>
           </div>
           <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">{date}</div>
           
        </div>
        <div className="font-semibold text-xl">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0,100) + "..."}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
            {`${Math.ceil(content.length / 100)} minutes(s) read`}
        </div>
        
    </div>
    </Link>
}

export function Avatar({name}: {name:string}){
    return (
    <div className={`relative inline-flex items-center justify-center w-6 h-62  overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600`}>
        <span className="font-sm text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>
    )
}

export function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}