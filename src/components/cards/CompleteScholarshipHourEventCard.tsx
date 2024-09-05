import { Button, Card, CardContent, Dialog, DialogActions, DialogTitle, Grid, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dayjs, { Dayjs } from "dayjs";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

interface CompleteScholarshipHourEventCardProps {
    event: {
        id_event: number;
        name: string;
        description: string;
        validatedHours: string;
        startDate: Dayjs;
        duration: number;
        place: string;
        maxInterns: number;
        minInterns: number;
    }
}

const CompleteScholarshipHourEventCard: FC<CompleteScholarshipHourEventCardProps> = ({ event }) => {
    const { id_event, name, description, validatedHours, startDate, duration, place, maxInterns, minInterns } = event;
    const [dialogConfirmationFinishEvent, setDialogConfirmationFinishEventOpen] = useState(false);
    const [dialogShowTheResultsFinishEvent, setDialogShowTheResultsFinishEventOpen] = useState(false);

    dayjs.locale("es");

    const navigate = useNavigate();

    const goToShowEvent = () => {
        navigate(`/interns`);
    }

    const handleDialogConfirmationFinishEventOpen = () => {
        setDialogConfirmationFinishEventOpen(true);
    };

    const handleDialogShowTheResultsFinishEventOpen = () => {
        setDialogShowTheResultsFinishEventOpen(true);
        setDialogConfirmationFinishEventOpen(false);
    };
    
    const handleDialogConfirmationFinishEventClose = () => {
        setDialogConfirmationFinishEventOpen(false);
    };

    const handleDialogShowTheResultsFinishEventClose = () => {
        setDialogShowTheResultsFinishEventOpen(false);
    };

    const handleConfirmationEnding = () => {
        setDialogShowTheResultsFinishEventOpen(false);
        navigate(`/interns`);
    };

    return (
        <Card sx={{ maxWidth: 1150 }}>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography fontSize={20} color="text.primary" sx={{ fontWeight: "bold" }}>
                            {name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3.5}>
                        <Typography fontSize={17} color="text.primary">
                            <strong>Fecha:</strong> {dayjs(startDate).format("DD/MM/YYYY")}
                        </Typography>
                        <Typography fontSize={17} color="text.primary">
                            <strong>Duración:</strong> {duration}
                        </Typography>
                        <Typography fontSize={17} color="text.primary">
                            <strong>Horas becarias:</strong> {validatedHours}
                        </Typography>
                        <Typography fontSize={17} color="text.primary">
                            <strong>Lugar:</strong> {place}
                        </Typography>
                        <Typography fontSize={17} color="text.primary">
                            <strong>Máximo de becarios:</strong> {maxInterns}
                        </Typography>
                        <Typography fontSize={17} color="text.primary">
                            <strong>Máximo de suplentes:</strong> {minInterns}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Typography fontSize={17} color="text.primary">
                            <strong>Descripción:</strong> {description}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3.5} sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                        <Button aria-label="Solicitudes de inscripción"
                            variant="contained"
                            color="secondary"
                            sx={{ width: 250 }}
                            onClick={goToShowEvent}> Solicitudes de inscripción
                        </Button>
                        <Button aria-label="Finalizar evento"
                            variant="contained"
                            color="error"
                            sx={{ marginTop: 3, width: 180 }}
                            onClick={handleDialogConfirmationFinishEventOpen}> Finalizar evento
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
            <Dialog
                open={dialogConfirmationFinishEvent}
                onClose={handleDialogConfirmationFinishEventClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ position: "relative" }}>
                    <IconButton
                        aria-label="close"
                        onClick={handleDialogConfirmationFinishEventClose}
                        sx={{
                            position: "absolute",
                            right: 1,
                            top: 1,
                            color: (theme) => theme.palette.grey[800],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    ¿Desea finalizar el evento {name}?
                </DialogTitle>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button onClick={handleDialogShowTheResultsFinishEventOpen} color="error" variant="contained" autoFocus >
                        Finalizar
                    </Button>
                    <Button onClick={handleDialogConfirmationFinishEventClose} color="primary" autoFocus>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={dialogShowTheResultsFinishEvent}
                onClose={handleDialogShowTheResultsFinishEventClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {name} finalizado exitosamente.
                </DialogTitle>
                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button onClick={handleConfirmationEnding} color="primary" autoFocus >
                        Ver resultados
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

export default CompleteScholarshipHourEventCard;
