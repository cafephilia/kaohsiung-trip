// 위키미디어 커먼즈 사진. 960px로 줄여 public/photos에 저장했고, 원본과 라이선스는 source 링크에서 확인할 수 있다
import type { Photo } from '../types'

const base = import.meta.env.BASE_URL + 'photos/'

const CC0 = { license: 'CC0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/' }
const BY2 = { license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0' }
const BY4 = { license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0' }
const BYSA3 = { license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0' }
const BYSA4 = { license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0' }

const commons = (file: string) => 'https://commons.wikimedia.org/wiki/File:' + file

export const PHOTOS = {
  dome: { src: base + 'dome.jpg', author: 'allanlau2000', ...CC0, source: commons('Dome_of_Light_at_Formosa_Boulevard_Station.jpg') },
  pier2: { src: base + 'pier2.jpg', author: 'Jonashtand', ...BYSA4, source: commons('202407_Penglai_warehouses,_Pier-2_Art_Center,_Kaohsiung.jpg') },
  loveriver: { src: base + 'loveriver.jpg', author: 'Graphium', ...BYSA3, source: commons('Love_River_(%E7%88%B1%E6%B2%B3),_Kaohsiung,_Taiwan.jpg') },
  cijin: { src: base + 'cijin.jpg', author: 'Jonashtand', ...BYSA4, source: commons('202001_Views_from_ferry_from_Gushan_to_Cijin,_Kaohsiung_20.jpg') },
  consulate: { src: base + 'consulate.jpg', author: 'Chainwit.', ...BY4, source: commons('Former_British_Consul%27s_Residence_at_Takow,_Former_British_Consulate_at_Takow_-_Kaohsiung_(2026)_-_img_01.jpg') },
  pagodas: { src: base + 'pagodas.jpg', author: 'CEphoto, Uwe Aranas', ...BYSA3, source: commons('Kaohsiung_Taiwan_Dragon-and-Tiger-Pagodas-01.jpg'), example: '2015년에 찍은 보수 전 모습이에요' },
  liuhe: { src: base + 'liuhe.jpg', author: 'Chainwit.', ...BY4, source: commons('Kaohsiung-_Liuhe_Night_Market_-_%E5%85%AD%E5%90%88%E5%A4%9C%E5%B8%82_(2026)_-_img_01.jpg') },
  eluanbi: { src: base + 'eluanbi.jpg', author: 'Suicasmo', ...BYSA4, source: commons('Eluanbi_Lighthouse_20240918-3.jpg') },
  anping: { src: base + 'anping.jpg', author: 'Mk2010', ...BYSA4, source: commons('Anping_Small_Fort,_Anping_District,_Tainan_City_(Taiwan).jpg') },
  musiccenter: { src: base + 'musiccenter.jpg', author: 'Suicasmo', ...BYSA4, source: commons('Kaohsiung_Music_Center_20240919-1.jpg') },
  oyster: { src: base + 'oyster.jpg', author: 'Morgan Calliope', ...BY2, source: commons('Oyster_omelette_in_Shilin_Night_Market.jpg'), example: '타이베이 스린 야시장의 굴전 사진이에요' },
} satisfies Record<string, Photo>

// 맛집 탭 사진. 키는 foodspots.json의 id
export const SPOT_PHOTOS: Record<string, Photo> = {
  'zheng-papaya-milk': { src: base + 'papaya.jpg', author: 'Jonashtand', ...BYSA4, source: commons('202001_A_cup_of_papaya_milk_bought_at_Liouho_Night_Market,_Kaohsiung.jpg'), example: '류허 야시장에서 산 파파야우유 사진이에요. 이 가게 것인지는 확인하지 못했어요' },
}
