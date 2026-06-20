// Floating WhatsApp button — sits fixed bottom-right on all pages
// Add <WhatsAppFloat /> inside your Layout component

import { MessageCircle } from "lucide-react";

const WA_NUMBER = "918787565964"; // Replace with your number
const WA_MESSAGE = encodeURIComponent(
  "Hi! I need help with a college project.",
);

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-5 h-5 fill-white" />
      <span className="text-sm hidden group-hover:inline transition-all">
        Chat with us
      </span>
    </a>
  );
}
