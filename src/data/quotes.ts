export interface Quote {
  text: string;
  author: string;
}

export const quotes: Quote[] = [
  { text: "A closed mind is like a closed book; just a block of wood.", author: "Fortune Cookie" },
  { text: "The greatest risk is not taking one.", author: "Fortune Cookie" },
  { text: "Your talents will be recognized and suitably rewarded.", author: "Fortune Cookie" },
  { text: "A journey of a thousand miles begins with a single step.", author: "Fortune Cookie" },
  { text: "Now is the time to try something new.", author: "Fortune Cookie" },
  { text: "Patience is bitter, but its fruit is sweet.", author: "Fortune Cookie" },
  { text: "The best way to predict the future is to create it.", author: "Fortune Cookie" },
  { text: "A smile is your personal welcome mat.", author: "Fortune Cookie" },
  { text: "Good things come to those who debug.", author: "Fortune Cookie" },
  { text: "You will find what you seek where you least expect it.", author: "Fortune Cookie" },
  { text: "Curiosity is the wick in the candle of learning.", author: "Fortune Cookie" },
  { text: "An interesting opportunity is in your near future.", author: "Fortune Cookie" },
  { text: "Small steps every day lead to big changes.", author: "Fortune Cookie" },
  { text: "Someone is thinking of hiring you right now.", author: "Fortune Cookie" },
];

export function pickRandomQuote(exclude?: Quote): Quote {
  const pool = exclude ? quotes.filter((q) => q !== exclude) : quotes;
  return pool[Math.floor(Math.random() * pool.length)];
}
