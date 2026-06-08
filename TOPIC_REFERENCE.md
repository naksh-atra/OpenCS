# OpenCS — Complete Topic Reference

## Engine Architecture

All 20 topics are powered by 4 reusable engines. Each engine exports pure functions that take state → new state, producing step-by-step traces. Visualizer components consume these steps and render them.

---

## 1. TIME COMPLEXITY GROWTH
**Engine:** sequence (theory/complexity.ts) | **Order:** 1 | **Difficulty:** beginner

### Formula / Logic
- 8 complexity classes defined as data: O(1), O(log n), O(n), O(n log n), O(n²), O(n³), O(2ⁿ), O(n!)
- Growth functions: `f(n)` for each class, evaluated at slider position `n` (1–100)
- Heights are pre-computed: O(1)=15px, O(log n)=30px, O(n)=50px, O(n log n)=65px, O(n²)=80px, O(n³)=90px, O(2ⁿ)=100px, O(n!)=100px (capped)
- Linear vs logarithmic scale toggle: `height = scale === 'log' ? Math.log(f(n)) * k : f(n)`

### Visualization
- Bar chart with 8 bars, one per complexity class
- Slider controls `n` value (1–100)
- Number input for precise `n` entry
- Comparison table shows f(n) values for all classes at current `n`
- Color-coded by tier: optimal (green), good (lime), fair (yellow), moderate (orange), costly (red), expensive (dark red)
- Toggle between linear and logarithmic Y scale

---

## 2. RECURSION TREE VISUALIZER
**Engine:** sequence | **Order:** 2 | **Difficulty:** intermediate

### Formula / Logic
- Three algorithms: factorial, Fibonacci, binary search
- **Factorial:** single-branch recursion, depth = n, calls = n. Each node shows `fact(k)` where k decrements by 1.
- **Fibonacci:** binary tree recursion. `fib(n) → fib(n-1) + fib(n-2)`. Total calls = 2^(n+1) - 1. Depth = n.
- **Binary Search:** single-branch, depth = log₂(n). Each node shows search range `[lo, hi]`.
- Tree built recursively: `buildTree(algo, depth, params)` returns `{ value, children[] }`
- Max depth slider (1–6) to prevent exponential blowup

### Visualization
- Canvas-drawn tree with nodes and edges
- Each node shows the function call (e.g., `fib(5)`, `fact(3)`)
- Edges connect parent to children
- Color: primary for active, muted for unvisited
- Depth slider controls how many levels to expand
- Algorithm tabs switch between factorial, Fibonacci, binary search
- Caption shows total calls and time complexity

---

## 3. ARRAY MEMORY AND OPERATIONS
**Engine:** sequence/array-ops.ts | **Order:** 3 | **Difficulty:** beginner

### Formula / Logic
- **Access:** O(1). `address = base + index × element_size`. Direct memory address calculation.
- **Insert at index i:** O(n). Shift elements from i to n-1 right by 1: `data.splice(i, 0, value)`. Shifts = n - i.
- **Delete at index i:** O(n). Shift elements from i+1 to n-1 left by 1: `data.splice(i, 1)`. Shifts = n - i - 1.
- **Search:** O(n). Linear scan: `data.indexOf(value)`. Comparisons = index of found position (or n).
- **Update:** O(1). Direct: `data[i] = newValue`.
- Bounds checking: `index < 0 || index >= data.length` → error state.

### Visualization
- Horizontal bar chart showing array elements as cells with index labels
- Memory address row below: `base + i × 4` (4-byte integers)
- Operation selector dropdown (Access/Insert/Delete/Search/Update)
- Index and value input fields
- Execute button triggers operation
- Highlighted cells show current operation target
- Step-by-step message: "Accessed index 3: value is 8"
- Presets: Small, Even, Sorted, Random

---

## 4. STACK AND QUEUE SIMULATOR
**Engine:** sequence/stack-queue-ops.ts | **Order:** 4 | **Difficulty:** beginner

### Formula / Logic
- **Stack (LIFO):** `push(x)` → append to end. `pop()` → remove from end. `peek()` → read end. All O(1).
- **Queue (FIFO):** `enqueue(x)` → append to end. `dequeue()` → remove from front. `front()` → read front. All O(1).
- State: `{ type, data: number[], operations[], highlightIndex, message }`
- Mode tabs switch between stack and queue behavior
- Random preset generates 5 random values

