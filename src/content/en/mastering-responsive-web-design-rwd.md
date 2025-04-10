---
title: Mastering Responsive Web Design
subtitle: RWD is a design approach that allows websites to adjust across various devices and screen sizes, presenting content in an optimized way.
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/mastering-responsive-web-design-rwd.webp
imagePng: /images/articles/png/mastering-responsive-web-design-rwd.png
imgAlt: Mastering Responsive Web Design
creationDate: 2024-03-10
updateDate: 2024-03-10
tags:
  - CSS
featured: true
---

RWD stands for Responsive Web Design, a design approach that allows websites to adapt and display appropriately across various devices and screen sizes.

Regardless of whether users are on desktop computers, laptops, tablets, or mobile phones, a responsive website will adjust according to the device's screen size, presenting content in an optimized way.

The core goal of RWD is to provide a consistent and excellent user experience without needing to develop multiple versions of a website for different devices.

After taking the course [Conquering Responsive Layouts](https://courses.kevinpowell.co/conquering-responsive-layouts) by CSS master [Kevin Powell](https://www.youtube.com/kevinpowell), I'd like to share some key points and mindsets I've compiled for creating effective responsive websites:

- Layouts are responsive by default; it's our CSS settings that break this natural responsiveness.

- Avoid setting fixed widths, as they prevent automatic adjustment across multiple screens. **Use percentages instead**.

- Avoid setting explicit heights whenever possible, as they can disrupt layouts across different screen sizes.

- When setting font-size, using rem as a relative unit references the font-size of the html element (default is 16px); using em as a relative unit references the font-size of the parent element (default is 16px).

- When setting margin, padding, and other non-font-size CSS properties, using rem as a relative unit references the font-size of the html element; using em as a relative unit references the font-size of the same element.

- In most cases, rem is more suitable for setting font-size, while em is better for setting margin and padding.

- Using relative units makes implementing responsive layouts much simpler. For example, simply changing the font-size of the html element in a media query can easily scale the entire webpage on larger screens.

  <!-- ```css
  @media (min-width: 700px) {
    html {
      font-size: 25px;
    }
  }
  ``` -->

  <picture>
    <source srcset="/images/article-contents/webp/mastering-responsive-web-design-rwd/code-1.webp" type="image/webp">
    <img src="/images/article-contents/png/mastering-responsive-web-design-rwd/code-1.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
  </picture>

- Use max-width to prevent excessive width on large screens. For example:

  <!-- ```css
  .container {
    background: #23424a;
    color: white;

    width: 80%;
    max-width: 750px;
    margin: 0 auto;

    padding: 2em;
  }
  ``` -->

  <picture>
    <source srcset="/images/article-contents/webp/mastering-responsive-web-design-rwd/code-2.webp" type="image/webp">
    <img src="/images/article-contents/png/mastering-responsive-web-design-rwd/code-2.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
  </picture>

- CSS Units: vh, vw, vmin, vmax

  - vh = viewport height, vw = viewport width.

  - If you want to center an element in the layout, you can set its height to 100vh and use align-items/justify-content: center.

  - If you want an image to take up half the total layout width, that would be 50vw.

  - The difference between vmin and vmax is that vmin refers to the smaller dimension between vw and vh, while vmax refers to the larger dimension. For example, in a window with dimensions 1280px _ 1600px, vmin refers to 1280px and vmax refers to 1600px. The settings are ratios - 120vmin means 1280px _ 120%, while 80vmax means 1600px \* 80%.

- The two settings below are essentially the same, but the first approach is more intuitive, so I prefer to use it:

  <!-- ```css
  .container {
    width: 100%;
    max-width: 600px;
  }
  ``` -->

  <picture>
    <source srcset="/images/article-contents/webp/mastering-responsive-web-design-rwd/code-3.webp" type="image/webp">
    <img src="/images/article-contents/png/mastering-responsive-web-design-rwd/code-3.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
  </picture>

  <br />

  <!-- ```css
  .container {
    width: 600px;
    max-width: 100%;
  }
  ``` -->

  <picture>
    <source srcset="/images/article-contents/webp/mastering-responsive-web-design-rwd/code-4.webp" type="image/webp">
    <img src="/images/article-contents/png/mastering-responsive-web-design-rwd/code-4.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
  </picture>

- Additional notes: min(), max() and clamp() functions provide powerful tools for creating responsive designs without media queries:

  - min() syntax allows you to set a value that will choose the smaller of two options:

    <!-- ```css
    .content {
      width: min(500px, 70%);
    }
    ``` -->

    <picture>
      <source srcset="/images/article-contents/webp/mastering-responsive-web-design-rwd/code-5.webp" type="image/webp">
      <img src="/images/article-contents/png/mastering-responsive-web-design-rwd/code-5.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
    </picture>

    The above syntax is equivalent to:

    <!-- ```css
    .content {
      width: 70%
      max-width: 500px;
    }
    ``` -->

    <picture>
      <source srcset="/images/article-contents/webp/mastering-responsive-web-design-rwd/code-6.webp" type="image/webp">
      <img src="/images/article-contents/png/mastering-responsive-web-design-rwd/code-6.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
    </picture>

  - clamp() syntax allows you to define a size that scales within a range, setting minimum and maximum values with a preferred value in between:

    <picture>
      <source srcset="/images/article-contents/webp/mastering-responsive-web-design-rwd/code-7.webp" type="image/webp">
      <img src="/images/article-contents/png/mastering-responsive-web-design-rwd/code-7.png" alt="" loading="lazy" style="width: 100%; border-radius: 10px;">
    </picture>

### Reference

[Conquering Responsive Layouts](https://courses.kevinpowell.co/view/courses/conquering-responsive-layouts)
