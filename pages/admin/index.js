import nookies from 'nookies'
import Router from 'next/router'

export async function getServerSideProps(ctx){
  const cookies= nookies.get(ctx)
  if(!cookies.token){
    return {
      redirect :{
        destination : '/login'
      }
    }
  }
  return {
    props: {}
  }
}
export default function Admin(){
  const logout=()=>{
    nookies.destroy(null, 'token')
    Router.replace('/login')
  }
  return(
    <div className="w-full h-screen bg-green-200 flex flex-col justify-center items-center">
      Admin
      <button onClick={logout} className="text-red-500 bg-red-100 font-semibold py-1 px-3 mt-5 active:scale-90">Logout</button>
    </div>
  )
}