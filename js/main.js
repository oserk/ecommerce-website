$(document).ready(function () {
  $("#menu").click(function () {
    $(this).toggleClass("fa-times");
    $(".navbar").toggleClass("nav-toggle");
  });

  $(window).on("scroll load", function () {
    $("#menu").removeClass("fa-times");
    $(".navbar").removeClass("nav-toggle");

    if ($(window).scrollTop() > 68) {
      $("header .header-2").addClass("header-active");
    } else {
      $("header .header-2").removeClass("header-active");
    }

    $("section").each(function () {
      let height = $(this).height();
      let offset = $(this).offset().top - 200;
      let top = $(window).scrollTop();
      let id = $(this).attr("id");

      if (top >= offset && top < offset + height) {
        $(".navbar ul li a").removeClass("active");
        $(".navbar").find(`[href="#${id}"]`).addClass("active");
      }
    });
  });

  $(".home-slider").owlCarousel({
    items: 1,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 8000,
    loop: true,
  });

  $(".small-image img").click(function () {
    $(this).addClass("image-active").siblings().removeClass("image-active");
    let image = $(this).attr("src");
    $(".big-image img").attr("src", image);
  });

  $(".gallery .btn").click(function () {
    let filter = $(this).attr("data-filter");
    if (filter == "all") {
      $(".gallery .box").show(400);
    } else {
      $(".gallery .box")
        .not("." + filter)
        .hide(200);
      $(".gallery .box")
        .filter("." + filter)
        .show(400);
    }

    $(this).addClass("button-active").siblings().removeClass("button-active");
  });
});

$(document).ready(function () {
  $.post({
    url: "https://api.akilliticaretim.com/api/Auth/Login",
    data: JSON.stringify({
      username: "user",
      password: "123456",
    }),
    headers: {
      GUID: "0739-E657-C4F4-98B4",
      "Content-Type": "application/json",
    },
    success: function (data, status) {
      var token = data.data.token;
      var page = 1;
      $.post({
        data: JSON.stringify({}),
        url: "https://api.akilliticaretim.com/api/Product/ListProducts",
        headers: {
          GUID: "0739-E657-C4F4-98B4",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        success: function (data, status) {
          var result = "";
          for (let i = 1; i < 9; i++) {
            console.log(data);
            console.log(data.data[i].price);
            result += `
            <div class="box">
            <div class="image">
              <img src="images/arr-img1.png" alt="" />
            </div>
            <div class="info">
              <h3>${data.data[i].name}</h3>
              <div class="subInfo">
                <strong class="price"> ${data.data[i].price} ${data.data[i].currency} <p id="oser"></p></span> </strong>
                <div class="stars">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star-half"></i>
                </div>
              </div>
            </div>
            <div class="overlay">
              <a href="#" style="--i: 1" class="fas fa-heart"></a>
              <a href="#" style="--i: 2" class="fas fa-shopping-cart"></a>
              <a href="#" style="--i: 3" class="fas fa-search"></a>
            </div>
          </div>
              `;
          }
          $("#products").append(result);
        },
      });
    },
  });
});
