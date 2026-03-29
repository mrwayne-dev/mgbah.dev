# How to write like a human, not an AI

**The single biggest tell of AI writing isn't any one word — it's the density of polished-sounding phrases that say nothing specific.** A human writes "We added a three-layer cache; pages went from 800ms to 200ms." An AI writes "By leveraging cutting-edge caching methodologies, we achieved a pivotal enhancement in application performance." Both describe the same change. One teaches you something; the other fills space. This guide catalogs every identifiable AI writing pattern, provides concrete substitutions, and establishes principles for writing that sounds like a real person with opinions — drawn from Paul Graham, George Orwell, the best open-source documentation, and extensive analysis of AI linguistic tells.

The goal: a comprehensive reference that can serve as a system prompt or context file, so any AI producing project content — READMEs, docs, proposals, commit messages — writes like a developer who means what they say.

---

## The complete taxonomy of AI writing tells

AI writing fails in four dimensions: **word choice**, **phrase patterns**, **structural habits**, and **tonal flatness**. Each dimension has specific, identifiable markers. Research from Carnegie Mellon, analysis of 52 million posts by Buffer, academic surveys of AI-generated text, and professional editors' field guides all converge on the same patterns.

### Words that scream "a robot wrote this"

These words saw statistically significant usage spikes post-2023 across scientific papers, blog posts, and corporate communications. Any single one can appear in human writing. **Three or more in one paragraph is a dead giveaway.**

**Verbs to avoid:** delve, embark, underscore, showcase, navigate (metaphorical), foster, leverage, streamline, optimize, elevate, empower, enhance, harness, unleash, unlock, facilitate, augment, resonate, flourish, spearhead, bolster, catalyze.

**Adjectives to avoid:** pivotal, crucial, multifaceted, comprehensive, robust, seamless, cutting-edge, innovative, groundbreaking, transformative, holistic, nuanced, intricate, paramount, invaluable, vibrant, commendable, exemplary, unparalleled, meticulous, remarkable.

**Nouns to avoid:** tapestry, landscape (metaphorical), realm, synergy, paradigm, plethora, multitude, roadmap, milestone, stakeholders, linchpin, epicenter, treasure trove, kaleidoscope, foray, ecosystem (outside biology).

Academic research confirms AI text has **measurably lower lexical diversity** than human writing. AI cycles through the same elevated vocabulary because language models select the most statistically probable "impressive" word. Humans reach for the word that fits — often a plain one.

### Phrases that signal AI authorship

**Filler preambles** (delete entirely — just state the fact):
- "It's important to note that…"
- "It's worth mentioning that…"
- "It should be noted that…"
- "Based on the information provided…"
- "As we navigate the complexities of…"
- "In this article, we will explore…"

**Vapid openers** (delete and start with your actual point):
- "In today's fast-paced world…"
- "In an ever-changing landscape…"
- "In the dynamic world of…"
- "As technology continues to evolve…"
- "In the realm of…"

**Corporate therapist voice** (replace with specifics or cut):
- "Lean into our strengths"
- "Foster a culture of accountability"
- "Build a more resilient and agile organization"
- "Drive innovation across the enterprise"
- "Unlock potential" / "Empower teams"
- "Create meaningful impact"
- "Actionable insights"

**Generic closings** (end where the argument naturally ends):
- "In conclusion…" / "To summarize…"
- "This underscores the importance of…"
- "As AI continues to evolve…"
- "As we move forward…"

### Structural patterns that reveal the machine

**The "Bold: colon: explanation" bullet pattern.** AI compulsively formats lists as `**Key Term:** Explanation sentence here.` Real writing mixes formats — sometimes a plain sentence, sometimes a code block, sometimes a paragraph. Uniform bold-colon bullets are an AI signature.

**Forced negation.** "It's not just about X — it's about Y." AI produces this reflexively. One researcher documented ChatGPT generating three separate instances of "Falling in love isn't just about X — it's about Y" in a single article. If you find this pattern more than once in a piece, it was likely AI-generated. Just state the positive directly.

