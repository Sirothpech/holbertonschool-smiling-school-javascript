
$(document).ready(function() {
    console.log("ready!");
    $.ajax({
        url: "https://smileschool-api.hbtn.info/quotes",

        method: "GET",

        dataType: "json",

        success: function(data) {
            console.log(data);
            for(let i = 0; i < data.length; i++)
            { let active = "";
              if (i === 0) { active = 'active'}
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
            `
              $("#carousel").append(carouselItem)
            }
        },
    })
    .done(function(){
      $('div.loader').hide()
    })
    
});
