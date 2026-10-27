# 가오슝 3박 4일

두 사람의 가오슝 3박 4일 여행 일정 앱입니다. 숙소는 메이리다오역 옆 후 하우스이고, 해산물과 야시장을 중심으로 다닙니다.

사이트: https://cafephilia.github.io/kaohsiung-trip/
숙소·항공 후보 비교 페이지(예약 전 자료): https://cafephilia.github.io/kaohsiung-trip/candidates.html

## 일정

| 날짜 | 주제 | 주요 일정 |
|---|---|---|
| 1일차 12/10 목 | 도착, 메이리다오와 류허 야시장 | 김포 11:00 제주항공 → 가오슝 13:15 → MRT로 숙소 → 빛의 돔 → 라오장 홍차우유 → 아이허 노을·미가오 → 류허 야시장 해산물 |
| 2일차 12/11 금 | 용호탑, 치진 해산물, 영국영사관 노을, 보얼 | 첸진 루러우판 → 롄츠탄 용호탑 → 구산–치진 페리 → 치허우 등대 → 치진 해산물 점심 → 바다의 빙수 → 영국영사관 노을 → 보얼·다강교 → 자오밍 해산 저녁 |
| 3일차 12/12 토 | 컨딩 일일 버스투어 | 싱룽쥐 탕바오 → 08:10 메이리다오역 6번 출구 집합 → 해양생물박물관 → 사다오 조개해변 → 어롼비 등대 → 룽판 공원 → 19:00 메이리다오 → 류허 야시장 2차 |
| 4일차 12/13 일 | 귀국 | 싱룽쥐 아침 → 싼펑궁 → 체크아웃 → MRT로 공항 → 트리니티 TW652 14:05 → 김포 17:55 |

후기가 많은 컨딩 단체투어가 월·목·토만 운행해서 토요일(3일차)에 투어를 탑니다. 같은 코스의 오늘두여행(한국어 가이드, 4명이면 확정)과 路特旅行(후기 가장 많음, 한국어 15명 미만이면 영어)을 비교해 두었고, 인원 미달로 취소되면 프라이빗 차량으로 바꿉니다.

## 기능

- **날짜별 타임라인**: 일정 종류별 아이콘, 여행 당일에는 지금 할 일 표시
- **장소 상세**: 관광지 사진, 영업시간, 휴무일, 메뉴와 가격, 대안 장소, 구글 지도 링크
- **이동 방법 비교**: 도보·MRT·경전철·페리·택시별 경로, 출구, 소요 시간, 요금
- **동선 지도**: 날짜마다 일정 순서대로 번호를 찍은 지도(OpenStreetMap)와 구글 지도 길찾기 버튼. MRT 레드·오렌지라인, 경전철, 페리를 노선 색으로 표시
- **맛집 탭**: 해산물집 8곳을 포함한 가오슝 맛집 20곳(미쉐린 5곳, 한국인 추천 표시)을 종류·지역별로 걸러 보기, 가게마다 대표 음식 사진
- **메뉴판**: 맛집 20곳의 한국어 메뉴 이름, 주문할 때 보여줄 번체 중국어, NT$ 가격, 추천 메뉴, 주문 팁. 일정 카드와 맛집 카드의 '메뉴판' 버튼으로 열고, 해산물 시가(1근 600g·1냥 37.5g) 계산법도 함께 표시
- **야시장 탭 (특별 코너)**: 류허·루이펑·옌청푸 야시장의 영업일과 가는 길, 꼭 먹어 볼 음식 24가지(13가지는 사진), 주문할 때 쓰는 중국어 표현, 가격 시비를 피하는 팁
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
  data/menus.json     맛집 20곳 메뉴판 (한국어 이름, 번체 중국어, NT$ 가격)
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

사진은 모두 위키미디어 커먼즈의 자유 라이선스 사진을 960px로 줄여 `public/photos`에 넣었습니다. 음식 사진은 대부분 해당 가게가 아닌 곳에서 찍은 예시이고, 앱에도 "예시"라고 표시했습니다.

### 관광지·교통

