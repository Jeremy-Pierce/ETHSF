import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import * as dotenv from 'dotenv'
import { useRouter } from 'next/router'
import {
  LivepeerConfig,
  ThemeConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
import * as tus from "tus-js-client";

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


export default function Create() {
  const [uploadData, setUploadData] = useState<any>({title: "", desc: "", video: null})
  const [loading, setLoading] = useState<boolean>(false)
  const [completed, setCompleted] = useState<boolean>(false)
  const [videoID, setVideoID] = useState<any>()
  const router = useRouter()

  const createCourse = async (uploadData) => {
    setLoading(true)
    const response = await fetch(
      "https://livepeer.studio/api/asset/request-upload",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LIVEPEER_API}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: uploadData.title,
        }),
      }
    );
    
    const { tusEndpoint } = await response.json();
    console.log(tusEndpoint);
    const filename = uploadData.title

    //  This assumes there is an `input` element of `type="file"` with id `fileInput` in the HTML
    const input = document.getElementById("fileInput");
    const file = input.files[0];
    const upload = new tus.Upload(file, {
      endpoint: tusEndpoint, // URL from `tusEndpoint` field in the `/request-upload` response
      metadata: {
        filename,
        filetype: "video/mp4",
      },
      uploadSize: file.size,
      onError(err) {
        console.error("Error uploading file:", err);
      },
      onProgress(bytesUploaded, bytesTotal) {
        const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2);
        console.log("Uploaded " + percentage + "%");
      },
      onSuccess() {
        console.log("Upload finished:", upload.url);
        setVideoID(upload.url.split("/").pop())
        setCompleted(true)
      },
    });
    const previousUploads = await upload.findPreviousUploads();
    if (previousUploads.length > 0) {
      upload.resumeFromPreviousUpload(previousUploads[0]);
    }
    upload.start();
  }
  
  useEffect(() => {
    completed && router.push({ pathname: `/courses/${uploadData.title}`, query: { id: videoID, title: uploadData.title, desc: uploadData.desc } })
  }, [completed])


  return (
    <LivepeerConfig client={client} theme={livepeerTheme}>
      <div className="dark bg-gray-900 min-h-screen justify-center items-center flex flex-col">
        <Head>
          <title>Acely - Create a Course</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <div className='flex mb-8 justify-center items-center gap-2 w-[300px]'>
            {/* <label htmlFor="helper-text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Course Name</label> */}
            <input  autoComplete='off' type="email" id="helper-text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full" value={uploadData.title} onChange={(e) => setUploadData({...uploadData, title: e.target.value})} placeholder="Course Name" />
        </div>

        <div className='flex mb-8 justify-center items-center gap-2 w-[300px]'>
            {/* <label htmlFor="helper-text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Course Description</label> */}
            <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={uploadData.desc} onChange={(e) => setUploadData({...uploadData, desc: e.target.value})} placeholder="Course Description" />

        </div>

        <div className='max-w-sm flex flex-col mx-auto w-[300px]'>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="fileInput">Upload your course video: (MP4 only)</label>
            <input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="fileInput" type="file" onChange={(e) => setUploadData({...uploadData, video: e.target.value})} />
            {/* <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">MP4 Only.</p> */}
        </div>

        <button type="button" className="mt-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-3 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => createCourse(uploadData)}>{loading ? 'Loading...' : 'Create Course'}</button>

      </div>
    </LivepeerConfig>
  )
}
