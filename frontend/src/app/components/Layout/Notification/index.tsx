import * as S from "./styles";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import api from "app/services/api";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { io } from "socket.io-client";
import { AuthContext } from "app/context/Auth/AuthContext";
import { toast } from "react-toastify";
import NotificationCleanModal from "../NotificationCleanModal";
const backendUrl = process.env.REACT_APP_BACKEND_URL || "";

interface Notification {
    id: number;
    message: string;
    lida: boolean;
    link: string;
    createdAt: string;
}

function Notification() {
    const { user } = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);

    const [isOpenModalCleanNotification, setIsOpenModalCleanNotification] = useState(false);

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [quantity, setQuantity] = useState(0);

    const [isLoading, setIsLoading] = useState(false);
    const [hasMoreNotification, setHasMoreNotification] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const ref = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen(prev => !prev);

    const getNotification = async () => {
        setIsLoading(true);
        try {
            const params = {
                page: currentPage
            };

            const { data } = await api.get("/notification", { params });

            setHasMoreNotification(data.length >= 5)
            setNotifications(prev => prev.concat(data));
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
            getNotificationCount();
        }
    }

    const getNotificationCount = async () => {
        try {
            const { data } = await api.get("/notification/quantity");

            setQuantity(data.qtd);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {

        if (isOpen) {
            getNotification();
        } else {
            setCurrentPage(1);
            setNotifications([]);
        }

    }, [isOpen, currentPage]);

    useEffect(() => {
        getNotificationCount();
    }, []);

    useEffect(() => {
        const socket = io(backendUrl);
        // Event: WebSocket connection is established
        socket.on('connect', () => {
            const socketId = socket.id;

            if (user.type === "CLIENTE") {
                socket.emit('connectUser', {
                    userId: user.id,
                    type: user.type,
                    socketId
                });
            } else if (user.type === "ADMINISTRACAO") {
                socket.emit('joinRoom', user.id);
            } else if (user.type === "USER_OPERADORA") {
                api.get(`/userOperadora/${user.id}`).then(({ data }) => {
                    socket.emit('joinRoom', data.data.operadoraId);
                });
            }
        });

        // Event: WebSocket connection receives a response from the server
        socket.on('notificationCount', () => {
            getNotificationCount();
        });

        socket.on('notification', ({ message }: { message: string }) => {
            toast.info(message);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClose(); // Call the onClose function when a click occurs outside the component
            }
        };

        // Attach the event listener to the document when the component mounts
        document.addEventListener('click', handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [onClose]);

    return (
        <>
            <S.NotificationContainer ref={ref}>
                <S.IconBox onClick={toggleMenu} style={{ marginLeft: "10px" }}>
                    <NotificationsNoneIcon />
                    <S.IconEdge className="bg-red">{quantity}</S.IconEdge>
                </S.IconBox>

                {isOpen &&
                    (
                        <S.Menu>
                            {notifications.map((n) => (
                                <S.MenuItem backgroundColor={n.lida ? '#FFF' : '#0000000D'} key={n.id}>
                                    <Link to={`/${n.link}`}>
                                        {n.message}
                                    </Link>
                                </S.MenuItem>
                            ))}

                            {isLoading ? (
                                <div className="d-flex justify-content-center py-2">
                                    <Box sx={{ display: 'flex' }}>
                                        <CircularProgress />
                                    </Box>
                                </div>
                            ) : (
                                <div className="d-flex justify-content-around py-2">
                                    {notifications.length > 0 && (
                                        <span
                                            className="cursor-pointer"
                                            onClick={() => setIsOpenModalCleanNotification(true)}
                                        >
                                            Limpar notificações
                                        </span>
                                    )}

                                    {hasMoreNotification
                                        ? <span
                                            className="cursor-pointer"
                                            onClick={() => setCurrentPage(prev => prev + 1)}
                                        >
                                            Carregar mais
                                        </span>
                                        : <span>Sem notificações</span>}
                                </div>
                            )}
                        </S.Menu>
                    )
                }
            </S.NotificationContainer >

            <NotificationCleanModal
                open={isOpenModalCleanNotification}
                handleClose={() => setIsOpenModalCleanNotification(false)}
            />
        </>
    )
}

export default Notification