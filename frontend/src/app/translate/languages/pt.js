const messages = {
  pt: {
    translations: {
      signup: {
        title: "Cadastre-se",
        toasts: {
          success: "Usuário criado com sucesso! Faça seu login!!!.",
          fail: "Erro ao criar usuário. Verifique os dados informados.",
        },
        form: {
          name: "Nome",
          email: "Email",
          password: "Senha",
        },
        buttons: {
          submit: "Cadastrar",
          login: "Já tem uma conta? Entre!",
        },
      },
      login: {
        title: "Login",
        form: {
          email: "Email",
          password: "Senha",
        },
        buttons: {
          submit: "Entrar",
          register: "Não tem um conta? Cadastre-se!",
        },
      },
      auth: {
        toasts: {
          success: "Login efetuado com sucesso!",
        },
      },
      dashboard: {
        charts: {
          perDay: {
            title: "Mensagens hoje: ",
          },
        },
      },
      connections: {
        title: "Conexões",
        toasts: {
          deleted: "Conexão com o WhatsApp excluída com sucesso!",
        },
        confirmationModal: {
          deleteTitle: "Deletar",
          deleteMessage: "Você tem certeza? Essa ação não pode ser revertida.",
          disconnectTitle: "Desconectar",
          disconnectMessage:
            "Tem certeza? Você precisará ler o QR CODE novamente.",
        },
        buttons: {
          add: "Adicionar WhatsApp",
          disconnect: "desconectar",
          tryAgain: "Tentar novamente",
          qrcode: "QR CODE",
          newQr: "Novo QR CODE",
          connecting: "Conectando",
        },
        toolTips: {
          disconnected: {
            title: "Falha ao iniciar sessão do WhatsApp",
            content:
              "Certifique-se de que seu celular esteja conectado à internet e tente novamente, ou solicite um novo QR CODE",
          },
          qrcode: {
            title: "Esperando leitura do QR CODE",
            content:
              "Clique no botão 'QR CODE' e leia o QR CODE com o seu celular para iniciar a sessão",
          },
          connected: {
            title: "Conexão estabelecida!",
          },
          timeout: {
            title: "A conexão com o celular foi perdida",
            content:
              "Certifique-se de que seu celular esteja conectado à internet e o WhatsApp esteja aberto, ou clique no botão 'Desconectar' para obter um novo QR CODE",
          },
        },
        table: {
          name: "Nome",
          status: "Status",
          lastUpdate: "Última atualização",
          lastDisconnection: "Última desconexão",
          default: "Padrão",
          actions: "Ações",
          session: "Sessão",
        },
      },
      whatsappModal: {
        title: {
          add: "Adicionar WhatsApp",
          edit: "Editar WhatsApp",
        },
        form: {
          name: "Nome",
          default: "Padrão",
        },
        buttons: {
          okAdd: "Adicionar",
          okEdit: "Salvar",
          cancel: "Cancelar",
        },
        success: "WhatsApp salvo com sucesso.",
      },
      qrCode: {
        message: "Leia o QrCode para iniciar a sessão",
      },
      contacts: {
        title: "Contatos",
        toasts: {
          deleted: "Contato excluído com sucesso!",
        },
        searchPlaceholder: "Pesquisar...",
        confirmationModal: {
          deleteTitle: "Deletar ",
          importTitlte: "Importar contatos",
          deleteMessage:
            "Tem certeza que deseja deletar este contato? Todos os atendimentos relacionados serão perdidos.",
          importMessage: "Deseja importas todos os contatos do telefone?",
        },
        buttons: {
          import: "Importar contatos",
          add: "Adicionar contato",
        },
        table: {
          name: "Nome",
          whatsapp: "WhatsApp",
          email: "Email",
          actions: "Ações",
        },
      },
      contactModal: {
        title: {
          add: "Adicionar contato",
          edit: "Editar contato",
        },
        form: {
          mainInfo: "Dados do contato",
          extraInfo: "Informações adicionais",
          name: "Nome",
          number: "Número do whatsapp",
          email: "Email",
          cpf: "CPF",
          rg: "RG",
          dataNascimento: "Data de nascimento",
          endereco: "Endereço",
          extraName: "Nome do campo",
          extraValue: "Valor",
        },
        buttons: {
          addExtraInfo: "Adicionar informação",
          okAdd: "Adicionar",
          okEdit: "Salvar",
          cancel: "Cancelar",
        },
        success: "Contato salvo com sucesso.",
      },
      quickAnswersModal: {
        title: {
          add: "Adicionar resposta rápida",
          edit: "Editar resposta rápida",
        },
        form: {
          shortcut: "Atalho",
          message: "Resposta rápida",
        },
        buttons: {
          okAdd: "Adicionar",
          okEdit: "Salvar",
          cancel: "Cancelar",
        },
        success: "Resposta rápida salva com sucesso.",
      },
      quickConcludeMessage: {
        title: {
          add: "Adicionar mensagem de finalização",
          edit: "Editar mensagem de finalização",
        },
        form: {
          shortcut: "Atalho",
          message: "Mensagem de finalização",
        },
        buttons: {
          okAdd: "Adicionar",
          okEdit: "Salvar",
          cancel: "Cancelar",
        },
        success: "Mensagem de finalização salva com sucesso.",
      },
      queueModal: {
        title: {
          add: "Adicionar fila",
          edit: "Editar fila",
        },
        form: {
          name: "Nome",
          color: "Cor",
          greetingMessage: "Mensagem de saudação",
          token: "Token",
        },
        buttons: {
          okAdd: "Adicionar",
          okEdit: "Salvar",
          cancel: "Cancelar",
        },
      },
      userModal: {
        title: {
          add: "Adicionar usuário",
          edit: "Editar usuário",
        },
        form: {
          name: "Nome",
          email: "Email",
          password: "Senha",
          profile: "Perfil",
        },
        buttons: {
          okAdd: "Adicionar",
          okEdit: "Salvar",
          cancel: "Cancelar",
        },
        success: "Usuário salvo com sucesso.",
      },
      chat: {
        noTicketMessage: "Selecione uma mensagem para começar a conversar.",
      },
      ticketsManager: {
        buttons: {
          newTicket: "Novo",
        },
      },
      ticketsQueueSelect: {
        placeholder: "Filas",
      },
      tickets: {
        toasts: {
          deleted: "A mensagem que você estava foi deletada.",
        },
        notification: {
          message: "Mensagem de",
        },
        tabs: {
          open: { title: "Caixa de entrada" },
          pending: { title: "Aguardando retorno" },
          closed: { title: "Concluídos" },
          search: { title: "Busca" },
        },
        search: {
          placeholder: "Buscar contatos e mensagens",
        },
        buttons: {
          showAll: "Todos",
        },
      },
      transferTicketModal: {
        title: "Transferir atendimento",
        fieldLabel: "Digite para buscar usuários",
        fieldQueueLabel: "Transferir para fila",
        fieldQueuePlaceholder: "Selecione uma fila",
        noOptions: "Nenhum usuário encontrado com esse nome.",
        buttons: {
          ok: "Transferir",
          cancel: "Cancelar",
        },
      },
      ticketsList: {
        pendingHeader: "Aguardando retorno",
        assignedHeader: "Em atendimento",
        noTicketsTitle: "Nada aqui!",
        noTicketsMessage:
          "Nenhuma mensagem ou contato encontrado com esse status ou termo pesquisado.",
        buttons: {
          accept: "Aceitar",
        },
      },
      newTicketModal: {
        title: "Criar mensagem",
        fieldLabel: "Digite para pesquisar o contato",
        add: "Adicionar",
        buttons: {
          ok: "Iniciar",
          cancel: "Cancelar",
        },
      },
      mainDrawer: {
        listItems: {
          dashboard: "Dashboard",
          connections: "Conexões",
          tickets: "Atendimento",
          contacts: "Contatos",
          quickAnswers: "Respostas rápidas",
          queues: "Filas",
          administration: "Painel administrativo",
          users: "Usuários",
          settings: "Configurações",
          company: "Empresas",
          messagesAPI: "API",
          campaings: "Campanhas"
        },
        appBar: {
          user: {
            profile: "Perfil",
            logout: "Sair",
          },
        },
      },
      messagesAPI: {
        title: 'API',
        textMessage: {
          number: 'Número',
          body: 'Mensagem',
          token: 'Token cadastrado',
        },
        mediaMessage: {
          number: 'Número',
          body: 'Nome do arquivo',
          media: 'Arquivo',
          token: 'Token cadastrado',
        }
      },
      notifications: {
        noTickets: "Nenhuma notificação.",
      },
      queues: {
        title: "Filas",
        table: {
          name: "Nome",
          color: "Cor",
          greeting: "Mensagem de saudação",
          actions: "Ações",
        },
        buttons: {
          add: "Adicionar fila",
        },
        confirmationModal: {
          deleteTitle: "Excluir",
          deleteMessage:
            "Você tem certeza? Essa ação não pode ser revertida! Os atendimentos dessa fila continuarão existindo, mas não terão mais nenhuma fila atribuída.",
        },
      },
      queueSelect: {
        inputLabel: "Filas",
      },
      concludeMessage: {
        title: "Mensagens de finalização",
        table: {
          shortcut: "Atalho",
          message: "Mensagem de finalização",
          actions: "Ações",
        },
        buttons: {
          add: "Adicionar mensagem de finalização",
        },
        toasts: {
          deleted: "Mensagem de finalização excluída com sucesso.",
        },
        searchPlaceholder: "Pesquisar...",
        confirmationModal: {
          deleteTitle:
            "Você tem certeza que quer excluir esta mensagem de finalização: ",
          deleteMessage: "Esta ação não pode ser revertida.",
        },
      },
      quickAnswers: {
        title: "Respostas rápidas",
        table: {
          shortcut: "Atalho",
          message: "Resposta rápida",
          actions: "Ações",
        },
        buttons: {
          add: "Adicionar resposta rápida",
        },
        toasts: {
          deleted: "Resposta rápida excluída com sucesso.",
        },
        searchPlaceholder: "Pesquisar...",
        confirmationModal: {
          deleteTitle:
            "Você tem certeza que quer excluir esta resposta rápida: ",
          deleteMessage: "Esta ação não pode ser revertida.",
        },
      },
      users: {
        title: "Usuários",
        table: {
          name: "Nome",
          email: "Email",
          profile: "Perfil",
          actions: "Ações",
        },
        buttons: {
          add: "Adicionar usuário",
        },
        toasts: {
          deleted: "Usuário excluído com sucesso.",
        },
        confirmationModal: {
          deleteTitle: "Excluir",
          deleteMessage:
            "Todos os dados do usuário serão perdidos. Os atendimentos abertos deste usuário serão movidos para a fila.",
        },
      },
      settings: {
        success: "Configurações salvas com sucesso.",
        title: "Configurações",
        settings: {
          userCreation: {
            name: "Criação de usuário",
            options: {
              enabled: "Ativado",
              disabled: "Desativado",
            },
          },
        },
      },
      messagesList: {
        header: {
          assignedTo: "Atribuído à:",
          buttons: {
            return: "Retornar",
            resolve: "Resolver",
            reopen: "Reabrir",
            accept: "Aceitar",
            conclude: "Concluir",
            autoMessage: "Mensagens rápidas",
          },
        },
      },
      messagesInput: {
        placeholderOpen: "Digite uma mensagem",
        placeholderClosed:
          "Reabra ou aceite essa mensagem para enviar uma mensagem.",
        signMessage: "Assinar",
      },
      contactDrawer: {
        header: "Dados do contato",
        headerTicket: "Abrir mensagem",
        headerTransfer: "Transferir mensagem",
        headerConclude: "Concluir mensagem",
        headerFlashMessage: "Mensagens rápidas",
        buttons: {
          edit: "Salvar contato",
        },
        extraInfo: "Outras informações",
      },
      ticketOptionsMenu: {
        delete: "Deletar",
        transfer: "Transferir",
        transferToAwait: "Mover para aguardando",
        confirmationModal: {
          title: "Deletar o atendimento do contato",
          message:
            "Atenção! Todas as mensagens relacionadas ao atendimento serão perdidas.",
        },
        buttons: {
          delete: "Excluir",
          cancel: "Cancelar",
        },
      },
      confirmationModal: {
        buttons: {
          confirm: "Ok",
          cancel: "Cancelar",
        },
      },
      messageOptionsMenu: {
        delete: "Deletar",
        reply: "Responder",
        confirmationModal: {
          title: "Apagar mensagem?",
          message: "Esta ação não pode ser revertida.",
        },
      },
      backendErrors: {
        ERR_NO_OTHER_WHATSAPP: "Deve haver pelo menos um WhatsApp padrão.",
        ERR_NO_DEF_WAPP_FOUND:
          "Nenhum WhatsApp padrão encontrado. Verifique a página de conexões.",
        ERR_WAPP_NOT_INITIALIZED:
          "Esta sessão do WhatsApp não foi inicializada. Verifique a página de conexões.",
        ERR_WAPP_CHECK_CONTACT:
          "Não foi possível verificar o contato do WhatsApp. Verifique a página de conexões",
        ERR_WAPP_INVALID_CONTACT: "Este não é um número de Whatsapp válido.",
        ERR_WAPP_DOWNLOAD_MEDIA:
          "Não foi possível baixar mídia do WhatsApp. Verifique a página de conexões.",
        ERR_WAPP_MAX_REACHED:
          "Você atingiu o número máximos de conexões permitidas em seu plano. Entre em contato com o suporte para saber mais",
        ERR_INVALID_CREDENTIALS:
          "Erro de autenticação. Por favor, tente novamente.",
          ERR_INVALID_COMPANY:
          "Erro de autenticação. Desculpe, seu login foi inativado.",
        ERR_SENDING_WAPP_MSG:
          "Erro ao enviar mensagem do WhatsApp. Verifique a página de conexões.",
        ERR_DELETE_WAPP_MSG: "Não foi possível excluir a mensagem do WhatsApp.",
        ERR_OTHER_OPEN_TICKET: "Já existe um Atendimento aberto para este contato.",
        ERR_SESSION_EXPIRED: "Sessão expirada. Por favor entre novamente.",
        ERR_USER_CREATION_DISABLED:
          "A criação do usuário foi desabilitada pelo administrador.",
        ERR_USER_MAX_REACHED:
          "Você atingiu o número máximos de usuários permitidos em seu plano. Entre em contato com o suporte para saber mais.",
        ERR_NO_PERMISSION: "Você não tem permissão para acessar este recurso.",
        ERR_DUPLICATED_CONTACT: "Já existe um contato com este número.",
        ERR_NO_SETTING_FOUND: "Nenhuma configuração encontrada com este ID.",
        ERR_NO_CONTACT_FOUND: "Nenhum contato encontrado com este ID.",
        ERR_NO_TICKET_FOUND: "Nenhuma Mensagem encontrado com este ID.",
        ERR_NO_USER_FOUND: "Nenhum usuário encontrado com este ID.",
        ERR_NO_WAPP_FOUND: "Nenhum WhatsApp encontrado com este ID.",
        ERR_CREATING_MESSAGE: "Erro ao criar mensagem no banco de dados.",
        ERR_CREATING_TICKET: "Erro ao criar Mensagem no banco de dados.",
        ERR_FETCH_WAPP_MSG:
          "Erro ao buscar a mensagem no WhtasApp, talvez ela seja muito antiga.",
        ERR_QUEUE_COLOR_ALREADY_EXISTS:
          "Esta cor já está em uso, escolha outra.",
        ERR_WAPP_GREETING_REQUIRED:
          "A mensagem de saudação é obrigatório quando há mais de uma fila.",
      },
    },
  },
};

export { messages };
