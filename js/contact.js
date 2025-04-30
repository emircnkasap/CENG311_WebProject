$(function () {
    //Sekmeleri başlatır (Contact Form ve FAQ arasında geçiş)
    $("#contact-tabs").tabs();

    //Accordion’u başlatır (FAQ sorularını aç/kapa)
    $("#faq-accordion").accordion({
        collapsible: true,
        active: false
    });

    //Datepicker’ı başlatır (tarih seçimi için takvim)
    $("#contactDate").datepicker({
        dateFormat: "mm/dd/yy"
    });

    //jQuery Validate ile form doğrulama
    $("#contactForm").validate({
        // Kurallar
        rules: {
            name: "required",
            email: { required: true, email: true },
            subject: "required",
            message: "required"
        },
        // Hata mesajları
        messages: {
            name: "Please enter your name",
            email: "Enter a valid email",
            subject: "Please enter a subject",
            message: "Please enter a message"
        },
        // Başarılı doğrulamada çalışır
        submitHandler: function (form) {
            const name = $("#name").val();
            // Kullanıcıya teşekkür mesajı göster ve formu sıfırla
            $("#response")
                .css("color", "green")
                .text(`Thank you, ${name}! We'll be in touch soon.`);
            form.reset();
        }
    });
});
