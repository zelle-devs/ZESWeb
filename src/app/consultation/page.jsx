import BookingSystem from "@/components/Consultation/BookingSystem";
// import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { Suspense } from "react";

export const metadata = {
  title: "Schedule a Consultation | AJ Group of Companies",
  description:
    "Schedule a conversation with AJ Group to discuss your project, business opportunity, partnership or strategic requirement.",
  keywords: [
    "AJ Group Consultation",
    "schedule consultation",
    "business consultation",
    "project consultation",
    "business opportunity",
    "business partnership",
    "partnership consultation",
    "business discussion",
    "project discussion",
    "consultation scheduling",
  ],
  alternates: {
    canonical: "https://ajgrouphq.com/consultation/",
  },
  openGraph: {
    title: "Schedule a Consultation | AJ Group of Companies",
    description:
      "Schedule a conversation with AJ Group to discuss your project, business opportunity, partnership or strategic requirement.",
    url: "https://ajgrouphq.com/consultation/",
    siteName: "AJ Group of Companies",
    type: "website",
    images: [
      {
        url: "https://ajgrouphq.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Schedule a Consultation with AJ Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Schedule a Consultation | AJ Group of Companies",
    description:
      "Schedule a conversation with AJ Group to discuss your project, business opportunity, partnership or strategic requirement.",
    images: ["https://ajgrouphq.com/images/og-image.jpg"],
  },
};

const consultationSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://ajgrouphq.com/consultation/#webpage",
  url: "https://ajgrouphq.com/consultation/",
  name: "Schedule a Consultation | AJ Group of Companies",
  description:
    "Schedule a conversation with AJ Group to discuss your project, business opportunity, partnership or strategic requirement.",
  isPartOf: {
    "@id": "https://ajgrouphq.com/#website",
  },
  about: {
    "@id": "https://ajgrouphq.com/#organization",
  },
};

const consultationBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://ajgrouphq.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Consultation",
      item: "https://ajgrouphq.com/consultation/",
    },
  ],
};



export default function ConsultationPage() {
  return (
    <>
      {/* Consultation & Breadcrumb Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([consultationSchema, consultationBreadcrumbSchema]),
        }}
      />
      <div style={{ maxWidth: "100%", paddingBottom: "30px" }}>
        <Suspense >
          <BookingSystem />
        </Suspense>
      </div>
    </>
  )
}