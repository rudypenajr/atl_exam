document.addEventListener("DOMContentLoaded", function() {
  var sidebar = document.getElementsByClassName( 'sidebar' )[0];
  var sidebarUl = sidebar.getElementsByTagName( 'ul' )[0];
  var sidebarContent = document.getElementsByClassName( 'sidebar-content' )[0];
  var renderMainSection = function ( currData ) {
    var article = document.createElement( 'article' );
    var sidebarMCTemplate = document.getElementById( 'sidebar-main-content' ).innerHTML;
    var renderedSidebarMCTemplate = Mustache.to_html( sidebarMCTemplate, currData );

    article.className = 'current-article';
    article.innerHTML = renderedSidebarMCTemplate;
    sidebarContent.appendChild( article );
  };
  var toggleSection = function ( ) {
    console.log( this );
    var currentArticle = document.getElementsByClassName( 'current-article' )[0];
    var data = jsonData.items;

    // remove current article because we build new one
    currentArticle.parentNode.removeChild(currentArticle);

    for ( var i = 0; i < data.length; i++ ) {
      var currData = data[i];
      var id = this.getAttribute( 'data-id' );

      if ( currData.Id === id ) {
        // remove other active className
        var active = document.getElementsByClassName( 'active' )[0];
        active.classList.remove('active');

        // add active className
        this.className = 'active';

        // update main section
        currentArticle.innerHTML = "";
        renderMainSection( currData );
      }
    }
  };

  // start of logic
  if ( jsonData ) {
    var data = jsonData.items;

    for ( var i = 0; i < data.length; i++ ) {
      var currData = data[i];

      // sidebar
      var li = document.createElement( 'li' );
      var sidebarTemplate = document.getElementById( 'sidebar-item' ).innerHTML;
      var renderedSidebarTemplate = Mustache.to_html( sidebarTemplate, currData );

      li.dataset.id = currData.Id;
      li.className = "sidebar-list-items";
      if ( i === 0 ) {
        li.className = 'active ';
      }
      li.innerHTML = renderedSidebarTemplate;
      sidebarUl.appendChild( li );

      // set up event listener
      li.addEventListener( 'click', toggleSection );

      // content
      if ( i === 0 ) {
        renderMainSection( currData );
      }
    }
  }
});
