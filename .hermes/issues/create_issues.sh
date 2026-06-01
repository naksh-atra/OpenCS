# GitHub Issue Creation Commands
# Replace YOUR_TOKEN with your GitHub PAT and run these:

# Issue 1: Time Complexity - restore interactive n-value input
curl -s -X POST https://api.github.com/repos/naksh-atra/OpenCS/issues \
  -H "Authorization: token YOUR_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -d '{"title":"fix(time-complexity): restore interactive n-value input in complexity growth comparison","body":"The Time Complexity Growth comparison previously had an interactive input where users could set a value for n and watch complexity classes grow with linear and log scale views.\n\nThe dev version lost this interactivity. Only filter buttons remain with no way to manipulate n or see values change.\n\nExpected behavior:\n- n-value input with preset buttons (e.g. 3, 5, 7, 20)\n- Play button to animate counter from 0 to n\n- Reset button\n- Linear and log scale toggle\n- Bar chart updating in real-time with computed values","labels":["bug","high-priority"]}'

# Issue 2: Stack Queue - remove duplicate Random button
curl -s -X POST https://api.github.com/repos/naksh-atra/OpenCS/issues \
  -H "Authorization: token YOUR_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -d '{"title":"fix(stack-queue): remove duplicate Random button from stack presets","body":"The Stack and Queue Simulator has two \"Random\" options. The first one is a preset that loads a fixed set of random-looking values. The second one actually generates fresh random values each time it is clicked. Remove the first duplicate to avoid confusion. Keep only the working random button.","labels":["bug"]}'

# Issue 3: Tree Visualizer - Skewed Left preset shows no difference
curl -s -X POST https://api.github.com/repos/naksh-atra/OpenCS/issues \
  -H "Authorization: token YOUR_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -d '{"title":"fix(tree-visualizer): Skewed Left preset shows no difference from Full and Small","body":"In the Tree visualizer, the Skewed Left preset displays a vertical tree of 3 elements with no visible left skew. Full and Small presets also show the same pattern with no visual difference between them.\n\nEach preset should produce a distinctly different tree shape:\n- Full: a complete/balanced tree\n- Small: a minimal tree\n- Skewed Left: a tree leaning heavily to the left\n\nInvestigate the tree generation logic and fix the layout so each preset is visually distinct.","labels":["bug"]}'

# Issue 4: Number Systems - fix button labels and swap button
curl -s -X POST https://api.github.com/repos/naksh-atra/OpenCS/issues \
  -H "Authorization: token YOUR_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -d '{"title":"fix(number-systems): use base names in conversion buttons and fix swap button","body":"Two issues in the Number Systems and Conversions visualizer:\n\n1. Button labels show the example value instead of the source base. For example, the first column shows \"25 -> Binary\" but it should say \"Decimal -> Binary\". Other columns have the same pattern. Button labels should use base names (Decimal, Binary, Octal, Hexadecimal) while the example values in the columns below stay as they are.\n\n2. The exchange/swap button between FROM BASE and TO BASE does not work. It should swap the selected source and target bases when clicked.\n\nFix:\n- Change button labels from \"{value} -> {target}\" to \"{source base} -> {target base}\"\n- Fix the swap button handler to actually interchange the fromBase and toBase values","labels":["bug"]}'
