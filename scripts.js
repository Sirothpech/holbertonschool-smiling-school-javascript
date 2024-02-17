$(document).ready(function () {
  // Récupérer les citations
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
          <div class="carousel-item ${active} col-md-4 col-sm-6 col-lg-3">
            <div class="row mx-auto align-items-center">
              <div class="col-12 col-md-4 text-center text-md-right">
                <img
                  src="${data[i].pic_url}"
                  class="d-block align-self-center rounded-circle"
                  alt="Carousel Pic 1"
                  height="160px"
                  width="160px"
                />
              </div>
              <div class="col-12 col-md-8">
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

  // Récupérer les tutoriels
  $.ajax({
    url: "https://smileschool-api.hbtn.info/popular-tutorials",
    method: "GET",
    dataType: "json",
    success: function (data) {
      console.log(data);

      // Vérifier s'il y a suffisamment de tutoriels pour remplir le carousel
      if (data.length < 4) {
        console.error("Pas assez de tutoriels pour remplir le carousel.");
        return;
      }

      const carouselCard = $("#carousel2");
      carouselCard.empty(); // Effacer le contenu existant

      // Boucle principale pour générer les éléments du carousel
      for (let i = 0; i < data.length; i++) {
        const active = i === 0 ? "active" : "";
        const carouselItem = `
          <div class="carousel-item ${active} col-md-4 col-sm-6 col-lg-3">
            ${generateCard(data[i])}
          </div>`;
        carouselCard.append(carouselItem);
      }

      // Initialiser le carousel avec l'option interval: false pour désactiver le défilement automatique
      $("#carousel2").carousel({
        interval: false,
        slide: true, // Activer le défilement de carte en carte
      });
    },
  }).done(function () {
    $("div.loader").hide();
  });
});

// Fonction pour générer une seule carte
function generateCard(data) {
  // Dynamiquement générer les icônes d'étoile en fonction de la valeur 'star'
  let starsHtml = "";
  for (let k = 1; k <= 5; k++) {
    const starImage =
      k <= data.star ? "images/star_on.png" : "images/star_off.png";
    starsHtml += `<img src="${starImage}" alt="star" width="15px" />`;
  }

  const card = `
    <div class="card border-0" style="max-width: 25.5rem;">
        <img src="${data.thumb_url}" class="card-img-top img-fluid" alt="Video thumbnail" height="154px">
        <div class="position-relative image-group">
          <img src="images/play.png" alt="Play" width="64px" class="play position-absolute" />
        </div>
        <div class="card-body">
          <h5 class="card-title font-weight-bold">${data.title}</h5>
          <p class="card-text text-muted">${data["sub-title"]}</p>
          <div class="row justify-content-start align-items-center p-4">
            <img src="${data.author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle mr-4" />
            <p class="m-0 font-weight-bold">${data.author}</p>
          </div>
          <div class="row justify-content-between px-4">
            <div class="d-inline-block">
              ${starsHtml}
            </div>
            <p class="font-weight-bold">${data.duration}</p>
          </div>
        </div>
      </div>
  `;
  return card;
}
