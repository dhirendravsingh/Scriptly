import { Hono } from "hono"
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { verify } from "hono/jwt"
import { createBlogInput, updateBlogInput } from "@dhirendravsingh/scriptly-commons"


export const blogRouter = new Hono<{Bindings : {
    DATABASE_URL : string
    JWT_SECRET : string
  },
  Variables :{
    userId : any      //potential error
  }
}>()


// this middleware is to check for any request coming in blogrouter, only this middleware can allow for further routing inside the blogrouter

//we can send data from the middleware to other routes by using the property of context, by using set to set the values here and later getting them
blogRouter.use("/*", async (c,next)=>{
  //this authHeader will have my token, which it will give to backend to let it know that it is logged in
  const authHeader = c.req.header("authorization") || ""
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET)
  if(user){
    c.set("userId", user.id);
   await  next();
  }
  }
   catch (e) {
    c.status(403)
    return c.json({
      message : "Your are not logged in"
    })
  }
  
})


blogRouter.post('/', async (c)=>{


  const body = await c.req.json()
  const {success} = createBlogInput.safeParse(body)
  if(!success){
    c.status(400)
    return c.json({
      message : "Inputs are not correct"
    })
  }
  const userId = c.get("userId")
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
    
  const blog = await prisma.blog.create({
    data : {
      title : body.title,
      content : body.content,
      authorId : Number(userId)
    }
  })

return c.json({
  id : blog.id
})

  })

  
//the put request allows only the title and the content to be changed
blogRouter.put('/', async (c)=>{
   
  const body = await c.req.json()
  const {success} = updateBlogInput.safeParse(body)
  if(!success){
    c.status(400)
    return c.json({
      message : "Inputs are not correct"
    })
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
    
  const blog = await prisma.blog.update({
    where : {
      id : body.id
    },
    data : {
      title : body.title,
      content : body.content,
      
    }
  })

return c.json({
  id : blog.id
})

  })

  blogRouter.get('/bulk', async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
      try {
        const blogs = await prisma.blog.findMany({
          select:{
            content: true,
            title : true,
            id : true,
            author : {
              select : {
                name : true,
              }
            }
          }
        })
  
      return c.json({
        blogs
      })
      } catch (e) {
        c.status(411)
        return c.json({
            message : "arey bhai kch problem hai"
        })
      }
    })


  
blogRouter.get('/:id', async (c)=>{
   
  const id =  c.req.param("id")

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
    
try {
  const blog = await prisma.blog.findFirst({
    where : {
      id : Number(id)
    }, select: {
      id : true,
      title : true,
      content : true,
      author : {
        select : {
          name : true
        }
      }
    }
  })

return c.json({
  blog
})
} catch (e) {
  c.status(411)
  return c.json({
    message : "Error while fetching the blog"
  })
}

  })


