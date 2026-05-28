type MaintenanceListener = () => void;

const listeners: Set<MaintenanceListener> = new Set();

export const maintenanceEvent = {
    subscribe: (listener: MaintenanceListener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    },
    trigger: () => {
        listeners.forEach((listener) => listener());
    }
};
