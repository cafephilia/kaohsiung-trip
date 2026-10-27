# 가오슝 3박 4일

두 사람의 가오슝 3박 4일 여행 일정 앱입니다. 숙소는 메이리다오역 옆 후 하우스이고, 해산물과 야시장을 중심으로 다닙니다.

사이트: https://cafephilia.github.io/kaohsiung-trip/
숙소·항공 후보 비교 페이지(예약 전 자료): https://cafephilia.github.io/kaohsiung-trip/candidates.html

## 일정

| 날짜 | 주제 | 주요 일정 |
|---|---|---|
| 1일차 12/10 목 | 도착, 메이리다오와 류허 야시장 | 김포 11:00 제주항공 → 가오슝 13:15 → MRT로 숙소 → 빛의 돔 → 라오장 홍차우유 → 아이허 노을·미가오 → 류허 야시장 해산물 |
| 2일차 12/11 금 | 컨딩 일일 버스투어 | 싱룽쥐 탕바오 → 07:50 빛의 돔 집합 → 최남단점 → 어롼비 등대 → 컨딩 대가 → 삼림유락구 → 난완 → 다펑만 노을 → 루이펑 야시장 |
| 3일차 12/12 토 | 용호탑, 치진 해산물, 영국영사관 노을, 보얼 | 첸진 루러우판 → 롄츠탄 용호탑 → 구산–치진 페리 → 치허우 등대 → 치진 해산물 점심 → 바다의 빙수 → 영국영사관 노을 → 보얼·다강교 → 자오밍 해산 저녁 |
| 4일차 12/13 일 | 귀국 | 싱룽쥐 아침 → 싼펑궁 → 체크아웃 → MRT로 공항 → 트리니티 TW652 14:05 → 김포 17:55 |

2일차 투어는 아직 예약 전이라 금요일에 출발하는 후보 6개(컨딩 단체·프라이빗, 타이난 3개, 아리산)를 일정 카드에 비교해 두었습니다. 후기가 많은 컨딩 단체 투어는 월·목·토만 운행합니다.

## 기능

- **날짜별 타임라인**: 일정 종류별 아이콘, 여행 당일에는 지금 할 일 표시
- **장소 상세**: 관광지 사진, 영업시간, 휴무일, 메뉴와 가격, 대안 장소, 구글 지도 링크
- **이동 방법 비교**: 도보·MRT·경전철·페리·택시별 경로, 출구, 소요 시간, 요금
- **동선 지도**: 날짜마다 일정 순서대로 번호를 찍은 지도(OpenStreetMap)와 구글 지도 길찾기 버튼. MRT 레드·오렌지라인, 경전철, 페리를 노선 색으로 표시
- **맛집 탭**: 해산물집 8곳을 포함한 가오슝 맛집 20곳(미쉐린 5곳, 한국인 추천 표시)을 종류·지역별로 걸러 보기
- **야시장 탭 (특별 코너)**: 류허·루이펑·옌청푸 야시장의 영업일과 가는 길, 꼭 먹어 볼 음식 24가지, 주문할 때 쓰는 중국어 표현, 가격 시비를 피하는 팁
- **출발 전 챙길 것 · 수하물 규정**: 진행도가 저장되는 짐 목록, 제주항공·트리니티항공 15kg 기준 수하물과 보조배터리 규정, 대만 반입 금지 물품
- **택시용 주소 카드**: 기사에게 보여줄 번체 중국어 목적지를 크게 표시
- **정보 탭**: 항공권, 숙소, 출발 전 할 일, 처음 대만 여행 팁, 유용한 앱, 교통 요금, 걸어서 가는 거리, 행사, 날씨, 긴급 연락처
- **오프라인 지원**: 한 번 열면 일정·사진을 휴대폰에 저장해 인터넷 없이도 열림, 홈 화면에 추가 가능
- **편의 기능**: D-day 표시, 주소 해시로 탭 바로 열기(`#d1`–`#d4`, `#food`, `#night`, `#info`), 다크 모드

## 구조

