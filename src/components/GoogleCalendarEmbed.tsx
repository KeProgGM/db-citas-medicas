
interface GoogleCalendarEmbedProps {
  embedUrl: string
}

export default function GoogleCalendarEmbed({
  embedUrl,
}: GoogleCalendarEmbedProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <h2 className="text-lg font-bold text-slate-800">
          Calendario de Google
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Consulta los eventos del calendario conectado.
        </p>
      </div>

      <div className="p-3 md:p-5">
        <iframe
          src={embedUrl}
          title="Google Calendar"
          className="h-150 w-full rounded-xl border-0"
          loading="lazy"
        />
      </div>
    </section>
  )
}
