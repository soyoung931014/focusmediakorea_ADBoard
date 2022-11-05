# focusmedia_과제

### 1. 사용법
--------


```jsx
# with yarn
# install
$ yarn install

# run & run json-server
$ yarn start
```

### 2. 기술스택
--------
- React
- Typescript
- react-query
- axios
- styled-components
- data-fns
- json-server

### 3. 프로젝트 구조
----
```jsx
📦data
 ┗ 📜db.json
📦src
 ┣ 📂api
 ┃ ┣ 📜adApi.ts
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜userApi.ts
 ┣ 📂components
 ┃ ┣ 📜Advertisement.tsx
 ┃ ┗ 📜QrCode.tsx
 ┣ 📂hooks
 ┃ ┗ 📜useInterval.ts
 ┣ 📂layout
 ┃ ┗ 📜Layout.tsx
 ┣ 📂pages
 ┃ ┣ 📜AdBoard.tsx
 ┃ ┗ 📜InfoRegister.tsx
 ┣ 📂routes
 ┃ ┗ 📜Router.tsx
 ┣ 📂styles
 ┃ ┣ 📜GlobalStyle.ts
 ┃ ┗ 📜theme.ts
 ┣ 📂types
 ┃ ┗ 📜type.ts
 ┣ 📜App.tsx
 ┗ 📜index.tsx
```


### 4. 고민했던 점들

광고 페칭 로직
- 오늘 날짜와 현재 시간(시간의 경우 0-6,6-12,12-18,18-24로 나누어 각각의 시작 시간을 현재 시간에 할당함)을 이용해 데이터를 페칭합니다. 그리고는 각 데이터들의 총 limit을 구합니다. 0<=index<limit까지 useInterval 메소드를 통해 30초 마다 index를 업데이트시켜 데이터(data[index])를 보여줍니다. 

react-query
- 똑같은 광고를 limit까지 계속해서 페칭해야했기 때문에 react-query의 가장 큰 장점인 캐싱 기능을 이용해 서버와의 연동 횟수를 줄여야겠다고 생각했습니다. 

최적화
 -  InfoRegister.tsx에서 useRef를 이용해 input태그의 onChange이벤트 실행 시, 발생하는 불필요한 렌더링을 줄였습니다.
 -  Router.tsx에서 React.lazy와 Suspense를 통해 code-splitting을 적용하였습니다. code-splitting적용은 개발자의 선택에 따라 그 위치를 결정할 수 있는데 사용자 경험에 가장 지장을 덜 받고 번들을 균등하게 분할할 수 있는 영역이라 생각되는 Router에서 진행했습니다.  
 
