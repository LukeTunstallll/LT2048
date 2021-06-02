# LT2048

Javascript rendition of the popular browser game, 2048!

Use the arrow keys to move the tiles around the grid to combine to reach 2048!

Made with Javascript/SASS

Work Needed:
-Lose condition
-Don't generate random tile when no tiles are moved
-High Score using local storage

Pseudo Code

basic premise is a 4x4 grid with tiles with a numerical value of powers of 2, 2 4 8 16 etc up to 2^11 and by combining them with a tile of equal value they total up with the goal being to add up 2-1024 then combining 2 blocks of 1024 to make 2048, therefore completing the game.

additional functions will be a scoring and high score system which adds up the total amount on the board at any one time.

I would like to use a 4\*4 grid with 16 cells, those should contain the cell value of 0 or a power of 2. When a movement key is pressed the all cells which have a space in that movement direction they will move, if two cells meet with the same value they merge values in that same direction.

if the row or column is full then no block will move

---

// row - X
// column - Y
0 1 2 3 <- ROW
0 - - - -
1 - - - -
2 - - - -
3 - - - -
^ COLUMN
