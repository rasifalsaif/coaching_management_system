import { getSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default async function DashboardRootPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  // Double check redirection logic if middleware didn't catch it
  const role = session.user.role?.toLowerCase();
  redirect(`/dashboard/${role}`);
}
