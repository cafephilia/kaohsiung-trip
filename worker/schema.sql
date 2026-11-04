-- 가오슝 여행 앱 데이터. 표마다 JSON 한 덩어리를 담고, 사진은 { "$photo": 키 }로 photos 표를 가리킨다
DROP TABLE IF EXISTS docs;
DROP TABLE IF EXISTS days;
DROP TABLE IF EXISTS spots;
DROP TABLE IF EXISTS menus;
DROP TABLE IF EXISTS photos;

-- 숙소·항공·야시장·쇼핑처럼 한 덩어리로 쓰는 데이터
CREATE TABLE docs (
  key TEXT PRIMARY KEY,
  data TEXT NOT NULL
);

-- 날짜별 일정
CREATE TABLE days (
  id TEXT PRIMARY KEY,
  sort INTEGER NOT NULL,
  data TEXT NOT NULL
);

-- 맛집 목록 (sort 순서대로 보여준다)
CREATE TABLE spots (
  id TEXT PRIMARY KEY,
  sort INTEGER NOT NULL,
  data TEXT NOT NULL
);

-- 가게별 메뉴판. id는 spots.id와 같다
CREATE TABLE menus (
  id TEXT PRIMARY KEY,
  data TEXT NOT NULL
);

-- 사진 정보. 파일은 R2 버킷에 file 이름으로 있다
CREATE TABLE photos (
  key TEXT PRIMARY KEY,
  file TEXT NOT NULL,
  author TEXT NOT NULL,
  license TEXT NOT NULL,
  license_url TEXT NOT NULL,
  source TEXT NOT NULL,
  example TEXT
);
