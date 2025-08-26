<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Models\ContactMessage;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Show the contact form
     */
    public function index()
    {
        return Inertia::render('Contact');
    }

    /**
     * Handle the contact form submission
     */
    public function store(Request $request)
    {
        // Validáció
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:1000',
        ]);

        // Üzenet mentése adatbázisba
        ContactMessage::create($validated);

        Mail::to('test@example.com')->send(new ContactFormMail($validated));

        // optional logging removed for cleaner production logs

        // Sikeres válasz
        return back()->with('success', 'Üzenetét sikeresen elküldtük! Hamarosan válaszolunk.');

        // Alternatíva: redirect a contact oldalra
        // return redirect()->route('contact.index')->with('success', 'Üzenetét sikeresen elküldtük!');
    }
}
