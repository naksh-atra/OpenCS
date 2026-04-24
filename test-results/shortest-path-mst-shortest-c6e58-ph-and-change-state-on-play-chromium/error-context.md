# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: shortest-path-mst.spec.ts >> shortest-path-mst visualizer >> should render graph and change state on play
- Location: tests\e2e\shortest-path-mst.spec.ts:4:3

# Error details

```
Error: expect(received).not.toEqual(expected) // deep equality

Expected: not {"data": [137, 80, 78, 71, 13, 10, 26, 10, 0, 0, …], "type": "Buffer"}

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
        - generic [ref=e19]: algorithms treegraph advanced published 35 minutes
        - heading "Shortest Path & MST" [level=1] [ref=e20]
        - paragraph [ref=e21]: Learn Dijkstra's algorithm for shortest paths and Prim's algorithm for minimum spanning trees. Both use a greedy priority-queue approach but optimize for different goals.
        - generic [ref=e22]:
          - heading "Learning Objectives" [level=4] [ref=e23]
          - list [ref=e24]:
            - listitem [ref=e25]: Explain why Dijkstra's algorithm works for shortest paths
            - listitem [ref=e26]: Compare MST vs shortest path as optimization goals
            - listitem [ref=e27]: Trace Dijkstra step by step on a weighted graph
            - listitem [ref=e28]: Trace Prim's algorithm step by step
      - generic [ref=e29]:
        - heading "Intuition" [level=2] [ref=e30]
        - paragraph [ref=e31]: "Greedy algorithms make locally optimal choices that turn out to be globally optimal. Two of the most elegant examples:"
        - list [ref=e32]:
          - listitem [ref=e33]:
            - strong [ref=e34]: Dijkstra
            - text: — Find the shortest path from one source to all nodes by always settling the closest unsettled node first.
          - listitem [ref=e35]:
            - strong [ref=e36]: Prim
            - text: — Build a minimum spanning tree by always adding the cheapest edge that connects the tree to a new node.
        - paragraph [ref=e37]: Both use a priority queue. Both are greedy. But their objective functions differ.
        - heading "Formal Concept" [level=2] [ref=e38]
        - heading "Dijkstra’s Algorithm" [level=3] [ref=e39]
        - paragraph [ref=e40]: "For finding shortest paths from a source node to all reachable nodes:"
        - list [ref=e41]:
          - listitem [ref=e42]: "Initialize distances: dist[src] = 0, all others = infinity"
          - listitem [ref=e43]: Add all nodes to a priority queue keyed by distance
          - listitem [ref=e44]: "While queue is non-empty: pop the node with minimum distance, relax its edges"
          - listitem [ref=e45]: "Relaxation: if dist[u] + w(u,v) less than dist[v], update dist[v] and predecessor"
        - paragraph [ref=e46]:
          - strong [ref=e47]: "Time complexity:"
          - text: O((V + E) log V) with a binary heap priority queue.
        - paragraph [ref=e48]:
          - strong [ref=e49]: "Key property:"
          - text: Works only with non-negative edge weights.
        - heading "Prim’s Algorithm" [level=3] [ref=e50]
        - paragraph [ref=e51]: "For finding the Minimum Spanning Tree (MST):"
        - list [ref=e52]:
          - listitem [ref=e53]: Start from any node, add it to the MST
          - listitem [ref=e54]: Maintain a priority queue of edges crossing the MST cut
          - listitem [ref=e55]: Always pick the minimum-weight crossing edge
          - listitem [ref=e56]: Add the corresponding node to the MST
        - paragraph [ref=e57]:
          - strong [ref=e58]: "Time complexity:"
          - text: O((V + E) log V) — identical to Dijkstra with a modified PQ.
        - heading "Visual Interaction" [level=2] [ref=e59]
        - generic [ref=e61]:
          - heading "Shortest Path & MST" [level=3] [ref=e63]
          - generic [ref=e64]:
            - generic [ref=e65]:
              - button "Undirected A" [ref=e66] [cursor=pointer]
              - button "Weighted B" [ref=e67] [cursor=pointer]
              - button "Cycle" [ref=e68] [cursor=pointer]
              - button "Sparse" [ref=e69] [cursor=pointer]
            - generic [ref=e70]:
              - generic [ref=e71]:
                - button "Dijkstra" [ref=e72] [cursor=pointer]
                - button "Prim" [ref=e73] [cursor=pointer]
              - generic [ref=e74]:
                - button "Reset" [ref=e75] [cursor=pointer]
                - button "Step" [ref=e76] [cursor=pointer]
                - button "Play" [active] [ref=e77] [cursor=pointer]
          - generic [ref=e81]:
            - generic [ref=e82]: ■In PQ (unsettled)
            - generic [ref=e83]: ■Settled
            - generic [ref=e84]: ■MST Edge
            - generic [ref=e85]: ■Current
        - paragraph [ref=e86]: Try Dijkstra on the weighted graph to see distances propagate. Switch to Prim to watch the MST grow edge by edge. Notice how both algorithms make locally greedy choices but toward different goals.
        - heading "Step-by-Step Example" [level=2] [ref=e87]
        - heading "Weighted Graph" [level=3] [ref=e88]
        - code [ref=e90]:
          - generic [ref=e91]: 0---1
          - generic [ref=e92]: "|\\ /|"
          - generic [ref=e93]: 2 3
          - generic [ref=e94]: "|/|"
          - generic [ref=e95]: "4"
        - paragraph [ref=e96]: Nodes 0 through 4 with varying edge weights.
        - heading "Dijkstra from node 0" [level=3] [ref=e97]
        - table [ref=e98]:
          - rowgroup [ref=e99]:
            - row "Step Settled PQ Content Reason" [ref=e100]:
              - columnheader "Step" [ref=e101]
              - columnheader "Settled" [ref=e102]
              - columnheader "PQ Content" [ref=e103]
              - columnheader "Reason" [ref=e104]
          - rowgroup [ref=e105]:
            - row "1 - 0:0 Start from node 0" [ref=e106]:
              - cell "1" [ref=e107]
              - cell "-" [ref=e108]
              - cell "0:0" [ref=e109]
              - cell "Start from node 0" [ref=e110]
            - row "2 0 1:2, 2:2 Relax 0-1, 0-2" [ref=e111]:
              - cell "2" [ref=e112]
              - cell "0" [ref=e113]
              - cell "1:2, 2:2" [ref=e114]
              - cell "Relax 0-1, 0-2" [ref=e115]
            - row "3 0, 1 2:2, 3:3, 4:5 Settle 1 (dist=2), relax 1-3, 1-4" [ref=e116]:
              - cell "3" [ref=e117]
              - cell "0, 1" [ref=e118]
              - cell "2:2, 3:3, 4:5" [ref=e119]
              - cell "Settle 1 (dist=2), relax 1-3, 1-4" [ref=e120]
            - row "4 0, 1, 2 3:3, 4:5 Settle 2 (dist=2)" [ref=e121]:
              - cell "4" [ref=e122]
              - cell "0, 1, 2" [ref=e123]
              - cell "3:3, 4:5" [ref=e124]
              - cell "Settle 2 (dist=2)" [ref=e125]
            - row "5 0, 1, 2, 3 4:4 Settle 3 (dist=3)" [ref=e126]:
              - cell "5" [ref=e127]
              - cell "0, 1, 2, 3" [ref=e128]
              - cell "4:4" [ref=e129]
              - cell "Settle 3 (dist=3)" [ref=e130]
            - row "6 All - All settled" [ref=e131]:
              - cell "6" [ref=e132]
              - cell "All" [ref=e133]
              - cell "-" [ref=e134]
              - cell "All settled" [ref=e135]
        - heading "Prim’s MST from node 0" [level=3] [ref=e136]
        - table [ref=e137]:
          - rowgroup [ref=e138]:
            - row "Step MST PQ Content Reason" [ref=e139]:
              - columnheader "Step" [ref=e140]
              - columnheader "MST" [ref=e141]
              - columnheader "PQ Content" [ref=e142]
              - columnheader "Reason" [ref=e143]
          - rowgroup [ref=e144]:
            - row "1 0 0-1:2, 0-2:2 Edges from 0" [ref=e145]:
              - cell "1" [ref=e146]
              - cell "0" [ref=e147]
              - cell "0-1:2, 0-2:2" [ref=e148]
              - cell "Edges from 0" [ref=e149]
            - row "2 2 1-3:1, … Add edge 0-1 (w=2)" [ref=e150]:
              - cell "2" [ref=e151]
              - cell "2" [ref=e152]
              - cell "1-3:1, …" [ref=e153]
              - cell "Add edge 0-1 (w=2)" [ref=e154]
            - row "3 3 … Add edge 1-3 (w=1)" [ref=e155]:
              - cell "3" [ref=e156]
              - cell "3" [ref=e157]
              - cell "…" [ref=e158]
              - cell "Add edge 1-3 (w=1)" [ref=e159]
        - paragraph [ref=e160]:
          - strong [ref=e161]: "MST total weight: 5"
        - heading "Common Mistakes" [level=2] [ref=e162]
        - list [ref=e163]:
          - listitem [ref=e164]:
            - paragraph [ref=e165]:
              - strong [ref=e166]: Using Dijkstra on graphs with negative edges
              - text: — Negative weights break the greedy guarantee. Use Bellman-Ford instead.
          - listitem [ref=e167]:
            - paragraph [ref=e168]:
              - strong [ref=e169]: Confusing MST weight with shortest path length
              - text: — MST weight is the sum of the smallest edges connecting all nodes. Shortest path is the minimum distance between two specific nodes.
          - listitem [ref=e170]:
            - paragraph [ref=e171]:
              - strong [ref=e172]: Forgetting to mark nodes as settled
              - text: — Dijkstra can settle a node only once. Without tracking, you might process it multiple times.
          - listitem [ref=e173]:
            - paragraph [ref=e174]:
              - strong [ref=e175]: Not using a priority queue
              - text: — Naive O(V-squared) implementation works but the PQ gives O(E log V), critical for large graphs.
        - heading "Practice Prompts" [level=2] [ref=e176]
        - list [ref=e177]:
          - listitem [ref=e178]:
            - paragraph [ref=e179]: Why does Dijkstra’s greedy choice (settle closest node first) guarantee shortest paths?
          - listitem [ref=e180]:
            - paragraph [ref=e181]: Can a graph have two different MSTs? Under what conditions?
          - listitem [ref=e182]:
            - paragraph [ref=e183]: If all edges in a graph have weight 1, what does Dijkstra give you? What does Prim give you?
          - listitem [ref=e184]:
            - paragraph [ref=e185]: How would you find the shortest path between two specific nodes s and t using Dijkstra?
        - navigation [ref=e186]:
          - generic [ref=e187]:
            - link "← Previous BFS and DFS" [ref=e188] [cursor=pointer]:
              - /url: /OpenCS/topics/bfs-dfs
            - link "Next → Linked Lists" [ref=e189] [cursor=pointer]:
              - /url: /OpenCS/topics/linked-lists
  - contentinfo [ref=e190]:
    - generic [ref=e191]:
      - generic [ref=e192]:
        - generic [ref=e193]:
          - text: OpenCS
          - paragraph [ref=e194]: Visual learning for BTech CSE
        - navigation [ref=e195]:
          - generic [ref=e196]:
            - heading "Project" [level=4] [ref=e197]
            - link "About" [ref=e198] [cursor=pointer]:
              - /url: /OpenCS/about
            - link "Roadmap" [ref=e199] [cursor=pointer]:
              - /url: /OpenCS/roadmap
            - link "Contribute" [ref=e200] [cursor=pointer]:
              - /url: /OpenCS/contribute
          - generic [ref=e201]:
            - heading "Topics" [level=4] [ref=e202]
            - link "All Topics" [ref=e203] [cursor=pointer]:
              - /url: /OpenCS/topics
            - link "Algorithms" [ref=e204] [cursor=pointer]:
              - /url: /OpenCS/topics?category=algorithms
            - link "Data Structures" [ref=e205] [cursor=pointer]:
              - /url: /OpenCS/topics?category=data-structures
            - link "Theory" [ref=e206] [cursor=pointer]:
              - /url: /OpenCS/topics?category=theory
            - link "Systems" [ref=e207] [cursor=pointer]:
              - /url: /OpenCS/topics?category=systems
      - generic [ref=e208]:
        - paragraph [ref=e209]: © 2026 OpenCS. MIT License.
        - paragraph [ref=e210]: Built for BTech CSE students in India
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('shortest-path-mst visualizer', () => {
  4  |   test('should render graph and change state on play', async ({ page }) => {
  5  |     await page.goto('/topics/shortest-path-mst');
  6  |     
  7  |     // Verify canvas is visible with valid bounding box
  8  |     const canvas = page.locator('[data-testid="spmv-canvas"] canvas');
  9  |     await expect(canvas).toBeVisible();
  10 |     
  11 |     const bbox = await canvas.boundingBox();
  12 |     expect(bbox).not.toBeNull();
  13 |     expect(bbox!.width).toBeGreaterThan(100);
  14 |     expect(bbox!.height).toBeGreaterThan(100);
  15 |     
  16 |     // Verify legend is visible
  17 |     const legend = page.locator('[data-testid="spmv-legend"]');
  18 |     await expect(legend).toBeVisible();
  19 |     
  20 |     // Get initial canvas pixel
  21 |     const initialPixel = await canvas.screenshot();
  22 |     
  23 |     // Press Play button
  24 |     await page.locator('[data-testid="spmv-play"]').click();
  25 |     
  26 |     // Wait for animation to progress
  27 |     await page.waitForTimeout(1500);
  28 |     
  29 |     // Canvas should have changed (not identical pixels)
  30 |     const currentPixel = await canvas.screenshot();
> 31 |     expect(currentPixel).not.toEqual(initialPixel);
     |                              ^ Error: expect(received).not.toEqual(expected) // deep equality
  32 |     
  33 |     // Legend should still be visible
  34 |     await expect(legend).toBeVisible();
  35 |   });
  36 | });
```