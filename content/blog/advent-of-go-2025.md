---
title: "Advent of Go - 2025"
date: "2026-01-08"
excerpt: "A walkthrough of the challenges and solutions for Advent of Code 2025 in Go"
thumbnail: "/images/aoc-2025.jpg"
tags: ["aoc-2025", "go", "algorithms", "data-structures"]
---

In this post, we will explore the challenges and solutions for Advent of Code 2025.
You can find the solutions in Go for all challenges on [GitHub](https://github.com/ignatij/advent-of-code-25).

## Day 1

Okay, Day 1 of AoC 2025!

### Part 1 – modular dial simulation

Input lists dial rotations (`Lk` or `Rk`) on a 0–99 dial that starts at 50 and wraps around. The password counts how many rotations end with the dial at 0.

1. Parse each instruction, apply the signed distance modulo 100 to update the dial position.
2. After every rotation, increment the counter if the dial now reads 0.

This is O(n) time and O(1) memory—only the current position and total count are tracked.

### Part 2 – zero-crossing arithmetic

Now you count every time the dial clicks past 0, even mid-rotation. A single long rotation can add multiple hits.

1. For `Lk`, measure how many steps remain before hitting 0 when moving left; if the rotation reaches that threshold, count one hit plus extra hits for each additional 100-click lap. Update the dial position modulo 100.
2. Apply the symmetric distance-to-zero logic for `Rk`.

The arithmetic keeps complexity at O(n) time and O(1) memory, avoiding per-click simulation.

## Day 2

### Part 1 – brute-force range scan

Each input line is a comma-delimited list of inclusive ID ranges like `11-22`. A range contributes the sum of every ID inside it that consists of some digit sequence repeated exactly twice (e.g., `123123`). The brute-force strategy works fine:

1. Parse the line, split on commas, and for each `lo-hi` iterate every ID `i` in `[lo, hi]`.
2. Convert `i` to decimal and reject immediately if its length is odd. Otherwise compare the first half with the second; add `i` to the running sum when both halves match.

Let `d` be the number of digits per ID (≤ 10) and `N` the total number of IDs across all ranges. The runtime is `O(N * d)` and memory usage stays `O(1)`.

### Part 2 – divisor-based repeated-pattern check

Now an ID is invalid if it is composed of a smaller digit block repeated at least twice, not necessarily exactly two times. The outer enumeration of ranges and IDs is identical; only the string check changes:

1. Convert the candidate ID to decimal text.
2. For every possible block length `k` from 1 up to `len(id)/2`, skip any `k` that doesn’t evenly divide the length.
3. Compare the first block against each subsequent `k`-sized substring; if all match, count the ID and stop checking further `k`.

Because each ID tries all divisors of its length, the complexity is `O(N * d * τ(d))` where `τ(d)` is the number of divisors of the digit count (still tiny in practice). Memory remains `O(1)`.

## Day 3

### Part 1 – brute force two-digit scan

Each line is a “bank” of digit-labeled batteries. Turning on exactly two batteries produces a two-digit number (order fixed by their positions), and we want the maximum per bank.

1. For a bank string of length `m`, consider every ordered pair `(i, j)` with `i < j`, form the two-digit value using digits at those positions, and track the largest.
2. Sum those per-bank maxima.

With `m ≤ 15`, brute force costs `O(m^2)` per bank; streaming the input keeps memory at `O(1)` aside from the current line.

### Part 2 – monotonic stack for largest subsequence

Now we must choose exactly twelve digits per bank to maximize the resulting 12-digit number (relative order preserved). This is equivalent to removing `k = len(bank) - 12` digits while keeping the sequence lexicographically largest.

1. Traverse the digits left to right while maintaining a stack. Whenever the current digit is greater than the stack’s top and we still have deletions left (k > 0), pop from the stack; this greedily discards smaller prefixes.
2. After processing, the stack may still be longer than 12 (if we never spent all deletions on the fly), so truncate the tail until exactly 12 digits remain.
3. Parse the resulting digits as an integer and accumulate across banks.

This is the classic “build the largest subsequence of fixed length” algorithm, running in `O(m)` per bank with `O(m)` extra space for the stack.

## Day 4

### Part 1 - neighbor-count grid scan

The input is a grid of `.` and `@` where each `@` represents a paper roll. A roll is accessible if fewer than four of its eight neighbors (N, NE, E, SE, S, SW, W, NW) are also `@`.

1. Parse the grid into a 2D array of runes or bytes.
2. For every `@`, count occupied neighbors by scanning the 8 offsets and stay within bounds.
3. Increment the answer whenever the neighbor count is below 4.

Runtime is `O(R*C)` where R is the number of rows and C is the number of columns because each cell is visited once and performs constant work. Memory is `O(R*C)` for the stored grid (or `O(1)` if processed streaming with a buffer).

### Part 2 - iterative neighbor-pruning

Now rolls get removed iteratively: every pass removes all currently accessible rolls, which may unlock new rolls for the next pass. Keep repeating until no roll qualifies.

1. Loop over the grid and mark every `@` with <4 neighbors; immediately turn them into `.` and add to the running total.
2. Track whether at least one removal happened during the pass; if not, stop.
3. Repeat the scan-removal cycle while removals occur.

Runtime remains `O(R*C)` per pass (each pass scans every cell once), but in the worst case there can be `O(R*C)` passes—removing one roll per iteration—so the total worst-case time is `O((R*C)^2)`. Memory stays `O(R*C)` for the grid.

## Day 5

### Part 1 - interval-merging and binary-search

Input consists of a set of inclusive fresh-ID ranges, a blank line, and then a list of candidate IDs. An ID is fresh if it falls inside any range (ranges may overlap). The approach:

1. Parse all ranges into `(start, end)` pairs, sort by `start`, and merge overlaps so that the range list is disjoint and sorted.
2. For each candidate ID, run binary search over the merged ranges to check membership; if the range at `mid` contains the ID, count it.

Let `R` be the number of original ranges and `F` the number of candidate IDs. Sorting and merging costs `O(R log R)`; each membership test is `O(log R)` so the total is `O(R log R + F log R)` with `O(R)` memory for the merged list.

### Part 2 - interval-merging

The second part ignores the candidate list. After merging the ranges exactly as in part one, simply sum the lengths of the disjoint ranges (`end - start + 1` per range). The result is the total number of IDs flagged as fresh.

Runtime is dominated by the same `O(R log R)` sort/merge step, and memory usage stays `O(R)` for the merged ranges.

## Day 6

### Part 1 – columnar parsing left-to-right

The worksheet is a grid where each column belongs to one problem; problems are separated by blank columns. For the standard left-to-right reading order, the algorithm is:

1. Normalize each input row by collapsing every run of spaces into a single space so column boundaries align, then split on spaces to get the digits (or operator) for that column.
2. Iterate column by column. For a given column, read all digits above the bottom row, convert each to an integer, and combine them by either `+` or `*` depending on the operator cell in the bottom row.
3. Sum every column’s result to obtain the grand total.

With `R` rows (including the operator row) and `C` visible columns, parsing is `O(R*C)` time with `O(R*C)` memory for the normalized grid.

### Part 2 – columnar parsing right-to-left

Now the worksheet is interpreted one column at a time from right to left. Digits within a column form numbers vertically (most significant digit at the top), and blank columns still split problems. The solver keeps the raw characters to preserve exact column widths:

1. Scan columns from right to left, accumulating digits for the current problem in a list. When a column is entirely spaces, finalize the current problem by applying the stored operator to the collected numbers (in the order encountered) and add the result to the total.
2. Detect operators from the bottom row as before, updating the current operator whenever the bottom cell contains `+` or `*`.
3. After the loop, reduce the final problem and add it to the total.

This column-wise sweep still touches each cell once, so it remains `O(R*C)` time with `O(R)` auxiliary space for the column accumulator.

## Day 7

### Part 1 – recursive beam split counting

The tachyon manifold is a grid with a single source `S` at the top and splitters `^`. Beams flow only downward; whenever a beam hits a splitter, it stops and spawns new beams immediately to the left and right that continue downward. We only need the number of split events.

1. Parse the grid and locate `S`. Maintain a `visited` matrix to avoid revisiting the same `(row, col)` from above.
2. Recurse downward from `S`. If the current cell is empty (`.`), continue to the next row. If it’s a splitter, add 1 to the count and recursively process the left and right neighbors on the same row (each then continues downward).
3. Stop when leaving the grid or revisiting a cell.

This DFS-style traversal touches each reachable cell at most once, so runtime is `O(R*C)` (where `R` is the number of rows and `C` is the number of columns) and memory is `O(R*C)` for the grid plus visited bitmap.

### Part 2 – dynamic programming over split DAG

Now a single tachyon particle creates separate timelines for every possible left/right choice at splitters. Each splitter contributes the sum of timelines from its two children (down-left and down-right on the next row), and empty cells simply inherit the count from directly below. Bottom-row cells represent terminal timelines.

1. Build a DP table `dp[row][col]` representing the number of timelines reaching that cell.
2. Initialize the bottom row to 1s because once the particle reaches the bottom, it ends the journey.
3. Fill the table bottom-up: if `(row, col)` is a splitter, set `dp[row][col] = dp[row+1][col-1] + dp[row+1][col+1]` (guarding bounds). Otherwise copy `dp[row+1][col]`.
4. The answer is `dp[startRow][startCol]`.

The grid is processed once, giving `O(R*C)` time and `O(R*C)` memory for the DP table.

## Day 8

### Part 1 – Kruskal-style nearest neighbor unions

We’re given 3D coordinates for every junction box (node) and need to connect the 1000 closest pairs by straight-line distance, then multiply the sizes of the three largest resulting connected components. This is essentially the first 1000 edges of Kruskal’s MST process:

1. Parse the `N` coordinates, build all `N*(N-1)/2` edges with squared Euclidean distance, and sort them ascending.
2. Maintain a Union-Find (DSU) structure. For the first 1000 edges in sorted order, union their endpoints.
3. After unions, compute component sizes via another pass over DSU roots, sort sizes descending, and multiply the top three.

Time is dominated by building/sorting all edges: `O(N^2 log N)` (feasible for the input size). DSU operations are near-constant amortized, so total extra time is `O(N^2 α(N))`. Memory is `O(N^2)` for edge storage, plus `O(N)` for DSU.

### Part 2 – last edge to connect all components

Continue the Kruskal process until every node belongs to one component. The last edge that causes the components to unify is the answer; multiply the X-coordinates of its endpoints.

1. Re-use the sorted edge list and DSU from part one (or rebuild). Iterate edges in order, unioning endpoints.
2. After each union, check whether all nodes share one root. Once true, use the current edge’s endpoints to compute `X_A * X_B`.

Runtime remains `O(N^2 log N)` due to edge sorting; each connectedness check is `O(N α(N))` worst case, though you can track component counts to avoid scanning every time. Memory stays `O(N^2)` for edges and `O(N)` for DSU.

## Day 9

### Part 1 – brute-force rectangle area scan

Every input line is a lattice point that lies on the outline of some axis-aligned rectangle. Because the file is tiny I simply check every pair of points: two corners determine a rectangle whose side lengths are `|x2-x1|+1` by `|y2-y1|+1`, so its area is `(abs(dx)+1)*(abs(dy)+1)`. Track the maximum over all `O(n^2)` pairs and print it. Brute force is fine here and keeps the code trivial.

Eazy.

### Part 2 – coordinate compression + flood fill + prefix sums

Boy oh boy, I was in for a surprise.

Now we must ignore any rectangle that intersects the walkways traced by the input polygon. Tried with a naive BFS over the entire coordinate range, it blew up because the coordinates can be huge and sparse.
So I had to rollback and think of another approach.

The fix has three ingredients:

1. Coordinate compression: Collect every x/y coordinate that matters (each point plus ±1 neighbors), sort/deduplicate them, and map real coordinates to compact indices. That lets us build a manageable grid even when raw coordinates are large.
2. Flood fill of “outside” cells: Using the compressed grid, mark every unit square that lies outside the polygon by running a BFS from the outer boundary, respecting vertical/horizontal “walls” built from the polygon edges.
3. 2D prefix sums: After flood fill, build a prefix-sum grid of the outside cells. For any candidate rectangle defined by two original points, convert its bounds to compressed indices and query the prefix matrix to see if any outside cells lie inside that rectangle. If the count is zero, it’s valid, and we compute its area in original coordinates.

This combination keeps the search finite and lets us test each pair of corners in constant time after preprocessing. The pairwise loop is still `O(n^2)`, but now each test simply checks prefix sums rather than attempting another expensive traversal.

This really was the hardest challenge up to this point.

## Day 10

### Part 1 – meet-in-the-middle XOR search

Every indicator row becomes a bitmask: `#` means the corresponding bit must be 1 in the final state, `.` means 0. Each button is also a bitmask with 1s wherever that button toggles. With that encoding the puzzle says: “Pick a multiset of button masks whose XOR equals the target mask while minimizing presses.” Enumerating all subsets is `O(2^n)` and infeasible, so I split the buttons into two halves and used meet-in-the-middle:

1. For the left half build a map `state -> min_presses` containing all XOR states reachable by subsets of that half.
2. Do the same for the right half.
3. For each right-state `r`, the matching left-state must be `target XOR r`; sum the minimal press counts from both tables and keep the overall minimum.

Because each half only has `n/2` buttons the enumeration is fast while still covering the entire space.

### Part 2 – integer linear programming with Z3

Same as for Day 9, for Part 2 things got pretty interesting again.

Here each button adds 1 to multiple counters, so presses are no longer modular arithmetic—they’re integer quantities. I tried a DFS/backtracking search that picks how many times to press each button, but the search space is enormous (targets are in the hundreds), so it never finished.

Instead I recast the machine as an Integer Linear Program (ILP). Give every button `j` an integer variable `x_j >= 0` representing how many times we press it. For each counter `i`, sum the `x_j` of every button touching that counter, multiply by the number of times it touches it, and insist that the sum equals the target joltage `b_i`. That yields linear equality constraints. The objective “fewest total presses” is simply `minimize sum_j x_j`.

I solved this ILP with the Go bindings for Z3 (<https://pkg.go.dev/github.com/aclements/go-z3/z3>). The binding doesn’t expose Z3’s Optimize API, so I binary-search the minimum objective: assert all constraints once, then repeatedly push an extra inequality `sum_j x_j <= mid`, check satisfiability, and adjust the bound until the smallest feasible `mid` is found. Summing those minima over all machines gives the final answer.

This was definetely the hardest challenge of the AoC 2025!
Probably a big contributing fact for that would be my lack of experience with ILP problems.

## Day 11

### Part 1 – DFS path counting

The input describes a directed graph where each line looks like `you: aaa bbb ccc`. The goal is to count how many distinct routes starting at `you` eventually reach `out`, regardless of length. The solution is to build the graph and run a depth-first search:

- Recurse through every neighbor of the current node.
- Return `1` when a recursive call hits `"out"` to signal that the current branch is a valid path.
- Sum the returned counts from every neighbor to get the total number of paths from the current node.

The graph is small enough that pure recursion already finishes, but I memoized `node -> number of paths` to avoid recomputing identical suffixes. The cache is keyed only by the node name because the state is stateless in this part.

### Part 2 – DFS with stateful memoization

The second puzzle keeps the same graph but only counts paths that touch both `"dac"` and `"fft"` before exiting. I managed this part by including two booleans (`seenDac`, `seenFft`) through the recursion:

- Whenever recursion visits `"dac"` or `"fft"`, flip the corresponding flag to `true`.
- When a branch reaches `"out"`, return `1` only if both flags are true; otherwise return `0` because that route missed at least one checkpoint.
- Continue summing over neighbors exactly like part 1.

Memoization is crucial here because without memoization it never finishes. I memoized `node -> (seenDac, seenFft) -> number of paths` to avoid recomputing identical suffixes.

## Day 12

### Part 1 – area-based feasibility check

Well this was a nice surprise!

The input describes a set of oddly shaped presents plus several rectangular regions under Christmas trees. Each region line looks like `12x5: 1 0 1 0 2 2`, meaning the rectangle is 12 units wide by 5 tall and we must pack the indicated number of presents of each shape. Presents can be rotated and flipped, must stay on the integer grid, and can’t overlap, so naively this is a tiling/packing problem that looks NP-hard.

First time I read the problem statement, I thought it would be a mission impossible!
Peeking at the actual puzzle input (and I admit, the [AoC Subreddit](https://www.reddit.com/r/adventofcode/)) revealed a huge simplification: every present shape has exactly 9 cells (3×3 area) and the rotation of the shape is not relevant! The only feasibility test needed is checking whether the combined area of the required presents is at most the area of the region.

### Part 2

No challenge here, so it ends with only one challenge on the 12th day.

   <video controls width="100%">
     <source src="/video/advent-of-code-finished.mov" type="video/mp4" />
   </video>
