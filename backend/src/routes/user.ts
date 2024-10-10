import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign} from 'hono/jwt'
import { signinInput, signupInput } from "@dhirendravsingh/scriptly-commons";


export const userRouter = new Hono<{Bindings : {
    DATABASE_URL : string
    JWT_SECRET : string
  }
}>()

//SIGN-UP



// c stands for context, it has all the data of request, response, enviromental variable etc
userRouter.post('/signup', async (c)=>{

    //first connect to the database url
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    //now parse the data given in the body to access its json data
    const body = await c.req.json()

    const {success} = signupInput.safeParse(body)
  if(!success){
    c.status(400)
    return c.json({
      message : "Inputs are not correct"
    })
  }
  
    //this will create a user from the given credentials in the body
    try {
      const user = await prisma.user.create({
        data :{
          email : body.username,
          password : body.password,
          name : body.name
        }
      })
      const token = await sign({id: user.id}, c.env.JWT_SECRET)
      return c.json({jwt :token})
    } catch (e) {
      c.status(411);
      return c.text('User already exists for this email')
    }
  
  })
  
  
  //SIGN-IN
  
  
  userRouter.post('/signin', async (c)=>{
  
    //connecting to the databaseURL as usual
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
  
    //parsing the JSON() data of the body, so that it can be read 
    const body = await c.req.json()

    const {success} = signinInput.safeParse(body)
  if(!success){
    c.status(400)
    return c.json({
      message : "Inputs are not correct"
    })
  }
  
    //this will check for the user in the database, if finds it then will return the relevant info otherwise an error
    try {
      const user = await prisma.user.findUnique({ 
        where : {
          email : body.username,
          password : body.password
        }
      })
      if(!user) {
        c.status (403);
        return c.json({error : "user not found"})
      }
      const jwt = await sign({id : user.id}, c.env.JWT_SECRET)
    return c.json({jwt})
    } catch (e) {
      console.log(e)
      c.status(500)
      return c.text('Invalid')
    }
    
  })
  