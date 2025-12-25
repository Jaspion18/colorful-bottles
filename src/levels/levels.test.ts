describe("Level solvability (sampled)", () => {
  const easy = levels.find(l => l.difficulty === 'easy');
  const medium = levels.find(l => l.difficulty === 'medium');
  const hard = levels.find(l => l.difficulty === 'hard');

  test("An easy level is solvable", () => {
    expect(easy).toBeDefined();
    expect(isSolvable(easy.board, easy.capacity)).toBe(true);
  });

  test("A medium level is solvable", () => {
    expect(medium).toBeDefined();
    expect(isSolvable(medium.board, medium.capacity)).toBe(true);
  });

  test("A hard level is solvable", () => {
    expect(hard).toBeDefined();
    expect(isSolvable(hard.board, hard.capacity)).toBe(true);
  });
  });
  describe("Level solvability (all levels)", () => {
    it("All levels should be solvable", () => {
      let unsolvable = [];
      levels.forEach((level, idx) => {
        const solvable = isSolvable(level.board, level.capacity);
        if (!solvable) {
          unsolvable.push({ id: level.id, name: level.name, idx });
          // eslint-disable-next-line no-console
          console.log(`Level ${level.id} (${level.name}) is NOT solvable.`);
        }
        expect(solvable).toBe(true);
      });
      if (unsolvable.length > 0) {
        throw new Error(`Unsolvable levels: ${unsolvable.map(l => l.id + ' (' + l.name + ')').join(', ')}`);
      }
    });
  });

import { getSolutionSteps } from "../logic/rules";

// describe("Debug: print solution steps for level 9", () => {
//   it("prints the solution steps if solvable", () => {
//     const level = levels.find(l => l.id === 1);
//     expect(level).toBeDefined();
//     const steps = getSolutionSteps(level.board, level.capacity);
//     if (steps) {
//       // eslint-disable-next-line no-console
//       console.log(`Level 9 is solvable in ${steps.length} steps:`);
//       // eslint-disable-next-line no-console
//       console.log(steps.map(({s, t}, i) => `Step ${i+1}: pour from ${s} to ${t}`).join("\n"));
//     } else {
//       // eslint-disable-next-line no-console
//       console.log("Level 9 is not solvable.");
//     }
//     expect(Array.isArray(steps) || steps === null).toBe(true);
//   });
// });

import { levels } from "../levels/levels";
import { isSolvable } from "../logic/rules";
