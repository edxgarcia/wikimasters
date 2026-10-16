import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { connection } from "next/server";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { auth } from "@/lib/auth/server";
import { UserMenu } from "./userMenu";

export const dynamic = "force-dynamic";

export async function NavMenu() {
  await connection(); // this component becomes dynamic
  const session = await auth.getSession();
  const user = session.data?.user;
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex items-center gap-2">
        {user?.email ? (
          <>
            <NavigationMenuItem>
              <Button asChild variant="outline">
                <Link href="/wiki/edit/new">
                  New Article <PlusIcon />
                </Link>
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <UserMenu email={user.email} />
            </NavigationMenuItem>
          </>
        ) : (
          <>
            <NavigationMenuItem>
              <Button asChild variant="outline">
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button asChild>
                <Link href="/auth/sign-up">Sign Up</Link>
              </Button>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
