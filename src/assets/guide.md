## 🖊 About

<details>

<summary>
</summary>

**TextHand** is a text-to-handwriting convertor. It can convert your text into a text which looks similar to handwriting.

It is useful for submitting assignments at the last moment or if you hate to write them. Submit your assignments like a pro 😎.

</details>

## 💻 How to use?
<details>

<summary>
</summary>

1. You need to *paste* or *type* some text into the text-area field. 
2. A preview will be generated in on the left-side generated-area.
3. You can change some values on the **settings** panel if you are not satisfied with the preview. Changes will be reflected in the generated area.
4. You can either press `ctrl+enter` in the text-area or `click the generate button` if you are satisfied with the preview.
5. TextHand will *take snapshots* and output your images in the **output-images** section below.
6. You can either *download all the images*, or *download a single one*, or *download all of the pages as **PDF***.
7. Once again, when make changes in the `text-area`, `generated-area` will show those changes.

</details>

## ✨ Features

<details>

<summary>
</summary>

### Auto Saving

TextHand will auto-save each of your **Settings** into your browser's database.

This also incudes the font-file that you are uploading.

### Offline App

TextHand works offline. It by no means communicates to any server or transfers your data.

### Changing Font Size

*(When this feature is on)* Each letter will have random font size making each instance of a letter different.

After all we don't write all the letter of the same size.

### Rotating Words

*(When this feature is on)* Each word will be **slanted** by some random amount.

After all we don't write our words do go up and down the line sometimes.

</details>

## 🎨 Randomization
*(please read this if you are using randomization)*
<details>

<summary>
</summary>


This is an **advanced** feature of TextHand. It is not enabled by default. It will be enabled when either of the values are greater than 0.

These **cannot be previewed** in the generated area. They will be directly *applied during image generation*.

Your webpage can become **unresponsive** if these features are turned on. *(Because TextHand runs in the browser itself and not in a server)*. 
- Applying randomization takes longer to finish.
- At this point, please **do not close the tab**. At least give the image-generation the indicated time to complete.

#### ⭐ Please be patient when applying randomization 🧊


#### 1. Random Font Size

*Each letter* of your word will have a random size variation.

- When you set this random font size value to **0**, then there will be **no randomization** applied.

- **Note :** When you apply this feature, the preview on the *generated area* may not look the same with the output.

- **Recommended :** Do not provide a value greater than `7`.

- Try increasing the *line-height* if letters overlap due to an increased value.

#### 2. Random  Word Rotation

This property is indicated by the input labelled **Word Rotation**. A *random* value between `0` and `input integer` will be applied to each word in your text. The values is in `degrees`.

- This **can only be applied** when random *fontSize* has **`value > 0`**.

- For the best result, we suggest you to apply keep *random fontSize* value to low (between `1` and `3`).

- **Recommended :** Do not use a value greater than `5`.

</details>

## ⚙ Settings

<details>

All of these settings reflect changes in the *generated area* or on the *images* itself.
<summary>
</summary>

1. Font - Basic details about the size of your letters, ink colour, and the font-weight.
2. Font-Family - You can either choose a font-family from the options or upload your own `.ttf` file which will be applied as a font. This file will also be saved.
3. Randomization - Please refer to the randomization section above.
4. Margin - The amount of margin which will be applied to your page on either left, right, or top.
5. Page Content Length - The number of words TextHand will put into the page before reaching this length. (You will not need to change this)
6. Background - By default, TextHand applies a gradient-like background into the page. If you want to override this, you can either upload a custom paper of your own or select a paper from the dropdown.
7. Spacing - Word Spacing (The amount of space in between words.) Letter Spacing (The amount of spacing in between letters) and Line Height (The amount of spacing in between lines).
8. Signature - Write your name in this box and select the position where to put it.
You can see it when images are generated.
9. Resolution - Your image will go blur as you decrease this value. (*Recommended : keep the value to `0.8` if you want a low-quality image*)
10. Apply Shadow Effect - If turned off, generated images will not have a gradient-like page effect. Turn it off if you want a scanner-like effect.
11. Preserve Indentation - If turned off, TextHand will not check for indentation and push all your text towards left during image generation.

</details>

## 🛑 Problem

<details>

<summary>
</summary>

If TextHand has freezed or it is not generating images as expected, please click the `reset all` button and check if the problem is resolves.

If the problem still persists, you can reach me in the **`Something Missing?`** section.

</details>

## 🖇 Inspiration

<details>

<summary>
</summary>

I built TextHand when I had to write and submit *handwritten* assignments to my teachers during the lockdown 😑.

There were [some text-to-handwriting convertors](https://saurabhdaware.github.io/text-to-handwriting/) when I searched them on google. They were awesome.
But they were easy to be caught. So, then I thought of building my own text-to-handwriting convertor for submitting assignments. 😝

If you liked TextHand and it helped you, please do write me an email. You can get the email from `Something missing?` section. I would really love to hear from you.

</details>