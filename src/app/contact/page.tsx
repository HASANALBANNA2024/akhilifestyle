import type { Metadata } from "next";
import { StaticPage } from "@/components/layout/StaticPage";
import { ContactCards } from "@/components/layout/ContactCards";

export const metadata: Metadata = {
  title: "যোগাযোগ",
  description: "Akhi Lifestyle এর সাথে যোগাযোগ করুন - ফোন, ইমেইল ও Messenger।",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <StaticPage title="যোগাযোগ">
      <p>অর্ডার বা পণ্য নিয়ে যেকোনো প্রশ্নে আমাদের জানান।</p>
      <ContactCards />
    </StaticPage>
  );
}
