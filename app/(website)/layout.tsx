// app/(website)/layout.tsx
// Shared layout for all public marketing pages.
// Navbar & Footer are already in the root layout; this is a passthrough.

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
