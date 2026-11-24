# Exercise 1: Find the error

Work in pairs, 45 to 60 minutes.

## The study

Eight patients, two groups of four: **protected** and **infection-prone**. Our hypothesis, fixed before the study: **CD8+ MAIT cells are less frequent in infection-prone patients.**

You get the same eight samples twice: **Reference**, cleanly preprocessed, and **your set**, in which exactly one preprocessing step was left out. Find the missing step, and find out what it does to the answer of the study.

## Files

Download **Reference** and **your set**. File names give set, sample, group and measurement day, for example `REF_S03_protected_day2.fcs` and `A_S03_protected_day2.fcs`. Each file also carries the keywords `GROUP_NAME` and `BATCH_DAY`.

## Steps

1. **Start a new workspace, save it on the local disk, drag in both folders.** You should see sixteen samples.
2. **Set all fluorescence axes to biexponential before you gate or cluster.** In the test run FlowJo showed them on a log scale, which hides negative values.

::: v10
In the **Graph Window**, click **T** beside a fluorescence axis and select **Customize Axis**. Under **Scale**, choose the biexponential scale, then click **Apply** to update the workspace. Repeat for each fluorescence parameter and check the scale in all samples.
:::

::: v11
Click **T** beside each fluorescence axis and choose **Biex**.
:::

3. **Make one group per patient group.**

::: v10
Click a cell in the `GROUP_NAME` keyword column, then Workspace tab → Keywords → **Create Group from Keyword Value**. FlowJo makes one group per value.
:::

::: v11
Right-click a group → **Create child group from Keyword** → `GROUP_NAME`.
:::

4. **Compare the number of events** of the same sample in both folders. More events than in the reference, or the same number? What could that mean?
5. **Answer the study question in both folders.** Look up which markers identify MAIT cells. Gate them directly on all events, without clean-up gates, and write down your gating path. Use the same gates in both folders. Note the MAIT share of all events for each sample.
6. **Test.** With four against four samples, sort the eight values. If all four of one group lie above all four of the other: p = 0.029. One overlap: p = 0.057, not significant. This is the smallest p a rank test can give with four against four.

::: v11
Or in FlowJo: Charts, main factor `GROUP_NAME`, baseline `protected`, test **Wilcoxon rank-sum**.
:::

7. **Find the cause.** Open the same sample from both folders side by side and go through the five plots below, with the same axes. Check what you found in a second sample.
8. **Name the missing step**, the plot that shows it, and what it did to the answer in steps 5 and 6.

## Five plots, five preprocessing steps

| Plot | What to look for |
| --- | --- |
| Time against CD3 | **Quality over time.** A gap, then a stretch with lower signal. If you run FlowAI: check what it removed. In the test run it also discarded the normal stretch after the disturbance. |
| FSC-A against SSC-A | **Debris.** Events at low FSC and SSC. |
| FSC-A against FSC-H | **Doublets.** A second cloud beside the diagonal. Many doublets carry markers of two lineages, for example CD3 and CD19. |
| Live-Dead against CD3 | **Dead cells.** Live-Dead-positive events that seem to stain for every marker. |
| CCR7 histogram, a day 1 and a day 2 sample overlaid | **Measurement day.** The same population sits at a different position on the two days. Also try CD161. |

## If you have time

Transformation is the sixth step, and it is not in the files. Switch the CD4 axis from biexponential to linear and look at the same cells.
