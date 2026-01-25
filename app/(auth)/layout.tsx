import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Desktop BG */}
      <div
        className="absolute inset-0 hidden md:block bg-cover bg-center"
        style={{ backgroundImage: "url(/images/login/ERP_Login_Page.png)" }}
      />

      {/* Mobile BG */}
      <div
        className="absolute inset-0 md:hidden bg-cover bg-center"
        style={{ backgroundImage: "url(/images/login/sm-bg-area.png)" }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center md:justify-start md:px-[6vw] px-4 py-6">
        {/* LOGIN PANEL */}
        <section
          className="
            relative
            w-[min(810px,92vw)]
            aspect-810/880
            max-h-[90vh]
            bg-no-repeat bg-contain bg-center
            flex items-center justify-center
          "
          style={{ backgroundImage: "url(/images/login/login-panel.png)" }}
        >
          {/* SAFE CONTENT ZONE */}
          <div
            className="
              w-full h-full
              flex items-center justify-center
              px-[10%] py-[8%]
              overflow-hidden
            "
          >
            {/* FORM WIDTH LIMIT */}
            <div className="w-full max-w-105">
              {children}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