### Visualization
- Vertical stack visualization (for stack mode) or horizontal queue visualization
- Elements shown as boxes with values
- Top/front highlighted in primary color
- Operation buttons: Push/Pop/Peek (stack) or Enqueue/Dequeue/Front (queue)
- Input field for value to push/enqueue
- Message area shows operation result
- Mode tabs: Stack | Queue

---

## 5. NUMBER SYSTEMS & CONVERSIONS
**Engine:** theory/number-systems-ops.ts | **Order:** 5 | **Difficulty:** beginner

### Formula / Logic
- **Decimal to Binary:** Repeated division by 2. Collect remainders in reverse.
  ```
  while n > 0: remainder = n % 2; n = Math.floor(n / 2); push(remainder)
  result = remainders.reverse().join('')
  ```
- **Binary to Decimal:** Positional expansion. `sum(bit × 2^position)` from right.
- **Decimal to Hex:** Repeated division by 16. Remainders 10–15 → A–F.
- **Hex to Decimal:** Positional expansion with base 16.
- **IEEE 754 Encode (float32):**
  - Sign bit: 0 if ≥ 0, 1 if < 0
  - Exponent: `floor(log2(|value|)) + 127` (biased)
  - Mantissa: fractional part of `|value| / 2^exponent`, 23 bits
  - Binary: `sign(1) + exponent(8) + mantissa(23)` = 32 bits
- **IEEE 754 Decode:** Reverse: `(-1)^sign × 2^(exponent-127) × (1 + mantissa/2^23)`
- Swap button reverses input/output bases and auto-converts

### Visualization
- Input field for number value
- From/To base selectors (2, 8, 10, 16)
- Swap button to reverse conversion direction
- Result display with step-by-step breakdown
- Each step shown: "47 ÷ 2 = 23 remainder 1"
- IEEE 754 section: 32-bit binary display with color-coded fields (sign=red, exponent=yellow, mantissa=green)
- Hex representation of the 32-bit value

---

## 6. BINARY SEARCH TREE
**Engine:** treegraph/bst-ops.ts | **Order:** 6 | **Difficulty:** intermediate

### Formula / Logic
- **BST Property:** For every node: left subtree values < node.value < right subtree values.
- **Insert:** Recursive. If value < node.value → insert(left), else if value > node.value → insert(right). O(h) where h = height.
- **Search:** Iterative. While current ≠ null: if value = current.value → found, else go left or right. O(h).
- **Delete:** Three cases:
  1. Leaf node → remove directly
  2. One child → replace with child
  3. Two children → replace with inorder successor (min of right subtree), then delete successor
- Inorder traversal gives sorted order: `inorder(node) = inorder(left) + [node.value] + inorder(right)`

### Visualization
- Canvas-drawn tree with nodes as circles and edges as lines
- Node values displayed inside circles
- Insert: new node highlighted in primary, path traced with visited nodes
- Search: path highlighted, found node pulses green, not-found shows red
- Delete: node to delete highlighted red, replacement highlighted yellow
- Step-by-step trace showing visited nodes and comparisons
- Presets: Small, Balanced, Skewed

---

## 7. BFS AND DFS
**Engine:** treegraph/traversal-ops.ts | **Order:** 7 | **Difficulty:** intermediate

### Formula / Logic
- **BFS (Breadth-First Search):**
  - Uses a queue. Start node enqueued.
  - While queue not empty: dequeue node, visit it, enqueue all unvisited neighbors.
  - Visits nodes layer by layer (level order).
  - Shortest path in unweighted graphs.
  - Time: O(V + E), Space: O(V)

- **DFS (Depth-First Search):**
  - Uses a stack (or recursion). Start node pushed.
  - While stack not empty: pop node, visit it, push all unvisited neighbors.
  - Visits nodes by diving deep before backtracking.
  - Time: O(V + E), Space: O(V)

- Graph represented as adjacency list: `Map<nodeId, nodeId[]>`
- Each step records: action (discover/visit), current node, visited set, frontier (queue/stack)

### Visualization
- Canvas-drawn graph with nodes as circles and edges as lines
- Nodes colored: unvisited (muted), in frontier (yellow), visited (primary), current (highlighted)
- Queue/stack display showing current frontier state
- Step-by-step controls: play, pause, step forward, step back, reset
- Traversal order displayed as a list
- Presets: Small tree, Binary tree, Cyclic graph

