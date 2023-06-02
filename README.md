# 엘레베이터 광고 대시보드 만들기
----
#### 기능 요구 사항 
- 엘리베이터에 설치된 디스플레이에 광고와 QR 코드를 표시하고, 사용자가 QR 코드를 스캔 후 개인 정보를 등록할 수 있는 두 개의 페이지를 개발해야한다. 

### 0. 고민했던 점들
---

광고 페칭 로직
- 오늘 날짜와 현재 시간(시간의 경우 0-6,6-12,12-18,18-24로 나누어 각각의 시작 시간을 현재 시간에 할당함)을 이용해 데이터를 페칭합니다. 그리고는 각 데이터들의 총 limit을 구합니다. 0<=index<limit까지 useInterval 메소드를 통해 30초 마다 index를 업데이트시켜 데이터(data[index])를 보여줍니다. (30초에서 3초로 변경했습니다)

react-query
- 똑같은 광고를 limit까지 계속해서 페칭해야했기 때문에 react-query의 가장 큰 장점인 캐싱 기능을 이용해 서버와의 연동 횟수를 줄여야겠다고 생각했습니다. 

useInterval
- 처음 일정 시간마다 광고를 렌더링해야했기 때문에 setInterval()을 이용했습니다. 그러나 리렌더링시 무수한 타이머를 만드는 오류를 겪게 되었습니다. 오류를 해결하기 위해 useEffect에서 clearInterval()을 이용해 cleanup함수로 반환해 타이머를 제거해주었지만 무한 루프에 갇히는 문제를 마주하게 되었습니다. 이를 해결하기 위해 useRef를 이용한 커스텀 훅 useInterval을 사용했습니다. 

최적화
 -  InfoRegister.tsx에서 useRef를 이용해 input태그의 onChange이벤트 실행 시, 발생하는 불필요한 렌더링을 줄였습니다.
 -  Router.tsx에서 React.lazy와 Suspense를 통해 code-splitting을 적용하였습니다. code-splitting적용은 개발자의 선택에 따라 그 위치를 결정할 수 있는데 사용자 경험에 가장 지장을 덜 받고 번들을 균등하게 분할할 수 있는 영역이라 생각되는 Router에서 진행했습니다.  

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
### 4. 구현
-----
1) 광고 렌더링 페이지

![ezgif com-video-to-gif (1)](https://user-images.githubusercontent.com/80194405/220049972-01c9427b-fd02-418e-b506-0e35b91ea6c8.gif)

2) 방문 페이지

![ezgif com-video-to-gif (2)](https://user-images.githubusercontent.com/80194405/220052608-918b7669-d819-42a8-b57f-7e8c19ed7b22.gif)

### 5. 기능 요구 사항
-------
> 목표: 엘리베이터에 설치된 디스플레이에 광고와 QR 코드를 표시하고, 사용자가 QR 코드를 스캔 후 개인 정보를 등록할 수 있는 두 개의 페이지를 개발해야한다. 

📝 광고 렌더링 페이지

- 광고 데이터를 수신 후 각 광고를 렌더링하는 컴포넌트이다. 
- 수신하는 광고 데이터에는 다음과 같은 필드가 포함되어 있다고 가정하자. 

```jsx
adInfo = {
	ad_id: AD_001,
	category: GROCERY, DELEVERY,
	announcementDay: 2022-04-01
	startTime: 12:00,
	endTime: 18:00,
	limit: 10
}
```

- 광고가 표시될 때 해당 광고 데이터가 포함된 QR 코드를 함께 렌더링 한다.
- 각 광고 표시 시간은 한 번에 30초이다.
- 10개의 광고를 전달받아 5시간동안 재생할 경우 각 광고의 송출 제한 횟수를 초과하지 않는 선에서 최대한 균등하게 모든 광고가 표시되어야 한다. 

📝 방문 페이지

- QR코드를 스캔했을 때 방문할 수 있는 페이지이다. 
- 사용자가 [전송] 버튼을 클릭하면 QR코드에 포함된 데이터 및 사용자가 입력한 데이터를 서버에 전달한다.

```jsx
data ={
	elevator_id: "ELE_3041",
	ad_id: "AD_001",
	scanTime: "2022-04-20T13:40:000Z",
	name: "홍길동",
	email: "kildong@gmail.com",
	license: "Y" or "N" 
}
```

- qr 코드 스캔 후 5분 내에 데이터를 전송해야 한다. 5분이 지나면 세션이 만료되어 qr코드를 다시 스캔해야 한다.

📝 그 외 요구 사항    

- 컴포넌트/페이지 ui 디자인은 고려하지 않아도 된다. 컴포넌트/페이지가 얼마나 예쁜지는 평가에 반영되지 않는다.
- 백엔드는 구현하지 않아도 된다. 광고 데이터는 모조 데이터를 사용하셔도 좋고 QR코드 스캔 후 백엔드로 전달하는 데이터는 디버그 콘솔에 출려해도 좋다. 다만 백엔드와 상호 작용을 수행하는 인터페이스를 구현해주세요




 
