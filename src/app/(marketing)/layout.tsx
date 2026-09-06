import { SectionLayout } from "@/components/scaffold/section-layout";
import { getSectionRoutes, sectionDefinitions } from "@/config/routes";

const marketingSection = sectionDefinitions.find((section) => section.key === 'marketing');

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!marketingSection) {
    throw new Error('Missing marketing section definition.');
  }

  return (
    <SectionLayout
      title={marketingSection.label}
      description={marketingSection.description}
      routes={getSectionRoutes("marketing")}
    >
      {children}
    </SectionLayout>
  );
}
