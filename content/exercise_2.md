# Exercise 2: Cluster and name

Work in pairs, 45 minutes.

## The study

The same eight patients: four **protected**, four **infection-prone**. Hypothesis fixed before the study: **CD8+ MAIT cells are less frequent in infection-prone patients.** This time you let the algorithm find the cell populations.

## Files

::: v10
Download **Concatenated reference** (8 samples × 5,000 cells) and **Cross-check file**. Both are single FCS files; there is nothing to unzip. The cross-check file has no measurement-day alignment. Use it in step 9. Both files carry the extra parameters `SampleID` (1 to 8), `GroupID` (1 = protected, 2 = infection-prone) and `BatchDay` (1 or 2). These are parameters, not keywords.
:::

::: v11
You work with the eight **Reference** files from Exercise 1, one file per sample. If you no longer have them, download **Reference (ZIP)** and unzip it. FlowJo 11 runs FlowSOM and UMAP on all samples of the selected group together, and each sample keeps its own row in tables. For step 9 also download the **Cross-check file**, a single FCS file without measurement-day alignment; it carries the extra parameters `SampleID` (1 to 8), `GroupID` and `BatchDay` (1 or 2).
:::

## Steps

::: v10
These steps use FlowJo v10.10 with the FlowSOM plugin. On Windows, also have the UMAP plugin available.
:::

::: v11
These steps use FlowJo v11.2 or later, with built-in FlowSOM, UMAP and Cluster Explorer. In FlowJo 11 the markers are listed under the parameter set **Uncompensated**. This is expected: the files are already unmixed.
:::

1. **Load the reference file.**

::: v10
Click **FlowJo → Add Samples** and select the reference FCS. Double-click the sample to open its **Graph Window**.
:::

::: v11
Start a new workbench (**File → New Workbench**, then **File → Save Workbench As**) and drag the unzipped **Reference** folder into it. You should see eight samples.
:::

2. **Set all fluorescence axes to biexponential before you gate or cluster.** Depending on the version, FlowJo shows them as Linear or Log after loading. Linear squeezes dim populations against zero; Log hides negative values.

::: v10
In the **Graph Window**, click **T** beside a fluorescence axis and select **Customize Axis**. Under **Scale**, choose the biexponential scale, then click **Apply** to update the workspace. Repeat for each fluorescence parameter and check the scale in all samples.
:::

::: v11
Click **T** beside an axis. In the panel on the right, open **Choose the parameters for this transformation** and tick the twelve markers and Live-Dead. The box at the top ticks all parameters, so untick FSC, SSC, **Event #** and **Time** again. Choose **Biex** and click **Apply**. This sets all eight samples at once.
:::

3. **Choose the inputs.** Use the same twelve cell markers for FlowSOM and for the map. Leave out Time, FSC, SSC, Live-Dead, `SampleID`, `GroupID`, and `BatchDay`. Use the full reference population for both runs.
4. **Draw the map and cluster.** Use **12 metaclusters**.

::: v10
Select the reference sample in the Workspace. Choose **Workspace → Plugins → FlowSOM**, select the marker inputs and request **12 metaclusters**. Run the plugin. Reselect the same parent sample. On **Windows**, choose **Workspace → Plugins → UMAP**. On **Mac**, choose **Workspace → Populations → tSNE**. Use the same marker inputs for a two-dimensional map. Record any seeds shown in the dialogs.
:::

::: v11
With **Experiment Data** selected (all eight samples), select **Ungated**. Choose **Platforms → UMAP**, choose the parameter set **Uncompensated** (with **Compensated** the list stays empty), tick all and untick Live-Dead, keep **Number of components** at **2** and the other defaults, and click **Submit**. Select **Ungated** again and choose **Platforms → FlowSOM**. Choose **Uncompensated**, tick all and untick Live-Dead; the list should read "APC-A :: CCR7 + 11 more". Set **Number of metaclusters** to **12** (default 10) and **Choose a downsampling method** to **None** (default Uniform), then click **Submit**. The clusters appear under **Ungated**. A run marked out-of-date stays usable.
:::

5. **Name three to five clusters.** Look up which markers identify MAIT cells. Use the marker heatmap to choose the best-matching cluster and explain which marker pattern supports your choice.

::: v10
Select the parent of the FlowSOM clusters and click **Workspace → Cluster Explorer**. Select the FlowSOM result, the marker inputs and the UMAP or tSNE axes for your map, then click **Accept**. Read the cluster rows in the heatmap.
:::

