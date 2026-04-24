# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: linked-list.spec.ts >> linked-list visualizer >> should render nodes and respond to insert
- Location: tests\e2e\linked-list.spec.ts:4:3

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
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
    - article [ref=e17]:
      - generic [ref=e18]:
        - generic [ref=e19]: data-structures sequence intermediate published 25 minutes
        - heading "Linked Lists" [level=1] [ref=e20]
        - paragraph [ref=e21]: Understand singly linked lists — node structure, traversal, insertion, and deletion. See why O(1) insertion matters when you have the node pointer.
        - generic [ref=e22]:
          - heading "Learning Objectives" [level=4] [ref=e23]
          - list [ref=e24]:
            - listitem [ref=e25]: Explain the node-and-pointer structure of a linked list
            - listitem [ref=e26]: Trace traversal, search, insert, and delete operations
            - listitem [ref=e27]: Compare linked list and array access costs
            - listitem [ref=e28]: Understand when linked lists beat arrays
      - generic [ref=e29]:
        - heading "Intuition" [level=2] [ref=e30]
        - paragraph [ref=e31]: An array is a block of memory — every element sits next to its neighbors. A linked list is a chain — each element points to the next one. No block needed. No wasted space. Just pointers linking node to node.
        - paragraph [ref=e32]: "The trade-off: you can’t jump to index 5 directly. You have to walk from the start, following pointers, until you get there. But insertion? If you already have the node, it’s O(1) — just point around the gap."
        - heading "Formal Concept" [level=2] [ref=e33]
        - paragraph [ref=e34]:
          - text: A
          - strong [ref=e35]: singly linked list
          - text: is a sequence of nodes where each node holds a value and a pointer to the next node. The last node points to null (end of chain).
        - table [ref=e36]:
          - rowgroup [ref=e37]:
            - row "Operation Array Linked List" [ref=e38]:
              - columnheader "Operation" [ref=e39]
              - columnheader "Array" [ref=e40]
              - columnheader "Linked List" [ref=e41]
          - rowgroup [ref=e42]:
            - row "Access by index O(1) O(n)" [ref=e43]:
              - cell "Access by index" [ref=e44]
              - cell "O(1)" [ref=e45]
              - cell "O(n)" [ref=e46]
            - row "Insert at head O(n) O(1)" [ref=e47]:
              - cell "Insert at head" [ref=e48]
              - cell "O(n)" [ref=e49]
              - cell "O(1)" [ref=e50]
            - row "Insert at tail O(1) O(n) or O(1) with tail pointer" [ref=e51]:
              - cell "Insert at tail" [ref=e52]
              - cell "O(1)" [ref=e53]
              - cell "O(n) or O(1) with tail pointer" [ref=e54]
            - row "Delete at head O(n) O(1)" [ref=e55]:
              - cell "Delete at head" [ref=e56]
              - cell "O(n)" [ref=e57]
              - cell "O(1)" [ref=e58]
            - row "Search O(n) O(n)" [ref=e59]:
              - cell "Search" [ref=e60]
              - cell "O(n)" [ref=e61]
              - cell "O(n)" [ref=e62]
        - paragraph [ref=e63]:
          - strong [ref=e64]: "Key property:"
          - text: No random access. You always walk from the head.
        - heading "Visual Interaction" [level=2] [ref=e65]
        - generic [ref=e67]:
          - generic [ref=e68]:
            - heading "Linked List" [level=3] [ref=e69]
            - paragraph [ref=e70]: Press play to start
          - generic [ref=e71]:
            - generic [ref=e72]:
              - button "Default" [ref=e73] [cursor=pointer]
              - button "Reversed" [ref=e74] [cursor=pointer]
              - button "Nearly Sorted" [ref=e75] [cursor=pointer]
              - button "Random" [ref=e76] [cursor=pointer]
            - generic [ref=e77]:
              - generic [ref=e78]:
                - button "Traverse" [ref=e79] [cursor=pointer]
                - button "Search" [ref=e80] [cursor=pointer]
                - button "Insert" [ref=e81] [cursor=pointer]
                - button "Delete" [ref=e82] [cursor=pointer]
              - generic [ref=e83]:
                - button "Reset" [ref=e84] [cursor=pointer]
                - button "Step" [ref=e85] [cursor=pointer]
                - button "Play" [ref=e86] [cursor=pointer]
          - generic [ref=e90]:
            - generic [ref=e91]: ■Visited
            - generic [ref=e92]: ■Current
        - paragraph [ref=e93]: Use Step or Play to watch the traversal path. Try searching, inserting, and deleting nodes step by step.
        - heading "Step-by-Step Example" [level=2] [ref=e94]
        - 'heading "List: 4 -> 2 -> 7 -> 1 -> 5" [level=3] [ref=e95]'
        - heading "Traverse (all nodes)" [level=3] [ref=e96]
        - paragraph [ref=e97]: "Walk from head: 4, 2, 7, 1, 5. O(n) time."
        - heading "Search for 7" [level=3] [ref=e98]
        - paragraph [ref=e99]: "Walk from head: 4 (no), 2 (no), 7 (yes, found). O(n) time."
        - heading "Insert 9 at index 2" [level=3] [ref=e100]
        - paragraph [ref=e101]: "Walk to index 1 (node 2). Create node 9. Point 2 -> 9, 9 -> 7. List: 4 -> 2 -> 9 -> 7 -> 1 -> 5."
        - heading "Delete at index 3" [level=3] [ref=e102]
        - paragraph [ref=e103]: "Walk to index 2 (node 9). Point 9 -> 1. Remove node 7. List: 4 -> 2 -> 9 -> 1 -> 5."
        - heading "Common Mistakes" [level=2] [ref=e104]
        - list [ref=e105]:
          - listitem [ref=e106]:
            - paragraph [ref=e107]:
              - strong [ref=e108]: Forgetting to update the tail pointer
              - text: — When inserting at the end of a list with a tail pointer, you must update it.
          - listitem [ref=e109]:
            - paragraph [ref=e110]:
              - strong [ref=e111]: Losing the next pointer before overwriting
              - text: — When inserting or deleting, always save references before changing pointers.
          - listitem [ref=e112]:
            - paragraph [ref=e113]:
              - strong [ref=e114]: Accessing null.next
              - text: — If you walk past the end, the next node is null. Accessing .value on null crashes.
          - listitem [ref=e115]:
            - paragraph [ref=e116]:
              - strong [ref=e117]: Confusing index with position
              - text: — Index 0 is the head. Traversal counts from 0.
        - heading "Practice Prompts" [level=2] [ref=e118]
        - list [ref=e119]:
          - listitem [ref=e120]:
            - paragraph [ref=e121]: If you have a singly linked list with only a head pointer, how do you find the second-to-last node?
          - listitem [ref=e122]:
            - paragraph [ref=e123]: How would you reverse a singly linked list in place? What is the time complexity?
          - listitem [ref=e124]:
            - paragraph [ref=e125]: Why is inserting at the head O(1) for a linked list but O(n) for an array?
          - listitem [ref=e126]:
            - paragraph [ref=e127]: What happens if you try to delete a node at index 10 when the list only has 5 nodes?
        - navigation [ref=e128]:
          - generic [ref=e129]:
            - link "← Previous Shortest Path & MST" [ref=e130] [cursor=pointer]:
              - /url: /OpenCS/topics/shortest-path-mst
            - link "Next → Sorting Algorithms" [ref=e131] [cursor=pointer]:
              - /url: /OpenCS/topics/sorting
  - contentinfo [ref=e132]:
    - generic [ref=e133]:
      - generic [ref=e134]:
        - generic [ref=e135]:
          - text: OpenCS
          - paragraph [ref=e136]: Visual learning for BTech CSE
        - navigation [ref=e137]:
          - generic [ref=e138]:
            - heading "Project" [level=4] [ref=e139]
            - link "About" [ref=e140] [cursor=pointer]:
              - /url: /OpenCS/about
            - link "Roadmap" [ref=e141] [cursor=pointer]:
              - /url: /OpenCS/roadmap
            - link "Contribute" [ref=e142] [cursor=pointer]:
              - /url: /OpenCS/contribute
          - generic [ref=e143]:
            - heading "Topics" [level=4] [ref=e144]
            - link "All Topics" [ref=e145] [cursor=pointer]:
              - /url: /OpenCS/topics
            - link "Algorithms" [ref=e146] [cursor=pointer]:
              - /url: /OpenCS/topics?category=algorithms
            - link "Data Structures" [ref=e147] [cursor=pointer]:
              - /url: /OpenCS/topics?category=data-structures
            - link "Theory" [ref=e148] [cursor=pointer]:
              - /url: /OpenCS/topics?category=theory
            - link "Systems" [ref=e149] [cursor=pointer]:
              - /url: /OpenCS/topics?category=systems
      - generic [ref=e150]:
        - paragraph [ref=e151]: © 2026 OpenCS. MIT License.
        - paragraph [ref=e152]: Built for BTech CSE students in India
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('linked-list visualizer', () => {
  4  |   test('should render nodes and respond to insert', async ({ page }) => {
  5  |     await page.goto('/topics/linked-lists');
  6  |     
  7  |     // Verify list is visible
  8  |     const list = page.locator('[data-testid="llv-list"]');
  9  |     await expect(list).toBeVisible();
  10 |     
  11 |     // Get initial node count
  12 |     const nodes = list.locator('.llv-node');
  13 |     const initialCount = await nodes.count();
> 14 |     expect(initialCount).toBeGreaterThan(0);
     |                          ^ Error: expect(received).toBeGreaterThan(expected)
  15 |     
  16 |     // Perform insert operation
  17 |     const input = page.locator('input[type="number"]');
  18 |     await input.fill('99');
  19 |     await page.locator('[data-testid="llv-insert"]').click();
  20 |     
  21 |     // Wait for DOM update
  22 |     await page.waitForTimeout(500);
  23 |     
  24 |     // Node count should increase
  25 |     const newNodes = list.locator('.llv-node');
  26 |     expect(await newNodes.count()).toBe(initialCount + 1);
  27 |   });
  28 | });
```