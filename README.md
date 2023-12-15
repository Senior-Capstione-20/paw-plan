---
runme:
  id: 01HHN0FMQGEF2YXQK66SWAHHTD
  version: v2.0
---

# Paw-Plan

Group 20's SE Capstone Project: A Doggy Calendar Website

## What is Paw Plan?

In the world today, many of us are constantly on the go. Whether with work or school, adding a dog into the mix can be a lot to juggle all at once. Having a schedule and a list of things to check off as the day goes on can help eliminate some of the stress that comes with it. The motivation for this project is to help dog parents keep track of all the responsibilities and tasks that come with owning a dog.

You can schedule when your dog needs to be walked, fed, or any activity your dog could do and paw-plan will send a notification based on the selected times. The notifications will be categorized and specify if it is a walking reminder, a meal reminder, a vet appointment reminder, a park/play date reminder, and other potential categories to be decided later. You can also decide when you want the notifications to be sent.

## How was it built?

The application is built using React JS, HTML, and CSS. The HTML and CSS code are used for rendering the web pages the user can interact with. The React JS code is implemented for dynamic functionality, such as entering user registration or log on information via communicating with the database. We are using Firebase to handle user authentication and to handle the user’s data as well. We use the Cloud Firestore where we have a user’s collection populated with unique user documents where each user has their separate data (like the dogs and events array). We are using the FullCalendar API to display the events on a calendar for the user, and we are using FullCalendar methods to edit add and delete events as well.

## Here is the link to the website:

https://paw-plan.netlify.app/
