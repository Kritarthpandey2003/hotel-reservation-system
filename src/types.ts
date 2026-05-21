export interface Room {
    floor: number;
    number: number;
    index: number;
    isBooked: boolean;
}

export interface GuestProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    tier: string;
    stays: number;
    points: string;
    lastVisit: string;
}

export interface Reservation {
    id: string;
    guestId: string;
    guestName: string;
    rooms: number[];
    checkIn: string;
    checkOut: string;
    status: string;
    tier: string;
}

export interface MaintenanceTask {
    id: string;
    room: string;
    issue: string;
    priority: string;
    status: string;
    reported: string;
    assignedTo: string;
}
