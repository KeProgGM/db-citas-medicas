
import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  Plus,
  Search,
  Stethoscope,
  Users,
  UserCheck,
  UserX,
  Eye,
  Pencil,
  Power,
  
  Mail,
  Phone,
  BriefcaseMedical,
} from 'lucide-react'

import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Select from '../components/common/Select'
import Modal from '../components/common/Modal'

interface Doctor {
  id: number
  firstName: string
  lastName: string
  identification: string
  professionalCode: string
  specialty: string
  phone: string
  email: string
  office: string
  status: 'Activo' | 'Inactivo'
}

const specialties = [
  'Medicina General',
  'Pediatría',
  'Cardiología',
  'Dermatología',
  'Ginecología',
  'Odontología',
  'Oftalmología',
  'Traumatología',
]

const initialDoctors: Doctor[] = [
  {
    id: 1,
    firstName: 'Carlos',
    lastName: 'Martínez',
    identification: '001-120590-0012A',
    professionalCode: 'MED-001',
    specialty: 'Medicina General',
    phone: '8888-1234',
    email: 'carlos@example.com',
    office: 'Consultorio 1',
    status: 'Activo',
  },
  {
    id: 2,
    firstName: 'María',
    lastName: 'López',
    identification: '001-150890-0023B',
    professionalCode: 'MED-002',
    specialty: 'Pediatría',
    phone: '8777-4567',
    email: 'maria@example.com',
    office: 'Consultorio 2',
    status: 'Activo',
  },
  {
    id: 3,
    firstName: 'José',
    lastName: 'García',
    identification: '001-201085-0034C',
    professionalCode: 'MED-003',
    specialty: 'Cardiología',
    phone: '8666-7890',
    email: 'jose@example.com',
    office: 'Consultorio 3',
    status: 'Inactivo',
  },
]

const emptyDoctor: Omit<Doctor, 'id' | 'status'> = {
  firstName: '',
  lastName: '',
  identification: '',
  professionalCode: '',
  specialty: '',
  phone: '',
  email: '',
  office: '',
}

