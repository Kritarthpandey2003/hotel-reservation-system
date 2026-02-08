import type { Room } from '../types';

export const TOTAL_FLOORS = 10;

// Helper to create the hotel structure
export const generateInitialRooms = (): Room[] => {
    const rooms: Room[] = [];

    for (let floor = 1; floor <= TOTAL_FLOORS; floor++) {
        // Floor 10 has 7 rooms, others have 10
        const roomsOnFloor = floor === 10 ? 7 : 10;

        for (let i = 0; i < roomsOnFloor; i++) {
            // Floor 1: 101, 102...
            // Floor 10: 1001, 1002...
            const roomNumber = floor * 100 + (i + 1);
            rooms.push({
                floor,
                number: roomNumber,
                index: i, // Distance from lift
                isBooked: false
            });
        }
    }
    return rooms;
};

export const generateRandomOccupancy = (rooms: Room[], occupancyRate: number = 0.3): Room[] => {
    return rooms.map(r => ({
        ...r,
        isBooked: Math.random() < occupancyRate
    }));
};

// Calculate cost for a specific set of rooms
// Assumes rooms are sorted by (floor, index)
export const calculateTravelTime = (selectedRooms: Room[]): number => {
    if (selectedRooms.length <= 1) return 0;

    // Sort to ensure path is sequential
    const sorted = [...selectedRooms].sort((a, b) => {
        if (a.floor !== b.floor) return a.floor - b.floor;
        return a.index - b.index;
    });

    let totalTime = 0;

    for (let i = 0; i < sorted.length - 1; i++) {
        const u = sorted[i];
        const v = sorted[i + 1];

        if (u.floor === v.floor) {
            // Horizontal: difference in indices * 1 min
            totalTime += Math.abs(u.index - v.index);
        } else {
            // Vertical: u -> Lift -> Diff Floors -> Lift -> v
            // Cost = u.dist_to_lift + vertical_time + v.dist_to_lift
            const verticalDist = Math.abs(u.floor - v.floor);
            totalTime += u.index + (verticalDist * 2) + v.index;
        }
    }

    return totalTime;
};

