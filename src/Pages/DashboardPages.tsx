

import {
  Users,
  Stethoscope,
  CalendarDays,
  ClipboardCheck,
  ArrowUpRight,
  ArrowRight,
  Clock3,
  CheckCircle2,
  CircleAlert,
} from 'lucide-react'

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const statistics = [
  {
    title: 'Total de pacientes',
    value: '248',
    detail: '+12% respecto al mes anterior',
    icon: Users,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Médicos activos',
    value: '8',
    detail: 'Personal registrado',
    icon: Stethoscope,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'Citas de hoy',
    value: '18',
    detail: 'Agenda del día',
    icon: CalendarDays,
    color: 'bg-violet-50 text-violet-600',
  },
  {
    title: 'Consultas realizadas',
    value: '15',
    detail: 'Atenciones registradas',
    icon: ClipboardCheck,
    color: 'bg-teal-50 text-teal-600',
  },
]

const appointments = [
  {
    time: '08:00',
    patient: 'María López',
    doctor: 'Dr. Carlos Pérez',
    specialty: 'Medicina General',
    status: 'Confirmada',
  },
  {
    time: '09:00',
    patient: 'José Martínez',
    doctor: 'Dra. Laura Gómez',
    specialty: 'Cardiología',
    status: 'Confirmada',
  },
  {
    time: '10:30',
    patient: 'Ana Torres',
    doctor: 'Dr. Miguel Rodríguez',
    specialty: 'Pediatría',
    status: 'Pendiente',
  },
  {
    time: '11:30',
    patient: 'Luis Hernández',
    doctor: 'Dra. Sofía Ramírez',
    specialty: 'Dermatología',
    status: 'Confirmada',
  },
]

const specialtyData = [
  { name: 'Medicina general', citas: 6 },
  { name: 'Pediatría', citas: 4 },
  { name: 'Cardiología', citas: 3 },
  { name: 'Dermatología', citas: 2 },
  { name: 'Otras', citas: 3 },
]

function StatCard({
  title,
  value,
  detail,
  icon: Icon,
  color,
}: (typeof statistics)[number]) {
  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-800">
            {value}
          </h3>
        </div>
        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={23} />
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500">{detail}</p>
    </article>
  )
}

export default function DashboardPage() {
  const today = new Intl.DateTimeFormat('es-NI', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Panel de administración
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-800 md:text-3xl">
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Bienvenido. Aquí tienes el resumen de la clínica.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm sm:self-auto">
          <CalendarDays size={18} className="text-blue-600" />
          <span className="capitalize">{today}</span>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-slate-800">
                Próximas citas
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Resumen de la agenda médica
              </p>
            </div>
            <a
              href="/citas"
              className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800"
            >
              Ver agenda <ArrowRight size={16} />
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-142.5 text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                  <th className="pb-3 pr-3 font-medium">Hora</th>
                  <th className="pb-3 pr-3 font-medium">Paciente</th>
                  <th className="pb-3 pr-3 font-medium">Especialidad</th>
                  <th className="pb-3 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr
                    key={`${appointment.time}-${appointment.patient}`}
                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50"
                  >
                    <td className="py-4 pr-3 font-semibold text-slate-700">
                      <span className="flex items-center gap-2">
                        <Clock3 size={15} className="text-slate-400" />
                        {appointment.time}
                      </span>
                    </td>
                    <td className="py-4 pr-3">
                      <p className="font-semibold text-slate-800">
                        {appointment.patient}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {appointment.doctor}
                      </p>
                    </td>
                    <td className="py-4 pr-3 text-slate-600">
                      {appointment.specialty}
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
                          appointment.status === 'Confirmada'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {appointment.status === 'Confirmada' ? (
                          <CheckCircle2 size={13} />
                        ) : (
                          <CircleAlert size={13} />
                        )}
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div>
            <h2 className="font-bold text-slate-800">
              Citas por especialidad
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Distribución de la agenda
            </p>
          </div>

          <div className="mt-5 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={specialtyData}
                layout="vertical"
                margin={{ top: 0, right: 15, left: 5, bottom: 0 }}
              >
                <CartesianGrid
                  stroke="#EDF2F7"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94A3B8', fontSize: 12 }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={115}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748B', fontSize: 10 }}
                />
                <Tooltip
                  cursor={{ fill: '#F1F7FC' }}
                  contentStyle={{
                    borderRadius: 12,
                    border: '1px solid #E2E8F0',
                  }}
                />
                <Bar
                  dataKey="citas"
                  name="Citas"
                  fill="#0878D1"
                  radius={[0, 5, 5, 0]}
                  barSize={18}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 rounded-xl bg-emerald-50 p-4">
            <div className="flex items-center gap-2 text-emerald-700">
              <ArrowUpRight size={18} />
              <span className="text-sm font-semibold">
                Agenda organizada
              </span>
            </div>
            <p className="mt-1 text-xs leading-5 text-emerald-700/80">
              Consulta la agenda para revisar horarios y disponibilidad.
            </p>
          </div>
        </article>
      </section>
    </div>
  )
}


