import db from '../db.json';

export default function Videos() {
    return (
        <div className="" id='videos'>
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">DeSciNYC Past Videos</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-12">
                    {db.map((event) => {
                        if(event.yt_uuid !== "") {
                            return (
                                <div key={event.yt_uuid} className="group relative">
                                    <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                                        <a href={`https://www.youtube.com/watch?v=${event.yt_uuid}`} target="_blank" rel="noopener noreferrer">
                                            <img
                                                src={`https://i3.ytimg.com/vi/${event.yt_uuid}/maxresdefault.jpg`}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </a>
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                                <a href={`https://www.youtube.com/watch?v=${event.yt_uuid}`} target="_blank" rel="noopener noreferrer">
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {event.title}
                                                </a>
                                            </h3>
                                            <h3 className="text-sm text-gray-700">
                                                <a href={`https://www.youtube.com/watch?v=${event.yt_uuid}`} target="_blank" rel="noopener noreferrer">
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {event.speaker}
                                                </a>
                                            </h3>
                                        </div>
                                        {/* <p className="text-sm font-medium text-gray-900">{event.time}</p> */}
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}
