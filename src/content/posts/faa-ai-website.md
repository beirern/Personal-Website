---
title: RAG App
date: 2025-03-15
tags: [javascript, nodejs, backend, express]
draft: true
---

# Building a RAG App

As part of being a private pilot you need to know a lot of rules and regulations. Some of these are things like "How long is the plane you're flying for registered for federally? What about for the state you're in?", and "What documents do you need to bring with you to legally fly?". These are generally **regulation** questions which are defined in the FAA's [FAR](https://www.faa.gov/regulations_policies/faa_regulations). There are a lot of **theory** concepts as well that you need to know, things like, "If I'm going to fly how do I read a METAR report?", "What equipment and visibility requirements are there in Class B airspace vs Class D?", "How should I approach flight planning if I know there's a thunderstorm that will be close to my intended route", and "What is the procedure for a soft field takeoff?". These questions can generally be answered by reading and understanding the [FAA's PHAK](https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/phak). Finally, there are things *specific to your plane* that you need to know. For example, the best glide speed, best rate of climb speed, and weight and balance of your plane/the plane you are training in. These specific things are found in a plane's Pilot Operating Handbook.

So a lot of studying ends up being reading through theory and regulations. If you only needed to show you could *fly* the plane some of this wouldn't matter, but in order to become a pilot you have to pass the "Checkride". This is 2 parts: 