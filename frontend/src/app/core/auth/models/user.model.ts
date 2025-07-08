export interface User {
  id: number;
  rut: string;
  primer_nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;
}

export interface JwtTokenResponse {
  access: string;
  refresh: string;
}
