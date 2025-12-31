interface MapEmbedProps {
  embedUrl: string;
  title: string;
  height?: string;
}

export default function MapEmbed({ embedUrl, title, height = "450px" }: MapEmbedProps) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-2xl border-4 border-white" style={{ height }}>
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
        className="rounded-lg"
      />
    </div>
  );
}
