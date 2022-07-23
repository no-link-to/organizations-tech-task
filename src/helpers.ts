import ClipboardJS from 'clipboard';
import { format } from 'date-fns'

export const formatDate = (value: string) => format(new Date(value), "dd.MM.yyyy");

export const copyText = (text: string) => {
    return new Promise<void>((resolve, reject) => {
        try {
            const copied = ClipboardJS.copy(text)
            if (copied) {
                resolve()
            } else {
                reject()
            }
        } catch(e) {
            reject(e)
        }
    })
}