document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        dateClick: function(info) {
            openEventModal(info.dateStr);
        },
        eventClick: function(info) {
            openEventModal(info.event.startStr, info.event);
        }
    });

    calendar.render();

    // Populate the year select dropdown
    var yearSelect = document.getElementById('year-select');
    var currentYear = new Date().getFullYear();
    for (var i = currentYear - 10; i <= currentYear + 10; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        if (i === currentYear) {
            option.selected = true;
        }
        yearSelect.appendChild(option);
    }

    // Update calendar view based on selected year and month
    function updateCalendarView() {
        var selectedYear = yearSelect.value;
        var selectedMonth = document.getElementById('month-select').value;
        calendar.gotoDate(new Date(selectedYear, selectedMonth));
    }

    // Event listeners for year and month selection
    yearSelect.addEventListener('change', updateCalendarView);
    document.getElementById('month-select').addEventListener('change', updateCalendarView);

    // Set initial calendar view to the current month and year
    updateCalendarView();

    // Modal related code
    var modal = document.getElementById("event-modal");
    var span = modal.getElementsByClassName("close")[0];
    var eventForm = document.getElementById('event-form');
    var eventDateInput = document.getElementById('event-date');
    var eventTitleInput = document.getElementById('event-title');
    var saveButton = document.getElementById('save-button');
    var deleteButton = document.getElementById('delete-button');
    var modalTitle = document.getElementById('modal-title');
    var currentEvent = null;

    function openEventModal(dateStr, event = null) {
        eventDateInput.value = dateStr;
        eventTitleInput.value = event ? event.title : "";
        modalTitle.textContent = event ? "Edit Event" : "Add Event";
        saveButton.textContent = event ? "Save Changes" : "Add Event";
        deleteButton.style.display = event ? "inline-block" : "none";
        currentEvent = event;
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    eventForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var eventTitle = eventTitleInput.value;
        var eventDate = eventDateInput.value;

        if (eventTitle) {
            if (currentEvent) {
                // Update existing event
                currentEvent.setProp('title', eventTitle);
                // alert(`Event "${eventTitle}" has been updated.`);
            } else {
                // Add new event
                calendar.addEvent({
                    title: eventTitle,
                    start: eventDate,
                    allDay: true
                });
                // alert(`Event "${eventTitle}" has been added.`);
            }
            modal.style.display = "none";
            eventForm.reset();
            currentEvent = null;
        } else {
            alert('Please enter an event title');
        }
    });

    deleteButton.addEventListener('click', function() {
        if (currentEvent) {
            currentEvent.remove();
            // alert(`Event "${currentEvent.title}" has been deleted.`);
            modal.style.display = "none";
            eventForm.reset();
            currentEvent = null;
        }
    });
});
// document.addEventListener('DOMContentLoaded', function() {
//     const calendarEl = document.getElementById('calendar');
//     const eventModal = document.getElementById('event-modal');
//     const closeModal = document.querySelector('.close');
//     const eventForm = document.getElementById('event-form');
//     const eventDateInput = document.getElementById('event-date');
//     const eventTitleInput = document.getElementById('event-title');

//     let calendar;

//     // Function to initialize FullCalendar
//     function initializeCalendar() {
//         calendar = new FullCalendar.Calendar(calendarEl, {
//             initialView: 'dayGridMonth',
//             selectable: true,
//             dateClick: function(info) {
//                 eventDateInput.value = info.dateStr;
//                 eventModal.style.display = 'block';
//             },
//             eventClick: function(info) {
//                 if (confirm("Are you sure you want to delete this event?")) {
//                     info.event.remove();
//                     updateChart();
//                 }
//             }
//         });

//         calendar.render();
//     }

//     // Function to update the pie chart based on selected month and year
//     function updateChart() {
//         const monthSelect = document.getElementById('month-select');
//         const yearSelect = document.getElementById('year-select');
//         const selectedMonth = parseInt(monthSelect.value);
//         const selectedYear = parseInt(yearSelect.value);

