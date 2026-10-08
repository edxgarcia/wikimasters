import { auth } from "@/lib/auth/server";

export default auth.middleware({
  // Redirects unauthenticated users to sign-in page
  loginUrl: "/auth/sign-in",
});

// export async function proxy() { console.log("proxy"); const session = await auth.getSession(); console.log({ session });
//   if (!session.data) {
//   }
// }

export const config = {
  matcher: [
    // Protected routes requiring authentication
    "/wiki/:path*",
  ],
};
