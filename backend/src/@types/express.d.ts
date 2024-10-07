declare namespace Express {
  export interface Request {
    user: {
      id: string;
      adminId?: string;
      profile: string;
      maxWhatsapps?: string;
      maxUsers?: string;
    };
  }
}
