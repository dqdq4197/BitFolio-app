const BASE = '가'.charCodeAt(0); // 한글 코드 시작: 44032
const INITIALS = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];
const MEDIALS = [
  'ㅏ',
  'ㅐ',
  'ㅑ',
  'ㅒ',
  'ㅓ',
  'ㅔ',
  'ㅕ',
  'ㅖ',
  'ㅗ',
  'ㅘ',
  'ㅙ',
  'ㅚ',
  'ㅛ',
  'ㅜ',
  'ㅝ',
  'ㅞ',
  'ㅟ',
  'ㅠ',
  'ㅡ',
  'ㅢ',
  'ㅣ',
];
const FINALES = [
  '',
  'ㄱ',
  'ㄲ',
  'ㄳ',
  'ㄴ',
  'ㄵ',
  'ㄶ',
  'ㄷ',
  'ㄹ',
  'ㄺ',
  'ㄻ',
  'ㄼ',
  'ㄽ',
  'ㄾ',
  'ㄿ',
  'ㅀ',
  'ㅁ',
  'ㅂ',
  'ㅄ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];
export const MIXED: Record<string, string[]> = {
  ㄲ: ['ㄱ', 'ㄱ'],
  ㄳ: ['ㄱ', 'ㅅ'],
  ㄵ: ['ㄴ', 'ㅈ'],
  ㄶ: ['ㄴ', 'ㅎ'],
  ㄺ: ['ㄹ', 'ㄱ'],
  ㄻ: ['ㄹ', 'ㅁ'],
  ㄼ: ['ㄹ', 'ㅂ'],
  ㄽ: ['ㄹ', 'ㅅ'],
  ㄾ: ['ㄹ', 'ㅌ'],
  ㄿ: ['ㄹ', 'ㅍ'],
  ㅀ: ['ㄹ', 'ㅎ'],
  ㅄ: ['ㅂ', 'ㅅ'],
  ㅆ: ['ㅅ', 'ㅅ'],
  ㅘ: ['ㅗ', 'ㅏ'],
  ㅙ: ['ㅗ', 'ㅐ'],
  ㅚ: ['ㅗ', 'ㅣ'],
  ㅝ: ['ㅜ', 'ㅓ'],
  ㅞ: ['ㅜ', 'ㅔ'],
  ㅟ: ['ㅜ', 'ㅣ'],
  ㅢ: ['ㅡ', 'ㅣ'],
};
export const MEDIAL_RANGE: Record<string, string[]> = {
  ㅗ: ['ㅗ', 'ㅚ'],
  ㅜ: ['ㅜ', 'ㅟ'],
  ㅡ: ['ㅡ', 'ㅢ'],
};

const FUZZY = `__${parseInt('fuzzy', 36)}__`;
const IGNORE_SPACE = `__${parseInt('ignorespace', 36)}__`;

const getInitialSearchRegExp = (initial: string) => {
  const initialOffset = INITIALS.indexOf(initial);
  if (initialOffset !== -1) {
    const baseCode = initialOffset * MEDIALS.length * FINALES.length + BASE;
    return `[${String.fromCharCode(baseCode)}-${String.fromCharCode(
      baseCode + MEDIALS.length * FINALES.length - 1
    )}]`;
  }
  return initial;
};

function getPhonemes(char: string) {
  let initial = '';
  let medial = '';
  let finale = '';
  let initialOffset = -1;
  let medialOffset = -1;
  let finaleOffset = -1;
  if (char.match(/[ㄱ-ㅎ]/)) {
    initial = char;
    initialOffset = INITIALS.join('').search(char);
  } else if (char.match(/[가-힣]/)) {
    const tmp = char.charCodeAt(0) - BASE;
    finaleOffset = tmp % FINALES.length;
    medialOffset = ((tmp - finaleOffset) / FINALES.length) % MEDIALS.length;
    initialOffset =
      ((tmp - finaleOffset) / FINALES.length - medialOffset) / MEDIALS.length;
    initial = INITIALS[initialOffset];
    medial = MEDIALS[medialOffset];
    finale = FINALES[finaleOffset];
  }
  return { initial, medial, finale, initialOffset, medialOffset, finaleOffset };
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

type MatcherProps = {
  fuzzy?: boolean;
  ignoreSpace?: boolean;
};

export default function createFuzzyMatcher(
  search: string,
  { fuzzy = false, ignoreSpace = true }: MatcherProps
) {
  let frontChars = search.split('');
  const lastChar = frontChars.slice(-1)[0];
  let lastCharPattern = '';

  const phonemes = getPhonemes(lastChar || '');

  // 마지막 글자가 한글인 경우만 수행
  if (phonemes.initialOffset !== -1) {
    frontChars = frontChars.slice(0, -1);
    const { initial, medial, finale, initialOffset, medialOffset } = phonemes;

    // 해당 초성으로 시작하는 첫번째 문자 : 가, 나, 다, ... , 하
    const baseCode = initialOffset * MEDIALS.length * FINALES.length + BASE;

    const patterns = [];
    switch (true) {
      // case 1: 종성으로 끝나는 경우 (받침이 있는 경우)
      case finale !== '': {
        // 마지막 글자
        patterns.push(lastChar);
        // 종성이 초성으로 사용 가능한 경우
        if (INITIALS.includes(finale)) {
          patterns.push(
            `${String.fromCharCode(
              baseCode + medialOffset * FINALES.length
            )}${getInitialSearchRegExp(finale)}`
          );
        }
        // 종성이 복합 자음인 경우, 두 개의 자음으로 분리하여 각각 받침과 초성으로 사용
        if (MIXED[finale]) {
          patterns.push(
            `${String.fromCharCode(
              baseCode +
              medialOffset * FINALES.length +
              FINALES.join('').search(MIXED[finale][0]) +
              1
            )}${getInitialSearchRegExp(MIXED[finale][1])}`
          );
        }
        break;
      }

      // case 2: 중성으로 끝나는 경우 (받침이 없는 경우)
      case medial !== '': {
        let from: number;
        let to: number;
        // 중성이 복합 모음인 경우 범위를 확장하여 적용
        if (MEDIAL_RANGE[medial]) {
          from =
            baseCode +
            MEDIALS.join('').search(MEDIAL_RANGE[medial][0]) * FINALES.length;
          to =
            baseCode +
            MEDIALS.join('').search(MEDIAL_RANGE[medial][1]) * FINALES.length +
            FINALES.length -
            1;
        } else {
          from = baseCode + medialOffset * FINALES.length;
          to = from + FINALES.length - 1;
        }
        patterns.push(
          `[${String.fromCharCode(from)}-${String.fromCharCode(to)}]`
        );
        break;
      }

      // case 3: 초성만 입력된 경우
      case initial !== '': {
        patterns.push(getInitialSearchRegExp(initial));
        break;
      }

      default:
        break;
    }

    lastCharPattern =
      patterns.length > 1 ? `(${patterns.join('|')})` : patterns[0];
  }

  // eslint-disable-next-line no-nested-ternary
  const glue = fuzzy ? FUZZY : ignoreSpace ? IGNORE_SPACE : '';
  const frontCharsPattern = frontChars
    .map(char =>
      char.search(/[ㄱ-ㅎ]/) !== -1
        ? getInitialSearchRegExp(char)
        : escapeRegExp(char)
    )
    .join(glue);
  let pattern = frontCharsPattern + glue + lastCharPattern;

  if (glue) {
    pattern = pattern
      .replace(RegExp(FUZZY, 'g'), '\.*')
      .replace(RegExp(IGNORE_SPACE, 'g'), '\\s*');
  }
  return RegExp(pattern, 'gi');
};
