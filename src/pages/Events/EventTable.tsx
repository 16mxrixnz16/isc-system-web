import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import ContainerPage from "../../components/common/ContainerPage";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { events } from "../../data/events";
import dayjs from "dayjs";

const EventTable = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const columns: GridColDef[] = [
    {
      field: "startDate",
      headerName: "Fecha Inicio",
      headerAlign: "center",
      align: "center",
      flex: 1,
      valueGetter: (params: any) =>
        dayjs(params.startDate).format("DD/MM/YYYY"),
    },
    {
      field: "name",
      headerName: "Nombre del Evento",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "responsiblePerson",
      headerName: "Supervisor del evento",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "pendingInterns",
      headerName: "Solicitudes de Becarios",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "selectedInterns",
      headerName: "Becarios Seleccionados",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Acciones",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => (
        <div>
          <IconButton
            color="primary"
            aria-label="ver"
            onClick={() => handleView(params.row.id_event)}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="editar"
            onClick={() => handleEdit(params.row.id_event)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            aria-label="eliminar"
            onClick={() => handleClickOpen(params.row.id_event)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleCreateEvent = () => {
    navigate("/events/create");
  };

  const handleView = (id: number) => {
    navigate(`/interns`);
  };

  const handleEdit = (id: string) => {
    navigate(`/editEvent/${id}`);
  };

  const handleClickOpen = (id: number) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleDelete = async () => {
    // TODO: add actual delete event logic
    setOpen(false)
  };

  return (
    <ContainerPage
      title="Lista de Eventos"
      subtitle="Resumen de los eventos programados y sus detalles"
      actions={
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCreateEvent}
          startIcon={<AddIcon />}
        >
          Agregar evento
        </Button>
      }
    >
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={events}
          columns={columns}
          getRowId={(row) => row.id_event}
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
          onClose={(_, reason) => {
            if (reason !== "backdropClick") { 
              handleClose();
            }
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{ display: "flex", justifyContent: "space-between" }} 
          >
            <Typography sx={{ textAlign: 'center', width: '100%', fontWeight: 'bold' }}>
              Confirmar eliminación
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" sx={{ textAlign: 'center' }}>
              ¿Estás seguro de que deseas eliminar este evento? Esta acción no
              se puede deshacer.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "flex-end", padding: '16px', gap: '16px' }}>
            <Button
              onClick={handleClose}
              color="primary"
              variant="contained"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                marginRight: '8px',
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDelete}
              sx={{
                backgroundColor: "red",
                color: "white",
                fontWeight: 'bold',
                "&:hover": { backgroundColor: "darkred" },
              }}
            >
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ContainerPage>
  );
};

export default EventTable;
