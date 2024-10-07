# Fluxo: Solicitação de procedimento.

## Tela de solicitação

- Pesquisar especialidade: 4h;

### Modo de buscar

- Fila: O sistema escolhe 4 medicos aleatóriamente de acordo com a especialidade - 6h
- Manual: A operadoar selecionar 4 médicos pelo CRM ou nome - 4h;
- No memento de envio a sistema deve gerar um token para aquele email: 1h.

### Fluxo do médico

- Email para o médico solicitante: 6h;
- Tabela de token para o medico solicitante não poder fazer duas ações no mesmo e-mail - 2h.
- O médico pode recusar os 4 especialistas e o processo deve voltar para o fluxo - 4h;
- Notifição de solicitação recusada: 4h;
- Tabela de medicos recusados por procedimento: 2h;
  
### Final

- A operadora pode criar um procedimento com o código da solicitação: 3h.

Total: 5d - 6d.

# Fluxo: Chat.

Chat de comunicação dentre operadoras e prestadores/especilistas.

- Icone na navbar com total de mensagens não lidas: 3h.
  
## Tela de mensagens.

Tabelas: 8h.
 - Chat
 - message_epecialista_operadora
  - body
  - from: ""
  - prestados_id
  - operadora_id
  - chat_id;
  - created_at;
