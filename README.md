[中文版本](Readme-Chinese/READMECHINESE.md)

In this readme file, you will find all the information you need about this project.
To save time, I'll recommend you to do this.

(1) watch the video

(2) check out special technique

(3) reflection.

&nbsp;

# About the project

This is a web-based expense tracker application. In the app, users may add, remove, and update daily spending and revenue data. With the data users provide, this app may offer a variety of various capabilities and assist users in managing their money in an orderly and effective manner.

&nbsp;

# The motivation behind the project

I began creating the project with the new programming language I had recently learnt in the hopes of eventually using the project to address real-life instances. I've been keeping track of how much money I've made and spent over the last year, but the tools I've used have been confined to smartphone applications. It seemed to be handy at first, but I quickly discovered various issues. The main issue is that it gets harder to handle as the amount of data rises, as does the demand for increasingly complicated data analysis. In addition, the trade-off for convenience is the mobile screen size constraint. With bigger screen sizes that capture more data at once, laptops and computers are more user-friendly. Based on these issues, while it is convenient to have a mobile app, it’s even more ideal to develop a web app. The issue motivates me to create my own expense tracker, complete with chosen and extensive functionality aimed at addressing the aforementioned concerns and improving user experience.

&nbsp;

# Technologies used

- HTML
- CSS
- Javascript
- React.js
- Chart.js
- Firebase
- API - MarketAux

&nbsp;

# Project overview

_If you prefer viewing videos to reading, I suggest skipping this part and instead watching the video._

This project has six pages, and this section just provides a high-level summary of each page. This application's general layout is broken into two components. The left side is the sidebar, where users may change the page by clicking the icon, and the right side is the corresponding page.

## Home page

The home page is separated into two sections

Main section (left-hand side)

&#8594; keeps track of daily transactions; the user may see different day by clicking one from the weekly calendar list

&#8594; Switch between weeks by clicking the arrow buttons on both sides

Subsection (right-hand side)

&#8594; The top card displays the precise amount of expense, income, and net income for a given week

&#8594; The bottom card displays two basic charts to assist users in visualizing the weekly expense data

&nbsp;

## Calendar page

The calendar page is separated into two sections

Main section (left-hand side)

&#8594; keeps track of all transactions over the course of a month. The pink dots indicate income data, while the blue dots indicate expense data

&#8594; Click a day to get the detailed transaction for that day

&#8594; Switch between months by clicking the arrow buttons on both sides

Subsection (right-hand side)

&#8594; The top card displays the precise amount of expense, income, and net income for a given month

&#8594; The bottom card displays two basic charts to assist users in visualizing the monthly cost data

&nbsp;

## Chart page

The chart page is separated into two sections

Main section (right-hand side)

&#8594; displays a pie or bar chart

Subsection (left-hand side)

&#8594; Users have a variety of choices for customizing the chart

&nbsp;

## Search page

The search page is separated into two sections

Main section (right-hand side)

&#8594; shows the all expense and income data

&#8594; Sort the data by clicking the different buttons, and enter notes to search for particular data

Subsection (left-hand side)

&#8594; To filter the data, click the checkbox

&nbsp;

## Account page

The account page is separated into two sections

Main section (left-hand side)

&#8594; Three little cards display the precise amount of expense, income, and net income in the account

&#8594; The graphs below represent the cumulative net income over various time periods (net income = expenditure - income)

Subsection (right-hand side)

&#8594; It displays the current level in the bottom right corner

&#8594; The top card displays the most recent financial news

&#8594; The bottom card displays three basic charts to assist consumers in recognizing their own spending patterns

&nbsp;

## Setting page

There are three small subpages in the setting page.

Account

&#8594; Shows the personal information, like name and email

Appearance

&#8594; Switch between dark mode and light mode

&#8594; This project is the dark mode by default

Category

&#8594; not only displays all of the main and subcategories, but also allows users to create and remove categories

&nbsp;

# Dig into detail

_If you prefer viewing videos to reading, I suggest skipping this part and instead watching the video._

I'd like to share three details in this project with you here.

## 1. Format the representation of money

