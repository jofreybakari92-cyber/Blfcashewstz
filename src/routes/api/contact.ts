import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = import.meta.env.UNSENT_API_KEY as string | undefined;
        if (!apiKey) {
          console.error("[contact API] UNSENT_API_KEY is not set");
          return Response.json(
            { error: "UNSENT_API_KEY is not configured" },
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }

        let body: Record<string, string>;
        try {
          body = (await request.json()) as Record<string, string>;
        } catch {
          return Response.json(
            { error: "Invalid JSON body" },
            { status: 400, headers: { "Content-Type": "application/json" } },
          );
        }

        const { name, email, phone, contactType, message } = body;

        console.log("[contact API] received:", {
          name,
          email,
          phone,
          contactType,
          messageLength: message.length,
        });

        const typeLabel =
          {
            business: "Business Inquiry",
            individual: "Individual Inquiry",
            other: "General Inquiry",
          }[contactType] ?? "Inquiry";

        const html = `
          <!DOCTYPE html>
          <html>
            <body style="font-family: Arial, sans-serif; color: #222; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #065f46; border-bottom: 2px solid #065f46; padding-bottom: 10px;">New Contact Submission</h1>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Phone</td><td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Type</td><td style="padding: 8px 0;">${typeLabel}</td></tr>
              </table>
              <div style="margin-top: 24px;">
                <p style="font-weight: bold; margin-bottom: 8px;">Message</p>
                <p style="white-space: pre-wrap; background: #f4f4f4; padding: 16px; border-radius: 8px;">${message}</p>
              </div>
            </body>
          </html>
        `;

        console.log("[contact API] calling Unsent...");
        const resp = await fetch("https://api.unsent.dev/v1/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            from: "BLF Cashews <contact@blfcashews.com>",
            to: "jofreylazaro047@gmail.com",
            subject: `New Contact Form Submission — ${typeLabel}`,
            html,
          }),
        });

        console.log("[contact API] Unsent response status:", resp.status);

        if (!resp.ok) {
          const detail = await resp.text();
          console.error("[contact API] Unsent API error:", resp.status, detail);
          return Response.json(
            { error: `Email provider error (${resp.status}): ${detail}` },
            { status: 502, headers: { "Content-Type": "application/json" } },
          );
        }

        const result = await resp.json().catch(() => ({}));
        console.log("[contact API] Unsent success:", result);

        return Response.json({ success: true });
      },
    },
  },
});
