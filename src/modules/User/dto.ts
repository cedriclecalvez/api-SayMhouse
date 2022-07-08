export class UserDTO {
  id: string | null;
  firstname: string;
  lastname: string;
  address: string;
  email: string;
  access_token: string | null;
  refresh_token: string | null;
  constructor({
    id,
    firstname,
    lastname,
    address,
    email,
    access_token = null,
    refresh_token = null,
  }: {
    id: string | null;
    firstname: string;
    lastname: string;
    address: string;
    email: string;
    access_token: string | null;
    refresh_token: string | null;
  }) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.address = address;
    this.email = email;
    this.access_token = access_token;
    this.refresh_token = refresh_token;
  }
}
