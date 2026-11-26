# Exercise 2: Cluster and name

Work in pairs, 45 minutes.

## The study

The same eight patients: four **protected**, four **infection-prone**. Hypothesis fixed before the study: **CD8+ MAIT cells are less frequent in infection-prone patients.** This time you let the algorithm find the cell populations.

## Files

Download **Concatenated reference** (8 samples × 5,000 cells) and **Cross-check file**. The cross-check file has no measurement-day alignment. Use it in step 9. Both files carry the extra parameters `SampleID` (1 to 8), `GroupID` (1 = protected, 2 = infection-prone) and `BatchDay` (1 or 2).

## Steps

::: v10
These steps use FlowJo v10.10 with the FlowSOM plugin. On Windows, also have the UMAP plugin available.
:::

::: v11
These steps use FlowJo v11.2 or later, with built-in FlowSOM, UMAP and Cluster Explorer.
:::

1. **Load the reference file.**

::: v10
Click **FlowJo → Add Samples** and select the reference FCS. Double-click the sample to open its **Graph Window**.
:::

::: v11
Click **Add Samples** and select the reference FCS. Open **Graphs** in the navigation bar, then click the reference in **Samples**.
:::

2. **Set all fluorescence axes to biexponential before you gate or cluster.** In the test run FlowJo showed them on a log scale, which hides negative values.

::: v10
In the **Graph Window**, click **T** beside a fluorescence axis and select **Customize Axis**. Under **Scale**, choose the biexponential scale, then click **Apply** to update the workspace. Repeat for each fluorescence parameter and check the scale in all samples.
:::

::: v11
Click **T** beside each fluorescence axis and choose **Biex**.
:::

3. **Choose the inputs.** Use the same twelve cell markers for FlowSOM and for the map. Leave out Time, FSC, SSC, Live-Dead, `SampleID`, `GroupID`, and `BatchDay`. Use the full reference population for both runs.
4. **Cluster and draw the map.**

::: v10
Select the reference sample in the Workspace. Choose **Workspace → Plugins → FlowSOM**, select the marker inputs and request **12 metaclusters**. Run the plugin. Reselect the same parent sample. On **Windows**, choose **Workspace → Plugins → UMAP**. On **Mac**, choose **Workspace → Populations → tSNE**. Use the same marker inputs for a two-dimensional map. Record any seeds shown in the dialogs.
:::

::: v11
Select the reference population and choose **Platforms → FlowSOM**. In the panel, select the marker inputs, set the number of metaclusters to **12**, and click **Submit**. Reselect the same parent, choose **Platforms → UMAP**, select the same markers and **2** components, then click **Submit**. Record the settings used for both runs.
:::

5. **Name three to five clusters.** Look up which markers identify MAIT cells. Use the marker heatmap to choose the best-matching cluster and explain which marker pattern supports your choice.

::: v10
Select the parent of the FlowSOM clusters and click **Workspace → Cluster Explorer**. Select the FlowSOM result, the marker inputs and the UMAP or tSNE axes for your map, then click **Accept**. Read the cluster rows in the heatmap.
:::

::: v11
Select the parent of the FlowSOM clusters in **Populations**, then click **Cluster Explorer** in the navigation bar. If multiple runs are present, use **Filter Clusters** to show the run you want. Read the cluster rows in the heatmap.
:::

6. **Answer the study question.** Calculate one MAIT-cluster percentage per sample. Use the number of events that are both in the candidate cluster and in that sample. Divide by the total events in that sample gate and multiply by 100. Record each sample's `GroupID` alongside its percentage.

::: v10
Double-click the MAIT candidate cluster to open its **Graph Window** and plot a histogram of `SampleID`. Draw eight range gates, one centred on each ID from 1 to 8, including any ID with no peak. In the Workspace, select the eight gates and drag them onto the cluster's parent population to copy them. In **FlowJo → Table Editor**, use **Edit → Add Column → Statistic** to put the **Count** for each cluster gate beside the **Count** for the matching parent gate. For each sample, divide the cluster-gate count by the parent-gate count and multiply by 100.
:::

::: v11
In **Graphs**, choose **Histogram** in the plot settings and put `SampleID` on the x-axis. Draw a range gate for each peak. In **Populations**, select a sample gate and the candidate cluster, right-click, then choose **Create Boolean Gate → And**. Repeat for each sample. Click the **Events** column header and select **#Events** to read the counts for both kinds of gate.
:::

   Compare the eight sample percentages with a two-sided Wilcoxon rank-sum test. With no ties and all four values in one group above all four in the other, the exact p-value is 0.029.

7. **Check how stable your result is.** Run FlowSOM again with the same inputs. Use a different seed if there is a seed setting. Open the new result in Cluster Explorer and find the matching cluster by its marker pattern. Does its group difference persist?
8. **Other differences?** Compare the other clusters between the groups. Anything you find here is a hypothesis, not a result: you tested twelve clusters. With a rank test and four against four samples, no finding survives a correction for multiple testing (FDR). And a correction removes chance findings, not artefacts.
9. **Cross-check.** Open the **Cross-check file** in a separate workspace (FlowJo 11: workbench) or group and repeat steps 2–6 on that file. Plot a histogram of `BatchDay` and gate values 1 and 2. Compare those two populations on the cross-check map. What changes, and what stays the same?

::: v10
Select the cross-check parent and open **Workspace → Cluster Explorer**. Enable **Show Populations as a new Cluster set**, click **Configure**, and choose the two measurement-day gates. Select the UMAP or tSNE axes for your cross-check map and click **Accept**.
:::

::: v11
Name the two day gates `BatchDay 1` and `BatchDay 2`. Select their parent and open **Cluster Explorer**. Type `BatchDay` in **Filter Clusters** and choose the cross-check UMAP axes in **Overlay**.
:::

## If you have time

Change the number of metaclusters to 8 and to 20. When does the MAIT cluster keep its own cluster?
