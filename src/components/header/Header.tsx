'use client';
import { Shield } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { UserSession } from "@/lib/Types";
import { redirect } from "next/navigation";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onTitleClick?: () => void;
  user?: UserSession;
}
const headerFont = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export default function Header({
  title,
  subtitle,
  onTitleClick,
  user,
}: HeaderProps) {
const router = useRouter();
    const handleBack = () => {
  router.back();
};
  return (
    <header
      className={`bg-linear-to-r from-gray-700 to-gray-600 shadow-lg ${headerFont.className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {title != "Portal do Cliente" && (
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-orange-400 transition"
          >
            <Undo2 className="h-5 w-5" />
            Voltar
          </button>
        )}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded-lg">
              <div className="flex flex-col space-y-1">
                <div className="h-2 w-16 bg-gray-500"></div>
                <div className="h-2 w-16 bg-orange-500"></div>
                <div className="h-2 w-16 bg-gray-600"></div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {title ?? "Portal do Cliente"}
              </h1>
              {subtitle && (
                <p className="mt-1 text-sm text-orange-300">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Usuário */}

          {user && (
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">{user.nome}</p>
                <p className="text-xs text-orange-200">{user.email}</p>
                {user.admin && (
                  <span className="inline-flex mt-1 items-center gap-1 rounded-full bg-orange-500/20 px-2 py-0.5 text-[11px] font-semibold text-orange-200">
                    <Shield className="h-3.5 w-3.5" />
                    Admin
                  </span>
                )}
              </div>

              <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold shadow-lg overflow-hidden">
                {user.foto ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/clientes/${user.foto}`}
                    width={40}
                    height={40}
                    alt="Foto do usuário"
                    className="h-10 w-10 object-cover"
                  />
                ) : (
                  user.nome.charAt(0).toUpperCase()
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
