import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign, verify} from 'hono/jwt'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'


//this is written as because typescript throws an error at the toml.wrangler file, it doesnt understand it.
const app = new Hono<{
  Bindings : {
    DATABASE_URL : string
    JWT_SECRET : string
  }
}>()

app.use('/*', cors())

app.route("/api/v1/user", userRouter);
app.route("api/v1/blog", blogRouter);


// this is a top level middleware for auth checks
app.use('/api/v1/blogs/*', async (c, next)=>{

  //get the header
  //verify the header
  //if the header is correct, we can proceed
  const header = c.req.header("authorization")  || ""

  //we will also have to split the token received in the header
  const token = header.split(" ")[1]

  
  const response = await verify(token, c.env.JWT_SECRET)
  if(response.id){
    next()
  }
  else{
    c.status(403)
    return c.json({error : "unauthorized"})
  }
})









export default app
