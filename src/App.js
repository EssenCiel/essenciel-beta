import './index.css';
import {useRef} from "react";
import emailjs from '@emailjs/browser';
import {CheckCircleIcon} from "@heroicons/react/outline";

export default function App() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.send("service_26xelfo","template_ua0nmvj", {
            email: form.current[0].value,
        }, "gax3wU7dnRboYrsEz" )
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

        return (
            <>
                {/* Fullscreen black overlay */}
                <div className="blur-2xl w-full h-full absolute top-0 left-0 z-40 bg-black opacity-50"></div>

                {/* Main content */}
                <main className="justify-center items-center flex h-screen w-full absolute top-0 left-0 z-50">
                    <div className="flex flex-col justify-between w-full  space-y-4 p-4">

                        {/* Header */}
                        <div className="mb-4 justify-center items-center flex flex-col">
                            <h1 className="text-2xl md:text-3xl lg:text-6xl uppercase font-black text-white">Découvrez EssenCiel</h1>
                            <h2 className="text-xs md:text-lg uppercase font-bold text-white text-center mt-2">Rejoignez la file d'attente pour accéder à la BÊTA fermée</h2>
                        </div>E
                        {/* Description */}
                        <div className="text-center text-white">
                            <p>Après avoir rempli le formulaire, vous recevrez un mail de confirmation. Nous vous contacterons dès que nous publierons la BÊTA.</p>
                        </div>

                        {/* Input form */}
                        <form className="justify-center items-center flex flex-row space-x-4 pt-4" onSubmit={sendEmail} ref={form}>
                            <div>
                                <input
                                    required={true}
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-white rounded-md"
                                    placeholder="Votre adresse email"
                                />
                            </div>

                            {/* Submit button */}
                            <button
                                type="button"
                                value={"Envoyer"}
                                onClick={sendEmail}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </form>

                    </div>
                </main>

                {/* Footer */}
                <footer className="fixed bottom-0 w-full text-center p-4 text-white">
                    © 2023 Nexyon. Tout droits réservés.
                </footer>
            </>
        );
}

