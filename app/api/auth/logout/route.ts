import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  
  // Delete auth cookies
  cookieStore.delete("auth_token");
  cookieStore.delete("user_type");
  
  // Get redirect parameter from query
  const { searchParams } = new URL(request.url);
  const loginRedirect = searchParams.get("redirect") || "/auth/login";
  
  // Redirect to login page
  redirect(loginRedirect);
}
