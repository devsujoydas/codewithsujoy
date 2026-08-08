import { addMessage } from "./adminStore";

export async function sendContactEmail({ name, email, message }) {
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,

      template_params: {
        from_name: name,
        from_email: email,
        message,
      },
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to send email");
  }

  return res;
}

export async function saveContactMessage({ name, email, message }) {
  return addMessage({
    name,
    email,
    message,
    source: "contact_form",
  });
}
