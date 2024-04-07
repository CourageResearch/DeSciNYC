import links from '../links.json'

const features = [
  {
    name: 'Subscribe to the calendar',
    description: 'A curated selection of local science events in New York City and the surrounding area.',
    url: 'https://lu.ma/descinyc',
    text: 'Subscribe to the calendar'
  },
  {
    name: 'Join the Group Telegram',
    description: 'Join the Decentralized Science NYC group on Telegram to chat with other members.',
    url: links.telegram_url,
    text: 'Join the group'
  },
  {
    name: 'Volunteer',
    description: 'Be part of the team that makes Decentralized Science NYC happen.',
    url: links.volunteer_url,
    text: 'Volunteer'
  },
  {
    name: 'Donate',
    description: 'Help us make DeSciNYC even better with funds that will go toward space and food.',
    url: links.donate_url,
    text: 'Sponsor DeSciNYC'
  },
  {
    name: 'Sponsorship',
    description: 'Help us make DeSciNYC even better with funds that will go toward space and food.',
    url: links.sponsor_url,
    text: 'Sponsor DeSciNYC'
  },
]

export default function StayInTouch() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ways to get involved
          </h2>
          <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name}>
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  {/* <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div> */}
                  {feature.name}
                </dt>

                <dd className="mt-1 mb-8 text-base leading-7 text-gray-900">{feature.description}</dd>
                <a
                  target="_blank"
                  href={feature.url}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm 
                  font-semibold text-white shadow-sm hover:bg-indigo-500 
                  focus-visible:outline focus-visible:outline-2 
                  focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {feature.text}
                </a>

              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
