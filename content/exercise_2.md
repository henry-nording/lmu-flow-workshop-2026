# Exercise 2: Cluster and name

Work in pairs, 45 minutes.

## The study

The same eight patients: four **protected**, four **infection-prone**. Hypothesis fixed before the study: **CD8+ MAIT cells are less frequent in infection-prone patients.** This time you let the algorithm find the cell populations.

## Files

Download the **concatenated reference file** (8 samples × 5,000 cells) and, for the last step, the **concatenated file without measurement-day alignment**. Both carry the extra parameters `SampleID` (1 to 8), `GroupID` (1 = protected, 2 = infection-prone) and `BatchDay` (1 or 2).

## Steps

1. **Load the reference file** and check the transformation of every marker (T button at the axis).
2. **Choose the parameters.** Select only the twelve cell markers. Leave out Time, FSC, SSC, Live-Dead, SampleID, GroupID and BatchDay.
3. **Cluster and draw the map.** FlowSOM with **12 metaclusters**; note the seed. UMAP on the same population; note the seed.
4. **Name three to five clusters** from their rows in the marker heatmap (Cluster Explorer). Find the MAIT cluster: CD3+ CD8+ CD161 high, TCR Vα7.2+.
5. **Answer the study question.** Get the share of the MAIT cluster for each sample.

::: v10
Gate each sample on `SampleID`, place the MAIT cluster under it, and read the frequencies in the Table Editor.
:::

::: v11
Use the per-sample statistics of the MAIT cluster; Charts, main factor `GroupID`, baseline 1, test **Wilcoxon rank-sum**.
:::

   Then test as in exercise 1: all four of one group above all four of the other gives p = 0.029.

6. **Run FlowSOM a second time with a different seed.** Cluster numbers and colours change. Does the MAIT cluster and its group difference stay?
7. **Other differences?** Compare the other clusters between the groups. Anything you find here is a hypothesis, not a result: you tested twelve clusters, and with four against four samples no finding survives a correction for multiple testing (FDR).
8. **Cross-check.** Repeat steps 2 to 5 with the file without measurement-day alignment and colour the map by `BatchDay`. What changes, and what does not?

## If you have time

Change the number of metaclusters to 8 and to 20. When does the MAIT cluster keep its own cluster?
