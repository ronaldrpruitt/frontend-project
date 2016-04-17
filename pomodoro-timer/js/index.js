  $(document).ready(function() {

    var startingTime = 0;
    var breakTime = 0;
    var count = 0;
    var isBreakActive = false;
    var startStop = '#start-stop';

    //Button functionality object 
    var buttonClass = {
      reset: function() {
        timer.stop();
        startingTime = 0;
        breakTime = 0;
        count = startingTime;
        isBreakActive = false;
        $('#session').html(count);
        buttonClass.start();
        $('#time').text(startingTime);
        $('#breakTime').text(breakTime);
      },
      start: function() {
        $(startStop).html('start');
      },
      stop: function() {
        $(startStop).html('stop');
      },
      pause: function() {
        $(startStop).html('pause');
      },
      addTime: function() {
        startingTime++;
        $('#time').text(startingTime);
      },
      subTime: function() {
        if (startingTime !== 0) {
          startingTime--;
        }
        $('#time').text(startingTime);
      },
      addBreak: function() {
        breakTime++;
        $('#breakTime').text(breakTime);
      },
      subBreak: function() {
        if (breakTime !== 0) {
          breakTime--;
        }
        $('#breakTime').text(breakTime);
      },
      resume: function() {
        $(startStop).html('resume');
      }
    };
    // Add session time +
    $('#timeAdd').click(function() {
      buttonClass.addTime();
    });
    // Subtrack session time -
    $('#timeSub').click(function() {
      buttonClass.subTime();
    });
    // Add break time +
    $('#breakAdd').click(function() {
      buttonClass.addBreak();
    });
    // Subtrack break time -
    $('#breakSub').click(function() {
      buttonClass.subBreak();
    });

    $(startStop).click(function() {
      var buttonStatus = $(startStop).html();

      //check status of button
      if (buttonStatus == 'start' && startingTime !== 0) {
        //change button to pause
        buttonClass.pause();
        //set count from user time selection
        count = startingTime * 60;
        //setup timer
        timer = $.timer(function() {

          //stop timer after break count is 0
          if (count === 0 && isBreakActive) {
            buttonClass.reset();
          }
          //when session is 0, check if break time is greater than 0
          if (count === 0 && breakTime > 0) {
            count = breakTime * 60;
            isBreakActive = true;
          }
          //stop timer when 0 is reached
          if (count === 0 && breakTime == 0) {
            buttonClass.reset();
          }
          //display count
          $('#session').html(count);
          count--;

          //Blink session text when active
          if (!isBreakActive && count > 0) {
            $('.sess').fadeOut(500).fadeIn(500);
          }
          //Blink break text when active
          if (isBreakActive && count > 0) {
            $('.bre').fadeOut(500).fadeIn(500);
          }
        });
        //start timer
        timer.set({
          time: 1000,
          autostart: true
        });
      }

      //if button text displays pause, pause timer and set text to resume
      if (buttonStatus == 'pause') {
        timer.pause();
        buttonClass.resume();
      };
      //if button text displays resume, start timer and set text to pause 
      if (buttonStatus == 'resume') {
        timer.play();
        buttonClass.pause();
      };

    });

    //if reset button is clicked, reset back to default settings
    $('#reset').click(function() {
      buttonClass.reset();
    });
  });