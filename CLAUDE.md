# BitFolio

암호화폐 포트폴리오 트래커 앱. 시세 조회, 포트폴리오 관리, 뉴스 피드를 제공한다.

## 기술 스택

- **Framework**: Expo (React Native) + TypeScript
- **전역 상태 관리**: Redux Toolkit
- **스타일링**: styled-components v6
- **API**: CoinGecko, CryptoCompare
- **인증**: Firebase Auth
- **린터**: ESLint (airbnb + react-native/all + @typescript-eslint)

## 경로 alias

`/` 가 `src/` 를 가리킨다.

```
/hooks/...       → src/hooks/
/components/...  → src/components/
/screens/...     → src/screens/
/store/...       → src/store/
/lib/...         → src/lib/
/types/...       → src/types/
```
