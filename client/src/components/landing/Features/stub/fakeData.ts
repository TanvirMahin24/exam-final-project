import workflowImg from "../../../../assets/Features/Workflow.svg";
import flexibilityImg from "../../../../assets/Features/Flexibility.svg";
import userImg from "../../../../assets/Features/User.svg";
import layoutImg from "../../../../assets/Features/Layout.svg";
import controlImg from "../../../../assets/Features/Control.svg";
import organizedImg from "../../../../assets/Features/Organized.svg";
import { FeatureType } from "../../../../types/Common";

const data: FeatureType[] = [
  {
    id: 1,
    title: "Robust workflow",
    description: "Our workflow is made for easy to use for everyone.",
    image: workflowImg,
  },
  {
    id: 2,
    title: "Flexibility",
    description: "Our set the time date of the exam",
    image: flexibilityImg,
  },
  {
    id: 3,
    title: "User friendly",
    description:
      "Exam is as user friendly as it gets. Nothing more and nothing less.",
    image: userImg,
  },
  {
    id: 4,
    title: "Public exams",
    description: "Post public exams to help the community",
    image: layoutImg,
  },
  {
    id: 5,
    title: "Private exam link",
    description: "Take a private exam by sharing a simple link.",
    image: controlImg,
  },
  {
    id: 6,
    title: "Well organised",
    description: "Get all of your exams all in one place.",
    image: organizedImg,
  },
];

export default data;
