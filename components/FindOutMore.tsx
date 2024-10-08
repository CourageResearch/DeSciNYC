import links from "../links.json";

const features = [
  {
    name: "Subscribe to the calendar",
    description:
      "A curated selection of local science events in New York City and the surrounding area.",
    url: "https://lu.ma/descinyc",
    text: "Subscribe to the calendar",
  },
  {
    name: "Join the Group Telegram",
    description:
      "Join the Decentralized Science NYC group on Telegram to chat with other members.",
    url: links.telegram_url,
    text: "Join the telegram group",
  },
  {
    name: "Socials",
    description:
      "Follow on Twitter, Instagram, and TikTok to stay up to date with fun content.",
    url: links.volunteer_url,
    text: "Follow on socials",
    socials: [
      { name: "Twitter", url: links.twitter_url, text: "Twitter" },
      { name: "Instagram", url: links.instagram_url, text: "Instagram" },
      { name: "TikTok", url: links.tiktok_url, text: "TikTok" },
    ],
  },
  {
    name: "Volunteer",
    description:
      "Be part of the team that makes Decentralized Science NYC happen.",
    url: links.volunteer_url,
    text: "Volunteer",
  },
  {
    name: "Donate",
    description:
      "Help us make DeSciNYC even better with funds that will go toward space and food.",
    url: links.donate_url,
    text: "Donate to DeSciNYC",
  },
  {
    name: "Sponsorship",
    description:
      "Help us make DeSciNYC even better with funds that will go toward space and food.",
    url: links.sponsor_url,
    text: "Sponsor DeSciNYC",
  },
];

export default function FindOutMore() {
  return (
    <div className="bg-green-400 py-24 sm:py-32" id="find-out-more">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Find out more.
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
                <dd className="mt-1 mb-8 text-base leading-7 text-gray-900">
                  {feature.description}
                </dd>

                {feature.socials ? (
                  feature.socials.map((social) => (
                    <a
                      key={social.name}
                      target="_blank"
                      href={social.url}
                      className="rounded-md bg-green-800 px-3.5 py-2.5 text-sm font-semibold text-white 
                      shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 
                      focus-visible:outline-offset-2 focus-visible:outline-green-800 mr-4"
                    >
                      {social.text}
                    </a>
                  ))
                ) : (
                  <a
                    target="_blank"
                    href={feature.url}
                    className="rounded-md bg-green-800 px-3.5 py-2.5 text-sm font-semibold text-white 
                                shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 
                                focus-visible:outline-offset-2 focus-visible:outline-green-800"
                  >
                    {feature.text}
                  </a>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
