import {NextResponse} from "next/server"

export default function middleware(req){
  console.log("COOKIES=>",req.cookies)
  console.log(req.headers.get('authorization'))
  const url= req.nextUrl.clone()

  if(url.pathname==='/admin'){
    return NextResponse.rewrite("http://localhost:3000/detail")
  }
}