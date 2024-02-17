$(document).ready(function () {
  $.ajax({
      url: "https://smileschool-api.hbtn.info/quotes",

      method: "GET",

      dataType: "json",

      success: function (data) {
          for (let i = 0; i < data.length; i++) {
              let active = "";
              if (i === 0) {
                  active = "active";
              }
              const carouselItem = `
          <div class="carousel-item ${active}">
              <div class="row mx-auto align-items-center">
                <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                  <img
                    src="${data[i].pic_url}"
                    class="d-block align-self-center"
                    alt="Carousel Pic 1"
                  />
                </div>
                <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                  <div class="quote-text">
                    <p class="text-white">
                    ${data[i].text}
                    </p>
                    <h4 class="text-white font-weight-bold">${data[i].name}</h4>
                    <span class="text-white">${data[i].title}</span>
                  </div>
                </div>
              </div>
            </div>
          `;
              $("#carousel").append(carouselItem);
          }
      },
  }).done(function () {
      $("div.loader").hide();
  });
});

$(document).ready(function () {
  $.ajax({
      url: "https://smileschool-api.hbtn.info/popular-tutorials",
      method: "GET",
      dataType: "json",
      success: function (data) {
          // Vérifiez s'il y a suffisamment de tutoriels pour remplir le carousel
          if (data.length < 4) {
              console.error("Pas assez de tutoriels pour remplir le carousel.");
              return;
          }

          const carouselCard = $("#carousel2");
          carouselCard.empty(); // Efface le contenu existant

          // Boucle principale pour générer les éléments du carousel
          for (let i = 0; i < data.length; i += 4) {
              const active = i === 0 ? "active" : "";
              const carouselItem = `<div class="carousel-item ${active}">
                                      <div class="row mx-auto align-items-center">
                                          ${generateCards(data, i, 4)}
                                      </div>
                                  </div>`;
              carouselCard.append(carouselItem);
          }

          // Initialisez le carousel avec l'option interval: false pour désactiver le défilement automatique
          $("#carousel2").carousel({
              interval: false,
              slide: true, // Active le défilement de carte en carte
          });
      },
  }).done(function () {
      $("div.loader").hide();
  });
});

function generateCards(data, start, count) {
  let cardsHtml = "";

  // Boucle pour générer les cartes individuelles
  for (let j = start; j < start + count; j++) {
      if (data[j]) {
          // let active = (j === start) ? 'active' : '';

          // Dynamiquement générer les icônes d'étoile en fonction de la valeur 'star'
          let starsHtml = "";
          for (let k = 1; k <= 5; k++) {
              const starImage =
                  k <= data[j].star ? "images/star_on.png" : "images/star_off.png";
              starsHtml += `<img src="${starImage}" alt="star" width="15px" />`;
          }

          const card = `<div class="col-md-4 col-sm-6 col-lg-3">
                          <div class="card">
                              <img src="${data[j].thumb_url}" class="card-img-top" alt="Video thumbnail" />
                              <div class="card-img-overlay text-center">
                                  <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
                              </div>
                              <div class="card-body">
                                  <h5 class="card-title font-weight-bold">${data[j].title}</h5>
                                  <p class="card-text text-muted">${data[j]["sub-title"]}</p>
                                  <div class="creator d-flex align-items-center">
                                      <img src="${data[j].author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle" />
                                      <h6 class="pl-3 m-0 main-color">${data[j].author}</h6>
                                  </div>
                                  <div class="info pt-3 d-flex justify-content-between">
                                      <div class="rating">
                                          ${starsHtml}
                                      </div>
                                      <span class="main-color">${data[j].duration}</span>
                                  </div>
                              </div>
                          </div>
                          </div>
                      `;
          cardsHtml += card;
      }
  }

  return cardsHtml;
}

$(document).ready(function () {
  $.ajax({
      url: "https://smileschool-api.hbtn.info/latest-videos",
      method: "GET",
      dataType: "json",
      success: function (data) {
          console.log(data);
          
          // Vérifiez s'il y a suffisamment de vidéos pour remplir le carousel
          if (data.length < 1) {
              console.error("Pas assez de tutoriels vidéos pour remplir le carousel.");
              return;
          }

          const carouselCard = $("#carousel3");
          carouselCard.empty(); // Efface le contenu existant

          // Dupliquez simplement le contenu de la seule slide
          const singleSlideContent = generateCards(data, 0, 4);
          const carouselItem = `<div class="carousel-item active">
                                  <div class="row mx-auto align-items-center">
                                      ${singleSlideContent}
                                  </div>
                              </div>
                              <div class="carousel-item">
                                  <div class="row mx-auto align-items-center">
                                      ${singleSlideContent}
                                  </div>
                              </div>`;

          carouselCard.append(carouselItem);

          // Initialisez le carousel avec l'option interval: false pour désactiver le défilement automatique
          $("#carouselExampleControls3").carousel({
              interval: false,
          });
      },
  }).done(function () {
      $("div.loader").hide();
  });
});

function generateCards(data, start, count) {
  let cardsHtml = "";

  // Boucle pour générer les cartes individuelles
  for (let j = start; j < start + count; j++) {
      if (data[j]) {
          // Dynamiquement générer les icônes d'étoile en fonction de la valeur 'star'
          let starsHtml = "";
          for (let k = 1; k <= 5; k++) {
              const starImage = k <= data[j].star ? "images/star_on.png" : "images/star_off.png";
              starsHtml += `<img src="${starImage}" alt="star" width="15px" />`;
          }

          const card = `<div class="col-md-4 col-sm-6 col-lg-3">
                          <div class="card">
                              <img src="${data[j].thumb_url}" class="card-img-top" alt="Video thumbnail" />
                              <div class="card-img-overlay text-center">
                                  <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
                              </div>
                              <div class="card-body">
                                  <h5 class="card-title font-weight-bold">${data[j].title}</h5>
                                  <p class="card-text text-muted">${data[j]["sub-title"]}</p>
                                  <div class="creator d-flex align-items-center">
                                      <img src="${data[j].author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle" />
                                      <h6 class="pl-3 m-0 main-color">${data[j].author}</h6>
                                  </div>
                                  <div class="info pt-3 d-flex justify-content-between">
                                      <div class="rating">
                                          ${starsHtml}
                                      </div>
                                      <span class="main-color">${data[j].duration}</span>
                                  </div>
                              </div>
                          </div>
                        </div>`;

          cardsHtml += card;
      }
  }

  return cardsHtml;
}
