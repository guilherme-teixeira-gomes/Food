import Box from '@mui/material/Box';
import * as S from "./styles";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import api from 'app/services/api';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: "4px",
    boxShadow: 24,
    p: 4,
};

interface Props {
    open: boolean;
    handleClose: () => void;
}

function NotificationCleanModal({ open, handleClose }: Props) {

    const cleanNotificationHanlde = async () => {
        try {
            await api.delete("/notification");

            toast.success("Notificações limpadas com sucesso!");
            handleClose();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography className="mb-4" variant="h6" component="h2">
                    Tem a certeza de que pretende eliminar todas as notificações?
                </Typography>

                <S.Body>
                    <Button
                        variant="contained"
                        component="button"
                        size='small'
                        style={{ backgroundColor: "#EC536C" }}
                        onClick={() => handleClose()}
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant="contained"
                        component="button"
                        size='small'
                        style={{ backgroundColor: "#81b2fc" }}
                        onClick={() => cleanNotificationHanlde()}
                    >
                        Limpar notificações
                    </Button>
                </S.Body>
            </Box>
        </Modal>
    )
}

export default NotificationCleanModal