---

## 8. SHORTEST PATH & MST
**Engine:** treegraph/weighted-graph-ops.ts | **Order:** 8 | **Difficulty:** advanced

### Formula / Logic

**Dijkstra's Algorithm (Single-Source Shortest Path):**
```
1. Set dist[source] = 0, dist[v] = ∞ for all other v
2. Priority queue Q = all nodes
3. While Q not empty:
   a. u = node in Q with minimum dist[u]
   b. Remove u from Q
   c. For each neighbor v of u:
      alt = dist[u] + weight(u, v)
      If alt < dist[v]: dist[v] = alt, prev[v] = u
4. Reconstruct path: follow prev[] from target back to source
```
- Time: O((V + E) log V) with binary heap
- Works only with non-negative weights

**Prim's Algorithm (Minimum Spanning Tree):**
```
1. Start with any node, add to MST
2. Priority queue = edges from MST nodes to non-MST nodes
3. While MST has < V nodes:
   a. Extract minimum-weight edge (u, v) where u ∈ MST, v ∉ MST
   b. Add v to MST, add edge to MST edges
   c. Add all edges from v to non-MST nodes to queue
4. MST edges form the minimum spanning tree
```
- Time: O((V + E) log V)
- Total weight = sum of all MST edge weights

### Visualization
- Canvas-drawn weighted graph with edge labels
- Dijkstra: distance labels update on each node, shortest path highlighted in green
- Prim: MST edges highlighted in green, candidate edges in yellow
- Step-by-step: shows priority queue state, current edge, distances
- Algorithm selector: Dijkstra | Prim
- Presets: Small graph, Dense graph, Grid

---

## 9. LINKED LISTS
**Engine:** sequence/linked-list-ops.ts | **Order:** 9 | **Difficulty:** intermediate

### Formula / Logic
- **Node structure:** `{ value: number, next: LLNode | null }`
- **Build from array:** Iterate array, create nodes, link `current.next = newNode`
- **Traverse:** `while current ≠ null: visit(current.value), current = current.next`. O(n).
- **Search:** Traverse until value found or end reached. O(n). Comparisons = position.
- **Insert at position i:** Traverse to node at i-1, set `newNode.next = prev.next, prev.next = newNode`. O(n).
- **Delete at position i:** Traverse to node at i-1, set `prev.next = prev.next.next`. O(n).
- **Insert at head:** O(1). `newNode.next = head, head = newNode`.
- **Delete head:** O(1). `head = head.next`.

### Visualization
- Horizontal linked list: nodes as boxes with value and pointer arrow (→)
- Head pointer label above first node
- Null terminator (∅) after last node
- Operation selector: Traverse/Search/Insert/Delete
- Position and value inputs
- Step-by-step: highlighted node shows current position, visited nodes in primary
- Message: "Visiting node at position 2: value 7"

---

## 10. SORTING ALGORITHMS
**Engine:** sequence/sorting-ops.ts | **Order:** 10 | **Difficulty:** intermediate

### Formula / Logic

**Bubble Sort (O(n²)):**
```
for i = 0 to n-1:
  for j = 0 to n-i-1:
    compare a[j] and a[j+1]
    if a[j] > a[j+1]: swap(a[j], a[j+1])
```
- Each pass bubbles the largest unsorted element to its final position.
- Sorted portion grows from the right.

**Insertion Sort (O(n²)):**
```
for i = 1 to n-1:
  key = a[i]
  j = i - 1
  while j >= 0 and a[j] > key:
    a[j+1] = a[j]  // shift right
    j--
  a[j+1] = key
```
- Sorted portion grows from the left. Each new element inserted into correct position.

**Merge Sort (O(n log n)):**
```
mergeSort(a, lo, hi):
  if lo >= hi: return
  mid = floor((lo + hi) / 2)
  mergeSort(a, lo, mid)
  mergeSort(a, mid+1, hi)
  merge(a, lo, mid, hi)

merge(a, lo, mid, hi):
  copy left and right halves
  compare elements from each half, place smaller into original array
```
- Divide and conquer. Recursively split, then merge sorted halves.

