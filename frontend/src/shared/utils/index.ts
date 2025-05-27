import { AxiosError } from "axios";

export class Utils {
    static getErrorApi(e: any, message: string) {
        if (e instanceof AxiosError) {

            if (e.response?.data) {
                if (e.response?.data.errors && e.response?.data.errors.length) {
                    console.log(e.response?.data.errors)
                    return (e.response?.data.errors as any[]).join("\n");
                }
                if (e.response?.data.title) {
                    return e.response?.data.title;
                }

                if (e.response?.data.message) {
                    if (Array.isArray(e.response?.data.message) && Array.from(e.response?.data.message).length > 0) {
                        let erros = Array.from(e.response?.data.message).map((e, i) => `${i + 1}: ${e}`)
                            .join('\n');
                        return erros;
                    }
                    return e.response?.data.message;
                }
            }
            if (e.request.status === 0) {
                return 'Erro de conexão: Não foi possível se conectar ao servidor.';
            }
            return e.message;
        }

        if (typeof e == 'string') {
            return e;
        }

        if (e) {
            if (e.error) {
                if (e.error.errors && e.error.errors.length) {
                    console.log(e.error.errors)
                    return (e.error.errors as any[]).join("\n");
                }
                if (e.title) {
                    return e.title;
                }
            }
            if (e?.status === 0) {
                return 'Erro de conexão: Não foi possível se conectar ao servidor.';
            }

            if (message.length == 0) {
                return `Erro HTTP ${e?.status}: ${e?.message}`;
            }

            return message;
        } else {
            return message;
        }
    }
    static async delay(ms: number) {
        await new Promise(req => setTimeout(req, ms));
    }
}