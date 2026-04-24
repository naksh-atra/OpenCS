# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bfs-dfs.spec.ts >> bfs-dfs visualizer >> should render graph and change state on play
- Location: tests\e2e\bfs-dfs.spec.ts:4:3

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('[data-testid="gtv-play"]')
Expected: "Pause"
Received: "Play"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('[data-testid="gtv-play"]')
    9 × locator resolved to <button data-testid="gtv-play" class="gtv-btn gtv-btn-primary">Play</button>
      - unexpected value "Play"

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "OpenCS" [ref=e4] [cursor=pointer]:
        - /url: /OpenCS/
        - img [ref=e5]
        - text: OpenCS
      - navigation [ref=e8]:
        - link "Topics" [ref=e9] [cursor=pointer]:
          - /url: /OpenCS/topics
        - link "Roadmap" [ref=e10] [cursor=pointer]:
          - /url: /OpenCS/roadmap
        - link "About" [ref=e11] [cursor=pointer]:
          - /url: /OpenCS/about
        - link "Contribute" [ref=e12] [cursor=pointer]:
          - /url: /OpenCS/contribute
      - button "Toggle menu" [ref=e13]:
        - img [ref=e14]
  - main [ref=e16]:
    - article [ref=e17]:
      - generic [ref=e18]:
        - generic [ref=e19]: algorithms treegraph intermediate published 30 minutes
        - heading "BFS and DFS" [level=1] [ref=e20]
        - paragraph [ref=e21]: Explore the two fundamental graph traversal algorithms. See BFS explore layer by layer and DFS dive deep before backtracking. Understand when to use each.
        - generic [ref=e22]:
          - heading "Learning Objectives" [level=4] [ref=e23]
          - list [ref=e24]:
            - listitem [ref=e25]: Compare BFS and DFS traversal orders on the same graph
            - listitem [ref=e26]: Identify when BFS finds shortest paths in unweighted graphs
            - listitem [ref=e27]: Implement BFS with a queue and DFS with a stack
            - listitem [ref=e28]: Choose the right traversal based on problem constraints
      - generic [ref=e29]:
        - heading "Intuition" [level=2] [ref=e30]
        - paragraph [ref=e31]: "When you explore a city, you have two natural strategies:"
        - list [ref=e32]:
          - listitem [ref=e33]:
            - strong [ref=e34]: Level by level
            - text: — Check every block at distance 1 before moving to distance 2. That’s BFS (breadth-first search).
          - listitem [ref=e35]:
            - strong [ref=e36]: Go deep first
            - text: — Follow one path as far as it goes, then backtrack and try another. That’s DFS (depth-first search).
        - paragraph [ref=e37]:
          - text: Both visit every node exactly once. The difference is
          - emphasis [ref=e38]: when
          - text: they visit nodes relative to their depth.
        - heading "Formal Concept" [level=2] [ref=e39]
        - paragraph [ref=e40]:
          - strong [ref=e41]: BFS
          - text: uses a queue — first discovered, first visited. It explores all nodes at distance
          - emphasis [ref=e42]: d
          - text: before any at distance
          - emphasis [ref=e43]: d+1
          - text: .
        - paragraph [ref=e44]:
          - strong [ref=e45]: DFS
          - text: uses a stack (or recursion) — last discovered, first visited. It dives as deep as possible before backtracking.
        - table [ref=e46]:
          - rowgroup [ref=e47]:
            - row "Property BFS DFS" [ref=e48]:
              - columnheader "Property" [ref=e49]
              - columnheader "BFS" [ref=e50]
              - columnheader "DFS" [ref=e51]
          - rowgroup [ref=e52]:
            - row "Data structure Queue Stack" [ref=e53]:
              - cell "Data structure" [ref=e54]
              - cell "Queue" [ref=e55]
              - cell "Stack" [ref=e56]
            - row "Order Layer by layer Deep before back" [ref=e57]:
              - cell "Order" [ref=e58]
              - cell "Layer by layer" [ref=e59]
              - cell "Deep before back" [ref=e60]
            - row "Shortest path Yes (unweighted) No" [ref=e61]:
              - cell "Shortest path" [ref=e62]
              - cell "Yes (unweighted)" [ref=e63]
              - cell "No" [ref=e64]
            - row "Space O(V + E) O(V) worst case" [ref=e65]:
              - cell "Space" [ref=e66]
              - cell "O(V + E)" [ref=e67]
              - cell "O(V) worst case" [ref=e68]
            - row "Recursive? No Yes (or explicit stack)" [ref=e69]:
              - cell "Recursive?" [ref=e70]
              - cell "No" [ref=e71]
              - cell "Yes (or explicit stack)" [ref=e72]
        - heading "Visual Interaction" [level=2] [ref=e73]
        - generic [ref=e75]:
          - heading "Graph Traversal" [level=3] [ref=e77]
          - generic [ref=e78]:
            - generic [ref=e79]:
              - button "Undirected A" [ref=e80] [cursor=pointer]
              - button "Weighted B" [ref=e81] [cursor=pointer]
              - button "Cycle" [ref=e82] [cursor=pointer]
              - button "Sparse" [ref=e83] [cursor=pointer]
            - generic [ref=e84]:
              - generic [ref=e85]:
                - button "BFS" [ref=e86] [cursor=pointer]
                - button "DFS" [ref=e87] [cursor=pointer]
              - generic [ref=e88]:
                - button "Reset" [ref=e89] [cursor=pointer]
                - button "Step" [ref=e90] [cursor=pointer]
                - button "Play" [active] [ref=e91] [cursor=pointer]
          - generic [ref=e95]:
            - generic [ref=e96]: ■Pending
            - generic [ref=e97]: ■Frontier
            - generic [ref=e98]: ■Visited
            - generic [ref=e99]: ■Current
        - paragraph [ref=e100]: Switch between BFS and DFS on the same graph. Notice how BFS gives a level-by-level ordering while DFS follows one path deeply before branching.
        - heading "Step-by-Step Example" [level=2] [ref=e101]
        - heading "Graph" [level=3] [ref=e102]
        - code [ref=e104]:
          - generic [ref=e105]: A
          - generic [ref=e106]: / \
          - generic [ref=e107]: B C
          - generic [ref=e108]: / \ \
          - generic [ref=e109]: D E F
        - 'heading "BFS from A: A, B, C, D, E, F" [level=3] [ref=e110]'
        - list [ref=e111]:
          - listitem [ref=e112]: "Queue: [A] → deque A, visit A"
          - listitem [ref=e113]: Enqueue B, C
          - listitem [ref=e114]: "Queue: [B, C] → deque B, visit B"
          - listitem [ref=e115]: Enqueue D, E
          - listitem [ref=e116]: "Queue: [C, D, E] → deque C, visit C"
          - listitem [ref=e117]: Enqueue F
          - listitem [ref=e118]: "Queue: [D, E, F] → deque D, E, F"
        - 'heading "DFS from A: A, B, D, E, C, F" [level=3] [ref=e119]'
        - list [ref=e120]:
          - listitem [ref=e121]: "Stack: [A] → pop A, visit A"
          - listitem [ref=e122]: "Push B, C → Stack: [B, C]"
          - listitem [ref=e123]: "Pop C, visit C → Push F → Stack: [B, F]"
          - listitem [ref=e124]: "Pop F, visit F → Stack: [B]"
          - listitem [ref=e125]: "Pop B, visit B → Push D, E → Stack: [D, E]"
          - listitem [ref=e126]: Pop E, visit E → Pop D, visit D
        - heading "Common Mistakes" [level=2] [ref=e127]
        - list [ref=e128]:
          - listitem [ref=e129]:
            - paragraph [ref=e130]:
              - strong [ref=e131]: Using DFS for shortest path
              - text: — DFS doesn’t guarantee shortest path in unweighted graphs. BFS does (by construction).
          - listitem [ref=e132]:
            - paragraph [ref=e133]:
              - strong [ref=e134]: Forgetting the visited set
              - text: — Without tracking visited nodes, you loop forever on graphs with cycles.
          - listitem [ref=e135]:
            - paragraph [ref=e136]:
              - strong [ref=e137]: Confusing stack order with recursion order
              - text: — Explicit stack gives you control over order; recursion is DFS but with call-stack depth limits.
          - listitem [ref=e138]:
            - paragraph [ref=e139]:
              - strong [ref=e140]: BFS without tracking distance
              - text: — BFS naturally gives shortest path
              - emphasis [ref=e141]: count
              - text: (number of edges), not weighted distance.
        - heading "Practice Prompts" [level=2] [ref=e142]
        - list [ref=e143]:
          - listitem [ref=e144]:
            - paragraph [ref=e145]: On a maze with unweighted steps, which traversal would find the shortest path from start to goal?
          - listitem [ref=e146]:
            - paragraph [ref=e147]: How would you detect a cycle in an undirected graph?
          - listitem [ref=e148]:
            - paragraph [ref=e149]: DFS can be implemented recursively or with an explicit stack. What are the trade-offs?
          - listitem [ref=e150]:
            - paragraph [ref=e151]: If BFS explores level by level, why does its time complexity remain O(V + E)?
        - navigation [ref=e152]:
          - generic [ref=e153]:
            - link "← Previous Binary Search Tree" [ref=e154] [cursor=pointer]:
              - /url: /OpenCS/topics/binary-search-tree
            - link "Next → Shortest Path & MST" [ref=e155] [cursor=pointer]:
              - /url: /OpenCS/topics/shortest-path-mst
  - contentinfo [ref=e156]:
    - generic [ref=e157]:
      - generic [ref=e158]:
        - generic [ref=e159]:
          - text: OpenCS
          - paragraph [ref=e160]: Visual learning for BTech CSE
        - navigation [ref=e161]:
          - generic [ref=e162]:
            - heading "Project" [level=4] [ref=e163]
            - link "About" [ref=e164] [cursor=pointer]:
              - /url: /OpenCS/about
            - link "Roadmap" [ref=e165] [cursor=pointer]:
              - /url: /OpenCS/roadmap
            - link "Contribute" [ref=e166] [cursor=pointer]:
              - /url: /OpenCS/contribute
          - generic [ref=e167]:
            - heading "Topics" [level=4] [ref=e168]
            - link "All Topics" [ref=e169] [cursor=pointer]:
              - /url: /OpenCS/topics
            - link "Algorithms" [ref=e170] [cursor=pointer]:
              - /url: /OpenCS/topics?category=algorithms
            - link "Data Structures" [ref=e171] [cursor=pointer]:
              - /url: /OpenCS/topics?category=data-structures
            - link "Theory" [ref=e172] [cursor=pointer]:
              - /url: /OpenCS/topics?category=theory
            - link "Systems" [ref=e173] [cursor=pointer]:
              - /url: /OpenCS/topics?category=systems
      - generic [ref=e174]:
        - paragraph [ref=e175]: © 2026 OpenCS. MIT License.
        - paragraph [ref=e176]: Built for BTech CSE students in India
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('bfs-dfs visualizer', () => {
  4  |   test('should render graph and change state on play', async ({ page }) => {
  5  |     await page.goto('/topics/bfs-dfs');
  6  |     
  7  |     // Verify canvas is visible with valid bounding box
  8  |     const canvas = page.locator('[data-testid="gtv-canvas"] canvas');
  9  |     await expect(canvas).toBeVisible();
  10 |     
  11 |     // Verify legend is visible
  12 |     const legend = page.locator('[data-testid="gtv-legend"]');
  13 |     await expect(legend).toBeVisible();
  14 |     
  15 |     // Get play button
  16 |     const playBtn = page.locator('[data-testid="gtv-play"]');
  17 |     await expect(playBtn).toBeVisible();
  18 |     
  19 |     // Initial button text should be "Play"
  20 |     await expect(playBtn).toHaveText('Play');
  21 |     
  22 |     // Press Play button
  23 |     await playBtn.click();
  24 |     
  25 |     // Button text should change to "Pause"
> 26 |     await expect(playBtn).toHaveText('Pause');
     |                           ^ Error: expect(locator).toHaveText(expected) failed
  27 |     
  28 |     // After a delay, button should return to "Play" (animation complete)
  29 |     await page.waitForTimeout(3000);
  30 |     
  31 |     // Legend should still be visible
  32 |     await expect(legend).toBeVisible();
  33 |   });
  34 | });
```