### Visualization
- Canvas-drawn bar chart (bars represent array values)
- Bars color-coded: unsorted (muted), comparing (yellow), swapping (red), sorted (green)
- Playback controls: Play, Pause, Step Forward, Step Back, Reset
- Speed control: Slow (800ms), Normal (400ms), Fast (150ms)
- Algorithm selector: Bubble | Insertion | Merge
- Legend showing color meanings
- Step counter: "Step 5/42"
- Presets: Random, Nearly sorted, Reversed

---

## 11. TREE TRAVERSALS
**Engine:** treegraph/traversal-ops.ts | **Order:** 5 | **Difficulty:** intermediate

### Formula / Logic

**Preorder (Root → Left → Right):**
```
visit(node)
preorder(node.left)
preorder(node.right)
```
- Use case: Copying trees, prefix expressions

**Inorder (Left → Root → Right):**
```
inorder(node.left)
visit(node)
inorder(node.right)
```
- Use case: BST gives sorted order

**Postorder (Left → Right → Root):**
```
postorder(node.left)
postorder(node.right)
visit(node)
```
- Use case: Deleting trees, postfix expressions

**Level-order (BFS):**
```
queue = [root]
while queue not empty:
  node = dequeue()
  visit(node)
  enqueue(node.left)
  enqueue(node.right)
```
- Use case: Level-by-level processing

### Visualization
- Canvas-drawn binary tree
- Nodes colored by visit order (gradient from primary to green)
- Traversal type selector: Preorder | Inorder | Postorder | Level-order
- Step-by-step playback
- Result sequence displayed below tree
- Presets: Small, Full, Skewed Left, Balanced

---

## 12. GRAPH REPRESENTATIONS
**Engine:** treegraph/graph-types.ts | **Order:** 12 | **Difficulty:** beginner

### Formula / Logic

**Adjacency Matrix:**
- 2D array `matrix[V][V]` where `matrix[i][j] = weight` if edge exists, 0 or ∞ otherwise
- Space: O(V²)
- Edge lookup: O(1)
- All neighbors of a node: O(V)

**Adjacency List:**
- Array of lists: `adj[v] = [(neighbor, weight), ...]`
- Space: O(V + E)
- Edge lookup: O(degree(v))
- All neighbors of a node: O(degree(v))

**Conversion:**
- Matrix → List: For each cell (i,j) if ≠ 0, add j to adj[i]
- List → Matrix: For each edge (u,v,w), set matrix[u][v] = weight

### Visualization
- Side-by-side: graph diagram, adjacency matrix, adjacency list
- Interactive: click matrix cell to highlight corresponding edge in graph
- Toggle between representations
- Shows space complexity comparison
- Presets: Small, Medium, Dense

---

## 13. HASH TABLES & COLLISION RESOLUTION
**Engine:** sequence/hashing-ops.ts | **Order:** 15 | **Difficulty:** intermediate

### Formula / Logic

**Hash function:** `h(key) = key % tableSize`

**Collision Resolution Methods:**

1. **Chaining:** Each table slot holds a linked list. Colliding keys appended to list.
   - Insert: O(1) average, O(n) worst
   - Search: traverse list at h(key)

2. **Linear Probing:** `h(key, i) = (h(key) + i) % size` for i = 0, 1, 2, ...
   - On collision, check next slot sequentially
   - Clustering problem

3. **Quadratic Probing:** `h(key, i) = (h(key) + i²) % size` for i = 0, 1, 2, ...
   - Reduces clustering but may not visit all slots

4. **Double Hashing:** `h(key, i) = (h1(key) + i × h2(key)) % size`
   - `h1(key) = key % size`, `h2(key) = 1 + (key % (size - 1))`
   - Best distribution, no clustering

**Load Factor:** `α = count / size`. When α > 0.7, rehash to larger table (2× size).

### Visualization
- Hash table grid showing slots with keys
- Method selector: Chaining | Linear | Quadratic | Double
- Insert/Search/Delete operations
- Probe sequence highlighted (yellow for probe, green for found, red for collision)
- Load factor display with warning when > 0.7
- Step-by-step: "h(42) = 42 % 7 = 0 → slot 0 occupied → probe 1 → slot 1 empty → insert"
- History log of all operations

---

## 14. DYNAMIC PROGRAMMING
**Engine:** theory/dp-ops.ts | **Order:** 25 | **Difficulty:** advanced

### Formula / Logic

**Fibonacci (tabulation):**
```
dp[0] = 0, dp[1] = 1
for i = 2 to n: dp[i] = dp[i-1] + dp[i-2]
```
- Table: 1D array of size n+1
- Each cell depends on two previous cells

