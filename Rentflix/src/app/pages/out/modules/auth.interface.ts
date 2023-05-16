export interface RegistroUsuario {
  nombreCompleto: string;
  genero: string;
  num_celular: string;
  num_fijo: string;
  fecha_nacimiento: string;
  address_comments: string | null;
  address_number: string | number;
  address_street: string;
  address_type: string;
  correo: string;
  password: string;
}

export interface LoginUsuario {
  idPersona: number;
  NombreCompleto: string;
  Rol: string;
}
