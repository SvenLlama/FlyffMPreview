# FlyffMPreview

FlyffM will be released once you hit max level (without cheating).

URL: https://svenllama.github.io/FlyffMPreview/dist/flyff-m-preview/

# Contribution guidelines

Make sure to put all the HTML program code in app.component.html and all the 
typescript in app.component.ts.

It's important you put it in these two files so the code can be easily found and is not scattered all over the place in different folders.

When writing code try to keep the variable names nice and short so its easy on the eyes to read.

Do not over-use methods so you do not constantly have to jump between lines while reading the code.

Do not clutter the code with comments - they only distract the reader from reading what really counts - the code.

The UI has to be in pure HTML5 without any styling - otherwise the page load time might become too big. (there's currently already some megabytes of JSONs being loaded into the page so I dont want to bloat this even further by adding css files)