::: v11
Select **Ungated** in **Populations**, then click **Cluster Explorer** in the navigation bar. If the expression panel shows N/A, set **Expression Plots Settings → Choose a parameter set** to **Uncompensated**. Check that the markers are ticked under **Choose parameters**, then enlarge the lower panel (icon at its top right) to see the heatmap. Each row is a cluster. To see one cluster alone, select its population in **Populations**. To show the clusters on the map, set **Overlay Graph Settings → Plot Type** to **Dot Plot** and choose the two UMAP parameters as **X Axis** and **Y Axis**. The Cluster Explorer shows all child populations of **Ungated**: after two FlowSOM runs you see all clusters together. Type the run's name into **Filter clusters**, for example `FlowSOM_Ungated_cluster` for the first run and `FlowSOM_Ungated_1_cluster` for the second.
:::

6. **Answer the study question.** Calculate one MAIT-cluster percentage of all events per sample and compare the two groups.

::: v10
Double-click the MAIT candidate cluster to open its **Graph Window** and plot a histogram of `SampleID`. Draw eight range gates, one centred on each ID from 1 to 8, including any ID with no peak. In the Workspace, select the eight gates and drag them onto the cluster's parent population to copy them. In **FlowJo → Table Editor**, use **Edit → Add Column → Statistic** to put the **Count** for each cluster gate beside the **Count** for the matching parent gate. For each sample, divide the cluster-gate count by the parent-gate count and multiply by 100.
:::

::: v11
Open **Tables** and drag the **Experiment Data** group into the table: eight rows, one per sample. Under **Settings** in the right panel, tick **Frequency of total** and untick **Frequency of parent**. Drag the MAIT cluster into the table. Open **Keywords** in the right panel, search `GROUP_NAME`, tick it and click **Add Keyword**. Then open **Charts**: tick `GROUP_NAME` under **Keyword Category Factors** and the cluster under **Statistic Numeric Factors**. In the comparison settings choose **Wilcoxon rank-sum test**, `GROUP_NAME`, baseline `protected`, and tick **Show the p-value**. FlowJo uses an approximation and shows about 0.030 where the exact value is 0.029.
:::

::: v10
Compare the eight sample percentages with the counting rule from Exercise 1 (a two-sided Wilcoxon rank-sum test). With no ties and all four values in one group above all four in the other, the exact p-value is 0.029.
:::

7. **Check how stable your result is.** Run FlowSOM again with the same inputs. Use a different seed if there is a seed setting. Open the new result in Cluster Explorer and find the matching cluster by its marker pattern. Does its group difference persist?

::: v11
Run FlowSOM again on **Ungated** with the same inputs, but set **Choose a downsampling method** to **Random** and tick **Use random seed**. In the Cluster Explorer, type `FlowSOM_Ungated_1_cluster` into **Filter clusters** to see only the new run. If no cluster in the new run shows the MAIT pattern, note that too: it is part of the answer.
:::

8. **Other differences?** Compare the other clusters between the groups. Anything you find here is a hypothesis, not a result: you tested twelve clusters. With four against four samples the smallest possible p-value is 0.029; after a correction for multiple testing (FDR, Benjamini-Hochberg) over twelve clusters, a single such finding becomes 0.34. Findings survive only if many clusters reach that minimum together. And a correction removes chance findings, not artefacts.
9. **Cross-check.** Open the **Cross-check file** in a separate workspace (FlowJo 11: workbench) or group and repeat steps 2–5 on that file. Plot a histogram of `BatchDay` and gate values 1 and 2. Compare those two populations on the cross-check map. What changes, and what stays the same?

::: v10
Select the cross-check parent and open **Workspace → Cluster Explorer**. Enable **Show Populations as a new Cluster set**, click **Configure**, and choose the two measurement-day gates. Select the UMAP or tSNE axes for your cross-check map and click **Accept**.
:::

::: v11
Start a new workbench and drag in the cross-check file. In all parameter lists, also untick `BatchDay` and `GroupID`. In **Graphs**, select **Ungated**, put `BatchDay` on the x-axis and draw a range gate around each of the two peaks. Name them `BatchDay 1` and `BatchDay 2`. Select **Ungated** and open **Cluster Explorer**. Type `BatchDay` in **Filter clusters**; with **Plot Type** **Dot Plot** and the UMAP axes, the map shows both days. The two colours are similar: look for parts of an island that have only one colour.
:::

## If you have time

::: v11
Repeat steps 1–6 with your set from Exercise 1 in a new workbench. Does the group difference survive the missing step? If no cluster shows the MAIT pattern, try 20 metaclusters. Why might your set need more?
:::

::: v10
Change the number of metaclusters to 8 and to 20. With how many does the MAIT cluster keep its own cluster?
:::
