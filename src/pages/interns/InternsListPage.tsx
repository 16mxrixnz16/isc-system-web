
import { Button, Dialog, DialogActions, DialogTitle, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import dayjs from "dayjs";
import { EventDetails } from "../../models/eventInterface";
import EventDetailsPage from "../../components/common/EventDetailsPage";

  const InternsListPage = () => {
    //TODO: Delete this simulation of database
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [students, setStudents] = useState([
      {
        id: 1,
        name: "Alexia Diana Marín Mamani",
        code: "608555",
        time: "22:23",
        status: "Rechazado",
      },
      {
        id: 2,
        name: "Rodrigo Gustavo Reyes Monzón",
        code: "679523",
        time: "08:49",
        status: "Seleccionado",
      },
    ]);

    const handleStatusChange = (newStatus: string) => {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === selectedId ? { ...student, status: newStatus } : student
        )
      );
      handleClose();
    };

    const handleClose = () => {
      setOpen(false);
      setSelectedId(null);
    };

    const handleClickOpen = (id: number) => {
      setSelectedId(id);
      setOpen(true);
    };

    const columns: GridColDef[] = [
      {
        field: "name",
        headerName: "Nombre del becario/a",
        headerAlign: "center",
        align: "center",
        flex: 1,
      },
      {
        field: "code",
        headerName: "Código",
        headerAlign: "center",
        align: "center",
        flex: 1,
      },
      {
        field: "time",
        headerName: "Hora de registro",
        type: "string",
        headerAlign: "center",
        align: "center",
        flex: 1,
      },
      {
        field: "status",
        headerName: "Seleccionado/Rechazado",
        headerAlign: "center",
        align: "center",
        flex: 1,

        renderCell: (params) => (
          <Button onClick={() => handleClickOpen(params.row.id)}>
            {params.value}
          </Button>
        ),
      },
    ];
    const eventDetails: EventDetails = {
      title: "Evento de 100 mejores",
      date:  dayjs("2024-07-01T10:00:00Z"),
      endDate:  dayjs("2024-07-01T10:00:00Z"),
      duration: 6,
      scholarshipHours: "4 horas",
      location: "Centro de Eventos, Campus Achocalla",
      maxParticipants: 30,
      minParticipants: 5,
      responsiblePerson: "Juan",
      description:
        "Se necesitan becarios que ayuden en la logística del evento donde se recibirá a los estudiantes ganadores de la beca 100 mejores.",
      status: "PENDIENTE",
    };


    return (
      <div style={{ position: 'relative', height: '100vh' }}> 
      <IconButton 
        onClick={() => window.history.back()} 
        aria-label="back"
        style={{ 
          position: 'absolute',
          top: '23px', 
          left: '16px', 
          zIndex: 1
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <EventDetailsPage
        event={eventDetails}
        children={
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={students}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              classes={{
                root: "bg-white dark:bg-gray-800",
                columnHeader: "bg-gray-200 dark:bg-gray-800 ",
                cell: "bg-white dark:bg-gray-800",
                row: "bg-white dark:bg-gray-800",
                columnHeaderTitle: "!font-bold text-center",
              }}
              pageSizeOptions={[5, 10]}
            />
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                ¿Deseas cambiar la solicitud de{" "}
                {students.find((student) => student.id === selectedId)?.name}?
              </DialogTitle>
              <DialogActions>
                <Button
                  onClick={() => handleStatusChange("Seleccionado")}
                  color="primary"
                >
                  Seleccionado
                </Button>
                <Button
                  onClick={() => handleStatusChange("Rechazado")}
                  color="secondary"
                  autoFocus
                >
                  Rechazado
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        }
      />
      </div>
    );
  };

  export default InternsListPage;