```
src/
  data/trip.ts        일정, 항공편, 체크리스트, 수하물, 교통 요금, 연락처
  data/common.ts      짐 목록, 처음 대만 여행 팁, 유용한 앱
  data/night.ts       야시장, 야시장 음식, 주문 표현
  data/foodspots.json 맛집 데이터
  data/menus.json     식당 메뉴판 데이터 (준비 중)
  data/photos.ts      관광지 사진과 출처
  types.ts            데이터 타입
  App.vue             상단 요약 카드, 하단 탭 바, 탭 전환
  components/
    DayView.vue       하루 일정 헤더와 타임라인
    DayMap.vue        동선 지도 (Leaflet, 처음 펼칠 때 불러옴)
    TimelineItem.vue  일정 카드 (상세, 지도, 대안, 후보 목록)
    WayList.vue       이동 방법 비교
    FoodView.vue      맛집 탭
    NightView.vue     야시장 탭
    InfoView.vue      정보 탭
    PackSheet.vue     출발 전 챙길 것 창
    BaggageSheet.vue  수하물 규정 창
    TaxiCard.vue      택시용 주소 카드
    MenuSheet.vue     메뉴판 창
```

일정을 고칠 때는 `src/data/trip.ts`만 수정하면 됩니다. 동선 지도에 장소를 넣으려면 일정에 `pos: POS.이름`을 붙이고, 역·선착장 단위 경로는 `path: [WALK, ST.r10, ORANGE, ST.o1, WALK]`처럼 수단과 역을 번갈아 적습니다.

나고야 여행 앱(`nagoya-trip`)의 구조를 바탕으로 만들었습니다.

## 개발

Vue 3 + TypeScript + Vite로 만들었고, Node 20.19 이상이 필요합니다.

```bash
npm install
npm run dev     # 로컬 개발 서버
npm run build   # 타입 검사 + dist 빌드
```

`main`에 push하면 GitHub Actions가 빌드해서 GitHub Pages에 배포합니다.

## 참고

- 정보 확인일은 2026-10-27입니다. 영업시간과 가격은 바뀔 수 있습니다.
- MRT 운임·소요시간은 가오슝 MRT(KRTC) 공식 자료, 명소 시간·요금은 高雄旅遊網(khh.travel), 페리는 高雄市輪船 공식 시간표 기준입니다.
- 택시 요금은 가오슝 운임으로 계산한 추정치입니다.
- 맛집·야시장 가격은 TVBS 食尚玩家, 鏡週刊, 미쉐린 가이드, 한국·대만 블로그를 참고했고, 출처는 맛집 카드에 있습니다.

## 사진 출처

관광지 사진은 위키미디어 커먼즈의 자유 라이선스 사진을 960px로 줄여 `public/photos`에 넣었습니다.

| 장소 | 작가 | 라이선스 | 원본 |
|---|---|---|---|
| 메이리다오역 빛의 돔 | allanlau2000 | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | [Commons](https://commons.wikimedia.org/wiki/File:Dome_of_Light_at_Formosa_Boulevard_Station.jpg) |
| 보얼 예술특구 | Jonashtand | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:202407_Penglai_warehouses,_Pier-2_Art_Center,_Kaohsiung.jpg) |
| 아이허 | Graphium | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) | [Commons](https://commons.wikimedia.org/wiki/File:Love_River_(%E7%88%B1%E6%B2%B3),_Kaohsiung,_Taiwan.jpg) |
| 구산–치진 페리 | Jonashtand | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:202001_Views_from_ferry_from_Gushan_to_Cijin,_Kaohsiung_20.jpg) |
| 옛 영국영사관 | Chainwit. | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Former_British_Consul%27s_Residence_at_Takow,_Former_British_Consulate_at_Takow_-_Kaohsiung_(2026)_-_img_01.jpg) |
| 용호탑 (보수 전) | CEphoto, Uwe Aranas | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) | [Commons](https://commons.wikimedia.org/wiki/File:Kaohsiung_Taiwan_Dragon-and-Tiger-Pagodas-01.jpg) |
| 류허 야시장 | Chainwit. | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Kaohsiung-_Liuhe_Night_Market_-_%E5%85%AD%E5%90%88%E5%A4%9C%E5%B8%82_(2026)_-_img_01.jpg) |
| 어롼비 등대 | Suicasmo | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Eluanbi_Lighthouse_20240918-3.jpg) |
| 안핑 (타이난) | Mk2010 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Anping_Small_Fort,_Anping_District,_Tainan_City_(Taiwan).jpg) |
| 가오슝 뮤직센터 | Suicasmo | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Kaohsiung_Music_Center_20240919-1.jpg) |
| 굴전 (스린 야시장) | Morgan Calliope | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:Oyster_omelette_in_Shilin_Night_Market.jpg) |
| 맛집 · 파파야우유 (류허 야시장) | Jonashtand | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:202001_A_cup_of_papaya_milk_bought_at_Liouho_Night_Market,_Kaohsiung.jpg) |
