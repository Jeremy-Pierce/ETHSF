import Head from 'next/head'
import React from 'react'
import * as dotenv from 'dotenv'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Player } from '@livepeer/react';
import {
  LivepeerConfig,
  ThemeConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';

dotenv.config()

const LIVEPEER_API = 'e7c6cefa-4f7e-41bb-9df5-b4c57897d02c';

const client = createReactClient({
  provider: studioProvider({ apiKey: LIVEPEER_API }),
});
 
const livepeerTheme: ThemeConfig = {
  colors: {
    accent: 'rgb(0, 145, 255)',
    containerBorderColor: 'rgba(0, 145, 255, 0.9)',
  },
  fonts: {
    display: 'Inter',
  },
};

const course =  {name: 'Intro to Web6', description: 'Learn the basics of Web6 and how to build your first dApp', image: '/img.jpg'}

const PosterImage = () => {
  return (
    <Image
      src={course.image}
      layout="fill"
      objectFit="cover"
      priority
      // placeholder="blur"
      alt="video poster"
    />
  );
};



export default function Course() {
  const router = useRouter()
  const { query: { id, title, desc } } = router
  const playbackId = id

  return (
    <LivepeerConfig client={client} theme={livepeerTheme}>
      <div className="dark bg-gray-900 min-h-screen justify-center items-center w-full pt-12 ">
        <Head>
          <title>Acely - Course</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <h3 className="mb-2 mx-auto text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h3>

        <div className="flex justify-center items-center text-white flex-wrap px-12 pt-8 gap-8 mt-6 ">
            <a href='#'>
                <div className="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-[900px] h-[600px]">
                    <Player
                      title="Waterfalls"
                      playbackId={playbackId}
                      // loop
                      // autoPlay
                      showTitle={false}
                      // muted
                      poster={<PosterImage />}
                    />
                    <div className="p-5">
                        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{desc}</h5>
                    </div>
                </div>
            </a>
          </div>


      <section className="bg-white dark:bg-gray-900 py-8 lg:py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion (20)</h2>
            <div>
              <button type="button" className="py-2 px-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Follow Mentor</button>
            </div>
          </div>
          <div className="flex">
            <div className="mr-3 shrink-0 hidden sm:block">
              <img className="w-9 h-9 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-4.jpg" alt="Michael Burry" />
            </div>
            <form className="mb-6 w-full">
              <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                <div className="py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800">
                  <label htmlFor="comment" className="sr-only">Your comment</label>
                  <textarea id="comment" rows={4} className="px-0 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required defaultValue={""} />
                </div>
                <div className="flex justify-between items-center py-2 px-3 border-t dark:border-gray-600">
                  <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                    <div className="flex items-center space-x-1 sm:pr-4">
                      <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" /></svg>
                        <span className="sr-only">Attach file</span>
                      </button>
                      <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                        <span className="sr-only">Embed map</span>
                      </button>
                      <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
                        <span className="sr-only">Upload image</span>
                      </button>
                      <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        <span className="sr-only">Format code</span>
                      </button>
                      <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" /></svg>
                        <span className="sr-only">Add emoji</span>
                      </button>
                    </div>
                    <div className="flex-wrap items-center space-x-1 sm:pl-4 hidden sm:flex">
                      <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                        <span className="sr-only">Add list</span>
                      </button>
                      <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>       
                        <span className="sr-only">Settings</span>
                      </button>
                      <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                        <span className="sr-only">Timeline</span>
                      </button>
                      <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        <span className="sr-only">Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                Post comment
              </button>
            </form>
          </div>
          <article className="p-4 lg:p-6 mb-6 text-base bg-white border border-gray-100 dark:border-gray-700 rounded-lg dark:bg-gray-800">
            <div className="flex">
              <div className="mr-4">
                <div className="rounded-lg bg-gray-100 w-9 flex flex-col items-center justify-center font-medium bg-white dark:bg-gray-700">
                  <button type="button" className="text-gray-500 dark:text-gray-400 py-1 dark:hover:bg-gray-600 rounded-t-lg hover:bg-gray-200 w-full focus:ring-2 focus:outline-none focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-600">+</button>
                  <span className="text-gray-900 font-m py-1 px-2 lg:px-0 text-xs lg:text-sm dark:text-white">14</span>
                  <button type="button" className="text-gray-500  dark:text-gray-400 py-1 dark:hover:bg-gray-600 rounded-b-lg hover:bg-gray-200 w-full focus:ring-2 focus:outline-none focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-600">-</button>
                </div>
              </div>
              <div className="w-full">
                <footer className="flex justify-between items-center mb-2 w-full">
                  <a href="#" className="flex items-center">
                    <img className="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="Bonnie Green" />
                    <p className="inline-flex flex-col md:flex-row items-start mr-3 text-sm text-gray-900 dark:text-white">
                      <span>Bonnie Green</span>
                      <time className="text-sm text-gray-600 dark:text-gray-400 md:ml-2" pubdate dateTime="2022-03-15" title="March 15th, 2022">Mar. 15, 2022</time>
                    </p>
                  </a>
                  <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                      </path>
                    </svg>
                    <span className="sr-only">Comment settings</span>
                  </button>
                  {/* Dropdown menu */}
                  <div id="dropdownComment1" className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                      <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                      </li>
                    </ul>
                  </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className="flex items-center mt-4 space-x-4">
                  <button type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                    <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </article>
          <article className="ml-6 lg:ml-12 p-4 lg:p-6 mb-6 text-base bg-white border border-gray-100 dark:border-gray-700 rounded-lg dark:bg-gray-800">
            <div className="flex">
              <div className="mr-4">
                <div className="rounded-lg bg-gray-100 w-9 flex flex-col items-center justify-center font-medium bg-white dark:bg-gray-700">
                  <button type="button" className="text-gray-500 dark:text-gray-400 py-1 dark:hover:bg-gray-600 rounded-t-lg hover:bg-gray-200 w-full focus:ring-2 focus:outline-none focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-600">+</button>
                  <span className="text-gray-900 font-m py-1 px-2 lg:px-0 text-xs lg:text-sm dark:text-white">3</span>
                  <button type="button" className="text-gray-500  dark:text-gray-400 py-1 dark:hover:bg-gray-600 rounded-b-lg hover:bg-gray-200 w-full focus:ring-2 focus:outline-none focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-600">-</button>
                </div>
              </div>
              <div className="w-full">
                <footer className="flex justify-between items-center mb-2 w-full">
                  <a href="#" className="flex items-center">
                    <img className="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Jese Leos" />
                    <p className="inline-flex flex-col md:flex-row items-start mr-3 text-sm text-gray-900 dark:text-white">
                      <span>Jese Leos</span>
                      <time className="text-sm text-gray-600 dark:text-gray-400 md:ml-2" pubdate dateTime="2022-02-12" title="February 12th, 2022">Feb. 12, 2022</time>
                    </p>
                  </a>
                  <button id="dropdownComment2Button" data-dropdown-toggle="dropdownComment2" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                      </path>
                    </svg>
                    <span className="sr-only">Comment settings</span>
                  </button>
                  {/* Dropdown menu */}
                  <div id="dropdownComment2" className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                      <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                      </li>
                    </ul>
                  </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet.</p>
                <div className="flex items-center mt-4 space-x-4">
                  <button type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                    <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </article>
          <article className="p-4 lg:p-6 mb-6 text-base bg-white border border-gray-100 dark:border-gray-700 rounded-lg dark:bg-gray-800">
            <div className="flex">
              <div className="mr-4">
                <div className="rounded-lg bg-gray-100 w-9 flex flex-col items-center justify-center font-medium bg-white dark:bg-gray-700">
                  <button type="button" className="text-gray-500 dark:text-gray-400 py-1 dark:hover:bg-gray-600 rounded-t-lg hover:bg-gray-200 w-full focus:ring-2 focus:outline-none focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-600">+</button>
                  <span className="text-gray-900 font-m py-1 px-2 lg:px-0 text-xs lg:text-sm dark:text-white">12</span>
                  <button type="button" className="text-gray-500  dark:text-gray-400 py-1 dark:hover:bg-gray-600 rounded-b-lg hover:bg-gray-200 w-full focus:ring-2 focus:outline-none focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-600">-</button>
                </div>
              </div>
              <div className="w-full">
                <footer className="flex justify-between items-center mb-2 w-full">
                  <a href="#" className="flex items-center">
                    <img className="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Danny Hart" />
                    <p className="inline-flex flex-col md:flex-row items-start mr-3 text-sm text-gray-900 dark:text-white">
                      <span>Danny Hart</span>
                      <time className="text-sm text-gray-600 dark:text-gray-400 md:ml-2" pubdate dateTime="2022-02-08" title="February 8th, 2022">Feb. 8, 2022</time>
                    </p>
                  </a>
                  <button id="dropdownComment3Button" data-dropdown-toggle="dropdownComment3" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                      </path>
                    </svg>
                    <span className="sr-only">Comment settings</span>
                  </button>
                  {/* Dropdown menu */}
                  <div id="dropdownComment3" className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                      <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                      </li>
                    </ul>
                  </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                <div className="flex items-center mt-4 space-x-4">
                  <button type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                    <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </article>
          <article className="p-4 lg:p-6 mb-6 text-base bg-white border border-gray-100 dark:border-gray-700 rounded-lg dark:bg-gray-800">
            <div className="flex">
              <div className="mr-4">
                <div className="rounded-lg bg-gray-100 w-9 flex flex-col items-center justify-center font-medium bg-white dark:bg-gray-700">
                  <button type="button" className="text-gray-500 dark:text-gray-400 py-1 dark:hover:bg-gray-600 rounded-t-lg hover:bg-gray-200 w-full focus:ring-2 focus:outline-none focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-600">+</button>
                  <span className="text-gray-900 font-m py-1 px-2 lg:px-0 text-xs lg:text-sm dark:text-white">8</span>
                  <button type="button" className="text-gray-500  dark:text-gray-400 py-1 dark:hover:bg-gray-600 rounded-b-lg hover:bg-gray-200 w-full focus:ring-2 focus:outline-none focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-600">-</button>
                </div>
              </div>
              <div className="w-full">
                <footer className="flex justify-between items-center mb-2 w-full">
                  <a href="#" className="flex items-center">
                    <img className="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="Bonnie Green" />
                    <p className="inline-flex flex-col md:flex-row items-start mr-3 text-sm text-gray-900 dark:text-white">
                      <span>Bonnie Green</span>
                      <time className="text-sm text-gray-600 dark:text-gray-400 md:ml-2" pubdate dateTime="2022-03-15" title="March 15th, 2022">Mar. 15, 2022</time>
                    </p>
                  </a>
                  <button id="dropdownComment4Button" data-dropdown-toggle="dropdownComment4" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                      </path>
                    </svg>
                    <span className="sr-only">Comment settings</span>
                  </button>
                  {/* Dropdown menu */}
                  <div id="dropdownComment4" className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                      <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                      </li>
                    </ul>
                  </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className="flex items-center mt-4 space-x-4">
                  <button type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                    <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </article>
          <article className="p-4 lg:p-6 mb-6 text-base bg-white border border-gray-100 dark:border-gray-700 rounded-lg dark:bg-gray-800">
            <div className="flex">
              <div className="mr-4">
                <div className="rounded-lg bg-gray-100 w-9 flex flex-col items-center justify-center font-medium bg-white dark:bg-gray-700">
                  <button type="button" className="text-gray-500 dark:text-gray-400 py-1 dark:hover:bg-gray-600 rounded-t-lg hover:bg-gray-200 w-full focus:ring-2 focus:outline-none focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-600">+</button>
                  <span className="text-gray-900 font-m py-1 px-2 lg:px-0 text-xs lg:text-sm dark:text-white">32</span>
                  <button type="button" className="text-gray-500  dark:text-gray-400 py-1 dark:hover:bg-gray-600 rounded-b-lg hover:bg-gray-200 w-full focus:ring-2 focus:outline-none focus:ring-gray-50 dark:bg-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-600">-</button>
                </div>
              </div>
              <div className="w-full">
                <footer className="flex justify-between items-center mb-2 w-full">
                  <a href="#" className="flex items-center">
                    <img className="mr-2 w-6 h-6 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-4.jpg" alt="Helene Engels" />
                    <p className="inline-flex flex-col md:flex-row items-start mr-3 text-sm text-gray-900 dark:text-white">
                      <span>Helene Engels</span>
                      <time className="text-sm text-gray-600 dark:text-gray-400 md:ml-2" pubdate dateTime="2022-06-23" title="June 23rd, 2022">Jun. 23, 2022</time>
                    </p>
                  </a>
                  <button id="dropdownComment5Button" data-dropdown-toggle="dropdownComment5" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                      </path>
                    </svg>
                    <span className="sr-only">Comment settings</span>
                  </button>
                  {/* Dropdown menu */}
                  <div id="dropdownComment5" className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                      <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                      </li>
                      <li>
                        <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                      </li>
                    </ul>
                  </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className="flex items-center mt-4 space-x-4">
                  <button type="button" className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                    <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>


      </div>
    </LivepeerConfig>
  )
}