// Find best booking
export const findOptimalRooms = (rooms: Room[], requestSize: number): number[] | null => {
    const available = rooms.filter(r => !r.isBooked);
    if (available.length < requestSize) return null;

    // Group available by floor and sort by index
    const floors: { [key: number]: Room[] } = {};
    for (let f = 1; f <= TOTAL_FLOORS; f++) floors[f] = [];

    available.forEach(r => {
        floors[r.floor].push(r);
    });
    // Sort each floor's rooms by distance to lift
    for (const f in floors) {
        floors[f].sort((a, b) => a.index - b.index);
    }

    let minCost = Infinity;
    let bestRooms: Room[] | null = null;

    // 1. Priority: Same Floor
    // Check contiguous blocks on single floors first
    for (let f = 1; f <= TOTAL_FLOORS; f++) {
        const floorRooms = floors[f];
        if (floorRooms.length >= requestSize) {
            // Check all contiguous windows of size N
            for (let i = 0; i <= floorRooms.length - requestSize; i++) {
                const window = floorRooms.slice(i, i + requestSize);
                const cost = calculateTravelTime(window);
                if (cost < minCost) {
                    minCost = cost;
                    bestRooms = window;
                }
            }
        }
    }

    // If we found a valid single-floor option, strictly prefer it?
    // Rule 2: "Priority is to book rooms on the same floor first."
    // This usually implies if a same-floor solution exists, pick the best one and IGNORE cross-floor.
    // Even if a cross-floor solution has lower time (unlikely, but possible?)
    // "101, 107" on Floor 1 (Cost 6) vs "101, 201" (Cost 2)?
    // The prompt says "Priority is to book rooms on the same floor first." meaning strictly simpler topology logic.
    // ONLY "If rooms are not available on the same floor" do we go to Rule 3.

    if (bestRooms) {
        return bestRooms.map(r => r.number);
    }

    // 2. Cross-Floor Optimization
    // Iterate combinations with repetition of floors
    // effectively "distributing" N rooms across floors.

    const floorIds = Array.from({ length: TOTAL_FLOORS }, (_, i) => i + 1);

    // Helper to generate distributions of N items into K bins?
    // Or just generating combinations of N floors (with replacement).
    // e.g. [1, 1, 2, 2, 3] means 2 on F1, 2 on F2, 1 on F3.

    function getCombinations(pool: number[], k: number, start: number, current: number[]) {
        if (current.length === k) {
            evaluateDistribution(current);
            return;
        }
        for (let i = start; i < pool.length; i++) {
            current.push(pool[i]);
            getCombinations(pool, k, i, current); // Allow repetition (i)
            current.pop();
        }
    }

    function evaluateDistribution(floorSelection: number[]) {
        // Count rooms per floor
        const counts: { [key: number]: number } = {};
        for (const f of floorSelection) {
            counts[f] = (counts[f] || 0) + 1;
        }

        // Generate all candidate assignments
        // For each floor, we can pick any window of size 'count'
        // Since we want to check combinations of windows across floors, this is effectively a Cartesian product.
        // Given N=5 max, and usually 1-3 floors involved, we can try to iterate.
        // But simply "Greeding" the best window on each floor might be enough?
        // OR: Minimizing the "jump points"? 
        // For vertical travel, being close to the lift (index 0) is best.
        // For horizontal, being contiguous (gap 1) is best.
        // We should try a few heuristics for each floor:
        // 1. First k rooms (closest to lift)
        // 2. Best contiguous block (minimal horizontal within floor)

        // Simpler approach that is correct enough:
        // Since rooms on a floor MUST be visited sequentially in the global path if they are adjacent...
        // We construct the candidate by picking the "best" window for that specific floor usage?
        // Actually, cost depends on the previous/next floor connection.
        // But generally, the rooms on Floor F should be "close to 0" to minimize vertical entry/exit.
        // AND "close to each other" to minimize horizontal.

        // Let's generate a list of "good" sets for each floor.
        const floorOptions: { [key: number]: Room[][] } = {};

        for (const fStr in counts) {
            const f = parseInt(fStr);
            const count = counts[f];
            const availableOnF = floors[f]; // sorted by index

            if (availableOnF.length < count) return; // Invalid distribution explicitly

            const options: Room[][] = [];

            // Option A: Just take the ones closest to lift (index 0..k-1)
            // This favors vertical travel.
            options.push(availableOnF.slice(0, count));

            // Option B: Scan all contiguous windows to find minimal internal horizontal travel
            // This favors horizontal travel (e.g. 105, 106)
            for (let i = 1; i <= availableOnF.length - count; i++) {
                options.push(availableOnF.slice(i, i + count));
            }
            floorOptions[f] = options;
        }

        // Now find the best combination of options
        // Cartesian product of floorOptions
        const distinctFloors = Object.keys(counts).map(Number).sort((a, b) => a - b);

        function helper(idx: number, currentRooms: Room[]) {
            if (idx === distinctFloors.length) {
                const cost = calculateTravelTime(currentRooms);
                if (cost < minCost) {
                    minCost = cost;
                    bestRooms = [...currentRooms];
                }
                return;
            }

            const f = distinctFloors[idx];
            const options = floorOptions[f];

            // Limit checks to avoid explosion? 
            // Max ~10 options per floor. Max 5 floors (worst case 1 per floor). 10^5 is too big?
            // But max rooms=5. So floors involved is max 5.
            // If 2 floors involved (common), 10*10 = 100 checks. Fast.
            // If 3 floors, 1000 check. Fast.

            for (const opt of options) {
                helper(idx + 1, currentRooms.concat(opt));
            }
        }

        helper(0, []);
    }

    getCombinations(floorIds, requestSize, 0, []);

    if (bestRooms) {
        return (bestRooms as Room[]).map(r => r.number);
    }
    return null;
};
