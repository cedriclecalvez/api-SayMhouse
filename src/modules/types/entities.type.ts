export type userType = {
  id: string;
  firstname: string;
  lastname: string;
  address: string;
  email: string;
  password: string;
  access_token: string | null;
  refresh_token: string | null;
};

export type ticketType = {
  tickets: any;
  id: string;
  name: string;
  status: string;    
}; 

export type messageType = {
  id: string;
  messageDate: Date;
  contain: string;     
};
