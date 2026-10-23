
import GoogleCalendarEmbed from '../components/GoogleCalendarEmbed'

export default function CitasPage() {
  const calendarUrl = import.meta.env.VITE_GOOGLE_CALENDAR_EMBED_URL ||
    'https://calendar.google.com/calendar/embed?src=f19a802c4ece036633150623d9e89ae5b8ceaad2bc7328c4595902f740096d4b%40group.calendar.google.com&ctz=America%2FManagua'

  if (!calendarUrl) {
    return (
      <div className="rounded-2xl border bg-white p-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Citas médicas
        </h1>
        <p className="mt-2 text-slate-500">
          Configura la URL de Google Calendar para mostrar
          el calendario.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Citas médicas
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Calendario integrado con Google Calendar.
        </p>
      </div>

      <GoogleCalendarEmbed embedUrl={calendarUrl} />
    </div>
  )
}
