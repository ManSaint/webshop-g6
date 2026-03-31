import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { clerkClient } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isAdminRoute = createRouteMatcher(["/admin(.*)"])

export default clerkMiddleware(async (auth, req) => {

  if (isAdminRoute(req)) {
    await auth.protect()
    
    const { userId } = await auth()
    const client = await clerkClient()
    const user = await client.users.getUser(userId!)
    const role = user.publicMetadata?.role

    if (role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}