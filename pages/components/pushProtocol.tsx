import * as PushAPI from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import * as ethers from "ethers";

const Pkey = process.env.PRIVATE_KEY || '0xe58c836c1eb3696a8196c731a6b40a98c6494e06a5b44f23b87413b093831f21';
const _signer = new ethers.Wallet(Pkey);

export const sendNotification = async(recepient:any,sub:string,content:string) => {
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer: _signer,
      type: 3, // broadcast
      identityType: 2, // direct payload
      notification: {
        title: `BloodD Notification:`,
        body: `BloodD Notification BODY`
      },
      payload: {
        title: sub,
        body: content,
        cta: '',
        img: ''
      },
      senderType:0,
      recipients: `eip155:5:${recepient}`, // recipient addres
      channel: 'eip155:5:0x00D8F074D2041D3d897AB2B5268d09479FA9Bf6a', // your channel address
      env: 'staging' as ENV
      // env: PushAPI.
    });
  } catch (err) {
    console.error('Error: ', err);
  }
}