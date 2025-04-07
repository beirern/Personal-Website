---
title: My First Project Gave Me Gamer Posture
date: 2025-04-07
tags: [NBA, personal project]
excerpt: I had nothing to do in the winter break of 2018 so I decided to try to scrap all the team stats from [BasketBall Reference](https://www.basketball-reference.com/). Although the project doesn't work and violates the scraping policies of the website it's one of my favorite programing memories.
---

It's 2018 and I am 18. I'm wrapping up the 2nd intro to computer science course at the University of Washington, this is the class where you learn about basic data structures like Lists, Maps, and Dictionaries in Java. This is not *Data Structures & Algorithms*! That comes next. On the last day of classes the teacher (I don't remember his name but he was really good!!! I'm sorry teacher :( ) wanted to show us that with the skills we had we can work on real projects. Obviously they may not be super well written and we would have to do some research into how to deploy a Java application and maybe learn about 3rd party packages but we knew how to write code. He demo'd a project that took public Seattle crime stats, downloaded it, and allowed you to interact with the data via the command line. For example, you would choose a type of crime as defined in the data, 0 - property, 1 - violent, etc., and a part of Seattle and it would return the data for you. It was something like [this website](https://www.seattle.gov/police/information-and-data/data/crime-dashboard) but without a UI.

![Seattle Crime Dashboard](/images/seattle-crime.png "Seattle's crime dashboard")

He then showed us the code and the code used everything we had learned in class and some more. We had Maps and Lists and some other libraries that helped with downloading files and opening them but otherwise the code was something that we could all write. His point was that we knew enough to build things, it's just up to us to find something to build. I didn't think too much of this at the time but this presentation would lead to my first personal project.

After finals week I returned home and had 2 weeks off from school. So nothing to do. At this time I was pretty into basketball, specifically basketball statistics. The 2016 playoffs was my first foray into basketball and I loved spending my free time analyzing it and looking at statistics. A popular website for basketball statistics is [Basketball Reference](https://www.basketball-reference.com/), it's got pretty much everything you could want out of a website/datastore for basketball statistics. I'm not sure why but I decided that I would try to get all the team data they had into a spreadsheet, I guess so that I could do some data analysis on it later? I was inspired by Kaggle datasets [like this](https://www.kaggle.com/datasets/drgilermo/nba-players-stats). Anyways, it was very reminiscent of the project that my teacher had demo'd but with different data.

What this led to was 2 weeks of slumping on a chair and grinding out insanely complicated and specific Java code. My whole break was spent on this, watching the daylight go by out of my window while I grinded away at spreadsheets, and at night having only the light of my screen as company as numbers danced before my eyes. The result though? Ugly and cringy code as well as hundreds of CSV files that I cringe at the notion of having to use, but a project I hold dear to my heart and am proud of.

![My posture for 2 weeks](/images/coding-in-room.png "ChatGPT Rendition of what I looked like coding")

The code for this project can be found here, https://github.com/beirern/Basketball-Reference-Team-Stats-Scrapper. And the resulting dataset is [on Kaggle](https://www.kaggle.com/datasets/nick127/basketball-reference-team-page-stats)! Unfortunately the code doesn't work for me, probably something to do with an API not working or a java version issue or some other issue but it did make me 30+ years of data (up to the latest year, 2018) and worked at some point.

Everytime I look at this project I am surprised by some of the design choices. For example, there are functions! I don't want to think of their *cyclomatic complexity* but I did try to split the logic up, and to be fair some of the things I had to deal with was very specific. Since Basketball Reference doesn't actually allow datascraping I was dowloading HTML files and parsing out HTML tags to find the data so certain functions will be tough to keep simple. I didn't deal with file paths very well, it's clear I expected this to be run on a windows machine and I'm honestly still unsure of how to structure a java project (do I just keep the `.java` file? Do I have to put anythign else in the directory?). Also the dataset is **insane**. There are 14 *tsv*'s (why not *csv*s??) per year for a team and we have 30+ years for ~28 teams. This is a bunch of file that you would need to manipulate to put the data together.

BUT! Even with all that.... somehow.... WE HAVE 4 UPVOTES AND SOMEONE ASKED FOR MORE DATA

![Screenshot of Kaggle Dataset](/images/kaggle-dataset.png "Screenshot of upvotes and comment of dataset")

I always look so fondly on this project because like my CS142 teacher told us, we had all the tools necessary to build things, we just had to do it and maybe learn some extra stuff on the way. It's far from the best code and unfortunately it was brittle enough to break BUT it created a bunch of data that someone seemed to have a use for and more importantly, *it was fun*.

P.S. I did end up fixing my posture and now I stand very straight.
