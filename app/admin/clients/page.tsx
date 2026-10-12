import { connection } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { Users, Phone, Mail, Calendar, UserCheck } from "lucide-react";
import { formatTimestamp } from "@/lib/date-utils";

export const metadata = { title: "Clients" };
export const instant = false;

export default async function AdminClientsPage() {
  await connection();
  const db = createServiceClient();

  const { data: clients } = await db
    .from("clients")
    .select(`
      id,
      full_name,
      mobile,
      email,
      created_at
    `)
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div className="pt-14 lg:pt-0 p-6 flex flex-col gap-6 min-h-screen">
      <div className="flex items-center justify-between pt-2">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-[#C9A24D]" />
            Clients Directory
          </h1>
          <p className="text-white/40 text-sm mt-0.5">
            Registered astrology consultation clients and contact history.
          </p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/8 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/3">
                <th className="px-5 py-3 text-white/40 text-xs font-semibold uppercase tracking-wider">
                  Client Name
                </th>
                <th className="px-5 py-3 text-white/40 text-xs font-semibold uppercase tracking-wider">
                  Mobile Number
                </th>
                <th className="px-5 py-3 text-white/40 text-xs font-semibold uppercase tracking-wider">
                  Email Address
                </th>
                <th className="px-5 py-3 text-white/40 text-xs font-semibold uppercase tracking-wider">
                  Registered On
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {(clients ?? []).length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-16 text-white/30">
                    <UserCheck className="w-10 h-10 mx-auto mb-2 opacity-30" />
                    No clients registered yet.
                  </td>
                </tr>
              ) : (
                (clients ?? []).map((c) => (
                  <tr key={c.id} className="hover:bg-white/3 transition-colors">
                    <td className="px-5 py-4 font-medium text-white flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#C9A24D]/15 flex items-center justify-center text-[#C9A24D] font-bold text-xs">
                        {c.full_name?.[0]?.toUpperCase() ?? "C"}
                      </div>
                      <span>{c.full_name}</span>
                    </td>
                    <td className="px-5 py-4 text-white/70">
                      <span className="flex items-center gap-1.5 font-mono text-xs">
                        <Phone className="w-3.5 h-3.5 text-white/30" />
                        {c.mobile}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-white/70">
                      <span className="flex items-center gap-1.5 text-xs">
                        <Mail className="w-3.5 h-3.5 text-white/30" />
                        {c.email}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-white/50 text-xs">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-white/30" />
                        {formatTimestamp(c.created_at, {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
