import { NextResponse } from "next/server";

export async function middleware(req){
  console.log("cookies0",req.cookies)
  const cookies = req.cookies;
  const url= req.nextUrl.clone()
  
  if(cookies.token){
    const req= await fetch(process.env.APIURL+"/users/me",{
      method: 'GET',
      headers: {
        Authorization:
        `Bearer ${cookies.token}`
      },
    })
    const res= await req.json()
    console.log("RES_middleware",res)
    if(res.id && (url.pathname === '/login' || url.pathname === '/register')){
      url.pathname = '/admin'
      console.log("Menuju admin kak")
      return  NextResponse.redirect(url)
    }
    else if(!res.id && url.pathname === '/admin'){
      url.pathname = '/login'
      console.log("Menuju LOGIN kak")
      return  NextResponse.redirect(url)
    }
  }
  else if(!cookies.token && url.pathname === '/admin'){
    url.pathname = '/login'
      console.log("Dari admin ke login@")
      return  NextResponse.redirect(url)
  }
  
  

}