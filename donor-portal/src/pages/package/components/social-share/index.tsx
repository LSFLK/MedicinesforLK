import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  ViberShareButton,
  ViberIcon,
  TelegramShareButton,
  TelegramIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { AidPackage } from "../../../../types/AidPackage";

interface Props {
  aidPackage: AidPackage;
  progressStatus: string;
}

export default function SocialShare({ aidPackage, progressStatus }: Props) {
  const currentUrl = window.location.href; // used for social share url

  const longDescription = `${aidPackage.name}\n${aidPackage.description}\n${progressStatus} at the time of sharing.`;
  const shortDescription = `${aidPackage.name}\n${progressStatus} at the time of sharing.`;

  return (
    <>
      <FacebookShareButton
        url={currentUrl}
        quote={longDescription}
        hashtag="#MedicinesForLK"
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      {/* TODO: create & add App ID for FB Messenger */}
      {/* <FacebookMessengerShareButton url={currentUrl} appId={""}>
        <FacebookMessengerIcon size={32} round />
      </FacebookMessengerShareButton> */}
      <TwitterShareButton
        url={currentUrl}
        title={shortDescription}
        hashtags={["MedicinesForLK", "Elixir"]}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton url={currentUrl} title={aidPackage.name}>
        {/* FIXME: this always uses WhatsApp web, even if the App is there - try fixing this */}
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <ViberShareButton url={currentUrl} title={aidPackage.name}>
        {/* FIXME: Doesn't seem to work on web - test on mobile - might have to disable for web */}
        <ViberIcon size={32} round />
      </ViberShareButton>
      <TelegramShareButton url={currentUrl} title={aidPackage.name}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <LinkedinShareButton
        url={currentUrl}
        title={aidPackage.name}
        summary={longDescription}
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <EmailShareButton
        url={currentUrl}
        subject={aidPackage.name}
        body={longDescription}
      >
        <EmailIcon size={32} round />
      </EmailShareButton>
    </>
  );
}
