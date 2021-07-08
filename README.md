## Stack
    React Native Client
    Typescript
    SWR
    styled-components
    d3
    expo

## Coin Detail Info
------------------------------
    id, symbol, name, description, categories (ex. cryptocurrency) 
    관련 blockchain site정보 제공.
    해당 coin official forum site url
    reddit site url, facebook name, twitter_screen name, git repo url
    high 24h, low 24h, total volume, fully_diluted_valuation, market cap
    price change 24h #percentage & 1h & 7d & 14d & 30d & 60d & 200d & 1y
    community data, developer data
    tickers, trust_score, last traded_at

## 제공할 수 있는 옵션? 

### Markets
--------------------------------
    Coin Rank순 정렬, Market Cap순 정렬, volume순 정렬
    Coin 즐겨 찾기, 즐겨 찾기 보기
    category별로 보기?..
    Coin 검색
    
### icon license 

    https://www.flaticon.com/kr/authors/pixel-perfect   
    스토어에 표기

### news api 목록..
    https://cryptonews-api.com/
    달 10달러 
    or
    cryptocompare 상업적 목적이 아니라면 무료 
    월 10만 call 가능.. 
    category가 매우 적음.. 

### socket api 사용시 
    - cryptocompare
    최대 50명 사용가능.. socket은 하나로 
    사용하게된다면 특정 가격페이지에만 사용 가능할듯

### 배포 전 TODO

    api key 숨기기 => .env 



### portfolio statistics 계산법
    PRICE => 시장 가치, 24시간 가격 변동률
    HOLDINGS => 시장 가치 x 홀딩 갯수, 홀딩 갯수
    순비용 => 매도로 인한 수익의 합계 - 매수로 인한 비용의 합계 -  수수료
    
    24H P/L => 
        price: 시장 가치 + 매도로 인한 수익의 합계 - 매수로 인한 비용의 합계 -  수수료
        percentage: 
    TOTAL P/L =>
    SHARE => (해당 코인 홀딩 가격 / 해당 portfilo 모든 자산) / 100 

    수수료, price per coin의 경우 trade date 설정 값에 따라 과거의 환율로 계산합니다.