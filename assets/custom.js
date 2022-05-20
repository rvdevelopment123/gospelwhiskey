/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 
 
 document.documentElement.dispatchEvent(new CustomEvent('product:added', {
              bubbles: true,
              detail: {
                variant: _this8.currentVariant,
                quantity: parseInt(formElement.querySelector('[name="quantity"]').value)
              }
            }));
 
 
 
 
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */
function simulateClick(elem) {
  var rect = elem.getBoundingClientRect(), // holds all position- and size-properties of element
      topEnter = rect.top,
      leftEnter = rect.left, // coordinates of elements topLeft corner
      topMid = topEnter + rect.height / 2,
      leftMid = topEnter + rect.width / 2, // coordinates of elements center
      ddelay = (rect.height + rect.width) * 2, // delay depends on elements size
      ducInit = {bubbles: true, clientX: leftMid, clientY: topMid}, // create init object
      // set up the four events, the first with enter-coordinates,
      mover = new MouseEvent('mouseover', {bubbles: true, clientX: leftEnter, clientY: topEnter}),
      // the other with center-coordinates
      mdown = new MouseEvent('mousedown', ducInit),
      mup = new MouseEvent('mouseup', ducInit),
      mclick = new MouseEvent('click', ducInit);
  // trigger mouseover = enter element at toLeft corner
  elem.dispatchEvent(mover);
  // trigger mousedown  with delay to simulate move-time to center
  window.setTimeout(function() {elem.dispatchEvent(mdown)}, ddelay);
  // trigger mouseup and click with a bit longer delay
  // to simulate time between pressing/releasing the button
  window.setTimeout(function() {
    //elem.dispatchEvent(mup);
    elem.dispatchEvent(mclick);
  }, ddelay * 1.2);
}

$(".AspectRatio.AspectRatio--withFallback").hover(function () {
    $(this).toggleClass("result_hover");
 });

 function addToCart(me) {
   var $this = $(me);
   var ID = $(me).attr("data-var_id");
   addItemToCart( ID, 1);    // paste your id product number
   $("#cart_a").removeAttr("href");
   simulateClick(document.querySelector("#cart_a"));
   $this.text('Added!');
 }

 $.get("https://ipinfo.io", function(response) {
  console.log('User Info')
    console.log(response.city, response.country);
    if(response.country == "US"){
      //TODO: Create Pop up later
      window.location.href = "https://usa.thegospelwhiskey.com/"
    }
}, "jsonp");

$("#AUS").click(function(item) {
  document.cookie = "country=AUS";
  window.location.reload()
  console.info(getCookie('country'))

})
$("#USA").click(function(item) {
  window.location.href = "https://usa.thegospelwhiskey.com/"
  // document.cookie = "country=USA";
  // window.location.reload()
  // console.info(getCookie('country'))
})


 var currentCountry = 'AUS';
 var country = getCookie('country')
 if(country != ''){
   currentCountry = country
   $("#displayCountry").html(country)
 }
 console.log('Current Country ' + currentCountry)
 if(currentCountry != 'AUS'){
    $('.ProductItem').hide()
    $('.'+currentCountry).show()
    // $('.ProductItem').remove()
    $(".CollectionToolbar__Item").hide()
    $("button[destination='/collections/all']").show()
    $("a[href='/pages/discover-the-gospel-our-community']").attr('href', '/pages/discover-the-gospel-our-community-usa')
    
 }
 
function addItemToCart(variant_id, qty) {
  
  data = {
    "id": variant_id,
    "quantity": qty
  }
  jQuery.ajax({
    type: 'POST',
    url: '/cart/add.js',
    data: data,
    dataType: 'json',
    success: function() { 
      document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
        bubbles: true  //this code is for prestige theme, is to refresh the cart
      }));
      document.documentElement.dispatchEvent(new CustomEvent('cart:open', {
        bubbles: true  //this code is for prestige theme, is to refresh the cart
      }));
    }   
    
  }); 
 
}