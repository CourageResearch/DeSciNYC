'use client'

const navItems = [
  {
    "name": "Home",
    "href": "/",
    "current": true
  },
  {
    "name": "Next Event",
    "href": "#next-event",
    "current": false
  },
  {
    "name": "Videos",
    "href": "#videos",
    "current": false
  },
  {
    "name": "Gallery",
    "href": "#gallery",
    "current": false
  },
  {
    "name": "Past Events",
    "href": "#past-events",
    "current": false
  },
  {
    "name": "Mailing List",
    "href": "#mailing-list",
    "current": false
  },
  {
    "name": "Calendar",
    "href": "#calendar",
    "current": false
  },
  {
    "name": "Telegram Group",
    "href": "#telegram",
    "current": false
  },
  {
    "name": "Volunteer",
    "href": "#volunteer",
    "current": false
  },
  // {
  //   "name": "Sponsor",
  //   "href": "#sponsor",
  //   "current": false
  // },
  // {
  //   "name": "Shop",
  //   "href": "#shop",
  //   "current": false
  // },
  // {
  //   "name": "Contact Us",
  //   "href": "#contact-us",
  //   "current": false
  // },
  // {
  //   "name": "Donate",
  //   "href": "#donate",
  //   "current": false
  // }
]


import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="DeSciNYC Logo"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                        'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                      )}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navItems.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',
                    'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
