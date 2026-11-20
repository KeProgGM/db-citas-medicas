
import { useState } from 'react'

import {
  HashRouter,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom'

import {
  LayoutDashboard,
  Users,
  Stethoscope,
  CalendarDays,
  Settings,
  HeartPulse,
  Search,
  Bell,
  Menu,
  X,
} from 'lucide-react'

import DashboardPages from './Pages/DashboardPages'
import PacientesPage from './Pages/PacientesPage'
import MedicosPages from './Pages/MedicosPages'
import CitasPages from './Pages/CitasPages'

const navigation = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/pacientes', label: 'Pacientes', icon: Users },
  { to: '/medicos', label: 'Médicos', icon: Stethoscope },
  { to: '/citas', label: 'Citas médicas', icon: CalendarDays },
]

function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F5F8FC] md:flex">

      {/* Fondo oscuro para móviles */}
      {menuOpen && (
        <button
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-label="Cerrar menú"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30
          flex w-64 flex-col
          bg-[#073653] p-5 text-white
          transition-transform duration-300
          md:static md:min-h-screen md:translate-x-0
          ${
            menuOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          }
        `}
      >

        {/* Logo */}
        <div className="mb-9 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/10 p-2">
              <HeartPulse
                size={28}
                className="text-teal-300"
              />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                DB_CitasMedicas
              </h1>

              <p className="text-xs text-slate-300">
                Gestión clínica
              </p>
            </div>
          </div>

          {/* Botón cerrar móvil */}
          <button
            onClick={() => setMenuOpen(false)}
            className="rounded-lg p-2 hover:bg-white/10 md:hidden"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>

        </div>

        {/* Menú */}
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Menú principal
        </p>

        <nav className="space-y-2">

          {navigation.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#0878D1] text-white shadow-lg shadow-blue-950/20'
                    : 'text-slate-200 hover:bg-white/10'
                }`
              }
            >
              <Icon size={19} />
              {label}
            </NavLink>
          ))}

        </nav>

        {/* Configuración */}
        <div className="mt-auto border-t border-white/10 pt-5">

          <NavLink
            to="/configuracion"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 hover:bg-white/10"
          >
            <Settings size={19} />
            Configuración
          </NavLink>

          <p className="mt-6 px-3 text-xs text-slate-400">
            EIRA · v1.0
          </p>

        </div>

      </aside>

      {/* Contenido principal */}
      <div className="min-w-0 flex-1">

        {/* Navbar */}
        <header className="sticky top-0 z-10 flex min-h-19 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 md:px-8">

          {/* Botón menú */}
          <button
            onClick={() => setMenuOpen(true)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden"
            aria-label="Abrir menú"
          >
            <Menu size={22} />
          </button>

          {/* Buscador */}
          <div className="hidden max-w-md flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 md:flex">
            <Search size={18} className="text-slate-400" />

            <input
              type="search"
              placeholder="Buscar pacientes, médicos, citas..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Perfil y notificaciones */}
          <div className="ml-auto flex items-center gap-4">

            <button
              aria-label="Notificaciones"
              className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100"
            >
              <Bell size={20} />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-400" />
            </button>

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                AS
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-800">
                  Laura Cuevas
                </p>

                <p className="text-xs text-slate-500">
                  Administradora
                </p>
              </div>

            </div>

          </div>

        </header>

        {/* Páginas */}
        <main className="p-4 md:p-8">

          <Routes>

            <Route
              path="/"
              element={<DashboardPages />}
            />

            <Route
              path="/pacientes"
              element={<PacientesPage />}
            />

            <Route
              path="/medicos"
              element={<MedicosPages />}
            />

            <Route
              path="/citas"
              element={<CitasPages />}
            />

            <Route
              path="/configuracion"
              element={
                <h1 className="text-2xl font-bold">
                  Configuración
                </h1>
              }
            />

          </Routes>

        </main>

      </div>

    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <MainLayout />
    </HashRouter>
  )
}
