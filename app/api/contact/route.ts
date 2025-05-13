import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configuration Gmail pour la production
interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
    contactReason: string;
}

interface MailOptions {
    from: string;
    to: string;
    replyTo: string;
    subject: string;
    text: string;
    html: string;
}

export async function POST(request: Request): Promise<Response> {
    try {
        // Récupération des données du formulaire
        const formData: ContactFormData = await request.json();
        
        // Validation des données
        const { name, email, subject, message, contactReason } = formData;
        
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'Tous les champs sont requis' },
                { status: 400 }
            );
        }
        
        // Vérification de l'email avec une regex simple
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Format d\'email invalide' },
                { status: 400 }
            );
        }
        
        console.log('Configuration du transporteur pour Gmail...');
        
        // Configuration pour Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER as string,
                pass: process.env.GMAIL_APP_PASSWORD as string, // Mot de passe d'application, pas votre mot de passe Gmail principal
            },
        });
        
                // Formatage de l'email
        const mailOptions: MailOptions = {
            from: `"Formulaire de contact" <${process.env.GMAIL_USER}>`,
            to: "procodeur4@gmail.com", // ou process.env.GMAIL_USER pour recevoir à la même adresse
            replyTo: email,
            subject: `[Contact Site] ${subject}`,
            text: `
                Nouveau message de contact:
                
                Nom: ${name}
                Email: ${email}
                Raison du contact: ${contactReason}
                
                Message:
                ${message}
            `,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Nouveau message de contact</title>
                    <style>
                        body {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            line-height: 1.6;
                            color: #333;
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                        }
                        .header {
                            background-color: #4a6fa5;
                            color: white;
                            padding: 15px 20px;
                            border-radius: 5px 5px 0 0;
                        }
                        .content {
                            background-color: #f9f9f9;
                            padding: 20px;
                            border: 1px solid #e0e0e0;
                            border-top: none;
                            border-radius: 0 0 5px 5px;
                        }
                        .info-block {
                            margin-bottom: 15px;
                        }
                        .label {
                            font-weight: bold;
                            color: #4a6fa5;
                            margin-right: 5px;
                        }
                        .message-section {
                            margin-top: 25px;
                            padding-top: 15px;
                            border-top: 1px solid #e0e0e0;
                        }
                        .message-content {
                            background-color: white;
                            padding: 15px;
                            border-radius: 4px;
                            border-left: 4px solid #4a6fa5;
                        }
                        .footer {
                            margin-top: 25px;
                            font-size: 0.85em;
                            color: #777;
                            text-align: center;
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h2 style="margin: 0;">Nouveau message de contact</h2>
                    </div>
                    <div class="content">
                        <div class="info-block">
                            <span class="label">Nom:</span> ${name}
                        </div>
                        <div class="info-block">
                            <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
                        </div>
                        <div class="info-block">
                            <span class="label">Raison du contact:</span> ${contactReason}
                        </div>
                        
                        <div class="message-section">
                            <h3 style="color: #4a6fa5;">Message:</h3>
                            <div class="message-content">
                                ${message.replace(/\n/g, '<br>')}
                            </div>
                        </div>
                        
                        <div class="footer">
                            <p>Ce message a été envoyé depuis le formulaire de contact de votre site web.</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };
        
        console.log('Tentative d\'envoi email avec Gmail...');
        
        // Envoi de l'email
        const info = await transporter.sendMail(mailOptions);
        
        console.log('Email envoyé avec succès via Gmail:', info.messageId);
        
        // Retourner une réponse positive
        return NextResponse.json({ 
            success: true,
            message: 'Message envoyé avec succès'
        });
        
    } catch (error) {
        console.error('Erreur lors du traitement du formulaire de contact:', error);
        
        return NextResponse.json(
            { error: (error instanceof Error ? error.message : 'Erreur lors du traitement de votre demande') },
            { status: 500 }
        );
    }
}