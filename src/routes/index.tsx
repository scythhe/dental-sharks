import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { LangProvider } from "@/lib/i18n";
import { Site } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dental Sharks — თანამედროვე სტომატოლოგია თბილისში" },
      {
        name: "description",
        content:
          "Dental Sharks / დენტალ შარკსი — modern, trusted dentistry in the heart of Tbilisi. Painless, precise, patient-first care. 4.8★ on Google.",
      },
      { property: "og:title", content: "Dental Sharks — Modern Dentistry in Tbilisi" },
      {
        property: "og:description",
        content: "Painless, precise, patient-first dental care in Tbilisi. Book your appointment today.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LangProvider>
      <Site />
      <Toaster position="top-center" richColors />
    </LangProvider>
  );
}
