<!-- [中文版本](Readme-Chinese/READMECHINESE.md) -->

In this readme file, you will find all the information you need about this project.
To save time, I'll recommend you to do this.

(1) watch the video

(2) check out special technique

(3) reflection.

# About the project

This is a web-based expense tracker application. In the app, users may add, remove, and update daily spending and revenue data. With the data users provide, this app may offer a variety of various capabilities and assist users in managing their money in an orderly and effective manner.

# The motivation behind the project

I began creating the project with the new programming language I had recently learnt in the hopes of eventually using the project to address real-life instances. I've been keeping track of how much money I've made and spent over the last year, but the tools I've used have been confined to smartphone applications. It seemed to be handy at first, but I quickly discovered various issues. The main issue is that it gets harder to handle as the amount of data rises, as does the demand for increasingly complicated data analysis. In addition, the trade-off for convenience is the mobile screen size constraint. With bigger screen sizes that capture more data at once, laptops and computers are more user-friendly. Based on these issues, while it is convenient to have a mobile app, it’s even more ideal to develop a web app. The issue motivates me to create my own expense tracker, complete with chosen and extensive functionality aimed at addressing the aforementioned concerns and improving user experience.

# Technologies used

- HTML
- CSS
- Javascript
- React.js
- Chart.js
- Firebase
- API - MarketAux

# Project overview

_If you prefer viewing videos to reading, I suggest skipping this part and instead watching the video._

This project has six pages, and this section just provides a high-level summary of each page. This application's general layout is broken into two components. The left side is the sidebar, where users may change the page by clicking the icon, and the right side is the corresponding page.

Main section (left-hand side)

&#8594; keeps track of daily transactions; the user may see different day by clicking one from the weekly calendar list

&#8594; Switch between weeks by clicking the arrow buttons on both sides

Subsection (right-hand side)

&#8594; The top card displays the precise amount of expense, income, and net income for a given week

&#8594; The bottom card displays two basic charts to assist users in visualizing the weekly expense data

&nbsp;

Main section (left-hand side)

&#8594; keeps track of all transactions over the course of a month. The pink dots indicate income data, while the blue dots indicate expense data

&#8594; Click a day to get the detailed transaction for that day

&#8594; Switch between months by clicking the arrow buttons on both sides

Subsection (right-hand side)

&#8594; The top card displays the precise amount of expense, income, and net income for a given month

&#8594; The bottom card displays two basic charts to assist users in visualizing the monthly cost data

&nbsp;

Main section (right-hand side)

&#8594; displays a pie or bar chart

Subsection (left-hand side)

&#8594; Users have a variety of choices for customizing the chart

&nbsp;

Main section (right-hand side)

&#8594; shows the all expense and income data

&#8594; Sort the data by clicking the different buttons, and enter notes to search for particular data

Subsection (left-hand side)

&#8594; To filter the data, click the checkbox

&nbsp;

![This is an image](/img/game.png)
&#8594; On the top right corner, there is a countdown, and users must guess a number before the countdown expires

&#8594; If users do not guess the number before the countdown ends, a random number will be chosen for them

&#8594; It displays the current level in the bottom right corner

&#8594; Users can use the various tools by clicking the button on the bottom left corner

&#8594; Users can hover over the flag to see the country's name, and click the info button to see all of the country's information

&nbsp;

# Reflection

## What’s the main obstacle when building this project?

When constructing this project, there are two major challenges.

1. Data types

   When the code base is vast, it's difficult for me to tell what type of value a variable stores. For example, I may have a helper function that I need to utilize in a component function, then pass the result of this function to other child component functions through props. It's difficult to quickly identify what type of value a variable holds. Because Javascript is an untyped or dynamically typed language, Javascript developers do not need to specify the type of value when defining a variable. It seems to be a nice way for novices to learn the language, however it got unpleasant when I developed this project. To remember what kind of value a variable contains, I must add "str", "num", "arr", or "obj" to the end of the variable name. However, it makes the code a little more jumbled and may result in more possible bugs.

2. Code review

   After completing the project, I attempt to do a code review since the code was not organized and clean when I began writing it. I don't mean professional code review when I say code review. Simply said, I'm talking about making the code cleaner and more organized. Because I didn't concentrate on code maintenance when I built the code, the code review process is difficult and tedious. As a result, it's too late to concentrate on maintenance after the project is completed. Even while I do my best to code review, I can't guarantee that every single line of code is entirely clean. This experience taught me that it is critical to consider maintenance when developing an application.

## What have I learned from this project?

I learned three things while working on the project, all of which are valuable to me.

1. Big O notation

   Big O notation is a simple yet important idea in the realm of software. Before starting this project, I exclusively used this notion to solve technical coding challenges. However, I began to apply this principle in different contexts. When I was working on the project and writing several sophisticated functions, I began to consider the time complexity of this function. For example, after developing a complex function, I'll first ask myself, "What's the time complexity of this function?" and attempt to figure it out, then I'll consider, "Now that the time complexity of this function is O(n ^ 2), can I improve it to make this function O(n)?" and try to figure it out. Consideration of time complexity may seem unimportant when the amount of data is little, but it is always critical to consider runtime since we must suppose the input data will be quite enormous, and our program must still be efficient enough to cope with such large data.

2. Functional programming

   I now have a better understanding of the power of functional programming. Prior to studying React, I spent a significant amount of time attempting to learn functional programming. However, functional programming requires an entirely new perspective to approach programming, which is why it was so difficult for me to grasp at first. Despite my difficulties in understanding functional programming, I am still learning the fundamentals. After completing this project, I began to understand why functional programming places such emphasis on notions such as pure function, side effects, and immutability. All of this, in my perspective, is aimed at eliminating possible errors in the future and keeping the code very manageable. When the scope of the project is modest, it may seem trivial and unnecessary to worry about such details, but the power of functional programming becomes apparent when the scale of the project grows drastically. As a result, it's always a good idea to consider the notion of functional programming initially, so that the project can be maintained as the codebase grows.

## What can be improved in this project?

Although I wish to make my project seem like a real-world software program, there are still many flaws that need to be addressed. I am unable to do this project perfectly due to my lack of understanding and limited time. However, there are three major areas that I believe could be addressed in the future.

1. Backend

   A real-world application should have its own backend rather than relying on Firebase. However, since I am only familiar with the frontend area, I am unable to design a database's backend system. If I learn it in the future, I will undoubtedly create a backend and database for this project.

2. Accessibility

   Accessibility is an important aspect of a web application; it is not always sufficient to have a sophisticated web application that does not enable accessibility. In this project, I just do three things to ensure that the project has a minimal degree of accessibility: I use the semantic HTML tag, I add the tabindex property to the interactive content that does not have a built-in focus feature, and I add the aria-label attribute to the interactive material. Even though I done those three things to improve basic accessibility, it is far from flawless. Because accessibility is such a vast issue, it is difficult to execute in a short amount of time. If I have time in the future, I'd want to learn more about accessibility and apply it to the project.

3. Performance

   Another critical challenge in online applications is performance, particularly when data volumes increase substantially. However, due to time constraints, I only have a basic knowledge of performance. After learning this topic, I want to fix any performance concerns it may have.

4. Testing

   As web applications get more complex, testing has become an increasingly significant notion in the front-end industry. However, due to time constraints, I was unable to study the testing. After I understand it, I'll attempt to include it into this project.
