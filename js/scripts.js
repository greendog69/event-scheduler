const startTime = 9;    
const endTime = 17;     
const defaultText = 'Add Item and Click Save'; // Default place holder text

let workHours = [];     //Array Holds our work hours

$( document ).ready(function() {
    initHours();
    //set today's day into field
    $('#dateToday').html(moment().format('dddd, MMMM Do'));
    displayTimes('#hours');
    $(document).on('click','.save-button',(e) => {
        if (!e.target) {
            return;
        }
        saveData(e.target)
    });
});

function initHours() { 
    const hourRightNow = new Date().getHours();
    for (let hour = startTime; hour <= endTime; hour++) {
        workHours.push(
            {
                hour: moment({hour}).format('ha'),
                isNow: hourRightNow == hour,
                isPast: hourRightNow > hour,
                isFuture: hourRightNow < hour,
            });
    }
}

function displayTimes(container) {
    if (!workHours || workHours.length == 0 || !container) {
        return;
    }

    const containerData = workHours.map(x => {
        const isPast = x.isPast ? 'past' : '';
        const isFuture = x.isFuture ? 'future' : '';
        const isNow = x.isNow ? 'present' : '';
        const hourClass = isPast || isFuture || isNow;
        return `<li class='hour-time pointer list-group-item ${hourClass}' data-id='${x.hour}'>
            <div class="row">
                <div class="col-sm-1 time text-right font-weight-bold"><span class="time-display mr-1 mt-3">${x.hour}</span></div>
                <div class="col-sm-10 event"><textarea placeholder="${defaultText}" id="${x.hour}-textarea" class="event-input">${getData(x.hour)}</textarea></div>
                <div class="col-sm-1 save"><button type="button" data-row-id="${x.hour}" class="save-button btn btn-info">Save</button></div>
            </div>
        </li>`;
    });
    $(container).append(...containerData);
}

function getData(time) {
    if (!time) {
        return '';
    }

    const timeNote = localStorage.getItem(time);
    return timeNote ? timeNote : '';
}

function saveData(saveElement) {
    if(!saveElement) {
        return;
    }

    const rowId = $(saveElement).data('row-id');
    if (!rowId) {
        return;
    }
    const rowInput = $(`#${rowId}-textarea`).val();
    localStorage.setItem(rowId, rowInput);
}
