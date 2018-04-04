
$( document ).ready(function(){

    $(".dropdown-button").dropdown();
    $(".button-collapse").sideNav();



    $(window).scroll(function() {
        var scroll_top = $(this).scrollTop();
        var sample_section_top = $(".sample-section").offset().top;
        var header_height = $(".sample-header-section").outerHeight();
        $(".sample-section").css({ "margin-top": header_height });
        $(".sample-header").css({ height: header_height - scroll_top });
    });

    
    $(window).resize(function() {
        var scroll_top = $(this).scrollTop();
        var sample_section_top = $(".sample-section").offset().top;
        var header_height = $(".sample-header-section").outerHeight();
        $(".sample-section").css({ "margin-top": header_height });
        $(".sample-header").css({ height: header_height - scroll_top });
    });


    $(".heart").click(function () {
        $(this).toggleClass("red");
        //I am liking it    
    });
    
    
    $(".liked-heart").click(function () {
        $(this).toggleClass("black");
        //I am disliking it
    });
    
    $('.datepicker').pickadate({
        min: new Date(),
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 1, // Creates a dropdown of 15 years to control year
        firstDay: 1
      });    

    $('#beginDate').pickadate('picker').set('select', new Date());
    $('#endDate').pickadate('picker').set('select', new Date());

    $('.datepicker').on('change' ,function(){
        if( $(this).attr('id') === 'beginDate') {
            $('#endDate').pickadate('picker').set('min', $(this).val());
        }
        if( $(this).attr('id') === 'endDate') {
            $('#beginDate').pickadate('picker').set('max', $(this).val());
        }
    });
    
    
     $('select').material_select();    
});


    
$("#successAlert").hide();
$('#like').click(function(){
$("#successAlert").slideDown();
});
$("#close").click(function(){
$("#successAlert").fadeOut();
});


particlesJS.load('particles-js', '../json/particles.json', function(){
    console.log('particles.json loaded!');
});

anime({
    targets : '#booking_page',
    translateY : '20vh',
    duration : 10000
  });

anime({
    targets : '#anime .el',
    translateX : '40vw',
    direction : 'alternate',
    loop : true,
    duration : function(el, i, l) {
        return 2000 + (i * 1000);
      },
    elasticity : function(el, i, l) {
    return 200 + (i * 200);
    }
});

