<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactFormMail extends Mailable
{
    use Queueable;
    use SerializesModels;

    // A változó, amely az e-mail tartalmához szükséges adatokat tárolja
    public $contactData;

    /**
     * A konstruktor, amely inicializálja az e-mail tartalmához szükséges adatokat.
     *
     * @param array $contactData Az űrlapból érkező adatok (név, e-mail, tárgy, üzenet).
     */
    public function __construct($contactData)
    {
        // Az adatokat hozzárendeljük a publikus változóhoz, hogy a sablonban elérhetők legyenek
        $this->contactData = $contactData;
    }

    /**
     * Az e-mail felépítése.
     *
     * @return $this Az e-mail konfigurációja (tárgy, nézet, adatok).
     */
    public function build()
    {
        // Az e-mail tárgyának beállítása
        return $this->subject('Új kapcsolatfelvételi üzenet: ' . $this->contactData['subject'])
                    // Az e-mail sablonjának megadása
                    ->view('emails.contact')
                    // Az adatok átadása a sablonnak
                    ->with('contactData', $this->contactData);
    }
}
