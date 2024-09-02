import { useEffect, useState } from "react"
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { deleteUser, getUsers } from "../../services/usersService";
import ContainerPage from "../../components/common/ContainerPage";
import { getRoles } from "../../services/roleService";
import { Role } from "../../models/roleInterface";


const UsersPage = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [isOpenDelete, setOpenDelete] = useState(false)
    const [selectedUser, setSelectedUser] = useState<number | null>(null)
    const [roles, setRoles] = useState([])

    const handleCreateUser = () => {
      navigate("/create-user");
    };

    const handleView = (id: number) => {
        navigate(`/profile/${id}`);
    };

    const handleEdit = (id: number) => {
        navigate(`/edit-user/${id}`);
    };

    const handleClickDelete = (id: number) => {
        setSelectedUser(id)
        setOpenDelete(true)
    }

    const handleCloseDelete = () => {
        setOpenDelete(false);
        setSelectedUser(null);
    };

    const handleDelete = async () => {
        if (selectedUser !== null) {
            try {
              await deleteUser(selectedUser);
              fetchUsers();
            } catch (error) {
              console.log(error);
            } 
            handleCloseDelete();   
        }
    }

    const columns: GridColDef[] = [
        {
          field: "code",
          headerName: "Código", 
          headerAlign: "center",
          align: "center",
          flex: 1,
        },
        {
            field: "fullName",
            headerName: "Nombre Completo", 
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "email",
            headerName: "Correo", 
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "cellphone",
            headerName: "Cellphone", 
            headerAlign: "center",
            align: "center",
            flex: 1,
        },
        {
            field: "rol",
            headerName: "Rol", 
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: ({row}) => (
              row.roles.map((rol:string) => (
                <Chip key={rol} label={rol}/>
              ))
            )
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
                  onClick={() => handleView(params.row.id)}
                >
                  <VisibilityIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  aria-label="editar"
                  onClick={() => handleEdit(params.row.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  aria-label="eliminar"
                  onClick={() => handleClickDelete(params.row.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ),
        }
    ]

    const fetchUsers = async () => {
        const usersResponse = await getUsers()
        for(const user of usersResponse){
          user.fullName = `${user.name} ${user.lastname} ${user.mothername}`
        }
        setUsers(usersResponse)
    }

    const fetchRoles = async () => {
      const rolesResponse = await getRoles()
      setRoles(rolesResponse)
    }

    useEffect( () => {
        fetchUsers()
        fetchRoles()
    },[])

    return (
        <ContainerPage
          title={"Usuarios"}
          subtitle={"Lista de usuarios"}
          actions={
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCreateUser}
              startIcon={<AddIcon />}
            >
              Agregar Usuario
            </Button>
          }
          children={
            <div style={{ height: 400, width: "100%" }}>
              <Grid container style={{paddingBottom: 20}}>
                <Grid md={6}>
                  <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between m-5 mb-8 overflow-hidden">
                    <label htmlFor="table-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                        <FaSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="table-search"
                        className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Buscar por codigo y nombre de estudiante"
                        // TODO: Implementar funcionalidad de busqueda
                        // value={search}
                        // onChange={handleSearchChange}
                      />
                    </div>
                  </div>
                </Grid>
                <Grid md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Rol</InputLabel>
                    <Select
                      fullWidth
                      label="Rol"
                    >
                      {roles.map((rol: Role) => (
                        <MenuItem value={rol.roleName}>{rol.roleName}</MenuItem>
                      ))}
                    </Select>
                    </FormControl>
                  </Grid>
              </Grid>
              <DataGrid
                rows={users}
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
                open={isOpenDelete}
                onClose={handleCloseDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >

                <DialogTitle id="alert-dialog-title">
                    Confirmar eliminación
                </DialogTitle>
                
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    ¿Estás seguro de que deseas eliminar este usuario? Esta
                    acción no se puede deshacer.
                  </DialogContentText>
                </DialogContent>

                <DialogActions>
                  <Button 
                    onClick={handleCloseDelete} 
                    color="primary">
                    Cancelar
                  </Button>
                  
                  <Button 
                    onClick={handleDelete} 
                    color="secondary" autoFocus>
                    Eliminar
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          }
        />
    )
}

export default UsersPage