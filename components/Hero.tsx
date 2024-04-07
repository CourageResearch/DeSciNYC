import { ChevronRightIcon } from '@heroicons/react/20/solid'

export default function Hero(
    {
        luma_url
    }: {
        luma_url: string
    }
) {
    return (
        <div className="relative isolate overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
                    {/* <img
                        className="h-11"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    /> */}
                    {/* <div className="mt-24 sm:mt-32 lg:mt-16">
                        <a href="#" className="inline-flex space-x-6">
                            <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10">
                                What's new
                            </span>
                            <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                                <span>Just shipped v1.0</span>
                                <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </a>
                    </div> */}
                    <h1 className="mt-20 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Decentralized Science NYC
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        A monthly meetup for the decentralized science community in NYC to learn 
                        about the latest in decentralized science, share projects, and eat.
                    </p>
                    <div className="mt-10 flex items-center gap-x-6">
                        <a
                            href={luma_url} // assuming nextEvent has a url property
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            RSVP to Next Event
                        </a>
                        <a href="#mailing-list" className="text-sm font-semibold leading-6 text-gray-900">
                            Join the mailing list <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
                <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                    <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                        <div className="
                        -m-2 
                        rounded-xl 
                        p-2 
                        lg:-m-4 
                        lg:rounded-2xl 
                        lg:p-4">
                            <img
                                // src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
                                src="/images/logo.webp"
                                alt="App screenshot"
                                width={500}
                                height={500}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
