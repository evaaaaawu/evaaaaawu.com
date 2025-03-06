---
title: Software Teams and GAI-Successes and Failures in AI Collaboration
subtitle: Notes from the AI Your Summer series event on June 13, 2023.
author: src/content/authors/eva.json
imageWebp: /images/articles/webp/software-teams-and-gai-successes-and-failures-in-ai-collaboration.webp
imagePng: /images/articles/png/software-teams-and-gai-successes-and-failures-in-ai-collaboration.png
imgAlt: Software Teams and GAI-Successes and Failures in AI Collaboration
creationDate: 2023-07-17
updateDate: 2023-07-17
tags:
  - AI
featured: true
---

This article shares notes from the [AI Your Summer](https://gai-2023.alphacamp.co/) series event on [June 13, 2023](https://www.accupass.com/event/2305221045441859361432). The content has been personally restructured and does not follow the exact flow of the original presentation. Feel free to discuss and share your thoughts.

Speaker:

- Mosky（Pinkoi / Architect）
- Caesar (TransIot / Chief Technology Officer)

Host:

- Bernard（ALPHA Camp / CEO, Founder）

## Impact

### Q: How will the AI era affect software engineers? (Related questions: How will the software engineering profession change in the future? Will there be fewer junior positions? Will companies eventually not need software engineers?)

Caesar: "Engineers won't lose their jobs in the short term because AI currently can't handle abstract concepts. The work we need software engineers for is still based on abstract connections, including the needs of bosses, clients, and imaginative requirements. These are very different connections. Although many underlying tasks are still CRUD operations, when you have abstract connections, current AI can't process them. AI requires humans to communicate an abstract problem > then it provides a concrete result > which approaches what we want > and then we continue step by step to achieve the desired outcome. So in this process, software engineers are still necessary."

Mosky: "I'm not sure how the market will balance the demand for junior and senior engineers. I've heard many versions, but I don't have a definitive answer myself. What I am quite certain about is that your learning path will be very different from ours in the past. It's not that old methods will be abandoned—I think Google is still very useful—but AI will give you a brand new path that might be more suitable for you. You definitely need to try and use these tools more, but don't completely trust them (ChatGPT can make things up). Overall, I'm not anxious about it; rather, I'm more optimistic."

### Q: Has your company set goals or expectations for AI use in the workplace?

Caesar: "We hope that over 50% of work will use AI, possibly with one engineer paired with one AI Assistant. The engineer will be responsible for ideation, architecture, and understanding the entire requirements, while AI will handle any framework and CRUD operations, etc."

Mosky: "We ask everyone to explore how much time AI can save them. Based on these metrics, we then evaluate whether everyone should use AI to a certain extent (expanding usage). The company's current attitude strongly encourages everyone to try. Before the Generative AI conference, we were more conservative, but after the conference, we felt we couldn't be so cautious anymore. I personally review every AI service on behalf of the company and clearly define what services can be used to what extent. For example, you absolutely cannot send company-related data to ChatGPT because they use everything for training.
In summary: I use time as a measurement metric, and internally we have clear guidelines so everyone knows what can be used and how."

### Q: How does the AI era affect programming learners? Is there a different skill tree that software engineers need to develop? Can they develop more horizontally with these tools? What adjustments will be needed?

Caesar: "For juniors, the necessary path still needs to be followed. Taking frontend engineers as an example, my skills would include JavaScript, HTML, and CSS—you still need to understand these. Even jumping to React/Vue/Angular, whatever you're interested in or what your company uses, you still need to know how the framework works, including virtual DOM, fiber, or how the entire event handling works, and the lifecycle process. Although ChatGPT will tell you the answers, you need to understand how everything works. Why do you still need to know this? Because when you already know the answer, you know how to ask for answers. If you don't know the answer, you won't know where the lifecycle is positioned or where the problem is located, so how can you expect it to produce the right answer? I think this is the challenge juniors face. The harsh future that might occur is that most work, most CRUD operations, most basic coding abilities might already be replaceable by AI. Then one senior with an AI could complete the work of 1 or 1.5 junior developers. So if you're a junior trying to enter the field, you might need to work hard and continuously learn on your own. The barrier to entry for juniors will increase, and engineers' development will require thinking from a more macro and abstract perspective."

Mosky: "I believe there's always a starting point, and you need to reach that endpoint. In the past, you had to type on the keyboard yourself; now you can use prompts to accelerate your journey to the endpoint. But one important thing is that you still need to know where your endpoint is. ChatGPT helps you get to that endpoint faster. So for all engineers, one very important thing is that you still need to know where your endpoint is. This skill still needs to be cultivated, and under the premise that humans still need to be responsible for output, someone must know where that endpoint is, whether you're a senior or junior. So a certain level of hard skills still needs to be developed. I would say ChatGPT doesn't replace you but accelerates you to the endpoint. For example, the endpoint could be learning a certain skill or completing a company requirement. What ChatGPT can do is provide another path to help you achieve the hard/soft skills you want to acquire. In summary: Know where your endpoint is, develop the necessary hard/soft skills, but during this process, AI can help you achieve what you want to do."

- Bernard asks on behalf of everyone: "I'm a junior, and I don't know where the endpoint is. I don't know what I don't know, so when I don't know where the endpoint is, how do I find out? What advice would you give to a junior trying to break into the industry?"

- Mosky: "Junior definition: Getting a job with the title 'software engineering' (someone willing to pay you to do this). This point is constantly changing; it's a range. The standards from ten years ago are different from today's, and standards vary between companies. Everyone needs to decide for themselves. Look at job descriptions > summarize & list them > use AI to help you learn what you need > apply for a job where someone is willing to pay you to do software engineering."

- Caesar: "AI tools becoming mainstream is already an established fact, so you need to understand how AI tools can help you reach a certain level. At the same time, you must constantly question AI's output because you don't know if its answers are correct or not, as you lack experience and are still in the exploration phase. So when you copy and paste code from ChatGPT, you need to know what that code segment means. We used to be called 'copy-paste masters' > now we're 'tab masters,' but behind natural generation, what exactly is it producing for you? I think it's especially important for juniors to understand what libraries it's importing for you, what magic it's adding..."

## Implementation

### Helpful use cases

- When you already have an idea and delegate implementation to ChatGPT, e.g., refactoring/converting (when you know how to change something but are too lazy to do it yourself). Examples provided by Caesar:

1. js, how to convert to await async [provide original code below]
2. (If you're not satisfied with ChatGPT's response, you can try) plz make it readable, and ez understand

- When you want to understand someone else's code

- Paste a code style you like and ask it to generate code in that style

### Unsuitable use cases

Mosky: "Requirements written by humans that need another human to explore." > Bernard adds: "In other words, requirements need to be clear. Perhaps the PM's job will still need to exist???"

Caesar: "When you're uncertain about the result or when you're already directionless while asking questions. When chatting with ChatGPT and unable to converge on a solution, you won't get the result you want. When your questioning angle is wrong, or you don't know what kind of result you want (no clear definition), if you provide unclear input, ChatGPT is like an opponent—the stronger the opponent, the better it can answer; but the weaker the opponent, it becomes like an idiot, so you'll feel like you're talking to someone who doesn't really understand you."

**Let me add my personal experience so far:**
ChatGPT won't necessarily tell you the best solution. You might still be able to use it to solve problems, but the more you know, the better you can guide it to provide better answers, so having a certain level of foundational knowledge is still important!

Bernard: "There's a framework for product development: frequency vs. accuracy, where AI is more suitable for high-frequency, low-accuracy tasks."
