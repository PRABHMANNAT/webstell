export function whatsappUrl(
  message = 'Hi WEBSTELL! I have a project in mind and would love to explore it with your team. Could you help me work out the right approach, timeline and budget?',
) {
  return `https://wa.me/917696403580?text=${encodeURIComponent(message)}`;
}
