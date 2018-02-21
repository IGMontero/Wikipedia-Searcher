let $searchInput = $("#search-input"),
    $mainContainer = $("#main-container"),
    $searchContainer = $("#search-container"),
    $searchButton = $("#search-button"),
    $resultList = $("#result-list"),
    $eraseButton = $("#erase-button"),
    $randomButton = $("#random-button");


$("document").ready(function(){
  
  $searchInput.empty();
  
  $eraseButton.on("click",function(){
    $searchInput.empty();
    $searchInput.val("");
    $resultList.empty();
  })
  
  //-----SEARCH  BUTTON---//
  
  $searchButton.on("click",function(){
    
  if(!$searchInput.val()){
    return;
  }
  
  //empty last search
    $resultList.empty();
    
  
  
  $.ajax({
            url: "https://en.wikipedia.org/w/api.php",
            dataType: "jsonp",
            data: {
                'action': "query",
                'list':"search",
                'format': "json",
                'srsearch': $searchInput.val()
            },

            success: function (data) {
              data.query.search.forEach((result)=>{
                var newLi = $("<li class=\"\"></li>");
                var newAnchor = $("<a></a>");
                var newDiv = $("<div class=\"container result\"></div>");
                var pTitle = $("<p class=\"h4\">"+result.title+"</p>");
                var pDescription = $("<p class=\"lead\">"+result.snippet+"</p>");
                newDiv.append(pTitle);
                newDiv.append(pDescription);
                newAnchor.append(newDiv);
                newLi.append(newAnchor);
                $resultList.append(newLi);
            
                var pageId = result.pageid;
                newAnchor.attr("href","https://en.wikipedia.org/?curid="+pageId);
                
                
              })
            }
        });
    
  
  });//searchbutton click
  
  //----FEELING LUCKY BUTTON--///
  
  $randomButton.on("click",()=>{
    var url= "https://en.wikipedia.org/w/api.php?callback=";
    
    $.ajax({
      url: "https://en.wikipedia.org/w/api.php",
      dataType:"jsonp",
      data:{
        'action' : 'query',
        'format': 'json',
        'list' : 'random',
        'rnlimit':1
        },
      success: function(data){
      var pageId = data.query.random[0].id;
        window.location= "https://en.wikipedia.org/?curid="+pageId;
    }
    });
  });
  
});//ready