
import { Room } from './types';
import { findOptimalRooms, calculateTravelTime, generateInitialRooms } from './bookingLogic';

const runScenario = () => {
    console.log("--- Running User Scenario Verification ---");

    // partial mock of room generation to match scenario
    // F1: 101, 102, 105, 106
    // F2: 201, 202, 203, 210
    // F3: 301, 302

    // We start with full empty hotel and manually book/unbook
    let rooms = generateInitialRooms();

    // Clear all
    rooms.forEach(r => r.isBooked = true);

    // Open specific rooms
    const openRooms = [
        101, 102, 105, 106,
        201, 202, 203, 210,
        301, 302
    ];

    rooms = rooms.map(r => ({
        ...r,
        isBooked: !openRooms.includes(r.number)
    }));

    console.log(`\nScenario 1: Guest wants 4 rooms.`);
    console.log(`Available F1: 101, 102, 105, 106`);

    const result1 = findOptimalRooms(rooms, 4);
    console.log(`Result 1 (Expect 101,102,105,106): ${result1}`);
    const cost1 = result1 ? calculateTravelTime(rooms.filter(r => result1.includes(r.number))) : -1;
    console.log(`Cost 1: ${cost1}`);

    console.log(`\nScenario 2: If only 2 rooms are available on Floor 1 (101, 102).`);
    // Book 105, 106
    rooms = rooms.map(r => {
        if ([105, 106].includes(r.number)) return { ...r, isBooked: true };
        return r;
    });

    console.log(`Available F1: 101, 102`);
    console.log(`Available F2: 201, 202, 203, 210`);

    const result2 = findOptimalRooms(rooms, 4);
    console.log(`Result 2 (Expect 101, 102, 201, 202): ${result2}`);
    const cost2 = result2 ? calculateTravelTime(rooms.filter(r => result2.includes(r.number))) : -1;
    console.log(`Cost 2: ${cost2}`);
}

runScenario();
