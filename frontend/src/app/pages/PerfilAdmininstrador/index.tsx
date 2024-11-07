import MainLayout from "app/layout/MainLayout";
import * as S from "./styles";
import Title from "app/components/Title";
import api from "app/services/api";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "app/context/Auth/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, IconButton, Input, MenuItem, TextField, TextareaAutosize, Tooltip } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import SchoolIcon from "@mui/icons-material/School";
import { getCEP } from "app/utils/CEP/getCEP";

import DeleteIcon from '@mui/icons-material/Delete';


interface Doc {
    id: number,
    name: string,
    ext: string,
    path: string,
    type: string,
}

interface OldAnexo {
    id: number;
    name: string;
    originalName: string;
    ext: string;
    path: string;
    operadoraId: number
    createdAt: Date;
}

interface Anexo {
    fakeId: number;
    id: number | null;
    name: string;
    file: File
}

interface Operador {
    id: number,
    name: string,
    email: string,
    service: string,
    whatsapp: string,
    createdAt: string,
    avatarPath: string
}


const backendUrl = process.env.REACT_APP_BACKEND_URL || "";

function PerfilAdmininstrador() {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [email, setEmail] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [service, setService] = useState("");
    const [avatar, setAvatar] = useState<File>()
    const [contatoOperacional, setContatoOperacional] = useState("");
    const [outros, setOutros] = useState("");
    const [responsavePelaArea, setResponsavePelaArea] = useState("");
    const [gestor, setGestor] = useState("");
    const [profile, setProfile] = useState("");

    const [operadoraDocs, setOperadoraDocs] = useState<Doc[]>([]);

    const [contratoFile, setContratoFile] = useState<any>(null);
    const [dadosFile, setDadosFile] = useState<any>(null);
    const [cnpjFile, setCnpjFile] = useState<any>(null);

    const [oldAnexos, setOldAnexos] = useState<OldAnexo[]>([]);
   


    const [cnpj, setCnpj] = useState("");

    const [endereco, setEndereco] = useState({
        cep: "",
        rua: "",
        bairro: "",
        estado: "",
        uf: "",
        numero: "",
    });

    const [comercial, setComercial] = useState({
        responsavel: "",
        telefone: "",
        ramal: "",
        obs: "",

    });

    const [juridico, setJuridico] = useState({
        responsavel: "",
        telefone: "",
        ramal: "",
        obs: "",
    });

    const [financeiro, setFinanceiro] = useState({
        responsavel: "",
        telefone: "",
        ramal: "",
        obs: "",
    });

    const handleComercialChange = (obj: Object) => {
        setComercial(prev => ({
            ...prev,
            ...obj
        }));
    }

    const handleJuridicoChange = (obj: Object) => {
        setJuridico(prev => ({
            ...prev,
            ...obj
        }));
    }

    const handleFinanceiroChange = (obj: Object) => {
        setFinanceiro(prev => ({
            ...prev,
            ...obj
        }));
    }

    const handleEnderecoChange = (obj: Object) => {
        setEndereco(prev => ({
            ...prev,
            ...obj
        }));
    }

    const getFileInputName = (type: string) => {
        let file = null;

        if (type === "CONTRATO") {
            if (contratoFile) {
                return contratoFile[0].name
            } else if (file = operadoraDocs.find((d) => d.type === "CONTRATO")) {
                return file.name;
            }
        }

        if (type === "DADOS") {
            if (dadosFile) {
                return dadosFile[0].name
            } else if (file = operadoraDocs.find((d) => d.type === "DADOS")) {
                return file.name;
            }
        }

        if (type === "CNPJ") {
            if (cnpjFile) {
                return cnpjFile[0].name
            } else if (file = operadoraDocs.find((d) => d.type === "CNPJ")) {
                return file.name;
            }
        }

        return "Escolher os arquivos para fazer o upload";
    }

    const getPerfilInfo = async () => {
        try {
            const { data } = await api.get(`/admins/${id}`);

            setService(data.data.service);
            setDescricao(data.data.descricao || "");
            setProfile(data.data.avatarPath ?? "");
            setNome(data.data.name);
            setEmail(data.data.email || "");
            setWhatsapp(data.data.whatsapp || "");
            setContatoOperacional(data.data.contatoOperacional || "");
            setOutros(data.data.outros || "");
            setResponsavePelaArea(data.data.responsavePelaArea || "");
            setGestor(data.data.gestor || "");

            setCnpj(data.data.cnpj || "");

            setEndereco({
                cep: data.data.cep || "",
                rua: data.data.rua || "",
                bairro: data.data.bairro || "",
                estado: data.data.estado || "",
                uf: data.data.uf || "",
                numero: data.data.numero || "",
            })

            setComercial({
                responsavel: data.data.comercial_responsavel || "",
                telefone: data.data.comercial_telefone || "",
                ramal: data.data.comercial_ramal || "",
                obs: data.data.comercial_obs || "",
            });

            setJuridico({
                responsavel: data.data.juridico_responsavel || "",
                telefone: data.data.juridico_telefone || "",
                ramal: data.data.juridico_ramal || "",
                obs: data.data.juridico_obs || "",
            });

            setFinanceiro({
                responsavel: data.data.financeiro_responsavel || "",
                telefone: data.data.financeiro_telefone || "",
                ramal: data.data.financeiro_ramal || "",
                obs: data.data.financeiro_obs || "",
            });

        } catch (e) {
            console.log(e);
        }
    };






    const handleCancelarPerfil = async () => {
        toast.error("AlteraçõesCanceladas!");
        navigate(`/operadoras/${id}`);
    };

    const handleAtualizarPerfil = async () => {
        try {
            await atualizarPefil();
           

            toast.success("Perfil atualidado com sucesso!");
            navigate(`/operadoras/${id}`);
        } catch (e: any) {
            console.log(e);
        }
    };

    const searchCep = async () => {
        if (endereco.cep.length === 0) return;

        try {
            const cep = await getCEP(endereco.cep);

            if (!cep) {
                toast.warning("CEP não encontrado!");
                return;
            }

            setEndereco(prev => ({
                ...prev,

                rua: cep.logradouro,
                bairro: cep.bairro,
                estado: cep.localidade,
                uf: cep.uf,
            }));
        } catch (e) {
            toast.warning("CEP não encontrado!")
        }
    }

    const atualizarPefil = async () => {
        try {
            const formData = new FormData();

            if (avatar) {
                formData.append("avatar", avatar);
            }

            formData.append("name", nome);
            formData.append("whatsapp", whatsapp);
            formData.append("email", email);
            formData.append("service", service);
            formData.append("contatoOperacional", contatoOperacional);
            formData.append("outros", outros);
            formData.append("responsavePelaArea", responsavePelaArea);
            formData.append("gestor", gestor);

            formData.append("comercial_responsavel", comercial.responsavel);
            formData.append("comercial_telefone", comercial.telefone);
            formData.append("comercial_ramal", comercial.ramal);
            formData.append("comercial_obs", comercial.obs);

            formData.append("juridico_responsavel", juridico.responsavel);
            formData.append("juridico_telefone", juridico.telefone);
            formData.append("juridico_ramal", juridico.ramal);
            formData.append("juridico_obs", juridico.obs);

            formData.append("financeiro_responsavel", financeiro.responsavel);
            formData.append("financeiro_telefone", financeiro.telefone);
            formData.append("financeiro_ramal", financeiro.ramal);
            formData.append("financeiro_obs", financeiro.obs);

            formData.append("cnpj", cnpj.replace(/\D/g, ""));

            formData.append("cep", endereco.cep.trim().replace(/\D/g, ""));
            formData.append("rua", endereco.rua.trim());
            formData.append("bairro", endereco.bairro.trim());
            formData.append("estado", endereco.estado.trim());
            formData.append("uf", endereco.uf.trim());
            formData.append("numero", endereco.numero.trim());

            await api.put(`/admins/${id}/perfil`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } catch (e: any) {
            let message = "Erro ao atualizar a operadora!";

            if (e?.response?.data?.error) {
                message = e?.response?.data?.error;
            }

            toast.error(message);
            throw message;
        }

    };
    useEffect(() => {
        if (id) {
            getPerfilInfo();
       
        }
    }, [id]);

    return (
        <MainLayout>
            <S.Container>
                <S.MainGrid>
                    <S.FormGoup >
                        <S.SubTitle>
                            <CreateIcon style={{ color: "#59CEB5" }} />
                            EDITAR PERFIL
                        </S.SubTitle>

                        <S.ResumeGrid >
                            <div className="text-area-container">
                                <div
                                    className="mx-auto"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        position: "relative",
                                        width: "fit-content"
                                    }}>

                                    {/* <AvatarUpload onChangeImage={setAvatar} src={getBackUrl() + "/" + (profile || '')} /> */}
                                </div>
                            </div>

                            <S.FormSectionTitle>
                                DADOS DA OPERADORA
                            </S.FormSectionTitle>

                            <div>

                                <TextField
                                    fullWidth
                                    id="nome"
                                    label="Nome"
                                    variant="outlined"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />

                                <TextField
                                    fullWidth
                                    id="email"
                                    label="Email de suporte"
                                    variant="outlined"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    id="whatsapp"
                                    label="Whatsapp"
                                    variant="outlined"
                                    value={whatsapp}
                                    onChange={e => setWhatsapp(e.target.value)}
                                />

                                {/* <TextField
                                    fullWidth
                                    id="comercial"
                                    label="Comercial"
                                    variant="outlined"
                                    value={comercial}
                                    onChange={e => setComercial(e.target.value)}
                                /> */}
                            </div>

                            <div>
                                <TextField
                                    fullWidth
                                    id="contatoOperacional"
                                    label="Contato Operacional"
                                    variant="outlined"
                                    value={contatoOperacional}
                                    onChange={e => setContatoOperacional(e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    id="responsavePelaArea"
                                    label="Responsavel Pela Area"
                                    variant="outlined"
                                    value={responsavePelaArea}
                                    onChange={e => setResponsavePelaArea(e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    id="gestor"
                                    label="Gestor"
                                    variant="outlined"
                                    value={gestor}
                                    onChange={e => setGestor(e.target.value)}
                                />
                            </div>

                            <div className="span-2">
                                <TextField
                                    fullWidth
                                    id="cnpj"
                                    label="CNPJ"
                                    variant="outlined"
                                    value={cnpj}
                                    // onChange={e => setCnpj(setCnpjMask(e.target.value))}
                                />
                            </div>

                            <div className="span-2">
                                <TextField
                                    fullWidth
                                    id="outros"
                                    label="Outros"
                                    variant="outlined"
                                    value={outros}
                                    onChange={e => setOutros(e.target.value)}
                                />
                            </div>

                            <div>
                                <TextField
                                    fullWidth
                                    id="cep"
                                    label="CEP"
                                    variant="outlined"
                                    value={endereco.cep}
                                    onChange={e => handleEnderecoChange({ cep: e.target.value })}
                                    onBlur={searchCep}
                                />
                                <TextField
                                    fullWidth
                                    id="rua"
                                    label="Bairro"
                                    variant="outlined"
                                    value={endereco.bairro}
                                    onChange={e => handleEnderecoChange({ bairro: e.target.value })}
                                />
                                <TextField
                                    select
                                    label="UF"
                                    fullWidth
                                    type="text"
                                    id="uf"
                                    name="uf"
                                    value={endereco.uf}
                                    onChange={e => handleEnderecoChange({ uf: e.target.value })}
                                    SelectProps={{
                                        MenuProps: {
                                            style: {
                                                maxHeight: 400, // Defina a altura máxima desejada para o menu
                                            },
                                        },
                                    }}
                                >
                                    <MenuItem value={"AC"}>AC</MenuItem>
                                    <MenuItem value={"AL"}>AL</MenuItem>
                                    <MenuItem value={"AP"}>AP</MenuItem>
                                    <MenuItem value={"AM"}>AM</MenuItem>
                                    <MenuItem value={"BA"}>BA</MenuItem>
                                    <MenuItem value={"CE"}>CE</MenuItem>
                                    <MenuItem value={"DF"}>DF</MenuItem>
                                    <MenuItem value={"ES"}>ES</MenuItem>
                                    <MenuItem value={"GO"}>GO</MenuItem>
                                    <MenuItem value={"MA"}>MA</MenuItem>
                                    <MenuItem value={"MT"}>MT</MenuItem>
                                    <MenuItem value={"MS"}>MS</MenuItem>
                                    <MenuItem value={"MG"}>MG</MenuItem>
                                    <MenuItem value={"PA"}>PA</MenuItem>
                                    <MenuItem value={"PB"}>PB</MenuItem>
                                    <MenuItem value={"PR"}>PR</MenuItem>
                                    <MenuItem value={"PE"}>PE</MenuItem>
                                    <MenuItem value={"PI"}>PI</MenuItem>
                                    <MenuItem value={"RJ"}>RJ</MenuItem>
                                    <MenuItem value={"RN"}>RN</MenuItem>
                                    <MenuItem value={"RS"}>RS</MenuItem>
                                    <MenuItem value={"RO"}>RO</MenuItem>
                                    <MenuItem value={"RR"}>RR</MenuItem>
                                    <MenuItem value={"SC"}>SC</MenuItem>
                                    <MenuItem value={"SP"}>SP</MenuItem>
                                    <MenuItem value={"SE"}>SE</MenuItem>
                                    <MenuItem value={"TO"}>TO</MenuItem>
                                </TextField>
                            </div>

                            <div>
                                <TextField
                                    fullWidth
                                    id="rua"
                                    label="Rua"
                                    variant="outlined"
                                    value={endereco.rua}
                                    onChange={e => handleEnderecoChange({ rua: e.target.value })}
                                />
                                <TextField
                                    fullWidth
                                    id="numero"
                                    label="Numero"
                                    variant="outlined"
                                    value={endereco.numero}
                                    onChange={e => handleEnderecoChange({ numero: e.target.value })}
                                />
                                <TextField
                                    fullWidth
                                    id="rua"
                                    label="Estado"
                                    variant="outlined"
                                    value={endereco.estado}
                                    onChange={e => handleEnderecoChange({ estado: e.target.value })}
                                />
                            </div>

                            <S.FormSectionTitle>
                                COMERCIAL
                            </S.FormSectionTitle>

                            <div>
                                <TextField
                                    fullWidth
                                    id="contatoOperacional"
                                    label="Responsavel"
                                    variant="outlined"
                                    value={comercial.responsavel}
                                    onChange={e => handleComercialChange({ responsavel: e.target.value })}
                                />

                                <TextField
                                    fullWidth
                                    id="gestor"
                                    label="Ramal"
                                    variant="outlined"
                                    value={comercial.ramal}
                                    onChange={e => handleComercialChange({ ramal: e.target.value })}
                                />
                            </div>

                            <div>
                                <TextField
                                    fullWidth
                                    id="responsavePelaArea"
                                    label="Telefone"
                                    variant="outlined"
                                    value={comercial.telefone}
                                    onChange={e => handleComercialChange({ telefone: e.target.value })}
                                />

                                <TextField
                                    fullWidth
                                    id="gestor"
                                    label="Obs"
                                    variant="outlined"
                                    value={comercial.obs}
                                    onChange={e => handleComercialChange({ obs: e.target.value })}
                                />
                            </div>

                            <S.FormSectionTitle>
                                JURIDICO
                            </S.FormSectionTitle>

                            <div>
                                <TextField
                                    fullWidth
                                    id="contatoOperacional"
                                    label="Responsavel"
                                    variant="outlined"
                                    value={juridico.responsavel}
                                    onChange={e => handleJuridicoChange({ responsavel: e.target.value })}
                                />

                                <TextField
                                    fullWidth
                                    id="gestor"
                                    label="Ramal"
                                    variant="outlined"
                                    value={juridico.ramal}
                                    onChange={e => handleJuridicoChange({ ramal: e.target.value })}
                                />
                            </div>

                            <div>
                                <TextField
                                    fullWidth
                                    id="responsavePelaArea"
                                    label="Telefone"
                                    variant="outlined"
                                    value={juridico.telefone}
                                    onChange={e => handleJuridicoChange({ telefone: e.target.value })}
                                />

                                <TextField
                                    fullWidth
                                    id="gestor"
                                    label="Obs"
                                    variant="outlined"
                                    value={juridico.obs}
                                    onChange={e => handleJuridicoChange({ obs: e.target.value })}
                                />
                            </div>

                            <S.FormSectionTitle>
                                FINANCEIRO
                            </S.FormSectionTitle>

                            <div>
                                <TextField
                                    fullWidth
                                    id="contatoOperacional"
                                    label="Responsavel"
                                    variant="outlined"
                                    value={financeiro.responsavel}
                                    onChange={e => handleFinanceiroChange({ responsavel: e.target.value })}
                                />

                                <TextField
                                    fullWidth
                                    id="gestor"
                                    label="Ramal"
                                    variant="outlined"
                                    value={financeiro.ramal}
                                    onChange={e => handleFinanceiroChange({ ramal: e.target.value })}
                                />
                            </div>

                            <div>
                                <TextField
                                    fullWidth
                                    id="responsavePelaArea"
                                    label="Telefone"
                                    variant="outlined"
                                    value={financeiro.telefone}
                                    onChange={e => handleFinanceiroChange({ telefone: e.target.value })}
                                />

                                <TextField
                                    fullWidth
                                    id="gestor"
                                    label="Obs"
                                    variant="outlined"
                                    value={financeiro.obs}
                                    onChange={e => handleFinanceiroChange({ obs: e.target.value })}
                                />
                            </div>

                        </S.ResumeGrid>

                    </S.FormGoup>
                   

                </S.MainGrid>

                <S.Footer style={{ display: 'flex', justifyContent: 'center', gap: "1rem" }}>
                    <Button
                        onClick={handleCancelarPerfil}
                        color="secondary"
                        style={{
                            color: "#FFFFFF",
                            backgroundColor: "rgb(236, 83, 108)",
                            borderRadius: "4px",
                            padding: "7px 15px",
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleAtualizarPerfil}
                        color="secondary"
                        style={{
                            color: "#FFFFFF",
                            backgroundColor: "#59CEB5",
                            borderRadius: "4px",
                            padding: "7px 15px",
                        }}
                    >
                        Atualizar
                    </Button>
                </S.Footer>
            </S.Container>

  
        </MainLayout>
    )
}

export default PerfilAdmininstrador