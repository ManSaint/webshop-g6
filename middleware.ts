// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
// import { NextResponse } from "next/server"

// const isAdminRoute = createRouteMatcher(["/admin(.*)"])
// const isCustomerRoute = createRouteMatcher(["/customer(.*)"])

// export default clerkMiddleware(async (auth, req) => {

//   if (isCustomerRoute(req)) {
//     await auth.protect()
//   }

//   if (isAdminRoute(req)) {
//     await auth.protect()

//     const { sessionClaims } = await auth()

// console.log("SESSION CLAIMS:", sessionClaims)
//     if (sessionClaims?.publicMetadata?.role !== "admin") {
//       return NextResponse.redirect(new URL("/", req.url))
//     }
//   }

// }) 

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// }







import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isAdminRoute = createRouteMatcher(["/admin(.*)"])

export default clerkMiddleware(async (auth, req) => {
  await auth.protect()

  const { sessionClaims } = await auth()
  console.log("SESSION CLAIMS:", sessionClaims)

if (isAdminRoute(req)) {
  if (sessionClaims?.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url))
  }
}
})






// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

// export default clerkMiddleware(async (auth, req) => {
//   await auth.protect();

  
//   const { sessionClaims } = await auth({ refresh: true });
//   console.log("SESSION CLAIMS AFTER REFRESH:", sessionClaims);

//   if (isAdminRoute(req)) {
//   //   if (sessionClaims?.publicMetadata?.role !== "admin") {
//   //     return NextResponse.redirect(new URL("/", req.url));
//   //   }
//    }
// });







