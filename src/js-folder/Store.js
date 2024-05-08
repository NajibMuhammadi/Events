import { create } from "zustand";

export const useStore = create((set) => ({
    cart: [],
    counts: {},
    tickets: [],
    setCounts: (counts) => set({ counts }),
    addToCart: (event) =>
        set((state) => {
            const isAlreadyInCart = state.cart.some((cartEvent) => cartEvent.id === event.id);
            const quantity = state.counts[event.id] || 0;

            if (quantity === 0) {
                return state;
            }

            if (isAlreadyInCart) {
                return {
                    cart: state.cart.map((cartEvent) =>
                        cartEvent.id === event.id ? { ...cartEvent, quantity: cartEvent.quantity + quantity } : cartEvent
                    ),
                    counts: {
                        ...state.counts,
                        [event.id]: 0
                    }
                };
            }

            return {
                cart: [...state.cart, { ...event, quantity }],
                counts: {
                    ...state.counts,
                    [event.id]: 0
                }
            };
        }),

    removeFromCart: (event) =>
        set((state) => {
            const cartItem = state.cart.find((cartEvent) => cartEvent.id === event.id);
            if (!cartItem) {
                return state;
            }
            const updatedCounts = { ...state.counts };
            if (updatedCounts[event.id] > 1) {
                updatedCounts[event.id]--;
            } else {
                delete updatedCounts[event.id];
            }
            if (cartItem.quantity > 1) {
                return {
                    cart: state.cart.map((cartEvent) =>
                        cartEvent.id === event.id ? { ...cartEvent, quantity: cartEvent.quantity - 1 } : cartEvent
                    ),
                    counts: updatedCounts
                };
            } else {
                return {
                    cart: state.cart.filter((cartEvent) => cartEvent.id !== event.id),
                    counts: updatedCounts
                };
            }
        }),

    clearCart: () => set({ cart: [] }),

    addTickets: (event) =>
        set((state) => {
            const ticketID = generateTicketsID();
            let section = generateSection();
            let seat = generateSeat();
            const existingTicket = state.tickets.find((ticket) => ticket.id === event.id);
            const latestSeat = state.tickets.reduce((latest, ticket) => Math.max(latest, ticket.seat), 0);

            let ticketsToAdd = [];


            if (existingTicket) {
                section = existingTicket.section;
                seat = latestSeat + 1;
            }


            for (let i = 0; i < event.quantity; i++) {
                ticketsToAdd.push({
                    ...event,
                    ticketID: generateTicketsID(),
                    section: section,
                    seat: seat + i,
                });
            }

            return {
                tickets: [...state.tickets, ...ticketsToAdd],
            };
        }),



    increaseQuantity: (event) =>
        set((state) => ({
            cart: state.cart.map((cartEvent) =>
                cartEvent.id === event.id ? { ...cartEvent, quantity: cartEvent.quantity + 1 } : cartEvent
            )
        })),
}));

const generateTicketsID = () => {
    const bigCharaters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const smallCharacters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const allCharacters = bigCharaters + smallCharacters + numbers;
    let ticketID = '';
    for (let i = 0; i < 6; i++) {
        ticketID += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
    }
    return ticketID;
}

const generateSection = () => {
    const sections = ['A', 'B', 'C', 'D', 'E', 'F'];
    return sections[Math.floor(Math.random() * sections.length)];
}
const generateSeat = () => {
    return Math.floor(Math.random() * 300) + 1;
}