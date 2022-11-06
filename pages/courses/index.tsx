import Head from 'next/head'
import React from 'react'
import * as dotenv from 'dotenv'
import { useRouter } from 'next/router'
import Image from 'next/image'

dotenv.config()


const courses = [
    {name: 'Intro to Web6', description: 'Learn the basics of Web6 and how to build your first dApp', image: '/img6.jpg'},
    {name: 'Intro to Web5', description: 'Learn the basics of Web5 and how to build your first dApp', image: '/img5.jpg'},
    {name: 'Intro to Web4', description: 'Learn the basics of Web4 and how to build your first dApp', image: '/img4.jpg'},
    {name: 'Intro to Web3', description: 'Learn the basics of Web3 and how to build your first dApp', image: '/img3.jpg'},
    {name: 'Intro to Web2', description: 'Learn the basics of Web2 and how to build your first dApp', image: '/img2.jpg'},
    {name: 'Intro to Web1', description: 'Learn the basics of Web1 and how to build your first dApp', image: '/img.jpg'},
]

export default function Courses() {
  const router = useRouter()

  const CreateCourseButton = (e) => {
    e.preventDefault()
    router.push('/courses/create', undefined, { shallow: true })
  }

  return (
    <div className="dark bg-gray-900 min-h-screen justify-center items-center w-full pt-12 ">
      <Head>
        <title>Acely - Courses</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script async src="https://unpkg.com/flowbite@1.5.3/dist/flowbite.js"></script>
      </Head>

    <div className='flex gap-10 justify-center items-center w-[900px] m-auto'>
        
      <div>
        <button id="dropdownCheckboxButton" data-dropdown-toggle="dropdownDefaultCheckbox" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Filter Courses <svg className="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></button>
        <div id="dropdownDefaultCheckbox" className="hidden z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" data-popper-reference-hidden data-popper-escaped data-popper-placement="bottom" style={{position: 'absolute', inset: '0px auto auto 0px', margin: 0, transform: 'translate3d(0px, 431.5px, 0px)'}}>
          <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxButton">
            <li>
              <div className="flex items-center">
                <input defaultChecked id="checkbox-item-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                <label htmlFor="checkbox-item-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">DAOs</label>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <input defaultChecked id="checkbox-item-2" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                <label htmlFor="checkbox-item-2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">NFTs</label>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <input defaultChecked id="checkbox-item-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                <label htmlFor="checkbox-item-3" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">DeFi</label>
              </div>
            </li>
          </ul>
        </div>
      </div>



      <form>   
        <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Your Email</label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <input type="search" id="search" className="block p-4 pl-10 w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
          <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
      </form>

        <button className="flex !my-auto w-42 relative items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800" onClick={CreateCourseButton}>
            <span className="flex justify-center items-center relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Create a Course
                <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </span>
        </button>

      </div>

     


      <div className="flex justify-center items-center text-white flex-wrap px-12 pt-8 gap-8 mt-6">

        {  courses && courses.map((course, index) => 
            <a href={'courses/' + course.name + '?title=' + course.name} key={index}>
                <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-96">
                    <Image className="rounded-t-lg" src={course.image} alt='course poster' width={500} height={300}/>
                    <div className="p-5">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{course.name}</h5>
                    </div>
                </div>
            </a>
        )
        }
        </div>
    </div>
  )
}
