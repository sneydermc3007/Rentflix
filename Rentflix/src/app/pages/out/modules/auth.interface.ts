export interface RegistroUsuario {
  nombreCompleto: string;
  genero: string;
  num_celular: number | string;
  num_fijo: number | string;
  fecha_nacimiento: string;
  comments: string | null;
  number: string;
  street: string;
  type: string;
  correo: string;
  password: string;
}

export interface LoginUsuario {
  idPersona: number;
  NombreCompleto: string;
  Rol: string;
}
