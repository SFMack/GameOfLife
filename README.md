# Conway's Game of Life - BWPT15
## Understand
In the Game of Life each cell and it's surrounding 8 cells are exmained using the following rules:

    1. If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.

    2. If the cell is dead and has exactly 3 neighbors, then it comes to life. Else if remains dead.

NOTES:
- 2d array or single array?
- Plain JavaScript => React
- research 'turing completeness'

## Plan
- Build the grid and grid cells => DONE
- Add onclick cell functionality => DONE
- Setup current and next arrays. Current array is set by clicking each cell before calling the start of the function => DONE
- Manage evolution count and apply rules => DONE
- Update the interface => DONE
- Add player controls => DONE
- Test => DONE
- Go for stretch goals