**Paragraph-opening transitions.** When every paragraph begins with "Moreover," "Furthermore," "Additionally," "That said," or "Importantly," the writing has no internal logic — it's stapling ideas together with formal connectors instead of letting them flow naturally.

**Symmetric structure.** AI makes every section the same length, every paragraph ~4 sentences, every bullet list 5-7 items. Human writing is asymmetric — some sections are two sentences, others are ten paragraphs, because ideas aren't uniform.

**The rule of three compulsion.** AI structures ideas in triads obsessively: "Fast, efficient, and reliable." "Think bigger. Act bolder. Move faster." Humans occasionally use triads for rhetorical effect; AI does it in every other sentence.

**Excessive em dashes.** Reddit data shows em dash usage roughly tripled in tech subreddits after ChatGPT's release. AI throws em dashes everywhere — often where a comma or period would work fine.

**Mid-sentence rhetorical questions.** "The solution? It's simpler than you think." "The result? More people are switching." This is a tic, not a technique.

### The tonal flatness problem

The deepest AI tell isn't vocabulary — it's **the absence of a mind behind the words**. Academic research confirms AI text is "more analytic, less narrative, directed more towards conveying information rather than signaling involvement." Specific markers:

**Excessive hedging.** AI is risk-averse: "typically," "more often than not," "might be," "don't always," "can also," "may." Human writers commit to claims. If you see a paragraph unwilling to state anything definitively, it's likely AI.

**Emotional flatness.** The writing is technically fine but carries no conviction, surprise, frustration, or delight. It reads like a policy document. Every topic gets the same measured, balanced treatment regardless of whether it's describing a catastrophic bug or a minor config change.

**No consistent voice.** AI writing shifts tone between paragraphs and pieces. A human developer writes the same way across their README, their commit messages, and their Slack posts. AI generates a fresh "voice" each time.

**"Says everything, means nothing" paragraphs.** You read four sentences and realize you've learned nothing. The paragraph restates its opening claim in three different ways using slightly different vocabulary, then moves on. This is AI's signature — surface polish with nothing underneath.

---

## What the best writers actually teach

Every major authority on clear writing converges on the same five actions: **think clearly, write simply, cut ruthlessly, be yourself, rewrite relentlessly.** Here's what each one emphasizes.

### Paul Graham: write like you talk

Graham's central insight is that **written language is worse for communication than spoken language** — it's more complex, more formal, and gives the writer a false impression of saying more than they are. His rules:

Write your first draft, then look at each sentence and ask: "Is this the way I'd say this to a friend?" If not, replace it with what you'd actually say. Read everything aloud before publishing. "If you simply manage to write in spoken language, you'll be ahead of 95% of writers."

Complex ideas don't require complex sentences. "The harder the subject, the more informally experts speak." Informality is "the athletic clothing of ideas." Use simple, Germanic words. Don't try to sound impressive. Expect to cut heavily — **simplicity enforces honesty**, because "if you say nothing simply, it will be obvious to everyone, including you."

Graham's formula for useful writing: **Importance × Novelty × Correctness × Strength**. Vague statements are technically correct but useless. "It's more useful to say that Pike's Peak is near the middle of Colorado than merely somewhere in Colorado."

### George Orwell: six rules that still hold

From "Politics and the English Language" (1946):

1. Never use a metaphor, simile, or figure of speech you're used to seeing in print
2. Never use a long word where a short one will do
3. If it is possible to cut a word out, always cut it out
4. Never use the passive where you can use the active
5. Never use a foreign phrase, scientific word, or jargon word if you can think of an everyday English equivalent
6. Break any of these rules sooner than say anything outright barbarous

Orwell identified four diseases of bad writing that map perfectly to AI output: **dying metaphors** (worn-out figures of speech used because they save the trouble of inventing phrases), **verbal false limbs** (replacing simple verbs with padded phrases), **pretentious diction** (dressing up simple statements to sound important), and **meaningless words** (abstractions that point to no discoverable object). AI writing suffers from all four simultaneously.

