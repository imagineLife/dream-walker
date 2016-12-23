const LINE_CHART = $("#lineChart");
const DOUGHNUT_CHART = $("#doughnutChart");

Chart.defaults.global.animation.duration = 3000;

function getDreamEntries(callbackFn) {
  $.ajax({
    url: "/dreams/demo",
    async: true,
    type: 'GET',
    dataType: 'json',

    success: function(data) {
      console.log(data);
      dateArray = [];
      hoursArray = [];
      dreamTypeArray = [];

      let normalCounter = 0;
      let lucidCounter = 0;
      let nightmareCounter = 0;
      let recurringCounter = 0;
      let doubleCounter = 0;

      if(data) {
        for (let i = 0; i < data.length; i++) {
          dateArray.unshift(data[i].created);
          hoursArray.unshift(data[i].hoursSlept);

          if (data.length > 30) {
            dateArray = dateArray.slice(-30);
            hoursArray = hoursArray.slice(-30);
          }

          if (data[i].type === 'Normal') {
            normalCounter++;
          }
          else if (data[i].type === 'Lucid') {
            lucidCounter++;
          }
          else if (data[i].type === 'Nightmare') {
            nightmareCounter++;
          }
          else if (data[i].type === 'Recurring') {
            recurringCounter++;
          }
          else if (data[i].type === 'Double') {
            doubleCounter++;
          }
        }

console.log(dateArray)

        dreamTypeArray.push(normalCounter);
        dreamTypeArray.push(lucidCounter);
        dreamTypeArray.push(nightmareCounter);
        dreamTypeArray.push(recurringCounter);
        dreamTypeArray.push(doubleCounter);

      const sleepChart = new Chart(LINE_CHART, {
        type: 'line',
        data: {
          labels: dateArray,
          datasets: [
            {
              label: "Hours Slept",
              fill: true,
              lineTension: 0,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 3,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 3,
              pointRadius: 5,
              pointHitRadius: 10,
              data: hoursArray,
              spanGaps: false,
            }
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });

      $(window).on('scroll',function() {
    if (checkVisible($('#doughnutChart'))) {
        const dreamChart = new Chart(DOUGHNUT_CHART, {
        type: 'doughnut',
        data: {
          labels: ['Normal', 'Lucid', 'Nightmare', 'Recurring', 'Double'],
          datasets:[
            {
              label: 'Points',
              backgroundColor: ['#54c6ff', '#ff7ae0', '#bc7aff', '#fffc7a', '#7afffc'],
              data: dreamTypeArray
            }
          ]
        },
        options:{
          animation: {
            animateScale: true
          }
        }
      });
        $(window).off('scroll');
    } else {
        // do nothing
    }
});

function checkVisible( elm, eval ) {
    eval = eval || "object visible";
    var viewportHeight = $(window).height(), // Viewport Height
        scrolltop = $(window).scrollTop(), // Scroll Top
        y = $(elm).offset().top,
        elementHeight = $(elm).height();

    if (eval == "object visible") return ((y < (viewportHeight + scrolltop)) && (y > (scrolltop - elementHeight)));
    if (eval == "above") return ((y < (viewportHeight + scrolltop)));
}

      } // if statement close
    }, //success function close

    error: function() {
      console.log('something went wrong');
    }
  });
}


$(function() {
  getDreamEntries();
});