export default function MedicosPages() {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors)
  const [search, setSearch] = useState('')
  const [specialtyFilter, setSpecialtyFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const [modalOpen, setModalOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)

  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)

  const [form, setForm] = useState(emptyDoctor)

  const totalDoctors = doctors.length
  const activeDoctors = doctors.filter(
    (doctor) => doctor.status === 'Activo'
  ).length
  const inactiveDoctors = totalDoctors - activeDoctors

  const filteredDoctors = doctors.filter((doctor) => {
    const fullName = `${doctor.firstName} ${doctor.lastName}`.toLowerCase()

    const matchesSearch =
      fullName.includes(search.toLowerCase()) ||
      doctor.identification.toLowerCase().includes(search.toLowerCase()) ||
      doctor.professionalCode.toLowerCase().includes(search.toLowerCase())

    const matchesSpecialty =
      !specialtyFilter || doctor.specialty === specialtyFilter

    const matchesStatus =
      !statusFilter || doctor.status === statusFilter

    return matchesSearch && matchesSpecialty && matchesStatus
  })

  const openCreateModal = () => {
    setEditingDoctor(null)
    setForm(emptyDoctor)
    setModalOpen(true)
  }

  const openEditModal = (doctor: Doctor) => {
    setEditingDoctor(doctor)

    setForm({
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      identification: doctor.identification,
      professionalCode: doctor.professionalCode,
      specialty: doctor.specialty,
      phone: doctor.phone,
      email: doctor.email,
      office: doctor.office,
    })

    setModalOpen(true)
  }

  const handleChange = (
    field: keyof typeof emptyDoctor,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (editingDoctor) {
      setDoctors((previous) =>
        previous.map((doctor) =>
          doctor.id === editingDoctor.id
            ? { ...doctor, ...form }
            : doctor
        )
      )
    } else {
      const newDoctor: Doctor = {
        id: Date.now(),
        ...form,
        status: 'Activo',
      }

      setDoctors((previous) => [...previous, newDoctor])
    }

    setModalOpen(false)
    setEditingDoctor(null)
    setForm(emptyDoctor)
  }

  const toggleStatus = (id: number) => {
    setDoctors((previous) =>
      previous.map((doctor) =>
        doctor.id === id
          ? {
              ...doctor,
              status:
                doctor.status === 'Activo' ? 'Inactivo' : 'Activo',
            }
          : doctor
      )
    )
  }

  const openDetailModal = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setDetailOpen(true)
  }

  return (
    <div className="space-y-6">

      {/* ENCABEZADO */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Gestión de médicos
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Administra la información del personal médico.
          </p>
        </div>

        <Button onClick={openCreateModal}>
          <Plus size={18} />
          Registrar médico
        </Button>
      </div>

      {/* TARJETAS DE ESTADÍSTICAS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total de médicos</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-800">
                {totalDoctors}
              </h2>
            </div>
            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <Users size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Médicos activos</p>
              <h2 className="mt-2 text-2xl font-bold text-green-600">
                {activeDoctors}
              </h2>
            </div>
            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <UserCheck size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Médicos inactivos</p>
              <h2 className="mt-2 text-2xl font-bold text-red-600">
                {inactiveDoctors}
              </h2>
            </div>
            <div className="rounded-lg bg-red-100 p-3 text-red-600">
              <UserX size={24} />
            </div>
          </div>
        </div>

      </div>

      {/* FILTROS */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Buscar médico..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <Select
            value={specialtyFilter}
            onChange={(event) => setSpecialtyFilter(event.target.value)}
            options={specialties.map((specialty) => ({
              label: specialty,
              value: specialty,
            }))}
            placeholder="Todas las especialidades"
          />

          <Select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            options={[
              { label: 'Activo', value: 'Activo' },
              { label: 'Inactivo', value: 'Inactivo' },
            ]}
            placeholder="Todos los estados"
          />

        </div>
      </div>

      {/* TABLA DE MÉDICOS */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-5 py-4">
          <h2 className="font-semibold text-gray-800">
            Listado de médicos
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {filteredDoctors.length} médico(s) encontrado(s)
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">

            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-4">Médico</th>
                <th className="px-5 py-4">Código profesional</th>
                <th className="px-5 py-4">Especialidad</th>
                <th className="px-5 py-4">Teléfono</th>
                <th className="px-5 py-4">Estado</th>
                <th className="px-5 py-4 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {filteredDoctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-gray-50">

                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <Stethoscope size={19} />
                      </div>

                      <div>
                        <p className="font-medium text-gray-800">
                          Dr. {doctor.firstName} {doctor.lastName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {doctor.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {doctor.professionalCode}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {doctor.specialty}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {doctor.phone}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        doctor.status === 'Activo'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {doctor.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">

                      <button
                        type="button"
                        onClick={() => openDetailModal(doctor)}
                        title="Ver detalles"
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => openEditModal(doctor)}
                        title="Editar médico"
                        className="rounded-lg p-2 text-amber-600 hover:bg-amber-50"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleStatus(doctor.id)}
                        title={
                          doctor.status === 'Activo'
                            ? 'Desactivar médico'
                            : 'Activar médico'
                        }
                        className={`rounded-lg p-2 ${
                          doctor.status === 'Activo'
                            ? 'text-red-600 hover:bg-red-50'
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                      >
                        <Power size={17} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

              {filteredDoctors.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-gray-500"
                  >
                    No se encontraron médicos.
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL REGISTRAR / EDITAR */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingDoctor ? 'Editar médico' : 'Registrar médico'}
        description="Completa la información personal y profesional."
        size="lg"
        footer={
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </Button>

            <Button type="submit" form="doctor-form">
              {editingDoctor ? 'Guardar cambios' : 'Registrar médico'}
            </Button>
          </div>
        }
      >
        <form
          id="doctor-form"
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <Input
              label="Nombres"
              name="firstName"
              value={form.firstName}
              onChange={(event) =>
                handleChange('firstName', event.target.value)
              }
              placeholder="Ej. Carlos"
              required
            />

            <Input
              label="Apellidos"
              name="lastName"
              value={form.lastName}
              onChange={(event) =>
                handleChange('lastName', event.target.value)
              }
              placeholder="Ej. Martínez"
              required
            />

            <Input
              label="Número de identificación"
              name="identification"
              value={form.identification}
              onChange={(event) =>
                handleChange('identification', event.target.value)
              }
              placeholder="000-000000-0000A"
              required
            />

            <Input
              label="Código profesional"
              name="professionalCode"
              value={form.professionalCode}
              onChange={(event) =>
                handleChange('professionalCode', event.target.value)
              }
              placeholder="Ej. MED-001"
              required
            />

            <Input
              label="Teléfono"
              name="phone"
              value={form.phone}
              onChange={(event) =>
                handleChange('phone', event.target.value)
              }
              placeholder="8888-8888"
              required
            />

            <Input
              label="Correo electrónico"
              name="email"
              type="email"
              value={form.email}
              onChange={(event) =>
                handleChange('email', event.target.value)
              }
              placeholder="medico@correo.com"
              required
            />

            <Select
              label="Especialidad"
              value={form.specialty}
              onChange={(event) =>
                handleChange('specialty', event.target.value)
              }
              options={specialties.map((specialty) => ({
                label: specialty,
                value: specialty,
              }))}
              placeholder="Seleccionar especialidad"
            />

            <Input
              label="Consultorio"
              name="office"
              value={form.office}
              onChange={(event) =>
                handleChange('office', event.target.value)
              }
              placeholder="Ej. Consultorio 1"
              required
            />

          </div>
        </form>
      </Modal>

      {/* MODAL DETALLES */}
      <Modal
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        title="Información del médico"
        description="Datos personales y profesionales registrados."
        size="md"
        footer={
          <div className="flex justify-end">
            <Button
              variant="secondary"
              onClick={() => setDetailOpen(false)}
            >
              Cerrar
            </Button>
          </div>
        }
      >
        {selectedDoctor && (
          <div className="space-y-5">

            <div className="flex items-center gap-4 rounded-xl bg-blue-50 p-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <Stethoscope size={28} />
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}
                </h3>
                <p className="text-sm text-gray-500">
                  {selectedDoctor.specialty}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm">

              <div className="flex items-center gap-3">
                <BriefcaseMedical className="text-gray-400" size={18} />
                <div>
                  <p className="text-gray-500">Código profesional</p>
                  <p className="font-medium text-gray-800">
                    {selectedDoctor.professionalCode}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <UserCheck className="text-gray-400" size={18} />
                <div>
                  <p className="text-gray-500">Identificación</p>
                  <p className="font-medium text-gray-800">
                    {selectedDoctor.identification}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-gray-400" size={18} />
                <div>
                  <p className="text-gray-500">Teléfono</p>
                  <p className="font-medium text-gray-800">
                    {selectedDoctor.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-gray-400" size={18} />
                <div>
                  <p className="text-gray-500">Correo electrónico</p>
                  <p className="font-medium text-gray-800">
                    {selectedDoctor.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <BriefcaseMedical className="text-gray-400" size={18} />
                <div>
                  <p className="text-gray-500">Consultorio</p>
                  <p className="font-medium text-gray-800">
                    {selectedDoctor.office}
                  </p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-gray-500">Estado</p>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    selectedDoctor.status === 'Activo'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {selectedDoctor.status}
                </span>
              </div>

            </div>
          </div>
        )}
      </Modal>

    </div>
  )
}
