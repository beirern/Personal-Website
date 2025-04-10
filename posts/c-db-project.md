---
title: I Purchased a C Course to Fix an Insecurity
date: 2025-04-09
tags: [C, database]
excerpt: My First C Project is an on Disk Employee Database. Although it wasn't the most complicated project it left me with some great lessons.
---

# My Low Level Experience

When I graduated from the University of Washington I received a Bachelors degree in *Applied Computational and Mathematical Studies* w/ a concentration in *Mathematical Economics and Quantitative Finance*. I don't say this to brag about how long my degree is but to say that it wasn't a Computer Science degree. My software experience came from "higher level" CS courses like Data Structures and Algorithms, data science, or ML and projects that I had worked on in my free time. The languages I knew out of college were Java, Python, R (eww), and Javascript. Note the lack of C/C++! In the summer quarter of my 1st year I took a class that taught us some very basic C to explain how computer systems worked, i.e. we would be given projects where we wrote a few functions and the point was to be able to understand every line of C code and what was going on in the computer; if you've graduated with a CS degree then think of assignments like "bomb defusal" or bitwise operations. In my internships I never needed to know C/C++ but I did feel a little weird about not not having this experience that a lot of other people I knew had.

Lately I've been doing things that I've wanted to do for a while and in this vain I decided that I wanted to dive into C. I like watching youtubers like [The Primeagen](https://www.youtube.com/@ThePrimeTimeagen) and [Low Level Learning](https://www.youtube.com/@LowLevelTV) and I saw that LLL has a [few C courses available](https://lowlevel.academy/). I previously learned quite a bit of Javascript and React through Udemy so I've had good experiences with online learnings and I am the kind of person where if I don't put *skin in the game* I will have a lot of trouble keeping on with learning. Additionally have a structured approach is really nice. So I shelled out the money and started cracking away at the first course, which was an introduction to C with the end project to build a database on disk.

The rest of this article isn't meant to be a review of the course, I thought the project was cool and I definitely learned things. If you don't mind paying for a course I don't think it's a bad investment, I wouldn't say I was blown away and there were times I felt like certain things were skipped over; I was glad that I had a previous class that went a lot more in depth into things, e.g. endianness.

Project: https://github.com/beirern/LLA-DB-Project

## Project Abilities

The idea of the project was a file based DB about employee information including a name, address, and hours worked. It's pretty basic. You would run `./project` with specific flags and be able to

* Create a file which would contain the DB
* Read from an existing file to query information from it
* Add/Remove an employee from the database
* Edit an employee's information in the database

It also does some other interesting things by wrtting a header in the file with information containing
* The version of the API it is using
* Count of employees in DB
* What the size of the file *should be*, e.g. size of all the employees + header
* A magic number which would be checked to make sure the file being read is a DB file

# Learnings

## Pass by Reference

### High Level

What I'm referring to here is that certain variables in programming languages will refer to a literal value while some will refer to an address in memory. An example would be

```java
// Java
int i = 3;
ArrayList<Integer> list = new ArrayList<>();
```

If I start interacting with `i` I am interacting with the number `3`. For example if I do

```java
int j = i;
j += 3;

System.out.println(i); // 3
System.out.println(j); // 6
```

We can see that `j` and `i` are different. When I gave `j` the value of `i` it "copied" the value to `j` so if I do operations on `j` it is completely independent from `i`. This is the same for all `primitives` in Java, `byte`, `short`, `int`, `long`, `float`, `double`, and `boolean`.

On the other hand if we have a class, like `ArrayList` we get different behavior.

```java
list.add(1);

ArrayList<Integer> list2 = list;
list2.add(2);

System.out.println(list); // [1, 2]
System.out.println(list2); // [1, 2]
```

You can see that changes to `list2` affect `list`, they are not independent. This is because objects do not get copied when you assign a new variable the value from a different variable. If you want to copy objects you need to use `.clone()` in Java. There's nuances to this like deep vs shallow clones but that's not the point I'm trying to make right now.

```java
ArrayList<Integer> list = new ArrayList<>();
list.add(1);

ArrayList<Integer> list2 = (ArrayList)list.clone();
list2.add(2);

System.out.println(list); // [1]
System.out.println(list2); // [2]
```

This is something that you learn pretty quickly once you're programming, it's very practical to know or else you're gonna end up writing a bunch of bugs. When I was in high school we learned this but it wasn't until I did this project and started writing C that I understood how and why this actually worked how it did.

### What is happening under the hood

Primities are stored on the stack, so the variables access their values directly. `int i` and `int j` are both have their values on the stack. Objects are stored in the heap, which means that variables are pointing to an address on the heap and that address contains the value. So `ArrayList list` and `ArrayList list2` end up having the same address and thus end up pointing to the same object. When I first learned this I didn't really know about Stacks and Heaps and kind of understood this but it really hit home now as I had a language where I use variables to point to address space (pointers).

Pointers also helped me really understand what is happening when you have a function and you pass it an object. If you pass an object to a function you are just passing a pointer (address) to the object in the heap. Like I said before I'm not sure what I imagined previously passing by reference was, I guess I didn't really think that hard about it but once you start using pointers and have to interact with addresses & the heap references makes a lot of sense. By passing the function the pointer to the object, whatever that function is going to do is clearly going to affect the object because it's going to do its logic in the address space where the function lives. All the function is doing is going to the address you give it, indexing into the heap based on what field you are accessing, and reading/modifying the space there. It's actually really cool and it's cool to be able to visualize it in my head be able to use pointers.

```java
Object o = new Object(); // o.x = 0

System.out.println(o.x); // 0

public static void addFiveToX(Object o) {
    o.x += 5;
}

System.out.println(o.x); // 5
```

## Errors as Return Values

I first heard this term from The Primeagen and I never really understood it until now. In every other programming language I've ever used the return value from a function was either `void`/nothing or the value that you want.

Updating the field of an object? return `void`

Adding 2 numbers together? return `int`

What if something goes wrong in the method? You expect an `int` but get passed a `String`? Most languages, especially dynamic languages, would just `throw`/`raise` an `Error` or `Exception`. So every method either does the thing you expect or will error out. In C however, the general style is to not throw errors and exceptions but rather to `return` exit codes that signal something went wrong or return `null`. For example, we can look at the `man` page for `open`

> RETURN VALUE
>
> On success, open(), openat(), and creat() return the new file
> descriptor (a nonnegative integer).  On error, -1 is returned and
> errno is set to indicate the error.

So we can image that the open function looks something like

```C
int open(char* filename, int oflag, ...) {
    // Try to open a file
    int file_descriptor = open_file();

    if (failed_to_open_file) {
        return -1;
    }

    return file_descriptor;
}
```

If this method works then we get a file descriptor but if it doesn't we get `-1`. This means that after the method is run we have to actually check if it was successful, *because the error is a return value*. This means that after every `open` call you have to do something like this (taken from project code).

```C
int fd = open_db_file(fileName);
if (fd == -1)
{
    return GENERAL_ERROR;
}
```

The general pattern basically became

call method -> check for error -> call different method -> check for error

```C
int res = method();
if (res == -1)
{
    return ERROR;
}
```


I've never programmed like this in my life. I will be the first to say it was very cumbersome and I felt like I was writing a lot of boilerplate because I knew that almost every time I called a method I would need an `if (res == -1)` or `if (res == NULL)` in the case of `alloc`/`malloc`. However this left me feeling really confident in the code, while there could be a bug in `open()` by returning the error value *I had to enumerate failure conditions* (at least some of them). How many times do you write code, especially in a dynamic language, and just assume it's going to continue to work because it worked the first time you ran it? It's impossible to think of every failure scenario of every method you write, especially when the things that call the method might change but if you are returning errors then you at least **have to think of the basic failure conditions** of your function. It was so different from what I had done before and honestly *I love it*. I'm not sure how to incorporate it into non-C code where the norm seems to be to throw exceptions and use `try/catch` but it's at least left me very conscious of this pattern.

As an example from Python on opening a file you would just do it in one line

```python
file = open('example.txt', 'r')
```

How do you know if it failed, for example you didn't have permission to make the file? Well if you don't do `try/catch` it'll throw an `Exception`! An example below shows how you can catch one `Error` that might pop up.

```python
try:
    file = open('nonexistent_file.txt', 'r')
    content = file.read()
    print(content)
    file.close()
except FileNotFoundError:
    print('File not found.')
```

I don't claim to be an expert in design philosophies so maybe this is better or faster but honestly I don't like the idea that a method I use can just throw various Errors and Exceptions. I like that when I have a function in C I can open a `man` page and there will be a section that'll tell me what to look for in return values and I can know how it'll fail. I suppose a function tell me how it'll throw an Exception isn't that different but somehow in my head and with my eyes I see this as different and better. Again, it's not like I love it so much that I've incorporated it into all my projects (and not this website) but as a philosophy I really like errors as return values.

## Static Types are Really Nice

I've been programming Ruby and very little Python at work. Python has a typing system, you have to opt into it and it isn't enforced at runtime so it's only helpful if you have something like `mypy` running in the background to help you out. That being said it is nice and when I write Python I use the type system. It is incredible to say but Ruby has no type system as far as I know or it has one but you need to define the types in different files.......... I can understand wanting to have things be dynamic and avoiding types but the fact it isn't even optional is pretty crazy to me or that the way to use it is to have different files for your types and method signatures. The more complex ruby projects I see at work the more I wish there was typing, there was one project in particular that used meta-programming and lots of inheritance that made not having types a nightmare. You had no idea what a variable was unless you `puts variable` or `puts variable.class`. It's horrible.

## Making things in C is so slow

The previous points were pretty positive things and were things that I feel like make me a more cognizant programmer and this is the first con of C. The project I made was pretty basic, there were some things that were new for me even if I did it in a different language, such as the file being a binary file (never did that before) and left some metadata in the header of the file that I never thought about. But there's no doubt it would have been so much faster in any other language. Errors as return values is cool but it is cumbersome and there are so many resources in other languages, e.g. frameworks that make starting projects so fast. The point of this project was to learn and not build something as fast as possible but I can tell that if I was going to do a new project and wanted to do it in C I would need to be willing to sacrifice a lot more time than I normally would.

# Takeaways

I'm thinking of continuing with C and doing another project involving web servers or implementing the TCP protocol by hand. Maybe trying a language like Go which isn't as low level as C but still more low level than what I normally work with. I found it really valuable to do this project and really understand what happens with the code I write.