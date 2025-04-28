$(function () {
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();
        $('#response').empty();

        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const subject = $('#subject').val().trim();
        const message = $('#message').val().trim();
        const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !subject || !message) {
            $('#response').text('Please fill in all required fields.');
            return;
        }
        if (!emailRx.test(email)) {
            $('#response').text('Please enter a valid email address.');
            return;
        }

        // Başarılıysa kullanıcıya yanıt ver:
        $('#response')
            .css('color', 'green')
            .text(`Thank you, ${name}! We’ve received your message on "${subject}".`);
        $(this)[0].reset();
    });
});
