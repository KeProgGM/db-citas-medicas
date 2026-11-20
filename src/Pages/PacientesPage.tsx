
import { useState } from 'react'

import {
  Search,
  Plus,
  Users,
  UserCheck,
  UserX,
  Eye,
  Pencil,
  Trash2,
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  IdCard,
} from 'lucide-react'

// ==========================================
// INTERFAZ DEL PACIENTE
// ==========================================

interface Patient {
  id: number
  firstName: string
  lastName: string
  identification: string
  birthDate: string
  gender: string
  phone: string
  email: string
  address: string
  status: 'Activo' | 'Inactivo'
}

// ==========================================
// DATOS DE PRUEBA
// ==========================================

const initialPatients: Patient[] = [
  {
    id: 1,
    firstName: 'María',
    lastName: 'López',
    identification: '001-120599-0001A',
    birthDate: '1999-05-12',
    gender: 'Femenino',
    phone: '8888-1234',
    email: 'maria.lopez@email.com',
    address: 'Managua, Nicaragua',
    status: 'Activo',
  },
  {
    id: 2,
    firstName: 'José',
    lastName: 'Martínez',
    identification: '001-220890-0002B',
    birthDate: '1990-08-22',
    gender: 'Masculino',
    phone: '8777-2345',
    email: 'jose.martinez@email.com',
    address: 'Ciudad Sandino, Managua',
    status: 'Activo',
  },
  {
    id: 3,
    firstName: 'Ana',
    lastName: 'Torres',
    identification: '001-150302-0003C',
    birthDate: '2002-03-15',
    gender: 'Femenino',
    phone: '8666-3456',
    email: 'ana.torres@email.com',
    address: 'Tipitapa, Managua',
    status: 'Activo',
  },
  {
    id: 4,
    firstName: 'Luis',
    lastName: 'Hernández',
    identification: '001-101085-0004D',
    birthDate: '1985-10-10',
    gender: 'Masculino',
    phone: '8555-4567',
    email: 'luis.hernandez@email.com',
    address: 'Managua, Nicaragua',
    status: 'Inactivo',
  },
  {
    id: 5,
    firstName: 'Sofía',
    lastName: 'Ramírez',
    identification: '001-050798-0005E',
    birthDate: '1998-07-05',
    gender: 'Femenino',
    phone: '8444-5678',
    email: 'sofia.ramirez@email.com',
    address: 'Masaya, Nicaragua',
    status: 'Activo',
  },
]

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function PacientesPage() {

  const [patients, setPatients] = useState<Patient[]>(initialPatients)

  const [search, setSearch] = useState('')

  const [statusFilter, setStatusFilter] = useState('Todos')

  const [modalOpen, setModalOpen] = useState(false)

  const [editingPatient, setEditingPatient] = useState<Patient | null>(null)

  const [viewingPatient, setViewingPatient] = useState<Patient | null>(null)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    identification: '',
    birthDate: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
  })

  // ==========================================
  // FILTRAR PACIENTES
  // ==========================================

  const filteredPatients = patients.filter((patient) => {

    const searchText = search.toLowerCase()

    const matchesSearch =
      patient.firstName.toLowerCase().includes(searchText) ||
      patient.lastName.toLowerCase().includes(searchText) ||
      patient.identification.toLowerCase().includes(searchText) ||
      patient.phone.includes(searchText)

    const matchesStatus =
      statusFilter === 'Todos' ||
      patient.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const totalPatients = patients.length

  const activePatients = patients.filter(
    (patient) => patient.status === 'Activo'
  ).length

  const inactivePatients = patients.filter(
    (patient) => patient.status === 'Inactivo'
  ).length

  // ==========================================
  // ABRIR MODAL NUEVO PACIENTE
  // ==========================================

  const openCreateModal = () => {

    setEditingPatient(null)

    setForm({
      firstName: '',
      lastName: '',
      identification: '',
      birthDate: '',
      gender: '',
      phone: '',
      email: '',
      address: '',
    })

    setModalOpen(true)
  }

  // ==========================================
  // ABRIR MODAL EDITAR PACIENTE
  // ==========================================

  const openEditModal = (patient: Patient) => {

    setEditingPatient(patient)

    setForm({
      firstName: patient.firstName,
      lastName: patient.lastName,
      identification: patient.identification,
      birthDate: patient.birthDate,
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email,
      address: patient.address,
    })

    setModalOpen(true)
  }

  // ==========================================
  // MANEJAR CAMBIOS DEL FORMULARIO
  // ==========================================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {

    const { name, value } = e.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  // ==========================================
  // GUARDAR PACIENTE
  // ==========================================

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    if (editingPatient) {

      setPatients((previous) =>
        previous.map((patient) =>
          patient.id === editingPatient.id
            ? {
                ...patient,
                ...form,
              }
            : patient
        )
      )

    } else {

      const newPatient: Patient = {
        id: Date.now(),
        ...form,
        status: 'Activo',
      }

      setPatients((previous) => [
        newPatient,
        ...previous,
      ])
    }

    setModalOpen(false)

    setEditingPatient(null)
  }

  // ==========================================
  // ELIMINAR PACIENTE
  // ==========================================

  const handleDelete = (patient: Patient) => {

    const confirmDelete = window.confirm(
      `¿Deseas eliminar al paciente ${patient.firstName} ${patient.lastName}?`
    )

    if (!confirmDelete) return

    setPatients((previous) =>
      previous.filter((item) => item.id !== patient.id)
    )
  }

  // ==========================================
  // CAMBIAR ESTADO
  // ==========================================

  const toggleStatus = (patient: Patient) => {

    setPatients((previous) =>
      previous.map((item) =>
        item.id === patient.id
          ? {
              ...item,
              status:
                item.status === 'Activo'
                  ? 'Inactivo'
                  : 'Activo',
            }
          : item
      )
    )
  }

  // ==========================================
  // FORMATEAR FECHA
  // ==========================================

  const formatDate = (date: string) => {

    if (!date) return 'No especificada'

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      'es-NI',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }
    )
  }

  // ==========================================
  // INICIALES
  // ==========================================

  const getInitials = (patient: Patient) => {

    return `${patient.firstName.charAt(0)}${patient.lastName.charAt(0)}`
      .toUpperCase()
  }

  // ==========================================
  // RENDER
  // ==========================================

  return (

    <div className="space-y-6">

      {/* ENCABEZADO */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <p className="mb-1 text-sm text-blue-600">
            Gestión clínica
          </p>

          <h1 className="text-2xl font-bold text-slate-800">
            Pacientes
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Administra la información de los pacientes registrados.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#0878D1] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Nuevo paciente
        </button>

      </div>

      {/* TARJETAS ESTADÍSTICAS */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

        {/* TOTAL */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Total de pacientes
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {totalPatients}
              </h2>
            </div>

            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Users size={23} />
            </div>

          </div>

          <p className="mt-3 text-xs text-slate-400">
            Pacientes registrados en el sistema
          </p>

        </div>

        {/* ACTIVOS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Pacientes activos
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {activePatients}
              </h2>
            </div>

            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <UserCheck size={23} />
            </div>

          </div>

          <p className="mt-3 text-xs text-slate-400">
            Pacientes habilitados
          </p>

        </div>

        {/* INACTIVOS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Pacientes inactivos
              </p>

              <h2 className="mt-2 text-3xl font-bold text-slate-800">
                {inactivePatients}
              </h2>
            </div>

            <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
              <UserX size={23} />
            </div>

          </div>

          <p className="mt-3 text-xs text-slate-400">
            Pacientes deshabilitados
          </p>

        </div>

      </div>

      {/* TABLA */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* BUSCADOR Y FILTROS */}

        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h2 className="font-semibold text-slate-800">
              Listado de pacientes
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Consulta y administra los pacientes.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">

            {/* BUSCAR */}

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 focus-within:border-blue-500">

              <Search
                size={18}
                className="text-slate-400"
              />

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar paciente..."
                className="w-full min-w-0 text-sm outline-none sm:w-52"
              />

            </div>

            {/* FILTRO */}

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 outline-none focus:border-blue-500"
            >
              <option value="Todos">Todos los estados</option>
              <option value="Activo">Activos</option>
              <option value="Inactivo">Inactivos</option>
            </select>

          </div>

        </div>

        {/* TABLA RESPONSIVE */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px] text-left">

            <thead className="bg-slate-50">

              <tr className="text-xs uppercase tracking-wide text-slate-500">

                <th className="px-5 py-4 font-medium">
                  Paciente
                </th>

                <th className="px-5 py-4 font-medium">
                  Identificación
                </th>

                <th className="px-5 py-4 font-medium">
                  Contacto
                </th>

                <th className="px-5 py-4 font-medium">
                  Sexo
                </th>

                <th className="px-5 py-4 font-medium">
                  Estado
                </th>

                <th className="px-5 py-4 text-center font-medium">
                  Acciones
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredPatients.map((patient) => (

                <tr
                  key={patient.id}
                  className="transition hover:bg-slate-50"
                >

                  {/* PACIENTE */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                        {getInitials(patient)}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {patient.firstName} {patient.lastName}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {formatDate(patient.birthDate)}
                        </p>
                      </div>

                    </div>

                  </td>

                  {/* IDENTIFICACIÓN */}

                  <td className="px-5 py-4">

                    <p className="text-sm text-slate-600">
                      {patient.identification}
                    </p>

                  </td>

                  {/* CONTACTO */}

                  <td className="px-5 py-4">

                    <p className="text-sm text-slate-700">
                      {patient.phone}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {patient.email}
                    </p>

                  </td>

                  {/* SEXO */}

                  <td className="px-5 py-4">

                    <span className="text-sm text-slate-600">
                      {patient.gender}
                    </span>

                  </td>

                  {/* ESTADO */}

                  <td className="px-5 py-4">

                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                        patient.status === 'Activo'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <span
                        className={`mr-2 h-1.5 w-1.5 rounded-full ${
                          patient.status === 'Activo'
                            ? 'bg-emerald-500'
                            : 'bg-slate-400'
                        }`}
                      />

                      {patient.status}

                    </span>

                  </td>

                  {/* ACCIONES */}

                  <td className="px-5 py-4">

                    <div className="flex items-center justify-center gap-1">

                      <button
                        onClick={() => setViewingPatient(patient)}
                        title="Ver paciente"
                        className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        onClick={() => openEditModal(patient)}
                        title="Editar paciente"
                        className="rounded-lg p-2 text-slate-500 hover:bg-amber-50 hover:text-amber-600"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => toggleStatus(patient)}
                        title={
                          patient.status === 'Activo'
                            ? 'Desactivar paciente'
                            : 'Activar paciente'
                        }
                        className="rounded-lg p-2 text-slate-500 hover:bg-orange-50 hover:text-orange-600"
                      >
                        <UserX size={17} />
                      </button>

                      <button
                        onClick={() => handleDelete(patient)}
                        title="Eliminar paciente"
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

              {/* SIN RESULTADOS */}

              {filteredPatients.length === 0 && (

                <tr>

                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center"
                  >

                    <Users
                      size={35}
                      className="mx-auto mb-3 text-slate-300"
                    />

                    <p className="font-medium text-slate-600">
                      No se encontraron pacientes
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Intenta cambiar los filtros de búsqueda.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

        {/* PIE */}

        <div className="flex flex-col gap-2 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-sm text-slate-500">
            Mostrando {filteredPatients.length} de {totalPatients} pacientes
          </p>

          <p className="text-xs text-slate-400">
            Gestión de pacientes · EIRA
          </p>

        </div>

      </div>

      {/* ========================================== */}
      {/* MODAL REGISTRAR / EDITAR */}
      {/* ========================================== */}

      {modalOpen && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl">

            {/* ENCABEZADO */}

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">

              <div>

                <h2 className="text-lg font-bold text-slate-800">
                  {editingPatient
                    ? 'Editar paciente'
                    : 'Registrar paciente'}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Completa la información del paciente.
                </p>

              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={20} />
              </button>

            </div>

            {/* FORMULARIO */}

            <form onSubmit={handleSubmit}>

              <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">

                {/* NOMBRES */}

                <div>

                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Nombres *
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Ingrese los nombres"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* APELLIDOS */}

                <div>

                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Apellidos *
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Ingrese los apellidos"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* CÉDULA */}

                <div>

                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Número de identificación *
                  </label>

                  <input
                    type="text"
                    name="identification"
                    value={form.identification}
                    onChange={handleChange}
                    required
                    placeholder="000-000000-0000A"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* FECHA NACIMIENTO */}

                <div>

                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Fecha de nacimiento *
                  </label>

                  <input
                    type="date"
                    name="birthDate"
                    value={form.birthDate}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* SEXO */}

                <div>

                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Sexo *
                  </label>

                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >

                    <option value="">
                      Seleccione
                    </option>

                    <option value="Femenino">
                      Femenino
                    </option>

                    <option value="Masculino">
                      Masculino
                    </option>

                  </select>

                </div>

                {/* TELÉFONO */}

                <div>

                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Teléfono *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="8888-8888"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* CORREO */}

                <div>

                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Correo electrónico
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="correo@ejemplo.com"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* DIRECCIÓN */}

                <div className="sm:col-span-2">

                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Dirección
                  </label>

                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Dirección del paciente"
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

              </div>

              {/* BOTONES */}

              <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">

                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#0878D1] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  {editingPatient
                    ? 'Guardar cambios'
                    : 'Registrar paciente'}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* ========================================== */}
      {/* MODAL DETALLE PACIENTE */}
      {/* ========================================== */}

      {viewingPatient && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">

              <h2 className="text-lg font-bold text-slate-800">
                Información del paciente
              </h2>

              <button
                onClick={() => setViewingPatient(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            <div className="p-6">

              {/* PERFIL */}

              <div className="mb-6 flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                  {getInitials(viewingPatient)}
                </div>

                <div>

                  <h3 className="text-lg font-bold text-slate-800">
                    {viewingPatient.firstName} {viewingPatient.lastName}
                  </h3>

                  <span
                    className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      viewingPatient.status === 'Activo'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {viewingPatient.status}
                  </span>

                </div>

              </div>

              {/* INFORMACIÓN */}

              <div className="space-y-4">

                <div className="flex items-start gap-3">
                  <IdCard size={18} className="mt-0.5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">
                      Identificación
                    </p>
                    <p className="text-sm font-medium text-slate-700">
                      {viewingPatient.identification}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar size={18} className="mt-0.5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">
                      Fecha de nacimiento
                    </p>
                    <p className="text-sm font-medium text-slate-700">
                      {formatDate(viewingPatient.birthDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User size={18} className="mt-0.5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">
                      Sexo
                    </p>
                    <p className="text-sm font-medium text-slate-700">
                      {viewingPatient.gender}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={18} className="mt-0.5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">
                      Teléfono
                    </p>
                    <p className="text-sm font-medium text-slate-700">
                      {viewingPatient.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">
                      Correo electrónico
                    </p>
                    <p className="text-sm font-medium text-slate-700">
                      {viewingPatient.email || 'No registrado'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">
                      Dirección
                    </p>
                    <p className="text-sm font-medium text-slate-700">
                      {viewingPatient.address || 'No registrada'}
                    </p>
                  </div>
                </div>

              </div>

            </div>

            <div className="flex justify-end border-t border-slate-200 bg-slate-50 px-6 py-4">

              <button
                onClick={() => setViewingPatient(null)}
                className="rounded-xl bg-[#0878D1] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Cerrar
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  )
}
