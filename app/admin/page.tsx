// app/admin/page.tsx — Admin Login Placeholder (Phase 2)
import { Lock } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-8 w-full">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
          <Lock className="w-7 h-7 text-[#C9A24D]" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-white mb-3">
          Admin Dashboard
        </h1>
        <p className="text-white/50 text-sm leading-relaxed">
          Supabase Auth–protected admin login and dashboard coming in Phase 2.
        </p>
      </div>
    </div>
  );
}
