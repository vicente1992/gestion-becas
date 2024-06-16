interface Map {
  [key: string]: string | null;
}

export const ERROREMESSAGE: Map = {
  INVALID_CREDENTIAL: 'Credendiales invalidas!',
  EMAIL_ALREADY_EXISTS: 'Estás intentando usar un correo existente',
  NOT_PAYLOAD_TOKEN: 'Sessión expiró!!',
};

export const SERVER_ERROR = 'Error inesperado';
