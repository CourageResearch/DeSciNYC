import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { DateTime } from 'luxon';
import { LumaEvent } from '@/types/interfaces';

export default function Hero(
    { lumaEvent }: { lumaEvent: LumaEvent }
) {

    return (
        <section className="dark:bg-gray-900">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">

                    <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
                        Welcome to Decentralized Science NYC.
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-900">
                        {/* A monthly meetup for the decentralized science community in NYC to learn
                            about the latest in decentralized science, share projects, and eat. */}

                        A monthly NYC meetup for science enthusiasts to learn, share projects, and socialize.

                        {/* Join us for a monthly IRL meetup in NYC about decentralized science. */}

                    </p>

                    <p className="mt-6 text-lg leading-8 text-gray-900">
                        Science is for everyone, and we try to make it accessible to all.
                    </p>

                    <div className="mt-10 flex items-center gap-x-6">
                        <a
                            href={lumaEvent.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md bg-green-800 px-3.5 py-2.5 text-sm font-semibold text-white 
                                shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 
                                focus-visible:outline-offset-2 focus-visible:outline-green-800"
                        >

                            RSVP to Next Event on {DateTime.fromISO(lumaEvent.start_at).toLocaleString(DateTime.DATE_FULL)}

                        </a>
                        <a href="#mailing-list" className="text-sm font-semibold leading-6 text-gray-900">
                            Join the mailing list <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <Image
                        src="/images/logo-hero2.png"
                        alt=""
                        width={600}
                        height={217}
                    />
                </div>
            </div>
        </section>
    )
}