| 사진 | 작가 | 라이선스 | 원본 |
|---|---|---|---|
| 가오슝 공항 국제선 (2010) | 龍本 | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) | [Commons](https://commons.wikimedia.org/wiki/File:%E9%AB%98%E9%9B%84%E5%9C%8B%E9%9A%9B%E6%A9%9F%E5%A0%B4.JPG) |
| 가오슝 MRT | chia ying Yang | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:Kaohsiung_MRT_Train.jpg) |
| 메이리다오역 빛의 돔 | allanlau2000 | [CC0](https://creativecommons.org/publicdomain/zero/1.0/) | [Commons](https://commons.wikimedia.org/wiki/File:Dome_of_Light_at_Formosa_Boulevard_Station.jpg) |
| 아이허 | Graphium | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) | [Commons](https://commons.wikimedia.org/wiki/File:Love_River_(%E7%88%B1%E6%B2%B3),_Kaohsiung,_Taiwan.jpg) |
| 롄츠탄 춘추각 | Zairon | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Kaohsiung_Lotus_Pond_Fr%C3%BChling-_&_Herbst-Pavillon_04.jpg) |
| 구산–치진 페리 | Jonashtand | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:202001_Views_from_ferry_from_Gushan_to_Cijin,_Kaohsiung_20.jpg) |
| 치허우 등대 | 大頭家族 | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:Kaohsiung_Lighthouse_with_clear_skies.jpg) |
| 치진 해산물 가게 (2005) | Changlc | [퍼블릭 도메인](https://commons.wikimedia.org/wiki/Template:PD-self) | [Commons](https://commons.wikimedia.org/wiki/File:Seafood_chijin.jpg) |
| 치진 무지개 교회 | fullfen666 | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:%E3%80%90%E9%AB%98%E9%9B%84%E6%99%AF%E9%BB%9E%E3%80%91%E6%97%97%E6%B4%A5%E5%BD%A9%E8%99%B9%E6%95%99%E5%A0%82_(30663971394).jpg) |
| 옛 영국영사관 | Chainwit. | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Former_British_Consul%27s_Residence_at_Takow,_Former_British_Consulate_at_Takow_-_Kaohsiung_(2026)_-_img_01.jpg) |
| 가오슝 경전철 | Takeshi Aida | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:Kaohsiung_Light_Rail_20190108.jpg) |
| 보얼 예술특구 | Jonashtand | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:202407_Penglai_warehouses,_Pier-2_Art_Center,_Kaohsiung.jpg) |
| 국립 해양생물박물관 | lienyuan lee | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) | [Commons](https://commons.wikimedia.org/wiki/File:NMMBA_Pacific_Dabbling_Plaza_20130201b.jpg) |
| 사다오 해변 | Tbatb | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Scene_at_Shadao,_Pingtung_04.jpg) |
| 어롼비 등대 | Suicasmo | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Eluanbi_Lighthouse_20240918-3.jpg) |
| 룽판 공원 | WEI, WAN-CHEN | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Longpan_Park%EF%BC%88WEI,_WAN-CHEN%EF%BC%89%EF%BC%8D%E9%BE%8D%E7%A3%90%E5%85%AC%E5%9C%92.jpg) |
| 싼펑궁 | Chainwit. | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Kaohsiung_-_Sunfong_Temple_%E4%B8%89%E9%B3%B3%E5%AE%AE_(2026)_-_img_44.jpg) |
| 안핑 (타이난) | Mk2010 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Anping_Small_Fort,_Anping_District,_Tainan_City_(Taiwan).jpg) |
| 가오슝 뮤직센터 | Suicasmo | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Kaohsiung_Music_Center_20240919-1.jpg) |

### 야시장

| 사진 | 작가 | 라이선스 | 원본 |
|---|---|---|---|
| 류허 야시장 | Chainwit. | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Kaohsiung-_Liuhe_Night_Market_-_%E5%85%AD%E5%90%88%E5%A4%9C%E5%B8%82_(2026)_-_img_01.jpg) |
| 루이펑 야시장 | Bahnfrend | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Ruifeng_Night_Market,_2026_(03).jpg) |
| 대장포소장 (류허 야시장 노점) | KAICHEN | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Sheng_Yi_Taiwanese_sausage_with_sticky_rice.jpg) |
| 지파이 (루이펑 야시장) | Bahnfrend | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Deep_fried_chicken_breast,_Angel_Chicken_Cutlet_Ruifeng_Store,_2026_(01).jpg) |
| 파파야우유 (류허 야시장) | Jonashtand | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:202001_A_cup_of_papaya_milk_bought_at_Liouho_Night_Market,_Kaohsiung.jpg) |

### 음식 예시 (다른 가게에서 찍은 사진)

