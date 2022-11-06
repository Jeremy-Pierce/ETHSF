import { WidgetProps } from "@worldcoin/id";
import React, { Dispatch, SetStateAction } from 'react';
import * as dotenv from 'dotenv'
import Image from 'next/image'
import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { utils } from "@worldcoin/id";
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query';

dotenv.config()

const WorldIDWidget = dynamic<WidgetProps>(() => import("@worldcoin/id").then((mod) => mod.WorldIDWidget), { ssr: false });

const ACTION_ID = 'wid_staging_3ebb3b050fbeedfc4997b65b4552b54a'
const SIGNAL: string = 'user-id-1'
const WORLDID_API = 'https://developer.worldcoin.org/api/v1/verify'

export default function VerifyID({setVerified}:{setVerified: any}) {

    const widgetProps: WidgetProps = {
        actionId: ACTION_ID,
        signal: SIGNAL,
        enableTelemetry: true,
        appName: "Acely",
        signalDescription: "Connecting Mentors & Students in Web3",
        theme: "dark",
        debug: true, // Recommended **only** for development
        onSuccess: (result) => {
            // checkWorldID({
            //     action_id: ACTION_ID,
            //     signal: SIGNAL,
            //     proof: result.proof,
            //     nullifier_hash: result.nullifier_hash,
            //     merkle_root: result.merkle_root
            // });
            setVerified(true);
        },
        onError: ({ code, detail }) => console.log({ code, detail }),
        onInitSuccess: () => console.log("Init successful"),
        onInitError: (error) => console.log("Error while initialization World ID", error),
    };

    // interface worldIDRes{
    //     action_id:string;
    //     signal:string;
    //     proof:string;
    //     nullifier_hash:string;
    //     merkle_root:string;
    // }

    // const checkWorldID = async (data: worldIDRes) => {
    //     const { data: response } = await axios.post(WORLDID_API, data);
    //     console.log(response.data);
    //     return response.data;
    // };

    // const { isLoading, isError, error } = useMutation(checkWorldID)

    // if (isLoading) {
    //     return <div>Loading...</div>
    // }
    // if (isError) {
    //     return <div>Error! {error.message}</div>
    // }

    return (
        <WorldIDWidget {...widgetProps} />
    )
}