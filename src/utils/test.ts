import { generateInitialRooms, findOptimalRooms, calculateTravelTime } from './bookingLogic';


console.log("Starting Verification...");

const rooms = generateInitialRooms();

// Helper to book rooms
function book(roomNumbers: number[]) {
    roomNumbers.forEach(n => {
        const r = rooms.find(room => room.number === n);
        if (r) r.isBooked = true;
    });
}

// Helper to reset
function reset() {
    rooms.forEach(r => r.isBooked = false);
}

// Scenario 1: Book 5 rooms (Empty hotel) -> Expect 101-105
console.log("\nScenario 1: Book 5 rooms (Empty)");
const s1 = findOptimalRooms(rooms, 5);
console.log("Result:", s1);
if (JSON.stringify(s1) === JSON.stringify([101, 102, 103, 104, 105])) {
    console.log("PASS");
} else {
    console.log("FAIL");
    // Calculate cost just to see
    // console.log("Cost:", calculateTravelTime(rooms.filter(r => s1?.includes(r.number))));
}
book(s1 || []);

// Scenario 2: Book 5 rooms (101-105 booked) -> Expect 106-110
console.log("\nScenario 2: Book 5 rooms (101-105 booked)");
const s2 = findOptimalRooms(rooms, 5);
console.log("Result:", s2);
if (JSON.stringify(s2) === JSON.stringify([106, 107, 108, 109, 110])) {
    console.log("PASS");
} else {
    console.log("FAIL");
}
book(s2 || []);

// Scenario 3: Book 5 rooms (Floor 1 full) -> Expect 201-205
console.log("\nScenario 3: Book 5 rooms (Floor 1 full)");
const s3 = findOptimalRooms(rooms, 5);
console.log("Result:", s3);
if (JSON.stringify(s3) === JSON.stringify([201, 202, 203, 204, 205])) {
    console.log("PASS");
} else {
    console.log("FAIL");
}
// Don't book s3, let's reset for specific prompt scenario.

reset();

// Scenario 4: Prompt Example
// Available: Floor 1: 101, 102, 105, 106. (Book others)
// Floor 2: 201, 202, 203, 210. (Book others)
// Floor 3: 301, 302.
console.log("\nScenario 4: Prompt Example 1");
// Book 103, 104, 107-110
book([103, 104, 107, 108, 109, 110]);
// Book 204-209
book([204, 205, 206, 207, 208, 209]);
// Book 303-310
book([303, 304, 305, 306, 307, 308, 309, 310]);
// Plus other floors handled by default (empty? prompt implies available rooms list is exhaustive? "Available Rooms: ...")
// I will assume other floors are full or irrelevant. Let's fill them to be safe.
for (let f = 4; f <= 10; f++) {
    rooms.filter(r => r.floor === f).forEach(r => r.isBooked = true);
}

// Request: 4 rooms.
// Prompt says: "Rooms 101, 102, 105, 106 on Floor 1 will be selected because they minimize total travel time."
const s4 = findOptimalRooms(rooms, 4);
console.log("Result:", s4?.sort((a, b) => a - b));
// Cost manual check:
// 101->102 (1), 102->105 (3), 105->106 (1). Total = 5.
// Note: My code sorts by index. 101, 102, 105, 106 are indices 0, 1, 4, 5.
// Windows of size 4 on Floor 1:
// [101, 102, 105, 106].
// Travel time: |0-1| + |1-4| + |4-5| = 1 + 3 + 1 = 5.
// Are there other options?
// Maybe cross floor?
// 101, 102, 201, 202?
// 101(0)->102(1) [1]. 102->Lift->201?
// 102(1) -> Lift (1) -> F2 (2) -> 201(0). Total = 1+2+0 = 3.
// 201->202(1). Total = 1.
// Path: 101->102->201->202. Total = 1 + 3 + 1 = 5.
// Cost is SAME (5).
// BUT Priority Rule 2: "Priority is to book rooms on the same floor first."
// So Same Floor (101, 102, 105, 106) should win.
if (JSON.stringify(s4?.sort((a, b) => a - b)) === JSON.stringify([101, 102, 105, 106])) {
    console.log("PASS");
} else {
    console.log("FAIL. Got:", s4);
}

