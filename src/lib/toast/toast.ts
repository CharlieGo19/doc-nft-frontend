import { toasts } from "../../stores/toasts";

export type Toast = {
    id?: number;
    messageLevel: string;
    messageContent: string;
};

export function manageToast(toast: Toast) {
    const idNumber: number = Math.floor(Math.random() * 10000);
    // @ts-ignore
    const def: Toast = {
        id: idNumber
    };

    toasts.update((all: Toast[]) => [{...def, ...toast}, ...all]);
    setTimeout(() => {
        toasts.update((all: Toast[]) => all.filter((t) => t.id !== idNumber));
    }, 7000);
}