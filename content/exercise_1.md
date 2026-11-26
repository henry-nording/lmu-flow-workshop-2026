# Exercise 1: Find the error

Work in pairs, 45 to 60 minutes.

## The study

Eight patients, two groups of four: **protected** and **infection-prone**. Our hypothesis, fixed before the study: **CD8+ MAIT cells are less frequent in infection-prone patients.**

You get the same eight samples twice: **Reference**, cleanly preprocessed, and **your set**, in which exactly one preprocessing step was left out. Each pair is given one set, A to E. You do not know which step is missing. Find it, and find out what it does to the answer of the study.

## Files

The button on your set page downloads **your set** and the **Reference** (two ZIP files). Unzip both downloads first: FlowJo does not open ZIP files. File names give set, sample, group and measurement day, for example `REF_S03_protected_day2.fcs` and `A_S03_protected_day2.fcs`. Each file also carries the keywords `GROUP_NAME` and `BATCH_DAY`.

## Steps

1. **Unzip both downloads. Start a new workspace, save it on the local disk, and drag in both unzipped folders.** You should see sixteen samples.

::: v11
FlowJo 11 calls the workspace a workbench: **File → New Workbench**, then **File → Save Workbench As**. FlowJo makes one group per folder under **Experiment Data**.
:::

2. **Set all fluorescence axes to biexponential before you gate or cluster.** Depending on the version, FlowJo shows them as Linear or Log after loading. Linear squeezes dim populations against zero; Log hides negative values.

::: v10
In the **Graph Window**, click **T** beside a fluorescence axis and select **Customize Axis**. Under **Scale**, choose the biexponential scale, then click **Apply** to update the workspace. Repeat for each fluorescence parameter and check the scale in all samples.
:::

::: v11
Click **T** beside an axis. In the panel on the right, open **Choose the parameters for this transformation** and tick the twelve markers and Live-Dead. The box at the top ticks all parameters, so untick FSC, SSC, **Event #** and **Time** again. Choose **Biex** and click **Apply**. This sets all samples at once. **Event #** is the running number of each event, added by FlowJo; it is not a measurement.
:::

3. **Make one group per patient group.**

::: v10
Click a cell in the `GROUP_NAME` keyword column, then Workspace tab → Keywords → **Create Group from Keyword Value**. FlowJo makes one group per value.
:::

::: v11
Right-click the **Reference** group → **Create Child Groups from Keyword** → `GROUP_NAME`. Repeat for your set. FlowJo makes the groups `GROUP_NAME = protected` and `GROUP_NAME = infection-prone`, four samples each.
:::

4. **Compare the number of events** of the same sample in both folders. More events than in the reference, or the same number? What could that mean?

::: v11
In **Populations**, click **⌄** beside **%Events** and choose **#Events**. The sample list below then shows a **Count** column for all sixteen samples. Optional: make a table with the count of **Ungated** for all sixteen samples (**Tables**), then a bar chart from it (**Charts**). Set **Chart Statistic** to **Sum**; with the default **Count** every bar shows 1.
:::

5. **Gate the main populations, first without clean-up gates, then with them.** Clean-up gates, in this order: quality over time (Time against CD3), debris (FSC-A against SSC-A), single cells (FSC-A against FSC-H), live cells (Live-Dead). Main populations: T cells (CD3+), within them CD4+ and CD8+ T cells; B cells (CD3− CD19+); NK cells (CD3− CD19−, CD56+ or CD16+); within CD4+ and CD8+ T cells, naive (CCR7+ CD45RA+) and memory cells (CD45RA−). Use the same gates in both folders. For one protected and one infection-prone sample, note the share of each population. Which shares differ between the Reference and your set, and does it matter whether you used the clean-up gates?

::: v10
Draw the gates on one sample, then drag them onto the group that holds all sixteen samples. FlowJo applies them to every sample in the group.
:::

::: v11
Select the **Experiment Data** group before you draw gates; FlowJo then applies each gate to all sixteen samples. If gates seem to be missing, turn on the eye icon (**See-All**) in **Populations**.
:::

6. **Answer the study question in both folders.** Look up which markers identify MAIT cells. Gate them directly on all events, without clean-up gates, and write down your gating path. Use the same gates in both folders. Note the MAIT share of all events for each sample.

::: v11
Use **Tables**: drag a folder group into the table (one row per sample), then drag in your MAIT gate and **Ungated**, and add `GROUP_NAME` as a keyword column. Change the statistic under **Settings**, or divide the two counts.
:::

7. **Test.** With four against four samples, sort the eight values. If all four of one group lie above all four of the other: p = 0.029. One overlap: p = 0.057, not significant. This is the smallest p a rank test can give with four against four.

::: v11
Or in FlowJo: make the table from one folder only (drag **Reference**, later your set), so that four samples face four. In **Charts**: **Choose statistical test** → **Wilcoxon rank-sum test**, **Specify Main Categorical Factor** → `GROUP_NAME`, **Select a baseline for comparison** → `protected`, tick **Show the p-value**. FlowJo uses an approximation and shows about 0.030 where the exact value is 0.029. A table with both folders mixes the same patients twice and gives a p-value that is far too small.
:::

8. **Find the cause.** Open the same sample from both folders side by side and go through the five plots below, with the same axes. Check what you found in a second sample.

::: v11
To overlay two histograms, open **Reports**. Drag **Ungated** of a day 1 sample into the report and show it as a histogram. Drag a day 2 sample onto the same plot. Set **Normalization** to **Modal**.
:::

9. **Name the missing step**, the plot that shows it, and what it did to the answer in steps 6 and 7.

## Five plots, five preprocessing steps

| Plot | What to look for |
| --- | --- |
| Time against CD3 | **Quality over time.** A gap, then a stretch with lower signal. If you run automatic quality control (FlowJo 10: FlowAI plugin; FlowJo 11: **Quality Control** in the navigation bar), check what it removed in every sample. It can remove too much (in one test, everything after the disturbance) or too little (in another, only part of it). Compare the event numbers with the Reference. |
| FSC-A against SSC-A | **Debris.** Events at low FSC and SSC. |
| FSC-A against FSC-H | **Doublets.** A second cloud beside the diagonal. Many doublets carry markers of two lineages, for example CD3 and CD19. |
| Live-Dead against CD3 | **Dead cells.** Live-Dead-positive events that seem to stain for every marker. |
| CCR7 histogram, a day 1 and a day 2 sample overlaid | **Measurement day.** The same population sits at a different position on the two days. Also try CD3 and CD161. |

## If you have time

Transformation is the sixth step, and it is not in the files. Switch the CD4 axis from biexponential to linear and look at the same cells.
