# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: topics.spec.ts >> topics page >> should filter by category
- Location: tests\e2e\topics.spec.ts:14:3

# Error details

```
Error: locator.click: Error: strict mode violation: getByRole('link', { name: 'Algorithms' }) resolved to 6 elements:
    1) <a class="filter-tab" data-astro-cid-n7tr52od="" href="/OpenCS/topics?category=algorithms"> Algorithms </a> aka getByRole('main').getByRole('link', { name: 'Algorithms', exact: true })
    2) <a class="topic-card" data-astro-cid-n7tr52od="" href="/OpenCS/topics/time-complexity">…</a> aka getByRole('link', { name: 'sequence published Time' })
    3) <a class="topic-card" data-astro-cid-n7tr52od="" href="/OpenCS/topics/tree-traversals">…</a> aka getByRole('link', { name: 'treegraph published Tree' })
    4) <a class="topic-card" data-astro-cid-n7tr52od="" href="/OpenCS/topics/bfs-dfs">…</a> aka getByRole('link', { name: 'treegraph published BFS and' })
    5) <a class="topic-card" data-astro-cid-n7tr52od="" href="/OpenCS/topics/sorting">…</a> aka getByRole('link', { name: 'sequence published Sorting' })
    6) <a data-astro-cid-35ed7um5="" href="/OpenCS/topics?category=algorithms">Algorithms</a> aka getByRole('contentinfo').getByRole('link', { name: 'Algorithms' })

Call log:
  - waiting for getByRole('link', { name: 'Algorithms' })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
    - generic [ref=e18]:
      - heading "Topics" [level=1] [ref=e19]
      - paragraph [ref=e20]: Explore 10 interactive visualizations of core BTech CSE concepts — 10 topics total
    - generic [ref=e22]:
      - generic [ref=e23]:
        - text: Category
        - generic [ref=e24]:
          - link "All" [ref=e25] [cursor=pointer]:
            - /url: /OpenCS/topics
          - link "Algorithms" [ref=e26] [cursor=pointer]:
            - /url: /OpenCS/topics?category=algorithms
          - link "Data Structures" [ref=e27] [cursor=pointer]:
            - /url: /OpenCS/topics?category=data-structures
          - link "Theory of Computation" [ref=e28] [cursor=pointer]:
            - /url: /OpenCS/topics?category=theory
          - link "Systems" [ref=e29] [cursor=pointer]:
            - /url: /OpenCS/topics?category=systems
          - link "Architecture" [ref=e30] [cursor=pointer]:
            - /url: /OpenCS/topics?category=architecture
          - link "Networks" [ref=e31] [cursor=pointer]:
            - /url: /OpenCS/topics?category=networks
          - link "Databases" [ref=e32] [cursor=pointer]:
            - /url: /OpenCS/topics?category=databases
      - generic [ref=e33]:
        - text: Engine
        - generic [ref=e34]:
          - link "sequence" [ref=e35] [cursor=pointer]:
            - /url: /OpenCS/topics?engine=sequence
          - link "treegraph" [ref=e36] [cursor=pointer]:
            - /url: /OpenCS/topics?engine=treegraph
      - generic [ref=e37]:
        - text: Difficulty
        - generic [ref=e38]:
          - link "beginner" [ref=e39] [cursor=pointer]:
            - /url: /OpenCS/topics?difficulty=beginner
          - link "intermediate" [ref=e40] [cursor=pointer]:
            - /url: /OpenCS/topics?difficulty=intermediate
          - link "advanced" [ref=e41] [cursor=pointer]:
            - /url: /OpenCS/topics?difficulty=advanced
      - generic [ref=e42]:
        - text: Status
        - generic [ref=e43]:
          - link "published" [ref=e44] [cursor=pointer]:
            - /url: /OpenCS/topics?status=published
          - link "in-progress" [ref=e45] [cursor=pointer]:
            - /url: /OpenCS/topics?status=in-progress
          - link "planned" [ref=e46] [cursor=pointer]:
            - /url: /OpenCS/topics?status=planned
    - generic [ref=e49]:
      - link "sequence published Time Complexity Growth Visualize how different algorithms scale as input size grows. Compare O(1) to O(n) to O(n²) to O(2ⁿ) and understand why complexity matters. beginner 20 minutes big-ocomplexityasymptotic-analysis" [ref=e50] [cursor=pointer]:
        - /url: /OpenCS/topics/time-complexity
        - generic [ref=e51]: sequence published
        - heading "Time Complexity Growth" [level=3] [ref=e52]
        - paragraph [ref=e53]: Visualize how different algorithms scale as input size grows. Compare O(1) to O(n) to O(n²) to O(2ⁿ) and understand why complexity matters.
        - generic [ref=e54]: beginner 20 minutes
        - generic [ref=e55]: big-ocomplexityasymptotic-analysis
      - link "sequence published Recursion Tree Visualizer Understand how recursive functions branch and grow. Watch factorial, Fibonacci, and binary search unfold as a tree of calls. intermediate 25 minutes recursiontreefibonacci" [ref=e56] [cursor=pointer]:
        - /url: /OpenCS/topics/recursion-tree
        - generic [ref=e57]: sequence published
        - heading "Recursion Tree Visualizer" [level=3] [ref=e58]
        - paragraph [ref=e59]: Understand how recursive functions branch and grow. Watch factorial, Fibonacci, and binary search unfold as a tree of calls.
        - generic [ref=e60]: intermediate 25 minutes
        - generic [ref=e61]: recursiontreefibonacci
      - link "sequence published Array Memory and Operations Understand how arrays store and access data in contiguous memory. Visualize insert, delete, search, and access operations. beginner 20 minutes arraysmemoryindexing" [ref=e62] [cursor=pointer]:
        - /url: /OpenCS/topics/arrays
        - generic [ref=e63]: sequence published
        - heading "Array Memory and Operations" [level=3] [ref=e64]
        - paragraph [ref=e65]: Understand how arrays store and access data in contiguous memory. Visualize insert, delete, search, and access operations.
        - generic [ref=e66]: beginner 20 minutes
        - generic [ref=e67]: arraysmemoryindexing
      - link "sequence published Stack and Queue Simulator Understand LIFO and FIFO data structures. Visualize stack push/pop and queue enqueue/dequeue operations. beginner 20 minutes stackqueueLIFO" [ref=e68] [cursor=pointer]:
        - /url: /OpenCS/topics/stack-queue
        - generic [ref=e69]: sequence published
        - heading "Stack and Queue Simulator" [level=3] [ref=e70]
        - paragraph [ref=e71]: Understand LIFO and FIFO data structures. Visualize stack push/pop and queue enqueue/dequeue operations.
        - generic [ref=e72]: beginner 20 minutes
        - generic [ref=e73]: stackqueueLIFO
      - 'link "treegraph published Tree Traversals Learn the four fundamental tree traversal algorithms: preorder, inorder, postorder, and level-order. Visualize how each visits nodes in a different order. intermediate 25 minutes treestraversalalgorithms" [ref=e74] [cursor=pointer]':
        - /url: /OpenCS/topics/tree-traversals
        - generic [ref=e75]: treegraph published
        - heading "Tree Traversals" [level=3] [ref=e76]
        - paragraph [ref=e77]: "Learn the four fundamental tree traversal algorithms: preorder, inorder, postorder, and level-order. Visualize how each visits nodes in a different order."
        - generic [ref=e78]: intermediate 25 minutes
        - generic [ref=e79]: treestraversalalgorithms
      - link "treegraph published Binary Search Tree Understand BST properties, operations, and why they enable O(log n) search. Visualize insert, search, and delete operations. intermediate 30 minutes BSTbinary-search-treesearch" [ref=e80] [cursor=pointer]:
        - /url: /OpenCS/topics/binary-search-tree
        - generic [ref=e81]: treegraph published
        - heading "Binary Search Tree" [level=3] [ref=e82]
        - paragraph [ref=e83]: Understand BST properties, operations, and why they enable O(log n) search. Visualize insert, search, and delete operations.
        - generic [ref=e84]: intermediate 30 minutes
        - generic [ref=e85]: BSTbinary-search-treesearch
      - link "treegraph published BFS and DFS Explore the two fundamental graph traversal algorithms. See BFS explore layer by layer and DFS dive deep before backtracking. Understand when to use each. intermediate 30 minutes BFSDFSgraph" [ref=e86] [cursor=pointer]:
        - /url: /OpenCS/topics/bfs-dfs
        - generic [ref=e87]: treegraph published
        - heading "BFS and DFS" [level=3] [ref=e88]
        - paragraph [ref=e89]: Explore the two fundamental graph traversal algorithms. See BFS explore layer by layer and DFS dive deep before backtracking. Understand when to use each.
        - generic [ref=e90]: intermediate 30 minutes
        - generic [ref=e91]: BFSDFSgraph
      - link "treegraph published Shortest Path & MST Learn Dijkstra's algorithm for shortest paths and Prim's algorithm for minimum spanning trees. Both use a greedy priority-queue approach but optimize for different goals. advanced 35 minutes DijkstraPrimshortest-path" [ref=e92] [cursor=pointer]:
        - /url: /OpenCS/topics/shortest-path-mst
        - generic [ref=e93]: treegraph published
        - heading "Shortest Path & MST" [level=3] [ref=e94]
        - paragraph [ref=e95]: Learn Dijkstra's algorithm for shortest paths and Prim's algorithm for minimum spanning trees. Both use a greedy priority-queue approach but optimize for different goals.
        - generic [ref=e96]: advanced 35 minutes
        - generic [ref=e97]: DijkstraPrimshortest-path
      - link "sequence published Linked Lists Understand singly linked lists — node structure, traversal, insertion, and deletion. See why O(1) insertion matters when you have the node pointer. intermediate 25 minutes linked-listdata-structurespointer" [ref=e98] [cursor=pointer]:
        - /url: /OpenCS/topics/linked-lists
        - generic [ref=e99]: sequence published
        - heading "Linked Lists" [level=3] [ref=e100]
        - paragraph [ref=e101]: Understand singly linked lists — node structure, traversal, insertion, and deletion. See why O(1) insertion matters when you have the node pointer.
        - generic [ref=e102]: intermediate 25 minutes
        - generic [ref=e103]: linked-listdata-structurespointer
      - link "sequence published Sorting Algorithms Learn bubble sort, insertion sort, and merge sort. See why O(n log n) beats O(n squared) — and when each algorithm earns its complexity label. intermediate 35 minutes sortingbubble-sortinsertion-sort" [ref=e104] [cursor=pointer]:
        - /url: /OpenCS/topics/sorting
        - generic [ref=e105]: sequence published
        - heading "Sorting Algorithms" [level=3] [ref=e106]
        - paragraph [ref=e107]: Learn bubble sort, insertion sort, and merge sort. See why O(n log n) beats O(n squared) — and when each algorithm earns its complexity label.
        - generic [ref=e108]: intermediate 35 minutes
        - generic [ref=e109]: sortingbubble-sortinsertion-sort
  - contentinfo [ref=e110]:
    - generic [ref=e111]:
      - generic [ref=e112]:
        - generic [ref=e113]:
          - text: OpenCS
          - paragraph [ref=e114]: Visual learning for BTech CSE
        - navigation [ref=e115]:
          - generic [ref=e116]:
            - heading "Project" [level=4] [ref=e117]
            - link "About" [ref=e118] [cursor=pointer]:
              - /url: /OpenCS/about
            - link "Roadmap" [ref=e119] [cursor=pointer]:
              - /url: /OpenCS/roadmap
            - link "Contribute" [ref=e120] [cursor=pointer]:
              - /url: /OpenCS/contribute
          - generic [ref=e121]:
            - heading "Topics" [level=4] [ref=e122]
            - link "All Topics" [ref=e123] [cursor=pointer]:
              - /url: /OpenCS/topics
            - link "Algorithms" [ref=e124] [cursor=pointer]:
              - /url: /OpenCS/topics?category=algorithms
            - link "Data Structures" [ref=e125] [cursor=pointer]:
              - /url: /OpenCS/topics?category=data-structures
            - link "Theory" [ref=e126] [cursor=pointer]:
              - /url: /OpenCS/topics?category=theory
            - link "Systems" [ref=e127] [cursor=pointer]:
              - /url: /OpenCS/topics?category=systems
      - generic [ref=e128]:
        - paragraph [ref=e129]: © 2026 OpenCS. MIT License.
        - paragraph [ref=e130]: Built for BTech CSE students in India
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('topics page', () => {
  4  |   test('should render topic cards', async ({ page }) => {
  5  |     await page.goto('/topics');
  6  |     await expect(page.locator('.topic-card')).toHaveCount(10);
  7  |   });
  8  | 
  9  |   test('should render filter controls', async ({ page }) => {
  10 |     await page.goto('/topics');
  11 |     await expect(page.locator('.filter-tabs')).toBeVisible();
  12 |   });
  13 | 
  14 |   test('should filter by category', async ({ page }) => {
  15 |     await page.goto('/topics');
  16 |     await expect(page.locator('.topic-card')).toHaveCount(10);
> 17 |     await page.getByRole('link', { name: 'Algorithms' }).click();
     |                                                          ^ Error: locator.click: Error: strict mode violation: getByRole('link', { name: 'Algorithms' }) resolved to 6 elements:
  18 |     await expect(page.locator('.topic-card')).toHaveCount(5);
  19 |   });
  20 | });
```