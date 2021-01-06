$(document).ready(function () {
    $('#dentist').click(function () {
        $('#dentist-form').addClass('d-block')
        $('#dentist-form').removeClass('d-none')
        $('#technician-form').addClass('d-none')
        $('#technician-form').removeClass('d-block')
    });
    $('#technician').click(function () {
        $('#dentist-form').addClass('d-none')
        $('#dentist-form').removeClass('d-block')
        $('#technician-form').addClass('d-block')
        $('#technician-form').removeClass('d-none')
    });
});