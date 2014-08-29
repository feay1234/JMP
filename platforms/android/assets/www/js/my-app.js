
// document.addEventListener("deviceready", onDeviceReady, false);
// function onDeviceReady() {
  var user_id = "51";
  // Initialize phonegap features
  // document.addEventListener("backbutton", function (e) {
  //     e.preventDefault();
  // }, false );

  // Initialize variables
  var first_time = true;
  var project_id = "";

  // Initialize your app
  var myApp = new Framework7({
      // preprocess: function (content, url, next) {
          // if (url === 'pathways.html') {
          //     var template = Handlebars.compile(content);
          //     $.ajax({ type: "GET",   
          //              url: "http://api.ptp.jmpextra.net/pathway?project_id=53dbe46798789b5f4b8b4567", 
          //              dataType: "json",
          //              success : function(data)
          //              {
          //               data = data.data;
          //               var resultContent = template({
          //                   title: 'People',
          //                   people: data
          //               })
          //               next(resultContent);

          //              },
          //              error: function(XMLHttpRequest, textStatus, errorThrown) { 
          //                    console.log(XMLHttpRequest+" "+textStatus+" "+errorThrown);

          //              } 
          //     });
              
          // }
          // else if (url === 'option.html'){
          //     console.log(url);

          // }

      // }
  });

  // Export selectors engine
  var $$ = Framework7.$;

  // Add views
  var leftView = myApp.addView('.view-left', {
      // Because we use fixed-through navbar we can enable dynamic navbar
      dynamicNavbar: true
  });
  var mainView = myApp.addView('.view-main', {
      // Because we use fixed-through navbar we can enable dynamic navbar
      dynamicNavbar: true,
  });


  $$(document).on('pageInit', function (e) {
    var page = e.detail.page;
    if (page.name === 'index-1') {
      // console.log('feay1234 index')

    }

    if (page.name === 'projects'){
      if(first_time){
        getProjects(user_id);
        first_time = false;
      }
    }

    if (page.name === 'pathways'){
      project_id = page.query.id;
      getPathways(user_id, project_id);

    }

    if (page.name === 'streetlist'){
      getStreetList(user_id, project_id);
    }


    if (page.name === 'options'){
      // project_id = page.query.id;
      first_time = true;
    }

    if (page.name === 'households'){
      var page_num = 1;
      getHouseholds(project_id, page_num);
      $$('.household-search').on('click', function () {

        myApp.modal({
            title:  'JMP',
            text: 'Search By',
            buttons: [
              {
                text: 'Address',
                onClick: function() {
                  myApp.prompt('Search Query By Address.', 'JMP', function (value) {

                  });
                }
              },
              {
                text: 'ID',
                onClick: function() {
                  myApp.prompt('Search Query By ID', 'JMP', function (value) {

                  });
                }
              },
            ]
          })
      });
      // Loading flag
      var loading = false;
       
      // Attach 'infinite' event handler
      $$('.infinite-scroll').on('infinite', function () {
       
        // Exit, if loading in progress
        if (loading) return;
       
        // Set loading flag
        loading = true;
       
        // Emulate 1s loading
        setTimeout(function () {
          // Reset loading flag
          loading = false;
       
          // if (page_num >= last_page) {
          //   // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
          //   myApp.detachInfiniteScroll($$('.infinite-scroll'));
          //   // Remove preloader
          //   $$('.infinite-scroll-preloader').remove();
          //   return;
          // }
       
          page_num++;
          getHouseholds(project_id, page_num);
        }, 1000);
      });
    }

    if (page.name === 'engage-form'){
      $("#challengeAddBtn").click(function(){
        createChallenge();
      })
      $('#engageBtn').click(function () {
          var formData = myApp.formToJSON('#engage-form');
          if(formData.select == ""){
            myApp.modal({
                title:  'Enter Number (0 - 100)',
                text: '<div class="item-input">'+
                        '<input id="numberInput" type="number" name="txtNumber" autofocus/>'+
                      '</div>', 
                buttons: [
                  {
                    text: 'Cancel',
                    bold: true,
                    onClick: function() {
                      $('#isAgeSelected').click();
                      var formData = {
                          'select': [''],
                        }
                      myApp.formFromJSON('#my-form', formData);
                    }
                  },
                  {
                    text: 'Enter',
                    bold: true,
                    onClick: function() {
                      var number = $("#numberInput").val();
                      if(number.match(/^\d+$/)) {
                          if(number >= 0 && number <= 100){
                            $("#txtAge").text(number);
                          }
                          else{
                            myApp.alert("Please enter number between 0 to 100.")
                            $('#isAgeSelected').click();
                            var formData = {
                                'select': [''],
                              }
                            myApp.formFromJSON('#my-form', formData);
                          }
                      }
                      else{
                        myApp.alert("Please enter only number.")
                        $('#isAgeSelected').click();
                        var formData = {
                            'select': [''],
                          }
                        myApp.formFromJSON('#my-form', formData);
                      }
                      
                    }
                  },
                ]
              })
          }
          else{
            $("#txtAge").text(0);
          }
          $("#txtAge").toggle(this.checked);
      });
    }
    if (page.name === 'episode-new-form'){
      $("#challengeAddBtn").click(function(){
        createChallenge();
      })
      $('#episodeBtn').click(function () {
          var formData = myApp.formToJSON('#episode-new-form');
          if(formData.select == ""){
            myApp.modal({
                title:  'Enter Number (0 - 100)',
                text: '<div class="item-input">'+
                        '<input id="numberInput" type="number" name="txtNumber" autofocus/>'+
                      '</div>', 
                buttons: [
                  {
                    text: 'Cancel',
                    bold: true,
                    onClick: function() {
                      $('#isAgeSelected').click();
                      var formData = {
                          'select': [''],
                        }
                      myApp.formFromJSON('#my-form', formData);
                    }
                  },
                  {
                    text: 'Enter',
                    bold: true,
                    onClick: function() {
                      var number = $("#numberInput").val();
                      if(number.match(/^\d+$/)) {
                          if(number >= 0 && number <= 100){
                            $("#txtAge").text(number);
                          }
                          else{
                            myApp.alert("Please enter number between 0 to 100.")
                            $('#isAgeSelected').click();
                            var formData = {
                                'select': [''],
                              }
                            myApp.formFromJSON('#my-form', formData);
                          }
                      }
                      else{
                        myApp.alert("Please enter only number.")
                        $('#isAgeSelected').click();
                        var formData = {
                            'select': [''],
                          }
                        myApp.formFromJSON('#my-form', formData);
                      }
                      
                    }
                  },
                ]
              })
          }
          else{
            $("#txtAge").text(0);
          }
          $("#txtAge").toggle(this.checked);
      });
    }
    
    if (page.name === 'individual') {
      console.log('individual')
    		// Loading flag
    		var loading = false;
    		 
    		// Last loaded index
    		var lastIndex = $$('.list-block li').length;
    		 
    		// Max items to load
    		var maxItems = 60;
    		 
    		// Append items per load
    		var itemsPerLoad = 20;
    		 
    		// Attach 'infinite' event handler
    		$$('.infinite-scroll').on('infinite', function () {
    		 
    		  // Exit, if loading in progress
    		  if (loading) return;
    		 
    		  // Set loading flag
    		  loading = true;
    		 
    		  // Emulate 1s loading
    		  setTimeout(function () {
    		    // Reset loading flag
    		    loading = false;
    		 
    		    if (lastIndex >= maxItems) {
    		      // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
    		      myApp.detachInfiniteScroll($$('.infinite-scroll'));
    		      // Remove preloader
    		      $$('.infinite-scroll-preloader').remove();
    		      return;
    		    }
    		 
    		    // Generate new items HTML
    		    var html = '';
    		    for (var i = lastIndex + 1; i <= lastIndex + itemsPerLoad; i++) {
    		      html += '<li class="item-content"><div class="item-inner"><div class="item-title">Item ' + i + '</div></div></li>';
    		    }
    		 
    		    // Append new items
    		    $$('.list-block ul').append(html);
    		 
    		    // Update last loaded index
    		    lastIndex = $$('.list-block li').length;
    		  }, 1000);
    		});  
        
        
        $$('.individual-search').on('click', function () {

          myApp.modal({
              title:  'JMP',
              text: 'Search By',
              buttons: [
                {
                  text: 'Detail',
                  onClick: function() {
                    myApp.prompt('Search Query By Detail', 'JMP', function (value) {

                    });
                  }
                },
                {
                  text: 'ID',
                  onClick: function() {
                    myApp.prompt('Search Query By ID', 'JMP', function (value) {

                    });
                  }
                },
              ]
            })

          
        });
    }
  })

  
  if(first_time){

    getProjects(user_id);
    first_time = false;
  }
// phonegap ending
  
  

  
  
// }




