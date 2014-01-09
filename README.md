Springboard
===========

Springboard provides an reusable skeleton for building modern web applications with Chaplin (Backbone), Bower, Grunt, Less, and other goodies. 

Requirements
------------
* Node Package Management (`npm`) utility. This ships with modern versions of NodeJS.


Instructions
------------

First, copy the latest files to a directory on your machine:

```
wget https://github.com/andrewfhart/springboard/archive/master.zip && unzip master.zip && rm master.zip
```

You will most likely wish to rename the generated `springboard-master` directory to something more appropriate for your needs. Then, `cd` into the directory and run the initialization script, providing your own application-specific answers for the requested information:

```
./init.sh
```

Finally, start your application server using the Grunt command line interface:

```
grunt server
```

Visit your application at: http://localhost:3333/


Under the Hood
--------------

Here's a bit more about what Springboard is doing:

The initialization script (init.sh) is very simple. It installs the [Grunt](http://gruntjs.com/) command line interface tool, invokes `npm init` to generate a `package.json` file for your project, and then installs a number of Grunt plugins necessary for build/deployment.

That's about it. After using this tool, you can manage and configure your application in `package.json`, `Gruntfile.js`, and `src/js/application.js`.