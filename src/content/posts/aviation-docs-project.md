---
title: My First SaaS
date: 2025-09-09
tags: [aviation, SaaS, AI]
excerpt: My First time building a full-stack website that is meant to help pilots study and find FAA regulations!
---

Recently I launched [aviationdocs.net](https://aviationdocs.net)! This is a website that is meant to function like other AI chat applications (chatgpt, gemini, claude, etc.) except it is trained to use aviation documents and return the place in these documents that the answer comes from so that a pilot can verify what answer they were given. If you're not a pilot then the [about page](https://aviationdocs.net/about) can show you some examples of how you might interact with the website.

# Background

To go into a little bit more detail on what need this is trying to serve let's talk about what is required to be a Private Pilot in the United States.  

![General Requirement for a Private Pilot's License](/images/private-pilot-reqs.jpg "General Requirement for a Private Pilot's License")

In general what we are looking at for this project is the 2nd bubble: "Aeronautical Knowledge". While you can probably learn how to fly a plane purely through repitition and skip theory like what generates lift and understanding why the plane has a tendency to turn (usually to the left) it's probably helpful to know these things. Also, it is tested. The final test, called the "Checkride" is a a 2 part test: the first part is a 1-2.5 hour oral section where the examiner asks you a bunch of questions about the flight you're about to take and sprinkles in some trick questions to test your understanding of regulations and theory. The final 1.5-2 hours is the actual flying portion if you pass the oral. There is also a written test that every private pilot must pass, though you only need a 70% to pass and it is multiple choice. That being said it isn't a test you can just take without studying and whatever you miss on the written test will be guaranteed to come up in the oral so it's advised that you get as high a score as possible to keep the oral as short as possible.

Now what do you study as a private pilot? There are a documents that are really the size of textbooks. 

## Pilot Handbook of Aeronautical Knowledge (PHAK)

By far the most important one and generally what curriculums are built on is the [PHAK](https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/phak). This massive textbook goes over airplanes from their history, controls and physics, weather considerations, navigation planning, maneuvers, and how to evaluate yourself and your plane for flight readiness. It also mentions some regulations that are part of the Federal Aviation Regulations but isn't an up to date source for regulations.

## Airplane Flying Handbook (AFH)

The [AFH](https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/airplane_handbook) is used to explain how to actually fly the plane. Where the PHAK will focus more on theory and give a high level view of flying the AFH is to understand how to physically fly the plane such as during different phases of flight (takeoff, landing, cruise), or how to perform a specific maneuver. The PHAK is more about the 'why' and 'what' of aviation concepts, whereas the AFH focuses on the 'how' and 'when'.

## Federal Aviation Regulations (FAR)

The [FAR](https://www.ecfr.gov/current/title-14) is an ever evolving document that lists ALL the regulations that pilots must follow. There are a lot of parts and generally you wouldn't memorize the whole thing except for select regulations that would be good to know, for example section 61 and 91 pertain to earing a pilot certificate and all pilots respectively. However, if there's ever a question into what is legal related to aviation, this is where you will find the answer, so it's a very important document to have access to.

## Pilot Operating Handbook (POH)

The POH is a handbook that is unique to each model of plane, so there is no "One Document" to link here. Rather you would read the POH for the plane that you are training on, which for most people is probably a Cessna 172 (I started on a 162 before switching to a 172). Here is an [example POH](https://www.befa.org/wp-content/uploads/2019/12/POH-Cessna-172S.pdf). Generally they are all structured the same and have the same 9 sections but could have different appendices based on what has been installed or replaced. The POH is where you will find information on how your specific plane is built and the mechanical and electronic systems work and what speeds and conditions the plane can handle. For example, The PHAK and AFH will talk about manuevers and how to fly them but will say that you need to fly at *V_a* or the *maneuvering speed*. Or it will outline how to handle an emergency engine out situation and tell you that you would need to fly at *V_g* or *best glide speed*. The POH would tell you what *V_a* and *V_g* are in knots, for example for the 172 I've been flying the *V_a* is from 90-102 knots depending on passenger + baggage weight while *V_g* is 68 knots.

Given that plane model is different it's imperative to read the POH and understand how your specific plane is built and what speeds to fly it at.

## Airman Certification Standards (ACS)

There are different ACS documents that outline the requirements that a pilot must demonstrate for the certification they are being tested for. For example, this is the [Private Pilot ACS](https://www.faa.gov/training_testing/testing/acs/private_airplane_acs_6.pdf). It's mostly for examiners but it's good for students to understand as it lists the exact things they should be able to show for each maneuver/knowledge item for the Checkride.

# Why Build This?

So now that you have an idea of all the documents that aid a private pilot you can probably see that it's a lot. There's many things that a private pilot would be able to memorize and pick up as they're flying, for example once you start flying and understanding how the airplane moves the theoretical concepts behind the forces of flight are easier to comprehend. These concepts would at most just need a quick refresher for a pilot that hasn't studied the exact wording of a text book in a while. But there are a lot of things to memorize that more esoteric/specific numbers

* Airspace and Visibility requirements
* Maintenance required for a plane to be "airworthy" and their windows
* The different acronyms for decision making

It's like how programmers need to google "How to center a div". It's supposed to be basic and you think you know how to do it but then when you need to you double check. Generally it's ill-advised to google for aviation related questions, ESPECIALLY if it's for a regulation and examiners/instructors would prefer if you do use google that you find the answer on a reputable site, e.g. https://faa.gov. But what if you could use something similar to google, i.e. use natural language rather than Ctrl + F a textbook to find your query and know that your answer will be from the FAA docs? That's what this is meant to be! A more reliable form of "Googling" where the answers will come straight from the FAA sources AND it will link to the pages in those sources so you can verify the information for yourself!

At the time I built this I was interested in AI and wanted to build something with it and understand better how "AI"/LLMs work and their capabilities. This is a perfect use case of an Retrieval-Augmented Generation (RAG) LLM and so I got to work.

# The Tech Stack

## LLM

Let's start with the LLM since the rest of the stack is more "standard" and most programmers would likely understand it without going into too much explanation but LLMs are a bit newer. As I mentioned this was a great use case for a RAG LLM.

![RAM LLM](/images/rag.png "RAG LLM")

The basic idea of a RAG LLM is to use an LLM's ability to understand language and generate sentences/answer and pair it with highly specific context for generating those answers. In this case we would take a users's question, e.g. "What is the best glide speed on the Cessna 172?" and using ONLY documents provided to the LLM it would find the relevant section in one of the documents and answer something like "The best glide speed for a Cessna 172 is 68 knots with all flaps up" and then provide a link to the place where it found this information. If it fails to find relevant information it should respond "I don't know". The key concept here is that we can use a pre-trained LLM (for example gpt-4 or gemini-2.5) and have it only provide answers based on specific input information.

![More Detailed RAG Workflow](/images/rag_detail.png "More Detailed RAG Workflow")

This document provides a bit more detail for those curious about this specific workflow

1. Take in the input documents
2. Chunk them (break them into smaller pieces)
    a. There are different ways to do this varying the size of the chunks and overlap
3. Use an embedding algorithm to turn the words (tokens) into a vector and store that in a DB
4. Once a query comes in then do steps 2 & 3 on the query
5. Compare query vector and document vector and if they are similar (computed vs distance algorithms) then that part of the document might answer the question
6. Feed these "relevant" parts of the document into LLM context
7. Have LLM answer the question ONLY using the documents in its context

## Rest of the Stack

In general the website is built with Django (Python) and uses Docker to interact with PostgreSQL for storage and ChromaDB for vector embedding storage. S3 is used for storing users documents and we currently use gemini-2.5 for embedding + the LLM however this is subject to change. The diagram below shows the basic setup. It's currently all on my lightsail server which might not be the most scalable solution at the moment but it's cheap and easy to understand and an optimization for later.

![High Level Architecture Diagram](/images/aviation-high-level.png "High Level Architecture Diagram")

The LLM portion of this post talked about generally flow of querying but here is a diagram for visual learners.

![Chat Flow Diagram](/images/aviation-chat.png "Chat Flow Diagram")

Also here is a diagram for the upload document flow for those curious.

![Upload Document Flow Diagram](/images/aviation-chat.png "Upload Document Flow Diagram")

Overall the tech stack isn't anything crazy. Django was amazing a quick way to get pages running and working while PostgreSQL was chosen as I worked with it before professionally and there isn't a reason to not use it.

# Future Improvements

# Learnings