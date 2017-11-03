"use strict";
const {header} = require("../support/Function/Verstka");
const for_seo = {
  alternate: "/autoseller/addpackage/",
  robots: "NOINDEX, NOFOLLOW",
  googleTagManager: true
};

describe("Tests on https://auto.ria.com/autoseller/addpackage/", ()=>{
  let routs = [
    {
      method:'GET',
      url:'https://sslpagestat.mmi.bemobile.ua/pagestat/**',
      alias:'pagestat'
    },
    {
      method:'GET',
      url:'https://auto.ria.com/users/**',
      alias:'users'
    }
  ];
  let count = ()=>{
    var cou =0;
    return ()=>{
      return {
        inc:()=>{
          return ++cou
        },
        val:()=>{
          return cou
        }
      };
    }
  };
  it("Test on verstka", ()=>{
    cy.server();
    cy.route('**/manager/**').as('manager');
    cy.visit('https://auto.ria.com/autoseller/addpackage/').wait('@manager').wait(100);
    header();
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
        .then(()=>{
          done();
        });

  });
  it("First", (done)=>{
    cy.server({
      onResponse:(data)=>{
        routs.forEach((item)=>{
          if(data.url.indexOf(item.url.slice(0,item.url.length-2))!==-1){
            console.log("Item url -> "+item.url.slice(0,item.url.length-2));
            window[item.alias].inc();
            console.log("Requests: "+window[item.alias].val())
          }
        });

      }
    });


    routs.forEach((item)=>{
      cy.route(item.method,item.url).as(item.alias);
      window[item.alias] = count()();
    });
    cy.visit("https://auto.ria.com/autoseller/addpackage/");

    expect(2).to.be.eq(2);
    cy.wait(1000);
    done();
  });






});