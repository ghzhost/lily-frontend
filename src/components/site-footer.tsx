import type { Route } from "next";
 import Link from "next/link";

 import { siteConfig } from "@/config/site";

 const legalLinks = [
   { label: "Privacy Policy", href: "/privacy" },
   { label: "Terms of Service", href: "/terms" },
   { label: "Cookie Policy", href: "/cookies" },
 ];

 const supportLinks = [
   { label: "Documentation", href: "/docs" },
   { label: "Status", href: "/status" },
   { label: "Contact", href: "/contact" },
   { label: "GitHub", href: "https://github.com/Lilly-Protocol" },
 ];

 export function SiteFooter() {
   return (
     <footer className="border-t border-[var(--color-line)] bg-[var(--color-surface)] py-12">
       <div className="mx-auto max-w-7xl px-6 lg:px-8">
         <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
           <div className="sm:col-span-2 lg:col-span-1">
             <p className="text-sm font-semibold text-[var(--color-ink)]">
               {siteConfig.name}
             </p>
             <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
               {siteConfig.tagline}
             </p>
           </div>

           <div>
             <p className="text-sm font-semibold text-[var(--color-ink)]">Legal</p>
             <ul className="mt-4 space-y-2">
               {legalLinks.map((link) => (
                 <li key={link.href}>
                   <Link
                     href={link.href as Route}
                     className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)]"
                   >
                     {link.label}
                   </Link>
                 </li>
               ))}
             </ul>
           </div>

           <div>
             <p className="text-sm font-semibold text-[var(--color-ink)]">Support</p>
             <ul className="mt-4 space-y-2">
               {supportLinks.map((link) => (
                 <li key={link.href}>
                   <Link
                     href={link.href as Route}
                     className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)]"
                   >
                     {link.label}
                   </Link>
                 </li>
               ))}
             </ul>
           </div>
         </div>

         <div className="mt-12 border-t border-[var(--color-line)] pt-8">
           <p className="text-xs text-[var(--color-muted)]">
             &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
           </p>
         </div>
       </div>
     </footer>
   );
 }
