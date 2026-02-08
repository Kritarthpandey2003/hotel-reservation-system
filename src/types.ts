export interface Room {
    floor: number;
    number: number;
    // Visual index for calculations. 
    // Floor 1-9: 0-9
    // Floor 10: 0-6
    index: number;
    isBooked: boolean;
}

export interface Booking {
    id: string;
    roomNumbers: number[];
}