**Longest Common Subsequence (LCS):**
```
dp[i][j] = length of LCS of X[0..i-1] and Y[0..j-1]
dp[i][j] = dp[i-1][j-1] + 1           if X[i-1] = Y[j-1]
         = max(dp[i-1][j], dp[i][j-1]) otherwise
```
- Table: 2D array of size (m+1) × (n+1)
- Backtrack: follow diagonal (match) or max direction to find actual LCS

**0/1 Knapsack:**
```
dp[i][w] = max value using first i items with capacity w
dp[i][w] = max(dp[i-1][w],                    // don't take item i
               dp[i-1][w-weight[i]] + value[i])  // take item i
```
- Table: 2D array of size (n+1) × (W+1)
- Backtrack: if dp[i][w] ≠ dp[i-1][w], item i was taken

### Visualization
- 2D table (grid) that fills step by step
- Current cell highlighted in primary
- Dependency cells (the ones used to compute current) highlighted in yellow
- Computation formula shown: "dp[3][4] = max(dp[2][4], dp[2][1]+10) = 16"
- Backtrack path shown in green after table is complete
- Problem selector: Fibonacci | LCS | Knapsack
- Step-by-step playback controls

---

## 15. HEAPS & PRIORITY QUEUES
**Engine:** treegraph/heap-ops.ts | **Order:** 20 | **Difficulty:** intermediate

### Formula / Logic

**Array representation of binary heap:**
- Parent of i: `parent(i) = floor((i-1)/2)`
- Left child: `left(i) = 2i + 1`
- Right child: `right(i) = 2i + 2`

**Insert (Bubble Up):**
```
append to end
while i > 0 and heap[parent(i)] > heap[i]:  // min-heap
  swap(heap[i], heap[parent(i)])
  i = parent(i)
```
- O(log n)

**Extract Root (Bubble Down):**
```
root = heap[0]
heap[0] = heap[last], remove last
while true:
  smallest = i
  if left(i) < size and heap[left(i)] < heap[smallest]: smallest = left(i)
  if right(i) < size and heap[right(i)] < heap[smallest]: smallest = right(i)
  if smallest == i: break
  swap(heap[i], heap[smallest])
  i = smallest
```
- O(log n)

**Heap Build (O(n)):**
```
for i = floor(n/2) down to 0:
  bubbleDown(i)
```

### Visualization
- Dual view: tree representation (canvas) + array representation (grid)
- Tree: nodes as circles, edges as lines, root at top
- Array: cells with indices, parent-child relationships shown
- Insert: new node bubbles up with animation
- Extract: root removed, last element moves to root, bubbles down
- Compare/swap highlights in yellow/red
- Heap type toggle: Min-Heap | Max-Heap
- Presets: Random, Sorted, Reverse sorted

---

## 16. AVL TREES — SELF-BALANCING BST
**Engine:** treegraph/avl-ops.ts | **Order:** 30 | **Difficulty:** advanced

### Formula / Logic

**Balance Factor:** `BF(node) = height(left) - height(right)`. Must be ∈ {-1, 0, 1}.

**Rotations (4 cases):**

1. **LL (Left-Left):** BF = +2, left child BF = +1
   - Right rotate around unbalanced node
   ```
   y = unbalanced, x = y.left
   y.left = x.right
   x.right = y
   update heights
   ```

2. **RR (Right-Right):** BF = -2, right child BF = -1
   - Left rotate around unbalanced node
   ```
   y = unbalanced, x = y.right
   y.right = x.left
   x.left = y
   update heights
   ```

3. **LR (Left-Right):** BF = +2, left child BF = -1
   - Left rotate left child, then right rotate node

4. **RL (Right-Left):** BF = -2, right child BF = +1
   - Right rotate right child, then left rotate node

**Height update:** `height(node) = 1 + max(height(left), height(right))`

### Visualization
- Canvas-drawn tree with balance factor shown on each node
- Insert triggers rotation animation
- Rotation type label: "LL Rotation at node 15"
- Path from insertion point to root highlighted
- Step-by-step: shows balance factor calculation, rotation decision
- Presets: Sequential (1,2,3...), Random

---

## 17. CPU SCHEDULING ALGORITHMS
**Engine:** system-process/cpu-scheduling-ops.ts | **Order:** 35 | **Difficulty:** intermediate

