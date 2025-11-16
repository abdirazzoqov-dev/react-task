# Xaritada Poligonlar Chizish Ilovasi

Bu React ilovasi interaktiv xaritada poligonlar chizish va ularni boshqarish uchun mo'ljallangan. Foydalanuvchilar xaritada hududlarni belgilashi, ularning maydonini ko'rishi, tahrirlashi va saqlashi mumkin. Loyiha `MapLibre GL` yordamida qurilgan bo'lib, toza kod va modullik tamoyillariga asoslanadi.

## Asosiy imkoniyatlar

- **Poligon chizish:** Xaritada sichqoncha yordamida hududlarni osonlik bilan belgilash.
- **Maydonni hisoblash:** Chizilgan hudud maydoni avtomatik hisoblanib, gektarda ko'rsatiladi.
- **Tahrirlash va o'chirish:** Mavjud poligon shaklini o'zgartirish yoki uni butunlay o'chirib tashlash.
- **Qulay interfeys:** Boshqaruv tugmalari va ma'lumot oynalari xarita ustida joylashgan.
- **Modulli arxitektura:** Chizish logikasi `useMapDraw` nomli custom hook'ga chiqarilgan. Bu kodni tushunishni va qo'llab-quvvatlashni osonlashtiradi.

## Texnologiyalar stekasi

- **Asosiy kutubxonalar:**
  - **React:** Foydalanuvchi interfeysini yaratish uchun.
  - **TypeScript:** Kodda turlarni aniqlash va xatoliklarning oldini olish uchun.
- **Xarita bilan ishlash:**
  - **MapLibre GL JS:** Ochiq kodli, yuqori unumdorlikka ega xaritalarni ko'rsatish kutubxonasi.
  - **React Map GL:** React ilovalarida xaritalarni boshqarish uchun qulay vosita.
  - **Mapbox GL Draw:** Xaritada interaktiv chizish funksiyalarini ta'minlash uchun.
  - **Turf.js:** Geografik hisob-kitoblarni (masalan, maydonni hisoblash) amalga oshirish uchun.
- **Stillashtirish:**
  - **Tailwind CSS:** Komponentlar uchun tez va moslashuvchan uslublar yaratish.
- **Marshrutizatsiya:**
  - **React Router:** Ilova ichidagi sahifalar o'rtasida navigatsiyani boshqarish uchun.

## Loyihani ishga tushirish

1.  **Repozitoriyni yuklab oling va papkaga o'ting:**
    ```bash
    git clone <sizning-repozitoriy-havolangiz>
    cd <loyiha-papkasi>
    ```

2.  **Kerakli paketlarni o'rnating:**
    Agar `npm` ishlatsangiz:
    ```bash
    npm install
    ```
    Agar `yarn` ishlatsangiz:
    ```bash
    yarn install
    ```

3.  **Loyihani dev rejimida ishga tushiring:**
    `npm` uchun:
    ```bash
    npm start
    ```
    `yarn` uchun:
    ```bash
    yarn start
    ```

    Shundan so'ng, ilova brauzeringizda http://localhost:3000 manzili orqali ochiladi.

## Loyiha strukturasi

Kodning tuzilishi `feature-sliced design` metodologiyasiga o'xshash tarzda tashkil etilgan bo'lib, bu komponentlar va logikani ajratishga yordam beradi.

```
src/
├── components/
│   ├── common/         # Umumiy, qayta ishlatiladigan komponentlar (masalan, Layout)
│   └── custom/         # Maxsus komponentlar (masalan, MapDrawControl)
├── data-config/        # Ma'lumotlar va server bilan ishlash logikasi (masalan, userService)
├── pages/              # Ilova sahifalari (MapPage, UsersPage)
├── App.tsx             # Asosiy ilova komponenti va marshrutlar
└── index.tsx           # Ilovaning kirish nuqtasi
```
