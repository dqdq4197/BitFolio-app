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

