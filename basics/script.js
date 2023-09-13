// "use strict";
// const game = {
//   team1: "Bayern Munich",
//   team2: "Borrussia Dortmund",
//   players: [
//     [
//       "Neuer",
//       "Pavard",
//       "Martinez",
//       "Alaba",
//       "Davies",
//       "Kimmich",
//       "Goretzka",
//       "Coman",
//       "Muller",
//       "Gnarby",
//       "Lewandowski",
//     ],
//     [
//       "Burki",
//       "Schulz",
//       "Hummels",
//       "Akanji",
//       "Hakimi",
//       "Weigl",
//       "Witsel",
//       "Hazard",
//       "Brandt",
//       "Sancho",
//       "Gotze",
//     ],
//   ],
//   score: "4:0",
//   scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
//   date: "Nov 9th, 2037",
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };
// const printGoals = function (...playerNames) {
//   console.log(`${playerNames.length} goals were scored`);
// };

// const [players1, players2] = game.players;

// const [gk, ...fieldPlayers] = players1;
// const allPlayers = [...players1, ...players2];
// const players1Final = [...players1, "Thiago", "Cochino", "perisic"];
// printGoals("Davis", "Muller", "Lewandowski");
// printGoals(...game.scored);
// const { team1, x: draw, team2 } = game.odds;
// team1 < team2 && console.log("team 1 is more likely to win");

// for (const [index, element] of allPlayers.entries()) {
//   console.log(index, element);
// }

// const gameEvents = new Map([
//   [17, "⚽️ GOAL"],
//   [36, "🔁 Substitution"],
//   [47, "⚽️ GOAL"],
//   [61, "🔁 Substitution"],
//   [64, "🔶 Yellow card"],
//   [69, "🔴 Red card"],
//   [70, "🔁 Substitution"],
//   [72, "🔁 Substitution"],
//   [76, "⚽️ GOAL"],
//   [80, "⚽️ GOAL"],
//   [92, "🔶 Yellow card"],
// ]);

// const events = [...new Set(gameEvents.values())];
// console.log(events);

// gameEvents.delete(64);
// console.log(gameEvents);

// console.log(`${90 / gameEvents.size}`);

// const time = [...gameEvents.keys()];
// console.log(time);

// for (const [min, event] of gameEvents) {
//   const half = min <= 45 ? "FIRST" : "SECOND";
//   console.log(`${half} ${min} : ${event}`);
// }

// const poll = {
//   question: "What is your favourite programming language?",
//   options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
//   // This generates [0, 0, 0, 0]. More in the next section 😃
//   answers: new Array(4).fill(0),
//   registerNewAnswer() {
//     const inputOption = Number(
//       prompt(
//         `${this.question} \n ${this.options.join(
//           "\n"
//         )} \n (write option number)`
//       )
//     );
//     console.log(typeof inputOption);
//     typeof inputOption === "number" &&
//       inputOption < this.answers.length &&
//       this.answers[inputOption]++;
//     this.displayResults("string");
//     this.displayResults();
//   },
//   displayResults(type = "array") {
//     type === "array" && console.log(this.answers);
//     type === "string" &&
//       console.log(`Poll results are ${this.answers.join(", ")} `);
//   },
// };

// document
//   .querySelector(".poll")
//   .addEventListener("click", poll.registerNewAnswer.bind(poll));
// console.log(poll.answers);

// poll.displayResults.call({ answers: [5, 2, 3] }, "string");

(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";

  document.querySelector("body").addEventListener("click", function () {
    header.style.color = "blue";
  });
})();
