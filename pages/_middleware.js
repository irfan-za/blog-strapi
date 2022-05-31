import {NextResponse} from "next/server"

export default function middleware(req){
  const url= req.nextUrl.clone()

  if(url.pathname==='/admin'){
    return NextResponse.rewrite("http://localhost:3000/detail")
  }
}