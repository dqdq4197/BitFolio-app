interface SegmentedKeyword {
  value: string
  isMatch: boolean
  index: number
}
/**
 * createFuzzyMatcher와 함께 사용 시 fuzzy option과 호환되지 않음.
 */
export function splitKeywordByMatcher(
  regex: RegExp,
  value: string
): SegmentedKeyword[] {
  let regexp = new RegExp(regex)
  let matchedKeyword: RegExpExecArray | null
  let prevIndex = 0

  if (!regexp.global) {
    regexp = RegExp(regexp.source, `${regexp.flags}g`)
  }

  const segmentedKeywords: SegmentedKeyword[] = []

  // eslint-disable-next-line no-cond-assign
  while ((matchedKeyword = regexp.exec(value)) !== null) {
    const keyword = matchedKeyword[0]
    const startIndex = matchedKeyword.index
    const { lastIndex } = regexp

    // regex가 빈 문자열과 매칭될 수 있는 경우 동일한 위치에 갇히지 않도록 수동으로 lastIndex를 늘림.
    if (matchedKeyword.index === lastIndex) {
      regexp.lastIndex += 1
      // eslint-disable-next-line no-continue
      continue
    }

    if (prevIndex !== startIndex) {
      segmentedKeywords.push({
        value: value.substring(prevIndex, startIndex),
        isMatch: false,
        index: prevIndex,
      })
    }
    segmentedKeywords.push({ value: keyword, isMatch: true, index: startIndex })

    prevIndex = lastIndex
  }

  if (prevIndex !== value.length) {
    segmentedKeywords.push({
      value: value.substring(prevIndex, value.length),
      isMatch: false,
      index: prevIndex,
    })
  }

  return segmentedKeywords
}