### Formula / Logic

**FCFS (First Come First Serve):**
- Processes executed in arrival order
- Non-preemptive
- Convoy effect: short processes wait behind long ones
- Avg waiting time = Σ(startTime - arrivalTime) / n

**SJF (Shortest Job First):**
- Select process with smallest burst time from ready queue
- Non-preemptive
- Optimal for minimum average waiting time
- Starvation possible for long processes

**SRTF (Shortest Remaining Time First):**
- Preemptive version of SJF
- If new process arrives with shorter remaining time, preempt current
- Avg waiting time = Σ(turnaroundTime - burstTime) / n

**Priority Scheduling:**
- Select process with highest priority (lowest number)
- Can be preemptive or non-preemptive
- Starvation: solved by aging (increase priority over time)

**Round Robin:**
- Each process gets time quantum `q`
- If burst > q, process goes back to ready queue
- Context switch overhead
- Avg response time = Σ(firstStartTime - arrivalTime) / n

**Metrics:**
- Turnaround Time = Completion Time - Arrival Time
- Waiting Time = Turnaround Time - Burst Time
- Response Time = First Start Time - Arrival Time

### Visualization
- Gantt chart: horizontal timeline with colored blocks per process
- Process table: shows arrival, burst, priority, completion, turnaround, waiting
- Algorithm selector: FCFS | SJF | SRTF | Priority | Round Robin
- Time quantum input (for Round Robin)
- Metrics summary: avg waiting time, avg turnaround time, CPU utilization
- Presets: 4 processes with different arrival/burst patterns

---

## 18. PAGE REPLACEMENT ALGORITHMS
**Engine:** system-process/memory-ops.ts | **Order:** 45 | **Difficulty:** intermediate

### Formula / Logic

**FIFO (First In First Out):**
- Replace the page that has been in memory longest
- Maintain a queue of pages in order of arrival
- Belady's anomaly: more frames can cause more page faults

**LRU (Least Recently Used):**
- Replace the page that has not been used for the longest time
- Maintain access timestamps or stack
- Optimal for locality of reference
- No Belady's anomaly

