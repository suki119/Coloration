import React, { Component } from 'react';


import { BsHouseFill } from "react-icons/bs";
import { BsPeopleFill } from "react-icons/bs";
import { BsStickiesFill } from "react-icons/bs";
import { BsPersonLinesFill } from "react-icons/bs";
import { BsArrowDownCircleFill } from "react-icons/bs";
import { BsFileEarmarkArrowUpFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";








export const SidebarData = [
    {
        title: "Home",
        icon: <BsHouseFill />,
        Link: "/home"
    },
    {
        title: "Accounts",
        icon: <BsPeopleFill />,
        Link: "/Accounts"
    },
   
    {
        title: "Products",
        icon: <BsArrowDownCircleFill />,
        Link: "/Products"
    },
    {
        title: "Invoice",
        icon: <BsFileEarmarkArrowUpFill />,
        Link: "/invoice"
    },
    {
        title: "Job Card",
        icon: <BsPersonCircle />,
        Link: "/Card"
    }, {
        title: "Message",
        icon: <BsPersonCircle />,
        Link: "/studentmsg"
    }
]