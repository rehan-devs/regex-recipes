import { ExplanationToken } from '../types';

export function explainPattern(pattern: string): ExplanationToken[] {
  if (!pattern) return [];

  const tokens: ExplanationToken[] = [];
  let pos = 0;

  try {
    while (pos < pattern.length) {
      const start = pos;
      const char = pattern[pos];

      if (char === '\\') {
        if (pos + 1 >= pattern.length) {
          tokens.push({ token: '\\', explanation: 'Escape character', startIndex: start, endIndex: start + 1 });
          pos++;
          continue;
        }
        const next = pattern[pos + 1];
        const map: Record<string, string> = {
          d: 'Any digit (0-9)',
          D: 'Any non-digit character',
          w: 'Any word character (letter, digit, underscore)',
          W: 'Any non-word character',
          s: 'Any whitespace (space, tab, newline)',
          S: 'Any non-whitespace character',
          b: 'Word boundary',
          B: 'Non-word boundary',
          n: 'Newline character',
          t: 'Tab character',
          r: 'Carriage return',
        };
        const special = '.\\/()[]{}+*?|^$-';
        if (map[next]) {
          tokens.push({ token: `\\${next}`, explanation: map[next], startIndex: start, endIndex: start + 2 });
        } else if (special.includes(next)) {
          tokens.push({ token: `\\${next}`, explanation: `Literal "${next}"`, startIndex: start, endIndex: start + 2 });
        } else {
          tokens.push({ token: `\\${next}`, explanation: `Escaped "${next}"`, startIndex: start, endIndex: start + 2 });
        }
        pos += 2;
        continue;
      }

      if (char === '[') {
        let end = pos + 1;
        if (end < pattern.length && pattern[end] === '^') end++;
        if (end < pattern.length && pattern[end] === ']') end++;
        while (end < pattern.length && pattern[end] !== ']') {
          if (pattern[end] === '\\' && end + 1 < pattern.length) end++;
          end++;
        }
        if (end < pattern.length) end++;
        const token = pattern.slice(start, end);
        const isNegated = token.length > 1 && token[1] === '^';
        const inner = isNegated ? token.slice(2, -1) : token.slice(1, -1);
        const explanation = isNegated
          ? `Any character NOT in: ${inner}`
          : `Any character in: ${inner}`;
        tokens.push({ token, explanation, startIndex: start, endIndex: end });
        pos = end;
        continue;
      }

      if (char === '(') {
        let groupType = 'Capture group';
        let end = pos + 1;

        if (pos + 1 < pattern.length && pattern[pos + 1] === '?') {
          if (pos + 2 < pattern.length) {
            const c2 = pattern[pos + 2];
            if (c2 === ':') { groupType = 'Non-capturing group'; end = pos + 3; }
            else if (c2 === '=') { groupType = 'Positive lookahead'; end = pos + 3; }
            else if (c2 === '!') { groupType = 'Negative lookahead'; end = pos + 3; }
            else if (c2 === '<' && pos + 3 < pattern.length) {
              if (pattern[pos + 3] === '=') { groupType = 'Positive lookbehind'; end = pos + 4; }
              else if (pattern[pos + 3] === '!') { groupType = 'Negative lookbehind'; end = pos + 4; }
              else {
                const nameEnd = pattern.indexOf('>', pos + 3);
                if (nameEnd > -1) {
                  groupType = `Named group "${pattern.slice(pos + 3, nameEnd)}"`;
                  end = nameEnd + 1;
                } else { end = pos + 3; }
              }
            } else { end = pos + 2; }
          } else { end = pos + 2; }
        }

        const opening = pattern.slice(start, end);
        tokens.push({ token: opening, explanation: `${groupType} start`, startIndex: start, endIndex: end });
        pos = end;
        continue;
      }

      if (char === ')') {
        tokens.push({ token: ')', explanation: 'Group end', startIndex: start, endIndex: start + 1 });
        pos++;
        continue;
      }

      if (char === '{') {
        let end = pos + 1;
        while (end < pattern.length && pattern[end] !== '}') end++;
        if (end < pattern.length) end++;
        const token = pattern.slice(start, end);
        const inner = token.slice(1, -1);
        let explanation: string;
        if (inner.includes(',')) {
          const parts = inner.split(',');
          if (!parts[1] || parts[1].trim() === '') {
            explanation = `${parts[0]} or more of the previous`;
          } else {
            explanation = `Between ${parts[0]} and ${parts[1]} of the previous`;
          }
        } else {
          explanation = `Exactly ${inner} of the previous`;
        }
        tokens.push({ token, explanation, startIndex: start, endIndex: end });
        pos = end;
        continue;
      }

      if (char === '*') {
        if (pos + 1 < pattern.length && pattern[pos + 1] === '?') {
          tokens.push({ token: '*?', explanation: 'Zero or more (lazy)', startIndex: start, endIndex: start + 2 });
          pos += 2;
        } else {
          tokens.push({ token: '*', explanation: 'Zero or more of the previous', startIndex: start, endIndex: start + 1 });
          pos++;
        }
        continue;
      }

      if (char === '+') {
        if (pos + 1 < pattern.length && pattern[pos + 1] === '?') {
          tokens.push({ token: '+?', explanation: 'One or more (lazy)', startIndex: start, endIndex: start + 2 });
          pos += 2;
        } else {
          tokens.push({ token: '+', explanation: 'One or more of the previous', startIndex: start, endIndex: start + 1 });
          pos++;
        }
        continue;
      }

      if (char === '?') {
        if (pos + 1 < pattern.length && pattern[pos + 1] === '?') {
          tokens.push({ token: '??', explanation: 'Zero or one (lazy)', startIndex: start, endIndex: start + 2 });
          pos += 2;
        } else {
          tokens.push({ token: '?', explanation: 'Optional (zero or one)', startIndex: start, endIndex: start + 1 });
          pos++;
        }
        continue;
      }

      const simpleMap: Record<string, string> = {
        '.': 'Any character (except newline)',
        '^': 'Start of string',
        '$': 'End of string',
        '|': 'OR (alternation)',
      };

      if (simpleMap[char]) {
        tokens.push({ token: char, explanation: simpleMap[char], startIndex: start, endIndex: start + 1 });
        pos++;
        continue;
      }

      // Literal characters - collect consecutive
      let end = pos;
      while (end < pattern.length && !'\\[](){}*+?.|^$'.includes(pattern[end])) {
        end++;
      }
      const literal = pattern.slice(start, end);
      tokens.push({
        token: literal,
        explanation: literal.length === 1 ? `Literal "${literal}"` : `Literal text "${literal}"`,
        startIndex: start,
        endIndex: end,
      });
      pos = end;
    }
  } catch {
    // Return whatever we have so far
  }

  return tokens;
}