**Optimal (OPT/Belady's):**
- Replace the page that will not be used for the longest time in the future
- Theoretical best — requires future knowledge
- Used as benchmark for other algorithms

**Page Fault:** When requested page is not in any frame.
**Page Hit:** When requested page is already in a frame.

### Visualization
- Frame table: shows pages currently in each frame (3–4 frames)
- Reference string displayed as a sequence
- Current reference highlighted
- Hit: frame highlighted green, "HIT" label
- Fault: victim page highlighted red, new page replaces it, "FAULT" label
- Counter: page faults / total references
- Algorithm selector: FIFO | LRU | Optimal
- Step-by-step or auto-play
- Presets: Reference strings that demonstrate Belady's anomaly

---

## 19. DFA & NFA SIMULATOR
**Engine:** theory/automata-ops.ts | **Order:** 40 | **Difficulty:** intermediate

### Formula / Logic

**DFA (Deterministic Finite Automaton):**
- M = (Q, Σ, δ, q₀, F)
- Q = finite set of states
- Σ = input alphabet
- δ: Q × Σ → Q (transition function, exactly one next state)
- q₀ = start state
- F ⊆ Q = accept states
- For each input symbol, exactly one transition

**NFA (Nondeterministic Finite Automaton):**
- M = (Q, Σ, δ, q₀, F)
- δ: Q × (Σ ∪ {ε}) → P(Q) (transition function, set of next states)
- Can have multiple transitions for same symbol
- Can have ε-transitions (no input consumed)
- Accepts if ANY path leads to accept state

**Simulation:**
- DFA: track single current state, follow δ(state, symbol)
- NFA: track set of current states, follow all possible transitions
- Step through input string one symbol at a time
- Accept if final state ∈ F (DFA) or any final state ∈ F (NFA)

### Visualization
- State diagram: circles for states, arrows for transitions
- Start state: incoming arrow
- Accept states: double circle
- Current state(s) highlighted in primary
- Input string with current symbol highlighted
- Transition table showing δ
- Step through input: next symbol → follow transition → update current state
- Result: "Accepted" (green) or "Rejected" (red)
- Presets: DFA for "ends with 01", NFA for "contains 00 or 11"

---

## 20. EXPRESSION PARSING: INFIX TO POSTFIX
**Engine:** sequence/expression-ops.ts | **Order:** 50 | **Difficulty:** intermediate

### Formula / Logic

**Shunting-Yard Algorithm (Dijkstra):**
```
Initialize empty stack and output list
For each token in input:
  If token is operand → add to output
  If token is '(' → push to stack
  If token is ')' → pop stack to output until '(' found
  If token is operator op1:
    While stack not empty AND top is operator op2 AND
          (precedence(op2) > precedence(op1) OR
           (precedence(op2) == precedence(op1) AND op1 is left-associative)):
      pop op2 to output
    push op1 to stack
Pop remaining operators from stack to output
```

**Precedence:** `+,-` = 1; `*,/` = 2; `^` = 3
**Associativity:** `+,-,*,/` = left; `^` = right

**Postfix Evaluation:**
```
For each token:
  If operand → push to stack
  If operator → pop two operands, apply operator, push result
Final stack value = result
```

### Visualization
- Input field for infix expression (e.g., "3 + 4 * 2 / (1 - 5) ^ 2")
- Step-by-step display showing:
  - Current token being processed
  - Stack contents (vertical stack visualization)
  - Output queue (postfix being built)
  - Precedence comparison when operators compared
- Stack highlighted: top element in primary, compared element in yellow
- Output tokens shown in order
- Final postfix result displayed
- Presets: Simple, With parentheses, With exponent

---

## Summary Table

| # | Topic | Engine | Key Formula | Viz Type |
|---|-------|--------|-------------|----------|
| 1 | Time Complexity | theory/complexity.ts | f(n) for 8 complexity classes | Bar chart + table |
| 2 | Recursion Tree | sequence | Tree: fact(n)→n, fib(n)→2^n, BS→log n | Canvas tree |
| 3 | Arrays | sequence/array-ops.ts | addr = base + i×4, splice for insert/delete | Bar chart + addresses |
| 4 | Stack/Queue | sequence/stack-queue-ops.ts | LIFO push/pop, FIFO enqueue/dequeue | Vertical/horizontal boxes |
| 5 | Number Systems | theory/number-systems-ops.ts | div-remainder, IEEE 754 sign+exp+mantissa | Step display + bit fields |
| 6 | BST | treegraph/bst-ops.ts | left < root < right, 3 delete cases | Canvas tree |
| 7 | BFS/DFS | treegraph/traversal-ops.ts | Queue BFS, Stack DFS, O(V+E) | Canvas graph |
| 8 | Shortest Path/MST | treegraph/weighted-graph-ops.ts | Dijkstra: dist[u]+w, Prim: min edge | Canvas weighted graph |
| 9 | Linked Lists | sequence/linked-list-ops.ts | Node{value,next}, traverse until null | Horizontal nodes + arrows |
| 10 | Sorting | sequence/sorting-ops.ts | Bubble: compare-swap, Insert: shift, Merge: divide-conquer | Canvas bar chart |
| 11 | Tree Traversals | treegraph/traversal-ops.ts | Pre/In/Post/Level order | Canvas tree |
| 12 | Graph Reps | treegraph/graph-types.ts | Matrix O(V²) vs List O(V+E) | Side-by-side matrix + list |
| 13 | Hashing | sequence/hashing-ops.ts | h(k)=k%size, 4 probe methods | Grid table + probe highlight |
| 14 | Dynamic Programming | theory/dp-ops.ts | Fib: dp[i]=dp[i-1]+dp[i-2], LCS/Knapsack: 2D | 2D table fill |
| 15 | Heaps | treegraph/heap-ops.ts | parent=(i-1)/2, bubble up/down | Tree + array dual view |
| 16 | AVL Trees | treegraph/avl-ops.ts | BF=hL-hR, 4 rotation cases | Canvas tree + BF labels |
| 17 | CPU Scheduling | system-process/cpu-scheduling-ops.ts | FCFS/SJF/SRTF/Priority/RR | Gantt chart + metrics table |
| 18 | Page Replacement | system-process/memory-ops.ts | FIFO/LRU/Optimal | Frame table + ref string |
| 19 | DFA/NFA | theory/automata-ops.ts | δ: Q×Σ→Q (DFA), δ: Q×Σ→P(Q) (NFA) | State diagram |
| 20 | Expression Parsing | sequence/expression-ops.ts | Shunting-yard, precedence, associativity | Stack + output queue |
