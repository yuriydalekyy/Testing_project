"use strict";
let header = ()=>{
  cy.get('#headerApp').then((data)=>{
    expect(data).to.have.class("app-header");
    expect(data).to.be.visible;
  });
  cy.get('#headerApp').find('.app-head').then((data)=>{
    expect(data).to.be.visible;
  });
  cy.get('#headerApp').find('.nav-head').then((data)=>{
    expect(data).to.be.visible;
  });
  cy.get('#headerApp').find('.nav-head a').then((data)=>{
    expect(data).to.have.lengthOf(5);
  });
  cy.get('#headerApp').find('.app-head-bar').then((data)=>{
    expect(data).to.be.visible;
  });
  cy.get('#headerApp').find('#notificationBarContainer').then((data)=>{
    expect(data).to.be.not.visible;
  });
  cy.get('#headerApp').find('.app-head-bar a:first').then((data)=>{
    expect(data).to.be.visible;
    expect(data).to.have.prop('href').match(/https:\/\/auto.ria.com\/notepad.html/);
  });
  cy.get('#headerApp').find('.app-head-bar a:first .icon-favorite').then((data)=>{
    expect(data).to.be.visible;
  });
  cy.get('#headerApp').find('.app-head-bar a:first .count-favorite').then((data)=>{
    expect(data).to.be.not.visible;
  });
  cy.get('#headerApp').find('.app-head-bar #headerLinkToMyMenu').then((data)=>{
    expect(data).to.be.not.visible;
  });
  cy.get('#headerApp').find('.app-head-bar>a').then((data)=>{
    expect(data[1]).to.be.visible;
    expect(data[1]).to.have.prop('href').match(/https:\/\/auto.ria.com\/login.html/);
  });
  cy.get('#headerApp').find('.app-head-bar>a .tl').then((data)=>{
    expect(data).to.have.text("Вход");
  });
  cy.get('#headerApp').find('.app-head-bar>a .icon-user').then((data)=>{
    expect(data).to.be.visible;
  });
  cy.get('#headerApp').find('.multilang').then((data)=>{
    expect(data).to.be.visible;
    expect(data).to.have.text('рус  | укр')
  });
  cy.get('#headerApp').find('.multilang a').then((data)=>{
    expect(data).to.be.visible;
    expect(data).to.have.prop('href').match(/https:\/\/auto.ria.com\/uk\/autoseller\/addpackage\//)
  });
  cy.get('#headerApp').find('.bn-place').then((data)=>{
    expect(data).to.be.exist;
  });
  cy.get('#headerApp').find('#oldBrowserPopup').then((data)=>{
    expect(data).to.be.not.visible;
  });
  cy.get('#headerApp').find('.container-header').then((data)=>{
    expect(data).to.be.visible;
  });
  cy.get('#headerApp').find('.container-header>a').then((data)=>{
    expect(data).to.be.visible;
    expect(data).to.have.prop('href').match(/https:\/\/auto.ria.com/)
  });
  cy.get('#headerApp').find('.container-header .areabar').then((data)=>{
    expect(data).to.be.visible;
  });
  cy.get('#headerApp').find('.container-header .areabar a').then((data)=>{
    expect(data).to.be.visible;
    expect(data).to.have.prop('href').match(/https:\/\/auto.ria.com\/add_auto.html/);
    expect(data).to.have.text(" Добавить объявление");
  });
  cy.get('#headerApp').find('.container-header .areabar .icon-add-white').then((data)=>{
    expect(data).to.be.visible;
  });
  cy.get('#headerApp').find('.container-header .wrapper').then((data)=>{
    expect(data).to.be.visible;
  });
  cy.get('#headerApp').find('.container-header .wrapper .nav-list').then((data)=>{
    expect(data).to.be.visible;
  });
  cy.get('#headerApp').find('.container-header .wrapper .nav-list>li').then((data)=>{
    expect(data).to.have.lengthOf(4);
  });
  cy.get('#headerApp').find('.container-header .review-front').then((data)=>{
    expect(data).to.be.visible;
  });
  cy.get('#headerApp').find('.container-header .review-front>a').then((data)=>{
    expect(data).to.be.visible;
    expect(data).to.have.prop('href').match(/https:\/\/auto.ria.com\/stat\//);
    expect(data).to.have.text("1400 авто за день продається на AUTO.RIA");
  });


}

module.exports={header}