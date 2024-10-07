const rules = {
  user: {
    static: [
      "connections-page:addConnection",
      "connections-page:editOrDeleteConnection",
    ],
  },

  admin: {
    static: [
      "drawer-admin-items:view",
      "tickets-manager:showall",
      "user-modal:editProfile",
      "user-modal:editQueues",
      "ticket-options:deleteTicket",
      "contacts-page:deleteContact",
      "contacts-page:importContact",
      "connections-page:actionButtons",
      "connections-page:addConnection",
      "connections-page:editOrDeleteConnection",
    ],
  },

  adminSuper: {
    static: [
      "drawer-admin-items:view",
      "drawer-admin-items:company",
      "tickets-manager:showall",
      "user-modal:editProfile",
      "user-modal:editProfileCompany",
      "user-modal:editQueues",
      "ticket-options:deleteTicket",
      "contacts-page:deleteContact",
      "contacts-page:importContact",
      "connections-page:actionButtons",
      "connections-page:addConnection",
      "connections-page:editOrDeleteConnection",
    ],
  },
};

export default rules;