| 사진 | 작가 | 라이선스 | 원본 |
|---|---|---|---|
| 해산물죽 (가오슝 자창 야시장) | bryan... from Taipei | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:Food_%E6%BB%B7%E8%82%89%E9%A3%AF,_%E6%B5%B7%E9%AE%AE%E7%B2%A5,_%E6%B5%B7%E7%94%A2%E7%B2%A5,_%E7%85%8E%E9%AD%9A%E8%82%9A,_%E7%85%8E%E9%AD%9A%E8%85%B8,_%E8%82%89%E7%87%A5%E6%B2%B9%E6%A2%9D,_%E6%BB%B7%E6%B2%B9%E8%B1%86%E8%85%90,_%E6%BB%B7%E4%B8%B8,_%E9%A6%99%E8%85%B8,_%E8%8D%B7%E5%8C%85%E8%9B%8B,_%E5%8D%97%E6%98%8E%E8%82%89%E7%87%A5%E9%A3%AF,_%E8%87%AA%E5%BC%B7%E5%A4%9C%E5%B8%82,_%E9%AB%98%E9%9B%84_(15749506952).jpg) |
| 장어 이몐 | TACO Huang | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:Thick_Soup_Noodles_with_Eel_-_%E9%B1%94%E9%AD%9A%E6%84%8F%E9%BA%B5_(4596353688).jpg) |
| 오징어 구이 (타이베이) | Jirka Matousek | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:Close-up_view_of_grilled_neritic_squid_in_Taipei_after_New_Year%27s_Eve_2015.jpg) |
| 숭어알 (신주) | Chien Chih-Hung / 總統府 | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:Bottarga_in_Taiwan_2023-01-05.jpg) |
| 새우찜 | Tianmu peter | [CC BY 3.0](https://creativecommons.org/licenses/by/3.0) | [Commons](https://commons.wikimedia.org/wiki/File:%E8%92%B8%E7%9A%84%E9%B9%BD%E6%B0%B4%E8%9D%A6%5E%E5%BE%88%E5%A5%BD%E5%90%83_-_panoramio.jpg) |
| 굴전 (스린 야시장) | Morgan Calliope | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:Oyster_omelette_in_Shilin_Night_Market.jpg) |
| 고구마볼 (타이베이) | Ianbu | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:%E5%9C%B0%E7%93%9C%E7%90%83.jpg) |
| 또우화 | Outlookxp | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:%E8%8A%B1%E7%94%9F%E8%B1%86%E8%8A%B1.jpeg) |
| 취두부 (잉거) | Meng Weng Wong | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:Close-up_of_Taiwanese_stinky_tofu_in_Yingge,_New_Taipei.jpg) |
| 찹쌀떡 | Yuriy kosygin | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Taiwanese_Mochi.jpg) |
| 게찜 | Lilblackdog29 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Steamed_crabs.jpg) |
| 바지락 볶음 (타이베이) | bryan... from Taipei | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:Food_%E7%82%92%E6%B5%B7%E7%93%9C%E5%AD%90,_%E8%83%96%E5%AD%90%E5%B0%8F%E5%90%83,_%E5%85%AB%E5%BE%B7%E5%BA%97,_%E5%8F%B0%E5%8C%97_(21330222508).jpg) |
| 어묵탕 (타이베이) | bryan... from Taipei | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:Food_%E4%B9%BE%E9%BA%B5,_%E9%A4%9B%E9%A3%A9%E6%B9%AF,_%E9%AD%9A%E4%B8%B8%E6%B9%AF,_%E8%87%98%E8%85%B8,_%E7%87%92%E8%82%89,_%E6%84%8F%E9%BA%B5%E7%8E%8B,_%E5%8F%B0%E5%8C%97_(15565441103).jpg) |
| 우육면 (스린 야시장) | Jpatokal | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | [Commons](https://commons.wikimedia.org/wiki/File:Food_BeefNoodleSoup.JPG) |
| 오리고기 (타이베이) | bryan... from Taipei | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:Food_%E7%95%B6%E6%AD%B8%E9%B4%A8%E8%85%BF%E9%BA%B5%E7%B7%9A,_%E7%B4%B9%E8%88%88%E9%86%89%E9%B4%A8,_%E9%B4%A8%E8%82%89%E9%A3%AF,_%E5%9B%9B%E8%99%9F%E4%B9%BE%E9%BA%B5,_%E5%9C%9F%E5%BA%AB%E7%95%B6%E6%AD%B8%E9%B4%A8,_%E5%8F%B0%E5%8C%97_(23375244874).jpg) |
| 통찹쌀밥 (타이베이) | bryan... from Taipei | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:%E7%AD%92%E4%BB%94%E7%B1%B3%E7%B3%95,_%E4%BD%95%E5%AE%B6%E6%8E%92%E9%AA%A8%E9%85%A5,_%E5%8F%B0%E5%8C%97_(14330790184).jpg) |
| 딸기 빙수 | Hadge | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) | [Commons](https://commons.wikimedia.org/wiki/File:Bing_guan_cau_mei.jpg) |
| 망고 빙수 | Cloudyskye | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) | [Commons](https://commons.wikimedia.org/wiki/File:Mango_shaved_ice.jpg) |
| 두유·사오빙 아침 (타이베이) | Yun Huang Yong | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:Taipei_breakfast_with_fresh_soymilk_20071023.jpg) |
| 소고기 샤브샤브 (타이베이) | bryan... from Taipei | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) | [Commons](https://commons.wikimedia.org/wiki/File:Food_%E7%8F%BE%E5%AE%B0%E7%89%9B%E8%82%89%E7%89%87,_%E7%89%9B%E7%B8%BD%E6%B6%AE%E7%89%9B%E8%82%89,_%E5%8F%B0%E5%8C%97_(14205531644).jpg) |
| 루러우판 | Hadge | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) | [Commons](https://commons.wikimedia.org/wiki/File:Luroufan.JPG) |
