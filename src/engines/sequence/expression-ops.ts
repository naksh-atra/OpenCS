export interface ExpressionStep {
  action: 'push' | 'pop' | 'output' | 'compare';
  token: string;
  stackSnapshot: string[];
  outputSnapshot: string;
  precedence: { current: number; top: number } | null;
  message: string;
}

export interface ExpressionState {
  input: string;
  output: string;
  stack: string[];
  steps: ExpressionStep[];
  currentStep: number;
  highlightStackIndex: number | null;
  message: string;
}

export function createExpressionState(expression: string = ''): ExpressionState {
  return {
    input: expression,
    output: '',
    stack: [],
    steps: [],
    currentStep: -1,
    highlightStackIndex: null,
    message: 'Enter an expression to convert',
  };
}

export function getPrecedence(op: string): number {
  switch (op) {
    case '+':
    case '-': return 1;
    case '*':
    case '/': return 2;
    case '^': return 3;
    default: return 0;
  }
}

export function isOperator(token: string): boolean {
  return ['+', '-', '*', '/', '^'].includes(token);
}

export function isOperand(token: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(token);
}

export function isLeftAssociative(op: string): boolean {
  return op !== '^';
}

export function tokenize(expression: string): string[] {
  const tokens: string[] = [];
  let current = '';
  for (const ch of expression.replace(/\s/g, '')) {
    if (isOperator(ch) || ch === '(' || ch === ')') {
      if (current) { tokens.push(current); current = ''; }
      tokens.push(ch);
    } else {
      current += ch;
    }
  }
  if (current) tokens.push(current);
  return tokens;
}

export function infixToPostfix(expression: string): { result: string; steps: ExpressionStep[] } {
  const tokens = tokenize(expression);
  const steps: ExpressionStep[] = [];
  const output: string[] = [];
  const stack: string[] = [];

  steps.push({
    action: 'compare',
    token: '',
    stackSnapshot: [...stack],
    outputSnapshot: output.join(' '),
    precedence: null,
    message: `Starting conversion of: ${expression}`,
  });

  for (const token of tokens) {
    if (isOperand(token)) {
      output.push(token);
      steps.push({
        action: 'output',
        token,
        stackSnapshot: [...stack],
        outputSnapshot: output.join(' '),
        precedence: null,
        message: `Operand ${token} → output`,
      });
    } else if (token === '(') {
      stack.push(token);
      steps.push({
        action: 'push',
        token,
        stackSnapshot: [...stack],
        outputSnapshot: output.join(' '),
        precedence: null,
        message: `Left parenthesis → push to stack`,
      });
    } else if (token === ')') {
      while (stack.length > 0 && stack[stack.length - 1] !== '(') {
        output.push(stack.pop()!);
      }
      if (stack.length > 0) stack.pop(); // Remove '('
      steps.push({
        action: 'pop',
        token,
        stackSnapshot: [...stack],
        outputSnapshot: output.join(' '),
        precedence: null,
        message: `Right parenthesis → pop until '('`,
      });
    } else if (isOperator(token)) {
      const currentPrec = getPrecedence(token);
      while (
        stack.length > 0 &&
        stack[stack.length - 1] !== '(' &&
        (getPrecedence(stack[stack.length - 1]) > currentPrec ||
          (getPrecedence(stack[stack.length - 1]) === currentPrec && isLeftAssociative(token)))
      ) {
        output.push(stack.pop()!);
      }
      stack.push(token);
      steps.push({
        action: 'push',
        token,
        stackSnapshot: [...stack],
        outputSnapshot: output.join(' '),
        precedence: { current: currentPrec, top: stack.length > 1 ? getPrecedence(stack[stack.length - 2]) : 0 },
        message: `Operator ${token} (prec ${currentPrec}) → push to stack`,
      });
    }
  }

  while (stack.length > 0) {
    output.push(stack.pop()!);
  }

  steps.push({
    action: 'compare',
    token: '',
    stackSnapshot: [...stack],
    outputSnapshot: output.join(' '),
    precedence: null,
    message: `Done — pop all remaining operators`,
  });

  return { result: output.join(' '), steps };
}

export function stepForward(state: ExpressionState): ExpressionState {
  if (state.currentStep >= state.steps.length - 1) {
    return { ...state, message: 'Already at final step' };
  }

  const nextStep = state.currentStep + 1;
  const step = state.steps[nextStep];

  return {
    ...state,
    currentStep: nextStep,
    stack: step.stackSnapshot,
    output: step.outputSnapshot,
    highlightStackIndex: step.stackSnapshot.length > 0 ? step.stackSnapshot.length - 1 : null,
    message: step.message,
  };
}

export function runFullConversion(expression: string): ExpressionState {
  const { result, steps } = infixToPostfix(expression);
  return {
    input: expression,
    output: result,
    stack: [],
    steps,
    currentStep: steps.length - 1,
    highlightStackIndex: null,
    message: `${expression} → ${result}`,
  };
}
