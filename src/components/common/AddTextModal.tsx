import { FC, useState } from "react";
import { Modal as MuiModal, Box, TextField, Button, Typography } from "@mui/material";
import { AddTextModalProps } from "../../models/addTextModalPropsInterface";

import './ModalStyle.css';

const AddTextModal: FC<AddTextModalProps> = ({ isVisible, setIsVisible, onCreate }) => {
const [name, setName] = useState('');

  const handleCreate = async () => {
    onCreate(name);
    setIsVisible(false);
  };

  const toggleModal = () => {
    setIsVisible(!isVisible);
    setName('');
  };

  return (
    <MuiModal
      open={isVisible}
      onClose={toggleModal}
      aria-labelledby="create-modal-title"
      aria-describedby="create-modal-description"
    >
      <Box
        className = 'modal-box'
      >
        <Typography id="create-modal-title" variant = 'h5'>Crear nuevo rol</Typography>
        <TextField
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Ingresa el nombre del nuevo rol"
          variant="outlined"
          inputProps={{ maxLength: 25 }}
          sx={{ marginTop: '20px' }}
        />
        <Box display="flex" justifyContent="flex-end" mt={2}  sx={{ marginTop: '20px' }}>
          <Button variant="outlined" color="secondary" onClick={toggleModal} sx={{ marginRight: '10px' }}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Crear
          </Button>
        </Box>
      </Box>
    </MuiModal>
  );
};

export default AddTextModal;
