// Slider object
var Slider = function( settings ) {
   this.items = settings.items;
   this.NUMBER_OF_ITEMS = this.items.length;
   this.container = settings.container;
   this.interval = settings.time * 1000 || 4000;
   this.currentIndex = 0;
   this.paginationList = null;
   this.settings = {
      pagination: settings.pagination || true,
      interval: settings.interval * 1000 || 4000,
      animation: settings.animation || "fade"
   };
   this.init();
};

// Pagination object
var Pagination = function() {
   this.ul = document.createElement( "ul" );
};

Pagination.prototype.createItems = function( n ) {
   var CLASS_NAME = "pagination";
   var li, span;
   this.ul.className = CLASS_NAME;
   
   for ( var i = 0; i < n; i++ ) {
      li = document.createElement( "li" );
      span = document.createElement( "span" );
      span.innerHTML = i;
      li.className = CLASS_NAME+"__item";
      li.appendChild( span );
      this.ul.appendChild( li );
   }
};

Slider.prototype.init = function( that ) {
   // Set container's width
   this.container.style.width = 100 * this.items.length + "%";
   
   // Create pagination and append it
   var pag = new Pagination();
   pag.createItems( this.items.length );
   this.container.parentNode.appendChild( pag.ul );
   
   // Set items width
   for ( var i = 0; i < this.NUMBER_OF_ITEMS; i++ ) {
      this.items[i].style.width = 100 / this.NUMBER_OF_ITEMS + "%";
   }
   
   // Start sliding
   this.slide();
   
   // Listen index navigation
   this.goToIndex();
};

Slider.prototype.updateIndexItem = function() {
   var indexItem = document.querySelectorAll( ".pagination__item" ); 
   var l = indexItem.length;
   for ( var i = 0; i < l; i++ ) {
      indexItem[i].className = "pagination__item";
   }
   
   indexItem[this.currentIndex].className += " pagination__item--current";
};

Slider.prototype.slide = function( that ) {
   var that = this;
   var indexItem = document.querySelectorAll( ".pagination__item" ); 
   indexItem[0].className += " pagination__item--current";
   
   // Update container's left position
   setInterval( function() {
      // Reset current index when is greaters than the number of elements
      if ( that.currentIndex >= that.items.length-1 ) { that.currentIndex = 0; }
      that.container.style.left = -100 * that.currentIndex + "%";
      that.updateIndexItem();
      // Increment index
      that.currentIndex++;
   }, this.interval );
};

Slider.prototype.goToIndex = function() {
   var indexItems = document.querySelectorAll( ".pagination__item" );
   var l = indexItems.length;
   var that = this;
   for ( var i = 0; i < l; i++ ) {
      indexItems[i].addEventListener("click", function( event ) {
      var n = this.getElementsByTagName( "span" )[0].innerHTML;
      var index = parseInt( n );
      // Update current index
      that.currentIndex = index;
      // Update pagination index
      that.updateIndexItem();
      // Set slide position
      that.container.style.left = -100 * index + "%"; 
      }, false);
   }
};

var sliderTest = new Slider({ 
   items: document.querySelectorAll( ".slider__item" ), 
   container: document.getElementById( "gameScreenshotsSlider" ),
   interval: 3.5
});