// eventBus.js
import { reactive } from 'vue';

// Reactive object to hold event listeners
const EventBus = reactive({
    listeners: {},
    $on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    },
    $emit(event, ...args) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => {
                callback(...args);
            });
        }
    },
    $off(event) {
        if (this.listeners[event]) {
            delete this.listeners[event];
        }
    },
});

export default EventBus;
