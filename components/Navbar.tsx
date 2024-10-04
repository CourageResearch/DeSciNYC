"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link
import { usePathname } from "next/navigation"; // Import usePathname

import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navItems = [
  // {
  //   "name": "Home",
  //   "href": "/",
  //   "current": false
  // },

  // {
  //   "name": "Past Events",
  //   "href": "#past-events",
  //   "current": false
  // },
  // {
  //   "name": "Gallery",
  //   "href": "#gallery",
  //   "current": false
  // },
  {
    name: "Next Event",
    href: "/#next-event",
    current: false,
  },
  {
    name: "Leaderboard",
    href: "/leaderboard",
    current: false,
  },
  {
    name: "Find Out More",
    href: "/#find-out-more",
    current: false,
  },
  {
    name: "Past Events",
    href: "/#past-events",
    current: false,
  },
  {
    name: "Mailing List",
    href: "/#mailing-list",
    current: false,
  },
  // {
  //   "name": "Telegram Group",
  //   "href": "#telegram",
  //   "current": false
  // },
  // {
  //   "name": "Volunteer",
  //   "href": "#volunteer",
  //   "current": false
  // },
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
  {
    name: "Shop",
    href: "/#shop",
    current: false,
  },
  {
    name: "Contact Us",
    href: "/#contact-us",
    current: false,
  },
  // {
  //   "name": "Donate",
  //   "href": "#donate",
  //   "current": false
  // }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname(); // Get the current path

  // Update navItems with the current path
  const updatedNavItems = navItems.map((item) => ({
    ...item,
    current: pathname === item.href,
  }));

  return (
    <Disclosure as="nav" className="bg-green-400 shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <Image
                      className="h-8 w-auto"
                      src="/images/logo.svg"
                      alt="DeSciNYC Logo"
                      width={378}
                      height={378}
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {updatedNavItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "border-indigo-500 text-gray-900"
                          : "border-transparent text-gray-900 hover:border-green-600 hover:text-green-900",
                        "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button
                  className="relative inline-flex items-center justify-center rounded-md p-2
                                text-gray-900 hover:text-green-700 focus:outline-none 
                                focus:ring-2 focus:ring-inset focus:ring-green-500"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon
                      className="block h-8 w-8 text-black"
                      aria-hidden="true"
                    />
                  ) : (
                    <Bars3Icon
                      className="block h-8 w-8 text-black"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {updatedNavItems.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "border-green-600 bg-green-500 text-white"
                      : "border-transparent text-black hover:border-green-300 hover:bg-green-500",
                    "block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
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
  );
}
