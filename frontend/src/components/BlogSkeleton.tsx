import { Circle } from "./BlogCard"

export default function BlogSkeleton(){
    return <div className="border-b border-slate-200 pb-4 p-4 w-screen max-w-screen-md cursor-pointer" >
    <div className="flex">
    <div className="h-4  bg-gray-200 rounded-full  w-48 mb-4"></div>
    <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
    <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
      
       <div className="font-extralight pl-2 text-sm flex justify-center flex-col">   
        <Circle/>
       </div>
       <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col"><div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div></div>
       <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
    </div>
    <div className="font-semibold text-xl">
    <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
    </div>
    <div className="text-md font-thin">
    <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
    </div>
    <div className="text-slate-500 text-sm font-thin pt-4">
    <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>    
    
</div>
        
<div role="status" className="animate-pulse">
    
   
    <span className="sr-only">Loading...</span>
</div>


    </div>
}