# Image Classifier

This is a simple implementation of an Image classifier
I want to test out how it works and explore how to best visualize it.


## The premise

Turns out, its not too difficult to start understanding how we can classify an image.
### Concept

In a very primitive sense, an image classifier takes a look at an image and classifies **The Image** based on a given set of labels.

#### Misconception
In our primitive model, what it doesn't do is object classification.
It doesn't take a look at an entire image and to look for specific
objects.
We are also not using neural networks for this project currently.
All we are doing is using the distance formula.
##### What the F?

The idea for this one is actually simple. It takes a look at a specified number of pixels in an image. It uses these pixels as components of a vector and **plots** this vector in space.

If we were sampling 3 pixels, the vector will have 3 components and be plotted in a 3 dimensional space. We collect this data for different images and plot them as well. Now when it is time to put it all together, we check the distance between the test image "vector" and our pre-plotted vectors, we try to find the smallest distance and say "The test image vector is closest to this vector and therefore it must be this"