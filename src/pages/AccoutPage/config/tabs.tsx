import { CommentsTab, MentionsTab, PhotoTab, VideoTab } from "@/features";
import Comments from "@/shared/assets/Icons/Comments.svg?react";
import Mentions from "@/shared/assets/Icons/Mentions.svg?react";
import Photos from "@/shared/assets/Icons/Photos.svg?react";
import Videos from "@/shared/assets/Icons/Videos.svg?react";
import { TabType } from "@/shared/Tabs/interface/TabType.ts";

export const tabs: TabType[] = [
  {
    title: <Photos />,
    key: 0,
    content: <PhotoTab />,
  },
  {
    title: <Videos />,
    key: 1,
    content: <VideoTab />,
  },
  {
    title: <Comments />,
    key: 2,
    content: <CommentsTab />,
  },
  {
    title: <Mentions />,
    key: 3,
    content: <MentionsTab />,
  },
];
