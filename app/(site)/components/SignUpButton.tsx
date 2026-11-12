import Link from "next/link";

// Reusable call-to-action button. Drop it on any screen:
//   <SignUpButton />
//   <SignUpButton variant="secondary" label="Create your account" />
//   <SignUpButton variant="onDark" fullWidth />
//
// Change DEFAULT_SIGNUP_HREF once if the sign-up destination changes.
export const DEFAULT_SIGNUP_HREF = "/setup";

type Variant = "primary" | "secondary" | "onDark";

const styles: Record<Variant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100",
  onDark: "bg-white text-blue-700 hover:bg-blue-50",
};

export default function SignUpButton({
  label = "Sign up",
  href = DEFAULT_SIGNUP_HREF,
  variant = "primary",
  fullWidth = false,
  size = "md",
  onClick,
  className = "",
}: {
  label?: string;
  href?: string;
  variant?: Variant;
  fullWidth?: boolean;
  size?: "sm" | "md";
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-block ${
        size === "sm" ? "px-4 py-2 rounded-md" : "px-6 py-3 rounded-lg"
      } font-medium text-center transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 ${
        styles[variant]
      } ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {label}
    </Link>
  );
}
