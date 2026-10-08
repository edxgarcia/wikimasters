"use client";

import { LogOutIcon, UserRoundIcon } from "lucide-react";
import { useActionState } from "react";
import { signOut } from "@/server/actions/auth";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface UserMenuProps {
  email: string;
}

export function UserMenu({ email }: UserMenuProps) {
  const [state, action, isPending] = useActionState(signOut, null);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="ghost" aria-label="Open user menu">
          <UserRoundIcon aria-hidden="true" />
          <p>{email}</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-48">
        <form action={action}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start"
            disabled={isPending}
          >
            <LogOutIcon aria-hidden="true" />
            {isPending ? "Signing out…" : "Sign out"}
          </Button>
          {state?.error && (
            <p role="alert" className="px-2.5 text-destructive">
              {state.error}
            </p>
          )}
        </form>
      </PopoverContent>
    </Popover>
  );
}
