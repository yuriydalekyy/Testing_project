"use strict";
const {header} = require("../support/Function/Verstka");
const for_seo = {
  alternate: "/autoseller/addpackage/",
  robots: "NOINDEX, NOFOLLOW",
  googleTagManager: true
};

describe("Tests on https://auto.ria.com/autoseller/addpackage/", () => {
  let routs = [
    {
      method: 'GET',
      url: 'https://sslpagestat.mmi.bemobile.ua/pagestat/**',
      alias: 'pagestat'
    },
    {
      method: 'GET',
      url: 'https://auto.ria.com/users/**',
      alias: 'users'
    }
  ];
  let count = () => {
    var cou = 0;
    return () => {
      return {
        inc: () => {
          return ++cou
        },
        val: () => {
          return cou
        }
      };
    }
  };
  it("Test on verstka", () => {
    cy.server();
    cy.route('**/manager/**').as('manager');
    cy.visit('https://auto.ria.com/autoseller/addpackage/').wait('@manager');

    /*Перевірка верстки хедера*/
    header();

    /*Перевірка головної фоточки*/
    cy.get('div.auto-seller-banner').find('img')
        .then((img) => {
          cy.request({'url': img[0].src}).then((data) => {
            expect(data.status).to.be.eq(200);
          })
        });

    /*Перевірка H1*/
    cy.get('h1').then((h1) => {
      expect(h1).to.include.text(`\n         Публикуйте экономно и получайте больше возможностей с «Автопродажей»\n    `)
    });

    /*Блок переваг*/
    cy.get('div.auto-seller-benefits').as('advantages')
        .then((data) => {
          expect(data).to.be.visible;
          cy.get('@advantages')
              .find('h2')
              .then((h2) => {
                expect(h2).to.have.text(`Преимущества «Автопродажи»`)
              });
          cy.get('@advantages')
              .find('div.boxed')
              .then((box) => {
                expect(box).to.be.visible;
              })
              .find('>div').as('advantagesDivs')
              .then((div) => {
                expect(div).to.have.lengthOf(5);
                expect(div[1]).to.be.visible;
                cy.get('@advantagesDivs')
                    .find('img')
                    .each((img) => {
                      cy.request({url: img[0].src})
                          .then((foto) => {
                            expect(foto.status).to.be.eq(200)
                          })
                    });
                cy.get('@advantagesDivs')
                    .find('.description')
                    .each((desc) => {
                      expect(desc).to.have.class('mhide');
                    })


              })

        });

    /**/
    cy.get('div.auto-sell-pref').as('sellPref')
        .then((data) => {
          expect(data).to.be.visible;
          cy.get('@sellPref').find('h2')
              .then((h2) => {
                expect(h2).to.have.text(`Настройте свою «Автопродажу»`);
                expect(h2).to.have.class('bold');
              });

          cy.get('@sellPref').find('div.blue-box').as('sellPrefBlue-box')
              .then((div) => {
                expect(div).to.be.visible;

                cy.get('@sellPrefBlue-box').find('>span')
                    .then((span) => {
                      expect(span).to.be.visible;
                      expect(span).to.have.class('box-title');
                      expect(span).to.have.text(`Создайте свой оптимальный пакет «Автопродажи» на AUTO.RIA`);
                    });

                cy.get('@sellPrefBlue-box').find('>div:first').as('bbdiv1')
                    .then((bbdiv) => {
                      expect(bbdiv).to.be.visible;
                      cy.get('@bbdiv1').find('>label')
                          .then((lable) => {
                            expect(lable).to.be.visible;
                            expect(lable).to.have.text(`Количество публикаций `);
                          })
                      cy.get('@bbdiv1').find('>div').as('bbdiv1opt')
                          .then((div) => {
                            expect(div).to.be.visible;
                            expect(div).to.have.class('middle');
                          })
                          .click()
                          .find('.options').as('bbdiv1optDiv')
                          .then((opt) => {
                            expect(opt).to.be.visible;
                            cy.get('@bbdiv1optDiv').find('>div')
                                .then((div) => {
                                  expect(div).to.have.lengthOf(9)
                                })
                                .each((div) => {
                                  expect(div[0]).to.have.class('custom-select')
                                  expect(div[0]).to.have.class('item')
                                })
                          })
                          .get('@bbdiv1opt')
                          .click()
                          .get('@bbdiv1optDiv')
                          .then((opt) => {
                            expect(opt).to.be.not.visible;
                          })

                    });

                cy.get('@sellPrefBlue-box').find('>div:nth-child(3)').as('bbdiv2')
                    .then((bbdiv) => {
                      expect(bbdiv).to.be.visible;
                      cy.get('@bbdiv2').find('label')
                          .then((label) => {
                            expect(label).to.be.visible;
                            expect(label).to.have.text('Период размещения');
                          });
                      cy.get('@bbdiv2').find('>div').as('bbdiv2opt')
                          .then((div) => {
                            expect(div).to.have.class('middle');
                            expect(div).to.be.visible;
                            cy.get('@bbdiv2opt').find('>div').as('bbdiv2optDiv')
                                .then((optDiv) => {
                                  expect(optDiv).to.have.class('four');
                                  cy.get('@bbdiv2optDiv').find('>div:nth-child(1)')
                                      .then((selectOpt) => {
                                        expect(selectOpt).to.have.class('active green');
                                        expect(selectOpt["0"].attributes[1].value).to.be.eq('1')
                                        cy.get('#fullPriceWrap')
                                            .then((bonus) => {
                                              expect(bonus).to.be.not.visible;
                                            })
                                      });

                                  cy.get('@bbdiv2optDiv').find('>div:nth-child(3)')
                                      .click()
                                      .then((selectOpt) => {
                                        expect(selectOpt).to.have.class('active green');
                                        expect(selectOpt["0"].attributes[1].value).to.be.eq('6');
                                        cy.get('#fullPriceWrap')
                                            .then((bonus) => {
                                              expect(bonus).to.be.visible;
                                            })
                                      });

                                  cy.get('@bbdiv2optDiv').find('>div:nth-child(1)').click();

                                })
                          })
                    });

                cy.get('@sellPrefBlue-box').find('>div:nth-child(5)').as('bbdiv3')
                    .then((bbdiv) => {
                      expect(bbdiv).to.be.visible;
                      cy.get('@bbdiv3').find('label')
                          .then((label) => {
                            expect(label).to.be.visible;
                            expect(label).to.have.text('Сумма к оплате');
                          })
                      cy.get('@bbdiv3').find('#priceWithBonus')
                          .then((price)=>{
                        expect(price).to.be.visible;
                        expect(price).to.have.text("225");
                        expect(price).to.have.class('val total-price');
                          })
                    });

                cy.get('@sellPrefBlue-box').find('>div.s-order a')
                    .then((button)=>{
                  expect()
                    })
              })
        })
  });

  it("SEO test", function (done) {
    cy.request({"timeout": 2000, "url": "https://auto.ria.com/autoseller/addpackage/"})
        .its("body")
        .then(($body) => {
          const head = $body.substring($body.indexOf(`<!-- critical= main -->`), $body.indexOf(`</head>`));
          if (for_seo.title) {
            expect(head).include(`<title>${for_seo.title}</title>`);
          }
          if (for_seo.description) {
            let regDes = new RegExp("<meta name=(\"|\\')description(\"|\\') content=(\"|\\')" + for_seo.description + "(\"|\\') \/>", "gi");
            expect(head).match(regDes);
          }

          if (for_seo.alternate) {
            expect(head).include(`<link rel="alternate" hreflang="ru-UA" href="https://auto.ria.com${for_seo.alternate}" />`);
            expect(head).include(`<link rel="alternate" hreflang="uk-UA" href="https://auto.ria.com/uk${for_seo.alternate}" />`);
            expect(head).include(`<link rel="alternate" hreflang="ru" href="https://auto.ria.com${for_seo.alternate}" />`);
            expect(head).include(`<link rel="alternate" hreflang="uk" href="https://auto.ria.com/uk${for_seo.alternate}" />`);
            expect(head).include(`<link rel="alternate" hreflang="x-default" href="https://auto.ria.com${for_seo.alternate}" />`);
          }
          if (for_seo.robots) {
            let regRob = new RegExp(`<meta name="robots" content="${for_seo.robots}" \/>`, "gi");
            expect(head).match(regRob);
          }
          if (for_seo.googleTagManager) {
            expect(head).include(`<!-- Google Tag Manager -->`);
          }

        })
        .then(() => {
          done();
        });

  });
  it("First", (done) => {
    cy.server({
      onResponse: (data) => {
        routs.forEach((item) => {
          if (data.url.indexOf(item.url.slice(0, item.url.length - 2)) !== -1) {
            console.log("Item url -> " + item.url.slice(0, item.url.length - 2));
            window[item.alias].inc();
            console.log("Requests: " + window[item.alias].val())
          }
        });

      }
    });


    routs.forEach((item) => {
      cy.route(item.method, item.url).as(item.alias);
      window[item.alias] = count()();
    });
    cy.visit("https://auto.ria.com/autoseller/addpackage/");

    expect(2).to.be.eq(2);
    cy.wait(1000);
    done();
  });


});