//         // Retrieve stored data for the selected month and year
//         const expensesKey = `expenses_${selectedYear}_${selectedMonth}`;
//         const incomeKey = `income_${selectedYear}_${selectedMonth}`;
//         const expensesData = JSON.parse(localStorage.getItem(expensesKey)) || {};
//         const incomeData = JSON.parse(localStorage.getItem(incomeKey)) || {};

//         // Process the data for the chart
//         const dataLabels = Object.keys(expensesData);
//         const dataValues = Object.values(expensesData);

//         // Add income to chart data
//         if (incomeData.monthlyIncome || incomeData.otherIncome) {
//             dataLabels.push('Income');
//             dataValues.push((incomeData.monthlyIncome || 0) + (incomeData.otherIncome || 0));
//         }

//         // Create or update the chart
//         const ctx = document.getElementById('myChart').getContext('2d');
//         if (window.myPieChart) {
//             window.myPieChart.data.labels = dataLabels;
//             window.myPieChart.data.datasets[0].data = dataValues;
//             window.myPieChart.update();
//         } else {
//             window.myPieChart = new Chart(ctx, {
//                 type: 'pie',
//                 data: {
//                     labels: dataLabels,
//                     datasets: [{
//                         data: dataValues,
//                         backgroundColor: [
//                             'rgba(255, 99, 132, 0.2)',
//                             'rgba(54, 162, 235, 0.2)',
//                             'rgba(255, 206, 86, 0.2)',
//                             'rgba(75, 192, 192, 0.2)',
//                             'rgba(153, 102, 255, 0.2)',
//                             'rgba(255, 159, 64, 0.2)',
//                             'rgba(99, 255, 132, 0.2)'
//                         ],
//                         borderColor: [
//                             'rgba(255, 99, 132, 1)',
//                             'rgba(54, 162, 235, 1)',
//                             'rgba(255, 206, 86, 1)',
//                             'rgba(75, 192, 192, 1)',
//                             'rgba(153, 102, 255, 1)',
//                             'rgba(255, 159, 64, 1)',
//                             'rgba(99, 255, 132, 1)'
//                         ],
//                         borderWidth: 1
//                     }]
//                 },
//                 options: {
//                     responsive: true,
//                     plugins: {
//                         legend: {
//                             position: 'top',
//                         },
//                         tooltip: {
//                             callbacks: {
//                                 label: function(tooltipItem) {
//                                     return `${tooltipItem.label}: $${tooltipItem.raw}`;
//                                 }
//                             }
//                         }
//                     }
//                 }
//             });
//         }
//     }

//     // Populate year and month selectors
//     const yearSelect = document.getElementById('year-select');
//     const monthSelect = document.getElementById('month-select');

//     const currentYear = new Date().getFullYear();
//     for (let year = currentYear - 10; year <= currentYear + 10; year++) {
//         const option = document.createElement('option');
//         option.value = year;
//         option.text = year;
//         yearSelect.add(option);
//     }

//     yearSelect.value = currentYear;

//     // Set initial month to the current month
//     monthSelect.value = new Date().getMonth();

//     // Update the chart initially
//     updateChart();

//     // Event listener for updating the chart when month or year changes
//     monthSelect.addEventListener('change', updateChart);
//     yearSelect.addEventListener('change', updateChart);

//     // Initialize FullCalendar
//     initializeCalendar();

//     // Close the modal
//     closeModal.onclick = function() {
//         eventModal.style.display = 'none';
//     };

//     // Save event handler
//     eventForm.addEventListener('submit', function(event) {
//         event.preventDefault();
//         const eventData = {
//             title: eventTitleInput.value,
//             start: eventDateInput.value
//         };
//         calendar.addEvent(eventData);
//         eventModal.style.display = 'none';
//         eventForm.reset();
//         updateChart(); // Update chart after adding event
//     });

//     // Handle outside click for closing modal
//     window.onclick = function(event) {
//         if (event.target == eventModal) {
//             eventModal.style.display = 'none';
//         }
//     };
// });
