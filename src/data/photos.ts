// 위키미디어 커먼즈 사진. 960px로 줄여 public/photos에 저장했고, 원본과 라이선스는 source 링크에서 확인할 수 있다
import type { Photo } from '../types'

const base = import.meta.env.BASE_URL + 'photos/'

const CC0 = { license: 'CC0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/' }
const PD = { license: '퍼블릭 도메인', licenseUrl: 'https://commons.wikimedia.org/wiki/Template:PD-self' }
const BY2 = { license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0' }
const BY3 = { license: 'CC BY 3.0', licenseUrl: 'https://creativecommons.org/licenses/by/3.0' }
const BY4 = { license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0' }
const BYSA2 = { license: 'CC BY-SA 2.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0' }
const BYSA3 = { license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0' }
const BYSA4 = { license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0' }

const commons = (file: string) => 'https://commons.wikimedia.org/wiki/File:' + file

export const PHOTOS = {
  airport: { src: base + 'airport.jpg', author: '龍本', ...BYSA3, source: commons('高雄國際機場.JPG'), example: '2010년에 찍은 국제선 터미널이에요' },
  mrt: { src: base + 'mrt.jpg', author: 'chia ying Yang', ...BY2, source: commons('Kaohsiung_MRT_Train.jpg') },
  dome: { src: base + 'dome.jpg', author: 'allanlau2000', ...CC0, source: commons('Dome_of_Light_at_Formosa_Boulevard_Station.jpg') },
  pier2: { src: base + 'pier2.jpg', author: 'Jonashtand', ...BYSA4, source: commons('202407_Penglai_warehouses,_Pier-2_Art_Center,_Kaohsiung.jpg') },
  loveriver: { src: base + 'loveriver.jpg', author: 'Graphium', ...BYSA3, source: commons('Love_River_(%E7%88%B1%E6%B2%B3),_Kaohsiung,_Taiwan.jpg') },
  cijin: { src: base + 'cijin.jpg', author: 'Jonashtand', ...BYSA4, source: commons('202001_Views_from_ferry_from_Gushan_to_Cijin,_Kaohsiung_20.jpg') },
  lighthouse: { src: base + 'lighthouse.jpg', author: '大頭家族', ...BYSA2, source: commons('Kaohsiung_Lighthouse_with_clear_skies.jpg') },
  cijinseafood: { src: base + 'cijinseafood.jpg', author: 'Changlc', ...PD, source: commons('Seafood_chijin.jpg'), example: '2005년 치진 해산물 가게 진열대 사진이에요' },
  cijinbeach: { src: base + 'cijinbeach.jpg', author: 'fullfen666', ...BYSA2, source: commons('【高雄景點】旗津彩虹教堂_(30663971394).jpg') },
  consulate: { src: base + 'consulate.jpg', author: 'Chainwit.', ...BY4, source: commons('Former_British_Consul%27s_Residence_at_Takow,_Former_British_Consulate_at_Takow_-_Kaohsiung_(2026)_-_img_01.jpg') },
  lrt: { src: base + 'lrt.jpg', author: 'Takeshi Aida', ...BYSA2, source: commons('Kaohsiung_Light_Rail_20190108.jpg') },
  lotuspond: { src: base + 'lotuspond.jpg', author: 'Zairon', ...BYSA4, source: commons('Kaohsiung_Lotus_Pond_Frühling-_&_Herbst-Pavillon_04.jpg') },
  liuhe: { src: base + 'liuhe.jpg', author: 'Chainwit.', ...BY4, source: commons('Kaohsiung-_Liuhe_Night_Market_-_%E5%85%AD%E5%90%88%E5%A4%9C%E5%B8%82_(2026)_-_img_01.jpg') },
  ruifeng: { src: base + 'ruifeng.jpg', author: 'Bahnfrend', ...BYSA4, source: commons('Ruifeng_Night_Market,_2026_(03).jpg') },
  anpingfort: { src: base + 'anpingfort.jpg', author: 'CEphoto, Uwe Aranas', ...BYSA3, source: commons('Tainan_Taiwan_Fort-Zeelandia-01.jpg') },
  treehouse: { src: base + 'treehouse.jpg', author: 'Mk2010', ...BYSA4, source: commons('Anping_Tree_House,_Tainan_(Taiwan).jpg') },
  sicao: { src: base + 'sicao.jpg', author: 'lienyuan lee', ...BY3, source: commons('四草綠色隧道_Sicao_Green_Tunnel_-_panoramio_(3).jpg') },
  saltfield: { src: base + 'saltfield.jpg', author: 'MW2019', ...BYSA4, source: commons('Jingzaijiao_Tile-paved_Salt_Fields_,_Tainan_city_,_Taiwan.jpg') },
  sanfeng: { src: base + 'sanfeng.jpg', author: 'Chainwit.', ...BY4, source: commons('Kaohsiung_-_Sunfong_Temple_三鳳宮_(2026)_-_img_44.jpg') },
  anping: { src: base + 'anping.jpg', author: 'Mk2010', ...BYSA4, source: commons('Anping_Small_Fort,_Anping_District,_Tainan_City_(Taiwan).jpg') },
  musiccenter: { src: base + 'musiccenter.jpg', author: 'Suicasmo', ...BYSA4, source: commons('Kaohsiung_Music_Center_20240919-1.jpg') },
} satisfies Record<string, Photo>

// 음식 사진. 대부분 다른 가게에서 찍은 예시라 example에 어디서 찍었는지 적는다
const FOOD = {
  porridge: { src: base + 'porridge.jpg', author: 'bryan... from Taipei', ...BYSA2, source: commons('Food_滷肉飯,_海鮮粥,_海產粥,_煎魚肚,_煎魚腸,_肉燥油條,_滷油豆腐,_滷丸,_香腸,_荷包蛋,_南明肉燥飯,_自強夜市,_高雄_(15749506952).jpg'), example: '가오슝 자창 야시장 다른 가게의 상차림이에요 (해산물죽은 왼쪽 위)' },
  eel: { src: base + 'eel.jpg', author: 'TACO Huang', ...BYSA2, source: commons('Thick_Soup_Noodles_with_Eel_-_鱔魚意麵_(4596353688).jpg'), example: '다른 가게의 장어 이몐 사진이에요' },
  squid: { src: base + 'squid.jpg', author: 'Jirka Matousek', ...BY2, source: commons('Close-up_view_of_grilled_neritic_squid_in_Taipei_after_New_Year%27s_Eve_2015.jpg'), example: '타이베이 노점의 오징어 구이 사진이에요' },
  mulletroe: { src: base + 'mulletroe.jpg', author: 'Chien Chih-Hung / 總統府', ...BY2, source: commons('Bottarga_in_Taiwan_2023-01-05.jpg'), example: '신주에서 숭어알을 말리는 모습이에요' },
  shrimp: { src: base + 'shrimp.jpg', author: 'Tianmu peter', ...BY3, source: commons('蒸的鹽水蝦^很好吃_-_panoramio.jpg'), example: '다른 가게의 소금물 새우찜 사진이에요' },
  oyster: { src: base + 'oyster.jpg', author: 'Morgan Calliope', ...BY2, source: commons('Oyster_omelette_in_Shilin_Night_Market.jpg'), example: '타이베이 스린 야시장의 굴전 사진이에요' },
  sausage: { src: base + 'sausage.jpg', author: 'KAICHEN', ...BYSA4, source: commons('Sheng_Yi_Taiwanese_sausage_with_sticky_rice.jpg') },
  jipai: { src: base + 'jipai.jpg', author: 'Bahnfrend', ...BYSA4, source: commons('Deep_fried_chicken_breast,_Angel_Chicken_Cutlet_Ruifeng_Store,_2026_(01).jpg') },
  sweetpotato: { src: base + 'sweetpotato.jpg', author: 'Ianbu', ...BYSA4, source: commons('地瓜球.jpg'), example: '타이베이에서 산 고구마볼 사진이에요' },
  douhua: { src: base + 'douhua.jpg', author: 'Outlookxp', ...BYSA4, source: commons('花生豆花.jpeg'), example: '땅콩 또우화 예시 사진이에요' },
  stinkytofu: { src: base + 'stinkytofu.jpg', author: 'Meng Weng Wong', ...BY2, source: commons('Close-up_of_Taiwanese_stinky_tofu_in_Yingge,_New_Taipei.jpg'), example: '신베이 잉거의 취두부 사진이에요' },
  mochi: { src: base + 'mochi.jpg', author: 'Yuriy kosygin', ...BYSA4, source: commons('Taiwanese_Mochi.jpg'), example: '땅콩가루 찹쌀떡 예시 사진이에요' },
  papaya: { src: base + 'papaya.jpg', author: 'Jonashtand', ...BYSA4, source: commons('202001_A_cup_of_papaya_milk_bought_at_Liouho_Night_Market,_Kaohsiung.jpg') },
  crab: { src: base + 'crab.jpg', author: 'Lilblackdog29', ...BYSA4, source: commons('Steamed_crabs.jpg'), example: '다른 곳의 게찜 사진이에요' },
  clams: { src: base + 'clams.jpg', author: 'bryan... from Taipei', ...BYSA2, source: commons('Food_炒海瓜子,_胖子小吃,_八德店,_台北_(21330222508).jpg'), example: '타이베이 가게의 바지락 볶음 사진이에요' },
  fishball: { src: base + 'fishball.jpg', author: 'bryan... from Taipei', ...BYSA2, source: commons('Food_乾麵,_餛飩湯,_魚丸湯,_臘腸,_燒肉,_意麵王,_台北_(15565441103).jpg'), example: '타이베이 가게의 상차림이에요 (어묵탕은 오른쪽)' },
  beefnoodle: { src: base + 'beefnoodle.jpg', author: 'Jpatokal', ...BYSA4, source: commons('Food_BeefNoodleSoup.JPG'), example: '타이베이 스린 야시장의 우육면 사진이에요' },
  duckrice: { src: base + 'duckrice.jpg', author: 'bryan... from Taipei', ...BYSA2, source: commons('Food_當歸鴨腿麵線,_紹興醉鴨,_鴨肉飯,_四號乾麵,_土庫當歸鴨,_台北_(23375244874).jpg'), example: '타이베이 오리고기 가게의 상차림이에요' },
  tuberice: { src: base + 'tuberice.jpg', author: 'bryan... from Taipei', ...BYSA2, source: commons('筒仔米糕,_何家排骨酥,_台北_(14330790184).jpg'), example: '타이베이 가게의 통찹쌀밥 사진이에요' },
  strawberryice: { src: base + 'strawberryice.jpg', author: 'Hadge', ...BYSA3, source: commons('Bing_guan_cau_mei.jpg'), example: '다른 가게의 딸기 빙수 사진이에요' },
  mangoice: { src: base + 'mangoice.jpg', author: 'Cloudyskye', ...BYSA3, source: commons('Mango_shaved_ice.jpg'), example: '다른 가게의 망고 빙수 사진이에요' },
  breakfast: { src: base + 'breakfast.jpg', author: 'Yun Huang Yong', ...BY2, source: commons('Taipei_breakfast_with_fresh_soymilk_20071023.jpg'), example: '타이베이의 두유·사오빙·요우탸오 아침 사진이에요' },
  hotpot: { src: base + 'hotpot.jpg', author: 'bryan... from Taipei', ...BYSA2, source: commons('Food_現宰牛肉片,_牛總涮牛肉,_台北_(14205531644).jpg'), example: '타이베이 소고기 샤브샤브 가게 사진이에요' },
  lurou: { src: base + 'lurou.jpg', author: 'Hadge', ...BYSA3, source: commons('Luroufan.JPG'), example: '다른 가게의 루러우판 사진이에요' },
} satisfies Record<string, Photo>

// 맛집 탭 사진. 키는 foodspots.json의 id
export const SPOT_PHOTOS: Record<string, Photo> = {
  'zhuang-ji-porridge': FOOD.porridge,
  'lin-zongxing-eel': FOOD.eel,
  'qihou-seafood': PHOTOS.cijinseafood,
  'wan-san': FOOD.shrimp,
  'jin-sheng-chun': FOOD.crab,
  'seashore-seafood': FOOD.squid,
  'good-crab-house': FOOD.crab,
  'chao-ming': FOOD.clams,
  'hamasen-fishball': FOOD.fishball,
  'gangyuan-beef-noodle': FOOD.beefnoodle,
  'san-niu-beef-noodle': FOOD.beefnoodle,
  'ya-rou-zhen': FOOD.duckrice,
  'beigang-tsai-migao': FOOD.tuberice,
  'popo-ice': FOOD.strawberryice,
  'hai-zhi-bing': FOOD.mangoice,
  'xing-long-ju': FOOD.breakfast,
  'niu-lao-da': FOOD.hotpot,
  'cianjin-pork-rice': FOOD.lurou,
  'zheng-papaya-milk': { ...FOOD.papaya, example: '류허 야시장에서 산 파파야우유 사진이에요. 이 가게 것인지는 확인하지 못했어요' },
}

// 야시장 탭 음식 사진. 키는 NIGHT_FOODS의 zh
export const NIGHT_PHOTOS: Record<string, Photo> = {
  '木瓜牛奶': FOOD.papaya,
  '海產粥': FOOD.porridge,
  '鹽蒸蝦': FOOD.shrimp,
  '鱔魚意麵': FOOD.eel,
  '烤魷魚': FOOD.squid,
  '蚵仔煎': FOOD.oyster,
  '烤烏魚子': FOOD.mulletroe,
  '大腸包小腸': FOOD.sausage,
  '雞排': FOOD.jipai,
  '地瓜球': FOOD.sweetpotato,
  '鮮奶麻糬': FOOD.mochi,
  '豆花': FOOD.douhua,
  '臭豆腐': FOOD.stinkytofu,
}

// 야시장 카드 사진. 키는 NIGHT_MARKETS의 id
export const MARKET_PHOTOS: Record<string, Photo> = {
  liuhe: PHOTOS.liuhe,
  ruifeng: PHOTOS.ruifeng,
}
