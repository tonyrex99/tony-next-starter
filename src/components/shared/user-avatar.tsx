import { cn } from "@/lib/utils/cn";

export interface UserAvatarProps {
  name?: string;
  email?: string;
  src?: string;
  className?: string;
}

export function UserAvatar({ name, email, src, className }: UserAvatarProps) {
  const initials = (name || email || "U").slice(0, 2).toUpperCase();

  return (
    <div
      className={cn(
        "relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-default-200 text-xs font-semibold text-foreground ring-1 ring-default-300",
        className
      )}
    >
      {src ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={src} alt={name || "Avatar"} className="h-full w-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