### Zinsser, King, Hemingway: the reinforcing chorus

William Zinsser called clutter "the disease of American writing" and prescribed the bracket test: put brackets around every component not doing useful work — unnecessary prepositions, adverbs carrying the same meaning as the verb ("smile happily"), adjectives stating known facts ("tall skyscraper"), qualifiers that weaken ("a bit," "sort of"). Most first drafts can be **cut by 50% without losing information or voice**.

Stephen King insists the adverb is not your friend and that fear drives most bad writing. "One of the really bad things you can do to your writing is dress up the vocabulary — it's like dressing up a household pet in evening clothes." His revision formula: **2nd Draft = 1st Draft − 10%**.

Hemingway's iceberg theory: if you know enough about what you're writing, you can omit things and the reader will still feel their weight. Short sentences. Simple words. Specific details over generalizations. Show, don't tell: not "the system was slow" but "requests took 4 seconds to resolve."

---

## The substitution reference

### Word-level swaps

| AI default | Write instead |
|---|---|
| Delve into | Look at, examine, dig into |
| Leverage | Use |
| Utilize | Use |
| Navigate (metaphorical) | Deal with, handle, work through |
| Foster | Build, encourage, grow |
| Facilitate | Help, enable, let |
| Harness | Use, apply, put to work |
| Empower | Let, enable, give the ability to |
| Optimize | Improve, speed up, make faster |
| Streamline | Simplify, speed up |
| Enhance | Improve, boost |
| Underscore | Show, prove, make clear |
| Showcase | Show, demonstrate |
| Pivotal / Crucial | Important, key, necessary |
| Comprehensive | Full, complete, thorough |
| Robust | Strong, solid, reliable — or describe what makes it strong |
| Seamless | Smooth, easy |
| Cutting-edge / Innovative | New, latest, modern — or describe the specific innovation |
| Holistic | (Describe the actual components instead) |
| Multifaceted | Complex, varied — or name the facets |
| Tapestry / Landscape / Realm | (Drop the metaphor; name the actual thing) |
| Synergy | Teamwork, working together, collaboration |
| Paradigm shift | Change, rethink, new approach |
| Plethora / Multitude / Myriad | Many, lots of, plenty of |

### Transition swaps

| AI default | Write instead |
|---|---|
| Furthermore / Moreover / Additionally | And, also, plus — or no transition at all |
| Consequently | So, because of this |
| Subsequently | Then, next, after that |
| Nevertheless / Nonetheless | But, still, even so |
| Indeed | (Cut it) |
| Thus / Accordingly | So, this means |
| Notably / Significantly | (Cut it; just state the notable thing) |
| It's important to note that | (Delete. State the fact.) |
| In today's fast-paced world | (Delete. Start with your point.) |
| In conclusion | (Just write the final thought.) |

### Structural pattern swaps

**Instead of "Bold: colon: explanation" bullets:** Write flowing paragraphs. If you must use a list, make items plain sentences without the bold label prefix. Mix formats — a paragraph, then two bullets, then a code example.

**Instead of "Not X, but Y" forced negation:** State the positive directly. "This is about people." Not: "It's not just about technology — it's about people." If you must contrast, do it naturally: "People assume it's a tech problem. It's a people problem."

**Instead of Moreover/Furthermore paragraph openers:** Use no transition (if the logic flows, readers follow). Echo a word from the previous paragraph. Use a simple conjunction: "And," "But," "So." Ask a question. Use a time marker.

**Instead of generic conclusions:** End with a specific action ("If you change one thing, change X"). End with an open question. End where the argument naturally stops — don't add a recap. Reference your opening to create a loop.

**Instead of symmetric structure:** Vary paragraph length deliberately. One paragraph can be a single sentence. The next can be eight. Some sections get subheadings; others don't. Let the shape of the writing reflect the shape of the ideas.

---

## Technical writing that sounds like a developer wrote it

### READMEs: say what it does, then show it

