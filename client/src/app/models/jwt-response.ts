export interface JwtResponseI {
    dataUser: {
        carne?: number,
        nombres?: string,
        apellidos?: string,
        contrasenia?: string,
        correo?: string,
        accesTkn?: string,
        expiresIn: string
    }
}
