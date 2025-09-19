"use client"
import {useSession, signIn, signOut} from "next-auth/react"

export default function Page(){
    const { data: session, status} = useSession()
    if(status === "loading"){
        return <p>Loading...</p>
    }
    if(session) {
        return(
            <>
            Signed in as {session.user?.email ?? "Unknown User"}<br/>
            <button className="bg-green-300 px-3 py-1 m-4 rounded" onClick={()=> signOut()}>Sign Out</button>
            </>
        )
    }
    return(
        <>
        Not Signed in <br />
        <button className="bg-blue-100 text-black px-3 py-1 m-4 rounded"onClick={()=>signIn()}>Sign in</button>
        </>
    )
}