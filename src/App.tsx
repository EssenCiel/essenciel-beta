import './index.css';
import React, {useRef, useState} from "react";
import emailjs from '@emailjs/browser';
import {CheckCircleIcon} from "@heroicons/react/outline";

export default function App() {
    const form: any = useRef(null);
    const [emailSent, setEmailSent] = useState(false);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const sendEmail = (e: any) => {
        e.preventDefault();

        if (!validateEmail(form.current[0].value)) {
            return
        }
        // @ts-ignore
        emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, {
            email: form.current[0].value,
        }, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                setEmailSent(true);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <>
            {/* Fullscreen black overlay */}
            <div className="blur-2xl w-full h-full absolute top-0 left-0 z-40 bg-black opacity-50"></div>

            {/* Main content */}
            <main className={`justify-center items-center flex h-screen -top-[10%] md:-top-[3%] w-full absolute z-50`}>
                <div className={`flex flex-col justify-between w-full  space-y-4 p-4  ${emailSent ? "hidden" : ""}`}>

                    {/* Header */}
                    <div className="mb-4 justify-center items-center flex flex-col">
                        <h1 className="text-2xl md:text-3xl lg:text-6xl uppercase font-black text-white">Découvrez
                            EssenCiel</h1>
                        <h2 className="text-xs md:text-lg uppercase font-bold text-white text-center mt-2">Rejoignez la
                            file d'attente pour accéder à la BÊTA fermée</h2>
                    </div>
                    {/* Description */}
                    <div className="text-center text-white hidden md:block">
                        <p>Après avoir rempli le formulaire, vous recevrez un mail de confirmation. Nous vous
                            contacterons dès que nous publierons la BÊTA.</p>
                    </div>

                    {/* Input form */}
                    <form onSubmit={sendEmail} ref={form}
                          className={`justify-center items-center flex flex-row space-x-4 pt-4 ${emailSent ? "hidden" : ""}`}>
                        <div>
                            <input
                                required={true}
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="email"
                                enterKeyHint={"next"}
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-white rounded-md w-full md:w-96 text-center justify-center items-center"
                                placeholder="Votre adresse email"
                            />
                        </div>

                        {/* Submit button */}
                        <button
                            type="button"
                            value={"Envoyer"}
                            onClick={sendEmail}
                            className="inline-flex hidden justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            <CheckCircleIcon className="h-5 w-5" aria-hidden="true"/>
                        </button>
                    </form>
                </div>
                {/* Success message */}
                <div
                    className={`flex pt-5 flex-col justify-center items-center space-x-4 ${emailSent ? "" : "hidden"}`}>
                    <h2 className="text-2xl md:text-3xl lg:text-6xl uppercase font-black text-white">ON SE VOIT BIENTÔT
                        !</h2>
                    <h2 className="text-xs md:text-lg uppercase font-bold text-white text-center mt-2">Vous allez
                        recevoir un mail de confirmation.</h2>
                    <h6 className="text-xs md:text-lg uppercase font-bold text-white text-center mt-5">Suivez-nous <a
                        href="https://twitter.com/essencielapp" className="underline">Twitter</a> !</h6>
                </div>
            </main>

            {/* Footer */}
            <footer className="fixed bottom-0 w-full text-center p-4 text-white">
                © 2023 Nexyon. Tout droits réservés.
            </footer>
        </>
    );
}

