'use client'
import { Menu } from "@/app/components/nav/nav";
import { useEffect, useMemo, useState } from "react";
import { Dropdown } from "react-bootstrap";
import './page.css';
import { AdminTable } from "@/app/components/AdminTable/adminTable";
import { getAllMascotas, getClientes } from "@/app/services/client";
import { getPeluqueras } from "@/app/services/admin";
import { IProfesional, Horario } from "@/app/model/IProfesional";
import { AgendaTurnos } from "@/app/components/AgendaTurnos/agendaTurnos";

const columnsClient = [
  {
    header: "N° de Cliente",
    accessorKey: "id_cliente",
  },
  {
    header: "DNI",
    accessorKey: "dni",
  },
  {
    header: "Nombre y Apellido",
    accessorKey: "nombre",
  },
  {
    header: "Mail",
    accessorKey: "mail"
  },
  {
    header: "Telefono",
    accessorKey: "telefono",
  },
];

const columnsMascotas = [
  {
    header: "N° de Mascota",
    accessorKey: "num_mascota",
  },
  {
    header: "Nombre",
    accessorKey: "nombre",
  },
  {
    header: "Edad",
    accessorKey: "edad"
  },
  {
    header: "Raza",
    accessorKey: "raza",
  },
  {
    header: "Dueño DNI",
    accessorFn: (row: any) => row?.duenio?.dni ?? '—',
  },
  {
    header: "Nombre y Apellido",
    accessorFn: (row: any) => row?.duenio?.nombre ?? '—',
  },
  {
    header: "Teléfono",
    accessorFn: (row: any) => row?.duenio?.telefono ?? '—',
  },
];

const diasSemana: Record<number, string> = {
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado',
  7: 'Domingo',
};

const columnsProf = [
  {
    header: "N° de Profesional",
    accessorKey: "id_peluquera",
  },
  {
    header: "Nombre y Apellido",
    accessorKey: "nombre",
  },
  {
    header: "DNI",
    accessorKey: "dni",
  },
  {
    header: "Fecha de Nacimiento",
    accessorKey: "fecha_nacimiento",
  },
  {
    header: "Teléfono",
    accessorKey: "telefono"
  },
  {
    header: "Horarios",
    accessorFn: (row: IProfesional) => {
      const horarios = row.horarios ?? [];
      if (horarios.length === 0) return "Sin horarios asignados";

      // Tipamos el acumulador correctamente
      const grupos = horarios.reduce((acc: Record<number, string[]>, h: Horario) => {
        const dia = Number(h.dia);
        if (!acc[dia]) acc[dia] = [];
        acc[dia].push(h.horario);
        return acc;
      }, {});

      // Ordenamos por día para consistencia y formateamos
      return Object.keys(grupos)
        .map(d => {
          const diaNum = Number(d);
          const horas = grupos[diaNum].join(", ");
          return `${diasSemana[diaNum] ?? diaNum}: ${horas}`;
        })
        .join("\n");
    },
    // cell recibe un objeto; lo tipamos como any para evitar que TS se queje
    cell: (props: any) => {
      const value = props.getValue() as string;
      return (
        <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
          {value}
        </pre>
      );
    },
  },
];


function AdminPage() {
  const [filter, setFilter] = useState('Clientes');
  const [data, setData] = useState<any[]>([])

  const loadClientes = async () => {
    const resp = await getClientes();
    if (resp) setData(resp);
  }

  const loadMascotas = async () => {
    const resp = await getAllMascotas();
    if (resp) setData(resp);
  }

  const loadProf = async () => {
    const resp = await getPeluqueras();
    if (resp) setData(resp);
  }

  const updateData = () => {
    switch (filter) {
      case 'Mascotas':
        loadMascotas();
        break;

      case 'Clientes':
        loadClientes();
        break;

      case 'Profesionales':
        loadProf();
        break;

    }
  }

  useEffect(() => {
    switch (filter) {
      case 'Mascotas':
        loadMascotas();
        break;

      case 'Clientes':
        loadClientes();
        break;

      case 'Profesionales':
        loadProf();
        break;

      default:
        loadClientes();
    }
  }, [filter])

  const columns = useMemo(() => {
    switch (filter) {
      case 'Clientes':
        return columnsClient;

      case 'Mascotas':
        return columnsMascotas;

      case 'Profesionales':
        return columnsProf;

      default:
        return columnsClient;
    }
  }, [filter])

  return (
    <>
      <header>
        <div>
          <Menu></Menu>
        </div>

      </header>

      <main className="page-admin">
        <div className="d-flex justify-content-between">
          <Dropdown >
            <Dropdown.Toggle className="btn-style">{filter}</Dropdown.Toggle>
            <Dropdown.Menu >
              <Dropdown.Item onClick={() => setFilter('Clientes')}>Clientes</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter('Mascotas')}>Mascotas</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter('Profesionales')}>Profesionales</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter('Turnos')}>Turnos</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {filter == 'Turnos' && <AgendaTurnos />}
        {filter != 'Turnos' &&
        <AdminTable data={data} columns={columns} filter={filter} updateData={updateData} />
        }
      </main>
    </>
  )
}
export default AdminPage;