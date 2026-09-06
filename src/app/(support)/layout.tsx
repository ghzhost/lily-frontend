import { SectionLayout } from '@/components/scaffold/section-layout';
import { getSectionRoutes, sectionDefinitions } from '@/config/routes';

const docsSection = sectionDefinitions.find(
  (section) => section.key === "docs",
);
const legalSection = sectionDefinitions.find(
  (section) => section.key === "legal",
);

const supportRoutes = [...getSectionRoutes('docs'), ...getSectionRoutes('legal')] as const;

export default function SupportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!docsSection || !legalSection) {
    throw new Error('Missing support section definitions.');
  }

  return (
    <SectionLayout
      title="Docs, status, and legal"
      description={`${docsSection.description} ${legalSection.description}`}
      routes={supportRoutes}
    >
      {children}
    </SectionLayout>
  );
}
