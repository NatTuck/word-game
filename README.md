# WordGame

## Game Rules: Single Player

 - The puzzle consists of a set of random words (typically six words).
 - The Player can see the words, with the letters individually hidden.
 - The player starts with zero points.
 - Each turn, the player guesses a consonant (including "y") that hasn't
   previously been guessed.
 - If that letter occurs in the puzzle:
   - All instances of that letter are revealed.
   - The player gets one point for each occurance revealed.
   - Player can either:
     - Guess the words in the puzzle. If they get it exactly right,
       they win - their score is added to multi-game total.
     - Guess one additional consonant
     - Spend one point to guess a vowel and reveal all occurances
 - If at any point all the letters are revealed, the player loses.

## Game Rules: Multiplayer

 - The puzzle consists of a set of random words (typically six words).
 - All players can see the words, with the letters individually hidden.
 - Each player starts with zero points for the round.
 - Players take turns.
   - Guess a non-vowel letter
   - All instances of that letter in the puzzle are revealed
   - Player gets one point per instance revealed
   - If at least one letter is revealed, player can do any of:
     - Guess the solution.
     - Buy a vowel for one point, revealing all instances of it.
       - If at least one revealed, can guess solution.
     - Guess another consonant.
       - If at least one revealed, can guess solution.
 - First player to guess solution wins.
   - Doubles round score.

## Default README

To start your Phoenix server:

  * Run `mix setup` to install and setup dependencies
  * Start Phoenix endpoint with `mix phx.server` or inside IEx with `iex -S mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

  * Official website: https://www.phoenixframework.org/
  * Guides: https://hexdocs.pm/phoenix/overview.html
  * Docs: https://hexdocs.pm/phoenix
  * Forum: https://elixirforum.com/c/phoenix-forum
  * Source: https://github.com/phoenixframework/phoenix