The Redis README opens by stating what Redis is — a data structure server. Then it lists concrete features. Then it shows build instructions. No "welcome to," no adjective soup, no "comprehensive solution." Antirez, Redis's creator, writes with self-deprecating honesty: "WARNING: this is just a hack I wrote in a few hours in a weekend where there was too much wind to go to the sea."

SQLite's documentation is purely technical, written with deep authority, and **honest about its own limitations** — it documents when not to use SQLite. Stripe's docs show working, copy-pasteable code within the first screenful and document outcomes ("Here's how to accept your first payment") rather than functions.

A good README follows this structure:

1. **One sentence** saying what the project does — no fluff, no adjectives
2. **A code example** showing basic usage (within the first screenful)
3. **Installation** — one command
4. **Brief feature list** — plain language, no marketing
5. **Docs links, contributing guide, license**

**Bad README opener:** "🚀 ProjectX is a powerful, comprehensive, next-generation solution for seamlessly managing your data workflows with cutting-edge technology."

**Good README opener:** "ProjectX watches a directory for CSV files and loads them into Postgres. That's it."

### Commit messages: imperative mood, specific changes

Chris Beams' seven rules remain the standard: separate subject from body with a blank line, limit the subject to **50 characters**, capitalize it, no period at the end, use the imperative mood ("Fix bug" not "Fixed bug"), wrap the body at 72 characters, explain **what and why, not how**.

The imperative mood test: "If applied, this commit will [your subject line]."

**AI-generated commits** (too vague): "Enhance user authentication module for improved security." "Implement comprehensive error handling across the application." "Update various components to align with best practices."

**Human commits** (specific and imperative): "Add OAuth2 login with Google provider." "Handle null response from payment gateway." "Fix race condition in session cleanup." "Remove unused CSS from dashboard."

For projects using Conventional Commits, prefix with type: `feat(auth): add Google OAuth2 login`, `fix(list): prevent crash on empty scroll`, `docs: update install instructions`.

### Documentation with voice and opinions

Google's developer documentation style guide captures the right tone: **"Sound like a knowledgeable friend who understands what the developer wants to do."** Use second person ("you"), active voice, present tense, and contractions. Never say "simply" or "easy" — if the reader is reading docs, it isn't simple to them. Never say "please" in instructions.

The Diátaxis framework distinguishes four documentation types, each requiring a different voice: tutorials (conversational, guiding), how-to guides (direct, efficient), reference (precise, consistent), and explanation (discursive, can have personality).

What gives documentation genuine voice:

- **Have opinions.** "We recommend Postgres. MySQL works but tends to be flakier under concurrent writes" is more useful than "Both Postgres and MySQL are supported."
- **Acknowledge limitations.** "This doesn't handle WebSocket connections yet" builds instant trust.
- **Include real context.** "This matters because most deployments hit connection limits around 10k users" tells the reader something they need.
- **Admit tradeoffs.** "We chose X over Y because [reason]. The downside is [honest drawback]."

---

## The 15 rules for human-sounding writing

These rules synthesize everything above into directives suitable for a system prompt or writing context file.

**Rule 1: Start with what the thing does or what you think.** No preambles, no context-setting, no "In today's..." openers. First sentence = the point.

**Rule 2: Use plain words.** "Use" not "utilize." "Help" not "facilitate." "Improve" not "optimize." If a simpler word exists, use it. Every word from the AI vocabulary list in this guide should trigger an automatic swap to its plain equivalent.

**Rule 3: Cut filler phrases entirely.** "It's important to note that" adds zero information. "It's worth mentioning" is a throat-clear. Delete these and state the fact directly.

**Rule 4: Never open a paragraph with Moreover, Furthermore, Additionally, or Importantly.** Use "And," "But," "So," or no transition at all. If the logic connects, readers will follow without a signpost.

**Rule 5: Vary sentence length and paragraph length.** Short sentences punch. Longer ones develop ideas and give the reader something to sit with. One-sentence paragraphs are fine. Eight-sentence paragraphs are fine. Never make everything the same length.

