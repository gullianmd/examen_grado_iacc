export function getErrMsg(err: unknown) {
    if (err instanceof Error) {
        return err.message;
    } else {
        return 'Error interno del servidor';
    }
}
