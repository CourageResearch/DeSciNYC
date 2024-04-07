import links from '../links.json'

export default function Telegram() {
  return (
    <div className="" id="telegram">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Telegram Group Chat.
          <br />
          We chat here some times.
        </h2>
        <div className="mt-10 flex items-center gap-x-6">
          <a
            target="_blank"
            href={links.telegram_url}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Join Telegram Group Chat
          </a>
        </div>
      </div>
    </div>
  )
}