// Scenario 5: Prompt Example 2
// "If only 2 rooms available on Floor 1 (e.g. 101, 102). The system will select 201, 202 from Floor 2."
console.log("\nScenario 5: Prompt Example 2");
// Book 105, 106. Now F1 only has 101, 102.
book([105, 106]);
// F2 has 201, 202, 203, 210.
// Request 4 rooms? Prompt says "If only 2 rooms available on Floor 1... select 201, 202 from Floor 2".
// This example text is confusing. "Select 201, 202 from Floor 2" implies providing 2 rooms?
// Or implies "Select 201, 202 INSTEAD of 101, 102?" -> Meaning strict specific floor?
// "Priority is to book rooms on the same floor first."
// If I need 4 rooms. F1 has 2. F2 has 4.
// I should pick 4 from F2. (Because F2 has 4, so "Same Floor" condition met on F2).
// Algorithm check: 
// F1 has 2 candidates. F2 has 4 candidates.
// "Same Floor" check:
// F1: < 4. Skip.
// F2: >= 4. Check windows.
// Window [201, 202, 203, 210]. Indices 0, 1, 2, 9.
// Cost: |0-1| + |1-2| + |2-9| = 1 + 1 + 7 = 9.
// Is there a better cross-floor?
// "If rooms are not available on the same floor".
// But rooms ARE available on same floor (F2).
// So it should pick F2.
// Result: 201, 202, 203, 210. 
// Wait, prompt text: "The system will select rooms 201, 202 from Floor 2, as this minimizes vertical (2 minutes) and horizontal travel times."
// This text appears under "3. If only 2 rooms are available on Floor 1".
// And "2. A guest wants to book 4 rooms".
// If the prompt implies "We pick 101, 102 AND 201, 202" (Total 4).
// Logic:
// F1 has 2. F2 has 4.
// Does "Priority is to book rooms on the same floor first" mean "Try to fit ALL on SAME floor"?
// Yes.
// So if F2 has 4 rooms, we SHOULD pick F2.
// BUT, Cost on F2 is 9.
// Cost of (101, 102, 201, 202) is 5.
// 5 < 9.
// Does Rule 3 "If rooms are not available on the same floor, Priority is to minimize total travel time" apply?
// Rooms ARE available on same floor (F2).
// So Rule 2 applies. Pick F2.
// Does the prompt example imply we should pick (101, 102, 201, 202)?
// If so, then "Priority is to book rooms on the same floor first" assumes "If minimal cost on same floor is close"?
// Or maybe "If rooms are not available on the same floor" refers to "the requested floor"? No, user doesn't request a floor.
// "If rooms are not available on the same floor" -> "If NO floor has N rooms".
// If that's the case, then my logic (Pick F2) is correct per strict reading.
// BUT, the prompt example says: "The system will select rooms 201, 202 from Floor 2...". 
// It doesn't mention 101, 102.
// Does it mean it selects ONLY 201, 202? (Total 2 rooms selected?)
// No, request is 4.
// It matches content of bullet 3: "If only 2 rooms are available on Floor 1".
// If the system selects 201, 202... and 101, 102?
// It says "The system will select rooms 201, 202 from Floor 2". It might be incomplete sentence "will select... AND 101, 102".
// OR, maybe the request size changed to 2?
// "2. A guest wants to book 4 rooms".
// "3. If only 2 rooms are available on Floor 1...". (Context: User still wants 4?)
// If user wants 4, and F1 has 2. F2 has 4.
// If the system picks (101, 102, 201, 202), then it picked 2 from F1 and 2 from F2.
// If the system picks F2 (201-203, 210), it honored Rule 2.
// Which one does the prompt want?
// "The system will select rooms 201, 202 from Floor 2... as this minimizes vertical...".
// This justification ("minimizes vertical") suggests cross-floor calc?
// If it purely honored "Same Floor", it wouldn't need to discuss minimization of vertical.
// This implies we SHOULD split?
// Wait. "2 mins per floor".
// If we strictly prefer Same Floor: Cost 9.
// If we split: Cost 5.
// Maybe Rule 3 "If rooms are not available on the same floor" means "If optimal same-floor solution is impossible"? No.
// Maybe I should compare Cost(SameFloor) vs Cost(Split)?
// "Priority is to book rooms on the same floor first."
// Does it mean "Try to find a solution on one floor. If found, return. Else, split"?
// This is the standard interpretation.
// The prompt example "select 201, 202 from F2" might be referring to a case where F2 ONLY has 201, 202?
// "Available Rooms: ... Floor 2: 201, 202, 203, 210".
// If the example implies we pick 101, 102, 201, 202.
// Then the prompt ignores Rule 2 "Same Floor" when Cost is better?
// OR, maybe "Same Floor" priority is soft?
// "3. If rooms are not available on the same floor, Priority is to book rooms that minimize...".
// This phrasing "If rooms are not available... Priority is..." sets a condition.
// If condition (Rooms available on same floor) is TRUE (F2 has 4), then Priority is Same Floor.
// So we MUST pick F2.
// Even if cost is higher.
// UNLESS the prompt example contradicts this.
// Example 3 says "The system will select rooms 201, 202 from Floor 2".
// It doesn't say "and 101, 102".
// Maybe it means "The system will select rooms 201, 202 from Floor 2 (along with 101, 102)".
// If the output is {101, 102, 201, 202}.
// I will stick to Strict Priority because it's safer logic ("Rule 2").
// If the verification shows F2 selection, I will stick with it.

const s5 = findOptimalRooms(rooms, 4);
console.log("Result:", s5?.sort((a, b) => a - b));
