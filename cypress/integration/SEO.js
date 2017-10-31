const page = [
  {
    url: "https://auto.ria.com/",
    title: "AUTO.RIA™ — Автобазар №1. Купить и продать авто легко как никогда",
    description: "AUTO.RIA — быстрая продажа и легкая покупка новых и б/у автомобилей. Автобазар, на котором продается 1400 автомобилей каждый день. Поиск по базе объявлений о продаже автомобилей. Каталоги автосалонов и СТО на Авториа.",
    alternate: "/",
    robots: "INDEX, FOLLOW",
    googleTagManager: true
  },
  {
    url: "https://auto.ria.com/uk/",
    title: "AUTO.RIA™ — Автобазар №1. Купити і продати авто легко як ніколи",
    description: "AUTO.RIA — швидкий продаж та легка купівля нових і вживаних автомобілів. Автобазар, на якому продається 1 400 автомобілів щодня. Пошук по базі оголошень про продаж автомобілів. Каталоги автосалонів і СТО на Авторіа.",
    alternate: "/",
    robots: "INDEX, FOLLOW",
    googleTagManager: true
  },
  {
    url: "https://auto.ria.com/car/bmw/",
    title: "AUTO.RIA – Продажа БМВ бу в Украине: купить подержанные BMW с пробегом",
    description: "Более[0-9, ,\+]{3,9}объявлений о продаже подержанных БМВ на автобазаре в Украине. На AUTO.RIA легко найти, сравнить и купить бу BMW с пробегом любой модели и года.",
    alternate: "/car/bmw/",
    robots: "index, follow",
    googleTagManager: true
  },
  {
    url: "https://auto.ria.com/uk/car/bmw/",
    title: "AUTO.RIA – Продаж БМВ бу в Україні: купити вживані BMW з пробігом",
    description: "Більш ніж[0-9, ,\+]{3,9}оголошень про продаж вживаних БМВ на автобазарі в Україні. На AUTO.RIA легко знайти, зрівняти та купити бу BMW з пробігом будь-якої моделі та року.",
    alternate: "/car/bmw/",
    robots: "index, follow",
    googleTagManager: true
  },
  {
    url: "https://auto.ria.com/car/audi/a4/",
    title: "AUTO.RIA – Продажа Ауди А4 бу: купить Audi A4 в Украине",
    description: "Более[0-9, ,\+]{3,9}объявлений о продаже подержанных Ауди А4 на автобазаре в Украине. На AUTO.RIA легко найти, сравнить и купить бу Audi A4 с пробегом любого года.",
    alternate: "/car/audi/a4/",
    robots: "index, follow",
    googleTagManager: true
  },
  {
    url: "https://auto.ria.com/uk/car/audi/a4/",
    title: "AUTO.RIA – Продаж Ауді А4 бу: купити Audi A4 в Україні",
    description: "Більш ніж[0-9, ,\+]{3,9}оголошень про продаж вживаних Ауді А4 на автобазарі в Україні. На AUTO.RIA легко знайти, зрівняти та купити бу Audi A4 з пробігом будь-якого року.",
    alternate: "/car/audi/a4/",
    robots: "index, follow",
    googleTagManager: true
  },
  {
    url: "https://auto.ria.com/uk/legkovie/",
    title: "AUTO.RIA – Легкові авто бу в Україні: купити вживаний легковий автомобіль",
    description: "Більш ніж[0-9, ,\+]{3,10}оголошень про продаж вживаних легкових авто в Україні. На AUTO.RIA легко знайти, зрівняти та купити бу легковий автомобіль з пробігом.",
    alternate: "/legkovie/",
    robots: "index, follow",
    googleTagManager: true
  }
];


describe("SEO", function () {
  page.forEach(function (item) {
    it(item.url, function () {
      cy.request({"timeout": 2000, "url": item.url}).its("body").then(($body) => {
            const head = $body.substring($body.indexOf(`<!-- critical= main -->`), $body.indexOf(`</head>`));
            if (item.title) {
              expect(head).include(`<title>${item.title}</title>`);
            }
            if (item.description) {
              let regDes = new RegExp("<meta name=(\"|\\')description(\"|\\') content=(\"|\\')" + item.description + "(\"|\\') \/>", "gi");
              expect(head).match(regDes);
            }

            if (item.alternate) {
              expect(head).include(`<link rel="alternate" hreflang="ru-UA" href="https://auto.ria.com${item.alternate}" />`);
              expect(head).include(`<link rel="alternate" hreflang="uk-UA" href="https://auto.ria.com/uk${item.alternate}" />`);
              expect(head).include(`<link rel="alternate" hreflang="ru" href="https://auto.ria.com${item.alternate}" />`);
              expect(head).include(`<link rel="alternate" hreflang="uk" href="https://auto.ria.com/uk${item.alternate}" />`);
              expect(head).include(`<link rel="alternate" hreflang="x-default" href="https://auto.ria.com${item.alternate}" />`);
            }
            if (item.robots) {
              let regRob = new RegExp(`<meta name="robots" content="${item.robots}" \/>`, "gi");
              expect(head).match(regRob);
            }
            if (item.googleTagManager) {
              expect(head).include(`<!-- Google Tag Manager -->`);
            }

          }
      );
    })
  })

});