/** WhatsApp mark. lucide-react does not ship brand icons, so the V6 site's own SVG is kept. */
export function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
      <path d="M20.1 3.9A10 10 0 0 0 4.4 16.2L3 21l4.9-1.3A10 10 0 1 0 20.1 3.9Z" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M8.2 7.5c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.8 1.8c.1.2.1.4-.1.6l-.6.7c-.1.1-.1.3 0 .5.4.7 1 1.3 1.7 1.7.2.1.4.1.5 0l.7-.7c.2-.2.4-.2.6-.1l1.8.8c.3.1.4.3.4.5v.5c0 .3-.1.5-.4.7-.4.3-.9.4-1.4.4-1.1 0-2.5-.6-3.8-1.9-1.3-1.3-1.9-2.7-1.9-3.8 0-.5.1-1 .4-1.4Z"
        fill="currentColor"
      />
    </svg>
  );
}