In order to offer a clear representation of money, when there are three additional digits, I use a "," to separate them. Instead of presenting $2930, it's more straightforward to show $2,930. Also, when the price is exceedingly huge, showing the precise numbers gets too verbose, therefore I use English characters to indicate the high price. For example, 1,000,000 = 1M (million), 1,000,000,000 = 1B (billion), and 1,000,000,000,000 = 1T. (trillion). Instead of displaying 23,000,000,000, just display 23B. This feature allows users easily recognize the proper quantity of money while while maintaining the structure of user interface.

## 2. When constructing a pie chart, prevent users from entering inaccurate data

Users must provide the beginning and ending dates to build a pie chart, although it is illogical for the finishing date to be sooner than the starting date. For example, if a user selects 2021-09-12 as the beginning date, ensure that the user may only enter the ending date that is later than the starting date, which is the day after 2021-09-13. It protects users from entering invalid data, which might lead to an error.

## 3. Prevent users from entering the same category name again

Users in this project may create new categories, however having two duplicate category names makes no sense. To avoid this, the button is disabled and the warning text is shown when users provide a duplicate category name.

&nbsp;

# Special Technique

Here, I'd like to share two special techniques in this project.

## 1. throttle function and useCurWidth custom hook

When I was attempting to make the website responsive, I ran across a problem: I wanted to know the current window size when the user changed it. The initial thought is to just add an event listener to window and use useState to capture each state of the window size. This is effective. However, it is inefficient to force a re-render every time the user changes the screen size. The worst-case scenario is that the whole component is re-rendered thousands of times in a matter of seconds. To solve the issue, I'll need a helper function to ensure that function calls only occur within a certain time period. As a result, I looked for a solution and discovered that there is a helper function that does this task properly. This is the throttle function.

```
function throttle(func, delay) {
  let wait = false;
  let latestArg = null;

  function timeoutFunc() {
    if (!latestArg) {
      wait = false;
    } else {
      func.call(this, ...latestArg);
      latestArg = null;
      setTimeout(timeoutFunc, delay);
    }
  }

  return function (...args) {
    if (wait) {
      latestArg = args;
      return;
    }

    func.call(this, ...args);
    wait = true;

    setTimeout(timeoutFunc, delay);
  };
}

export default throttle;
```

Although I did not create this function initially, I do read the code and do my best to understand the mechanism in this function. This function, it turns out, integrates a number of critical principles, including high order function, spread operator, rest operator, recursion, asynchronous, and closure. Because I want to detect the current width in many components, I construct a custom hook to perform all of the logic inside, and I merely make sure that this custom hook always returns the current width of screen size.

```
import { useState, useEffect } from "react";
import throttle from "../Throttle/throttle";

function useCurWidth() {
  const [curWidth, setCurWidth] = useState(window.innerWidth);

  useEffect(() => {
    const detectWindowWidth = throttle(function handleResize() {
      setCurWidth(window.innerWidth);
    }, 300);

    window.addEventListener("resize", detectWindowWidth);

    return () => window.removeEventListener("resize", detectWindowWidth);
  }, []);

  return curWidth;
}

export default useCurWidth;
```

This custom hook calls useCurWidth, which requires no parameters and always returns the current width of the screen. Because adding an event listener to the window causes a side effect, I use the useEffect hook. Furthermore, due to the throttle function, the handleResize function is only invoked after 300 milliseconds, even if the user continues to change the width of the screen.

## 2. mutipleArgsHelper function

Because this is an epxense tracker project, I'll be dealing with string operations in a variety of circumstances. For example, I want to properly format the money, which includes expense, income, and net income. This is how I wrote the code at first.

```
const income = formatMoney(props.income);
const expense = formatMoney(props.expense);
const netIncome = formatMoney(props.netIncome);
```

This is fine, however the code is a little verbose. More crucially, it's the imperative manner of writing the code; we effectively tell the machine **_how_** to conduct the work, step by step. Because I was using React to develop the project, this is an excellent opportunity to write code in a declarative manner, which is a key notion in functional programming. Instead of instructing the computer **_how_** to accomplish something, we tell it **_what_** outcome we desire. Then I write this function called multipleArgsHelper.

```
function mutipleArgsHelper(fn, ...args) {
  return args.map(fn);
}

export default mutipleArgsHelper;
```

This helper function is pretty straightforward. It accepts one argument named fn as well as numerous other parameters called args. I'm using ...args since I'm not sure how many arguments will be passed in this function. Furthermore, not assuming the amount of inputs ahead of time may make this function more reusable. In a result, I utilize the rest operator to aggregate all of the parameters as an array. Then, using the .map method, run the fn function on each argument. Because fn is a unary function, which means it only accepts one argument, we may write the code in a _point-free_ manner.

