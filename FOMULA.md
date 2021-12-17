## transaction추가 시 주의
    price per coin의 경우 가격 고정 버튼을 활성화하지 않으면,
    trade date 설정 값에 따라 과거의 환율로 계산합니다.

## portfolio statistics fomula for calculating
    ※ PRICE => market price per coin (from api data)
    ※ HOLDINGS => 시장 가치 x 홀딩 갯수, 홀딩 갯수
    ※ 순비용 => 매도로 인한 수익의 합계 - 매수로 인한 비용의 합계 -  수수료
    ※ 24H P/L => 
        price: 24시간 이내에 매수 / 매도한 갯수 * PRICE
        percentage: 24H P/L price / (HOLDINGS - 24H P/L price) * 100
    ※ TOTAL P/L
    =>  x = 현재 코인 시장 가치
        y = 매수가격 - 매도 가격 
        n = 매수한 코인 개수 합(buy) - 매도한 코인 개수 합(sell)

        P/L PRICE = nx - y

        - transfer 거래가 있을 경우 

        x = 현재 코인 시장 가치
        y = 들어온 코인 개수 합(transfer in) - 나간 코인 개수 합(transfer out)

        result = P/L PRICE + x * y

    ※ TOTAL COST => 매수한 총 가격
    ※ TOTAL P/L PERCENTAGE => 
        TOTAL P/L / TOTAL COST * 100

    ※ TOTAL BALANCE
    => 소유중인 코인 HOLDING COSTS 총합 

    ※ portfolio each coin allocation 
    =>  x = 해당 코인의 HOLDING COSTS
        y = TOTAL BALANCE of non-negative holding costs

        result = x / y * 100

    total balance 

    ※ 24h price chagne
    => now date - data < 24의 경우 price change 합해주기
    => 나머지는 해당 asset의( change price 24 * 오늘 date로 추가한 transaction이 아닌 것의 quantity)