**Rule 6: Be specific.** Not "improved performance" but "cut response time from 800ms to 200ms." Not "a leading company" but "Stripe." Not "in recent years" but "since 2022." Concrete details are the single strongest signal of human writing.

**Rule 7: Have opinions and commit to them.** Don't hedge with "might," "could potentially," "it's worth considering." State what you think is true. Qualify only when genuine uncertainty exists, and name the uncertainty specifically.

**Rule 8: Write in active voice.** "The server processes requests" not "Requests are processed by the server." Active voice is shorter, clearer, and more direct.

**Rule 9: Avoid the "Not X, but Y" construction.** State the positive claim directly. Use this pattern at most once per piece, and only when the contrast genuinely matters.

**Rule 10: Don't use the "Bold word: colon: explanation" bullet pattern.** If you need a list, write plain sentences. If you need structure, use varied formatting — a paragraph, then two bullets, then a code block. Never uniform bold-colon bullets.

**Rule 11: End where the argument ends.** Don't announce conclusions with "In conclusion" or "To summarize." Don't recap every point. End with a specific takeaway, a practical next step, or an open question. Or just stop.

**Rule 12: Avoid em dash overuse.** Limit to one or two per page. Use commas, periods, or parentheses instead. Em dashes are a spice, not a staple.

**Rule 13: Show, don't claim.** Don't call something "innovative" or "robust" — describe what makes it new or strong. Don't say "comprehensive" — list what it covers. Replace adjectives with evidence.

**Rule 14: Write asymmetrically.** Real documents don't have perfectly balanced sections. Some topics need one paragraph. Others need five. Let the structure reflect the content, not a template.

**Rule 15: Read it aloud.** If any sentence sounds like a press release, a corporate memo, or a motivational poster, rewrite it. If you wouldn't say it to a coworker at a whiteboard, don't write it.

---

## Before and after: the difference in practice

**AI-generated technical paragraph:**
> "The implementation of our innovative caching strategy represents a pivotal advancement in optimizing application performance. By leveraging cutting-edge technologies, we have seamlessly integrated a multi-layered caching approach that delivers robust, scalable solutions. This comprehensive methodology facilitates enhanced throughput while navigating the complexities of distributed systems."

**Human version:**
> "We added a three-layer cache: browser, CDN, and application-level. Pages that took 800ms now load in under 200ms. The CDN handles 90% of requests before they hit the server."

**AI-generated executive summary:**
> "In an era of unprecedented digital transformation, our organization must leverage cutting-edge technologies to optimize operational efficiency and drive sustainable growth. This comprehensive proposal outlines a holistic approach to navigating the complexities of modern business."

**Human version:**
> "We're spending $2M/year on manual data entry that software could handle. This proposal covers switching to automated invoicing (saves $1.4M/year) and consolidating our three CRM systems into one (cuts onboarding time from 3 weeks to 4 days). Payback in 14 months."

**AI README:**
> "🚀 ProjectX is a powerful, comprehensive, next-generation solution for seamlessly managing your data workflows with cutting-edge technology."

**Human README:**
> "ProjectX watches a directory for CSV files and loads them into Postgres. That's it."

The difference is always the same: **specifics replace adjectives, numbers replace claims, and plain language replaces performative vocabulary.** Human writing teaches you something in every sentence. AI writing assures you that something important is happening without ever telling you what.

## Conclusion: the meta-principle

Every AI writing tell traces back to one root cause: **language models select the most statistically probable "good-sounding" next token, which produces text that is locally polished and globally empty.** The fix isn't swapping individual words — it's changing the underlying approach. Lead with the specific fact, name real things, state what you actually think, and stop when you've said it. A human writer's fingerprint is the presence of a mind making choices — choosing this detail over that one, this structure instead of a symmetric one, this opinion rather than a hedge. The rules in this guide exist to preserve those choices. When the writing has genuine specificity, real opinions, and varied rhythm, no reader will wonder whether a machine wrote it.