Then I apply this helper function to the location where I need to clean up the code.

```
const [income, expense, netIncome] = mutipleArgsHelper(
    formatMoney,
    props.income,
    props.expense,
    props.netIncome
  )
```

&nbsp;

# Reflection

## What’s the main obstacle when building this project?

When constructing this project, there are two major challenges.

1. Data types

   When the code base is vast, it's difficult for me to tell what type of value a variable stores. For example, I may have a helper function that I need to utilize in a component function, then pass the result of this function to other child component functions through props. It's difficult to quickly identify what type of value a variable holds. Because Javascript is an untyped or dynamically typed language, Javascript developers do not need to specify the type of value when defining a variable. It seems to be a nice way for novices to learn the language, however it got unpleasant when I developed this project. To remember what kind of value a variable contains, I must add "str", "num", "arr", or "obj" to the end of the variable name. However, it makes the code a little more jumbled and may result in more possible bugs.

2. Code review

   After completing the project, I attempt to do a code review since the code was not organized and clean when I began writing it. I don't mean professional code review when I say code review. Simply said, I'm talking about making the code cleaner and more organized. Because I didn't concentrate on code maintenance when I built the code, the code review process is difficult and tedious. As a result, it's too late to concentrate on maintenance after the project is completed. Even while I do my best to code review, I can't guarantee that every single line of code is entirely clean. This experience taught me that it is critical to consider maintenance when developing an application.

3. Maintenance

   I began to appreciate the significance of maintenance. Before embarking on this project, I was told that maintaining the software maintainable is critical, but I'm not sure why. However, as I worked on the project, I began to see the reason. When I first construct the application, all I worry about is completing the basic functionality and not the structure of the code underlying the functionality. Even if the UI appears good, the code behind the UI is a mess, and I have to spend a long time simply detecting a little bug. After completing the project, I begin the code review, reading every single line of code I previously wrote and asking myself questions, like

   - Does this variable name fully describe itself?

   - This part of code appears duplicate, can I extract that, and create another function to avoid duplicate code?

   - It appears this component is used at different places, can I create another component function to make this reusable?

   - Is this part of code clean and readable?

   I attempt to solve these issues and refactor the code. If I don't strive to make the code maintainable from the start, it's difficult for me to detect errors, comprehend the code I created earlier, and, most importantly, other developers don't understand my code when they first encounter it. It is uncommon in software development for a single developer to create an application from the ground up. Rather, developers collaborate to create the application. As a result, it's critical to build code that other engineers can completely grasp without misunderstanding.

&nbsp;

## What have I learned from this project?

I learned three things while working on the project, all of which are valuable to me.

1. Big O notation

   Big O notation is a simple yet important idea in the realm of software. Before starting this project, I exclusively used this notion to solve technical coding challenges. However, I began to apply this principle in different contexts. When I was working on the project and writing several sophisticated functions, I began to consider the time complexity of this function. For example, after developing a complex function, I'll first ask myself, "What's the time complexity of this function?" and attempt to figure it out, then I'll consider, "Now that the time complexity of this function is O(n ^ 2), can I improve it to make this function O(n)?" and try to figure it out. Consideration of time complexity may seem unimportant when the amount of data is little, but it is always critical to consider runtime since we must suppose the input data will be quite enormous, and our program must still be efficient enough to cope with such large data.

2. Functional programming

   I now have a better understanding of the power of functional programming. Prior to studying React, I spent a significant amount of time attempting to learn functional programming. However, functional programming requires an entirely new perspective to approach programming, which is why it was so difficult for me to grasp at first. Despite my difficulties in understanding functional programming, I am still learning the fundamentals. After completing this project, I began to understand why functional programming places such emphasis on notions such as pure function, side effects, and immutability. All of this, in my perspective, is aimed at eliminating possible errors in the future and keeping the code very manageable. When the scope of the project is modest, it may seem trivial and unnecessary to worry about such details, but the power of functional programming becomes apparent when the scale of the project grows drastically. As a result, it's always a good idea to consider the notion of functional programming initially, so that the project can be maintained as the codebase grows.

&nbsp;

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
